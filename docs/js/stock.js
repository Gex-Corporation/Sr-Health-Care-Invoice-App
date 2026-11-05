// Invoice Pro — Stock Page JS (stock.js)
import {
    db, collection, getDocs, getDoc, updateDoc, setDoc, doc,
    query, where, orderBy, serverTimestamp, increment,
    requireAdmin, buildPageTopbar, formatBDT, escapeHtml,
    showToast, confirmModal, debounce, CACHE_KEYS,
    getOrMigrateProductsList, appCache
} from '../js/shared.js';

let productMap = {}, stockMap = {}, filteredData = [];
let currentProductId = null, stockMode = 'in';

const STOCK_VERSION_KEY = 'stock_last_known_version_v1';
const STOCK_SYNC_KEY    = 'stock_last_sync_timestamp_v1';
const PROD_VERSION_KEY  = 'prod_last_known_version_v1';

window.addEventListener('DOMContentLoaded', async () => {
    if (!requireAdmin()) return;
    buildPageTopbar({ title: '📦 স্টক ব্যবস্থাপনা', subtitle: 'পণ্যের স্টক ইন/আউট নিয়ন্ত্রণ', backUrl: '../admin.html' });
    bindUI();
    await loadStockData();
});

function bindUI() {
    document.getElementById('stockSearch').addEventListener('input', debounce(filterStock, 250));
    document.getElementById('stockFilter').addEventListener('change', filterStock);
    
    // Smart Refresh Button: only fetches delta modified stocks
    document.getElementById('stockRefreshBtn').onclick = async () => {
        const btn = document.getElementById('stockRefreshBtn');
        btn.disabled = true;
        btn.textContent = '⏳ সিঙ্ক হচ্ছে...';
        try {
            await loadStockData(true, true);
        } finally {
            btn.disabled = false;
            btn.textContent = '🔄 রিফ্রেশ';
        }
    };

    document.getElementById('closeStockModal').onclick = closeStockModal;
    document.getElementById('cancelStockModal').onclick = closeStockModal;
    document.getElementById('stockModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeStockModal(); });

    document.getElementById('stockInBtn').onclick  = () => setMode('in');
    document.getElementById('stockOutBtn').onclick = () => setMode('out');
    document.getElementById('stockSetBtn').onclick = () => setMode('set');
    document.getElementById('stockChangeInput').addEventListener('input', updatePreview);
    document.getElementById('saveStockBtn').onclick = saveStock;
}

function setMode(mode) {
    stockMode = mode;
    ['in','out','set'].forEach(m => {
        const btn = document.getElementById(`stock${m.charAt(0).toUpperCase()+m.slice(1)}Btn`);
        btn.style.fontWeight = m === mode ? '700' : '500';
        btn.style.background = m === mode ? 'rgba(255,255,255,0.08)' : '';
    });
    updatePreview();
}

function updatePreview() {
    const current = stockMap[currentProductId] || 0;
    const change = parseFloat(document.getElementById('stockChangeInput').value) || 0;
    let newVal;
    if (stockMode === 'in')  newVal = current + change;
    if (stockMode === 'out') newVal = Math.max(0, current - change);
    if (stockMode === 'set') newVal = change;
    document.getElementById('stockPreview').textContent = newVal !== undefined ? newVal + ' টি' : '—';
    document.getElementById('stockPreview').style.color = newVal === 0 ? 'var(--red2)' : newVal <= 10 ? 'var(--orange2)' : 'var(--green2)';
}

// ==================== Incremental Delta Sync & Version Guard ====================
async function loadStockData(forceCheck = false, isManual = false) {
    const tbody = document.getElementById('stockTableBody');
    try {
        // 1. Instant Offline-First render from local IndexedDB cache if available
        let hasCache = false;
        const [cachedProds, cachedStocks] = await Promise.all([
            appCache.get(CACHE_KEYS.PRODUCTS),
            appCache.get(CACHE_KEYS.STOCKS)
        ]);

        if (cachedProds) {
            const raw = typeof cachedProds === 'string' ? JSON.parse(cachedProds) : cachedProds;
            Object.values(raw).forEach(p => { if (!p.deleted) productMap[p.id] = p; });
        }
        if (cachedStocks) {
            const rawStocks = typeof cachedStocks === 'string' ? JSON.parse(cachedStocks) : cachedStocks;
            Object.values(rawStocks).forEach(s => { stockMap[s.productId || s.id] = s.quantity || 0; });
            hasCache = Object.keys(stockMap).length > 0;
        }

        if (hasCache) {
            filteredData = buildData();
            renderTable(filteredData);
            updateStats(filteredData);
        }

        // 2. Smart Version Guard via settings/appConfig (Exact 1 Read)
        let serverStockVer = 0, serverProdVer = 0;
        try {
            const configSnap = await getDoc(doc(db, "settings", "appConfig"));
            if (configSnap.exists()) {
                const cData = configSnap.data();
                serverStockVer = cData.stockVersion || 0;
                serverProdVer  = cData.productVersion || 0;
            }
        } catch (cErr) {
            console.warn("appConfig fetch warning:", cErr);
        }

        const localStockVer = parseInt(localStorage.getItem(STOCK_VERSION_KEY) || '0');
        const localProdVer  = parseInt(localStorage.getItem(PROD_VERSION_KEY) || '0');
        const lastSyncTime  = parseInt(localStorage.getItem(STOCK_SYNC_KEY) || '0');

        // If versions match and we already have cached data -> 0 additional reads!
        if (hasCache && !forceCheck && serverStockVer > 0 && serverStockVer === localStockVer && serverProdVer === localProdVer) {
            return;
        }

        // 3. Products check (if productVersion changed or no cache)
        if (!cachedProds || serverProdVer > localProdVer || forceCheck) {
            productMap = await getOrMigrateProductsList();
            const saveMap = {};
            Object.values(productMap).forEach(p => { saveMap[p.id] = p; });
            await appCache.set(CACHE_KEYS.PRODUCTS, saveMap);
            localStorage.setItem(PROD_VERSION_KEY, String(serverProdVer));
        }

        // 4. Incremental Delta Sync for Stocks (0 to N reads, only for changed products)
        let updatedCount = 0;
        if (hasCache && lastSyncTime > 0 && (serverStockVer > localStockVer || forceCheck)) {
            // Fetch ONLY stocks modified since last sync
            try {
                const q = query(
                    collection(db, "stocks"),
                    where("updatedAt", ">", new Date(lastSyncTime))
                );
                const snap = await getDocs(q);
                updatedCount = snap.docs.length;

                let maxTs = lastSyncTime;
                snap.docs.forEach(d => {
                    const data = d.data();
                    const qty = data.quantity || 0;
                    stockMap[d.id] = qty;
                    if (data.updatedAt) {
                        const ts = data.updatedAt.toMillis ? data.updatedAt.toMillis() : (data.updatedAt.seconds ? data.updatedAt.seconds * 1000 : new Date(data.updatedAt).getTime());
                        if (ts > maxTs) maxTs = ts;
                    }
                });

                // Update cache
                const saveMap = {};
                Object.entries(stockMap).forEach(([id, qty]) => { saveMap[id] = { productId: id, quantity: qty, id }; });
                await appCache.set(CACHE_KEYS.STOCKS, saveMap);
                localStorage.setItem(STOCK_SYNC_KEY, String(maxTs));
                localStorage.setItem(STOCK_VERSION_KEY, String(serverStockVer));

                if (isManual) {
                    if (updatedCount > 0) {
                        showToast(`✅ ${updatedCount}টি পরিবর্তিত পণ্যের স্টক সিঙ্ক হয়েছে`, 'success');
                    } else {
                        showToast('✅ সব স্টক আপ-টু-ডেট আছে (কোনো পরিবর্তন হয়নি)', 'info');
                    }
                }
            } catch (deltaErr) {
                console.warn("Delta sync fallback:", deltaErr);
                // Fallback to full fetch if query fails
                await fullStocksFetch(serverStockVer);
            }
        } else if (!hasCache || lastSyncTime === 0) {
            // Initial cold load: fetch all once and cache
            await fullStocksFetch(serverStockVer);
            if (isManual) showToast('স্টক তথ্য সফলভাবে লোড হয়েছে', 'success');
        } else {
            // Versions already in sync
            localStorage.setItem(STOCK_VERSION_KEY, String(serverStockVer));
            if (isManual) showToast('✅ সব স্টক আপ-টু-ডেট আছে (কোনো পরিবর্তন হয়নি)', 'info');
        }

        filteredData = buildData();
        renderTable(filteredData);
        updateStats(filteredData);

    } catch (e) {
        console.error("Stock load error:", e);
        if (Object.keys(stockMap).length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="color:var(--red2);text-align:center;padding:24px">❌ লোড করা যায়নি</td></tr>`;
        }
    }
}

async function fullStocksFetch(serverStockVer) {
    const snap = await getDocs(collection(db, "stocks"));
    stockMap = {};
    let maxTs = Date.now();
    snap.docs.forEach(d => {
        const data = d.data();
        stockMap[d.id] = data.quantity || 0;
        if (data.updatedAt) {
            const ts = data.updatedAt.toMillis ? data.updatedAt.toMillis() : (data.updatedAt.seconds ? data.updatedAt.seconds * 1000 : new Date(data.updatedAt).getTime());
            if (ts > maxTs) maxTs = ts;
        }
    });
    const saveMap = {};
    Object.entries(stockMap).forEach(([id, qty]) => { saveMap[id] = { productId: id, quantity: qty, id }; });
    await appCache.set(CACHE_KEYS.STOCKS, saveMap);
    localStorage.setItem(STOCK_SYNC_KEY, String(maxTs));
    localStorage.setItem(STOCK_VERSION_KEY, String(serverStockVer));
}

function buildData() {
    return Object.values(productMap).map(p => ({ ...p, stock: stockMap[p.id] || 0 })).sort((a, b) => a.name.localeCompare(b.name));
}

function filterStock() {
    const q = document.getElementById('stockSearch').value.trim().toLowerCase();
    const f = document.getElementById('stockFilter').value;
    filteredData = buildData().filter(item => {
        if (q && !item.name.toLowerCase().includes(q)) return false;
        if (f === 'out' && item.stock > 0) return false;
        if (f === 'low' && (item.stock === 0 || item.stock > 10)) return false;
        if (f === 'ok' && item.stock <= 10) return false;
        return true;
    });
    renderTable(filteredData);
}

function renderTable(data) {
    const tbody = document.getElementById('stockTableBody');
    if (!data.length) { tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📦</div>কোনো পণ্য নেই</div></td></tr>`; return; }
    tbody.innerHTML = data.map((item, idx) => {
        let badgeClass = 'badge-green', badgeText = 'পর্যাপ্ত';
        if (item.stock === 0) { badgeClass = 'badge-red'; badgeText = 'শেষ'; }
        else if (item.stock <= 3) { badgeClass = 'badge-red'; badgeText = 'জরুরি'; }
        else if (item.stock <= 10) { badgeClass = 'badge-orange'; badgeText = 'কম'; }
        const stockColor = item.stock === 0 ? 'var(--red2)' : item.stock <= 10 ? 'var(--orange2)' : 'var(--green2)';
        return `<tr>
            <td class="text-muted text-small">${idx + 1}</td>
            <td class="bold">${escapeHtml(item.name)}</td>
            <td style="color:var(--blue2)">${formatBDT(item.price || 0)}</td>
            <td style="color:${stockColor};font-size:16px;font-weight:700">${item.stock} টি</td>
            <td><span class="badge ${badgeClass}">${badgeText}</span></td>
            <td><button class="btn btn-sm btn-primary update-stock-btn" data-id="${escapeHtml(item.id)}">📦 আপডেট</button></td>
        </tr>`;
    }).join('');

    tbody.querySelectorAll('.update-stock-btn').forEach(btn => {
        btn.onclick = () => openStockModal(btn.dataset.id);
    });
}

function updateStats(data) {
    document.getElementById('statTotalProd').textContent = data.length;
    document.getElementById('statOutStock').textContent  = data.filter(i => i.stock === 0).length;
    document.getElementById('statLowStock').textContent  = data.filter(i => i.stock > 0 && i.stock <= 10).length;
    document.getElementById('statGoodStock').textContent = data.filter(i => i.stock > 10).length;
}

function openStockModal(productId) {
    currentProductId = productId;
    const p = productMap[productId];
    if (!p) return;
    document.getElementById('stockModalTitle').textContent = `📦 ${p.name}`;
    document.getElementById('stockModalProductName').textContent = p.name;
    document.getElementById('stockModalCurrentQty').textContent = (stockMap[productId] || 0) + ' টি';
    document.getElementById('stockChangeInput').value = '';
    document.getElementById('stockPreview').textContent = '—';
    stockMode = 'in';
    setMode('in');
    document.getElementById('stockModal').classList.remove('hidden');
    setTimeout(() => document.getElementById('stockChangeInput').focus(), 100);
}

function closeStockModal() { document.getElementById('stockModal').classList.add('hidden'); currentProductId = null; }

async function saveStock() {
    const change  = parseFloat(document.getElementById('stockChangeInput').value);
    if (isNaN(change) || change < 0) { showToast('সঠিক পরিমাণ দিন', 'warning'); return; }
    const current = stockMap[currentProductId] || 0;
    let newQty;
    if (stockMode === 'in')  newQty = current + change;
    if (stockMode === 'out') newQty = Math.max(0, current - change);
    if (stockMode === 'set') newQty = change;

    const btn = document.getElementById('saveStockBtn');
    btn.disabled = true; btn.textContent = '⏳';
    try {
        await setDoc(doc(db, "stocks", currentProductId), { productId: currentProductId, quantity: newQty, updatedAt: serverTimestamp() }, { merge: true });
        stockMap[currentProductId] = newQty;
        // Update local cache
        const cachedRaw = (await appCache.get(CACHE_KEYS.STOCKS)) || {};
        const cached = typeof cachedRaw === 'string' ? JSON.parse(cachedRaw) : cachedRaw;
        cached[currentProductId] = { productId: currentProductId, quantity: newQty, id: currentProductId };
        await appCache.set(CACHE_KEYS.STOCKS, cached);

        // Bump stockVersion in settings/appConfig so other devices see update
        try {
            await updateDoc(doc(db, "settings", "appConfig"), { stockVersion: increment(1) });
            const curVer = parseInt(localStorage.getItem(STOCK_VERSION_KEY) || '0');
            localStorage.setItem(STOCK_VERSION_KEY, String(curVer + 1));
            localStorage.setItem(STOCK_SYNC_KEY, String(Date.now()));
        } catch (_) {}

        closeStockModal();
        filteredData = buildData();
        filterStock();
        updateStats(filteredData);
        showToast('স্টক আপডেট হয়েছে', 'success');
    } catch (e) { showToast('আপডেট করা যায়নি', 'error'); }
    finally { btn.disabled = false; btn.textContent = '✅ সেভ করুন'; }
}

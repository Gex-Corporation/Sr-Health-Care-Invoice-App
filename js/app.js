const APP_HTML = `
<div id="loginOverlay">
    <div class="login-card">
        <h2>🔐 Login</h2>
        <input type="text" id="loginUsername" placeholder="Username">
        <input type="password" id="loginPassword" placeholder="Password">
        <div class="remember-me-row">
            <input type="checkbox" id="rememberMe">
            <label for="rememberMe">Remember Me</label>
        </div>
        <button id="loginBtn">Login</button>
        <div id="loginError" class="login-error"></div>
        <div class="login-info">Data verified GEX Corporation</div>
    </div>
</div>

<div class="invoice-wrapper" id="mainInvoiceWrapper">
    <div class="invoice-container screen-dark" id="invoiceArea">
        <div class="header">
            <div class="left-header">
                <div class="logo-area">
                    <img id="logoPreview" alt="Logo">
                </div>
                <div class="company-details-box">
                    <textarea id="companyDetails" class="company-textarea" placeholder="Company Name, Address, Phone"> </textarea>
                </div>
                <div class="save-default-wrapper">
                    <button class="btn-save-default" id="btnSaveDefault"><span class="save-icon">💾</span> Save Default</button>
                </div>
            </div>

            <div class="right-header">
                <div class="invoice-title">INVOICE</div>
                <div class="meta-row">
                    <div class="user-info-container">
                        <label id="usernameDisplay" class="user-display-label"></label>
                        <button id="logoutBtn" class="btn btn-danger btn-sm no-print logout-btn-mobile">Log Out</button>
                    </div>
                    <input type="text" id="invoiceNumber" value="Invoice No 1">
                </div>
                <div class="meta-row">
                    <label>Date:</label>
                    <input type="text" id="invoiceDate" placeholder="Select Date">
                </div>
                <div class="bill-ship-section">
                    <div class="meta-row suggestion-relative">
                        <label>Bill To:</label>
                        <textarea id="billTo" placeholder="Name, Address" rows="2" autocomplete="off"></textarea>
                        <div id="customerSuggestions" class="suggestion-box no-print"></div>
                    </div>
                    <div class="meta-row">
                        <label>Ship To:</label>
                        <textarea id="shipTo" placeholder="Shipping Address" rows="2"></textarea>
                    </div>
                </div>
                <div class="meta-row">
                    <label>Phone:</label>
                    <input type="text" id="phoneField" placeholder="Customer Phone">
                </div>
            </div>
        </div>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody id="invoiceBody"></tbody>
            </table>
        </div>
        <button class="btn btn-primary no-print" id="addRowBtn">+ New Row</button>

        <div class="totals">
            <div class="total-card">
                <div class="total-display-main no-print">
                    <span>Grand Total:</span>
                    <span id="grandTotalMain">BDT 0.00</span>
                </div>
                <div class="total-separator-dashed no-print"></div>
                <select id="currencySelect" class="no-print">
                    <option value="BDT">BDT</option>
                    <option value="$">USD</option>
                    <option value="₹">INR</option>
                    <option value="€">EURO</option>
                </select>
                <div class="discount-field no-print">
                    <label for="discountPercent">Discount (%):</label>
                    <input type="number" id="discountPercent" value="0" min="0" max="100" step="1">
                </div>
                <div class="print-calculation">
                    <div class="total-display-main print-only">
                        <span>Grand Total:</span>
                        <span id="printGrandTotalTop">BDT 0.00</span>
                    </div>
                    <div class="total-separator-dashed print-only"></div>
                    <div><span>Sub Total:</span> <span id="printSubTotal">BDT 0.00</span></div>
                    <div><span>Discount (<span id="printDiscountPercent">0</span>%):</span> <span id="printDiscountAmount">- BDT 0.00</span></div>
                    <div class="total-separator-solid"></div>
                    <div class="grand-total-row"><span>Grand Total:</span> <span id="printGrandTotal">BDT 0.00</span></div>
                </div>
            </div>
        </div>

        <div class="invoice-footer">
            <div class="note-field">
                <label for="invoiceNote"></label>
                <textarea id="invoiceNote" rows="2" placeholder="Any necessary notes..."></textarea>
            </div>
            <div class="action-buttons">
                <button id="adminPanelBtn" class="btn btn-warning no-print" style="display:none;">⚙️ Admin Panel</button>
                <button id="sellHistoryBtn" class="btn btn-primary no-print">📊 Sell History</button>
                <button id="printBtn" class="btn btn-success no-print">🖨️ Print</button>
            </div>
        </div>

        <div id="productSearchPopup" class="product-popup">
            <div class="product-popup-content">
                <input type="text" id="productSearchInput" placeholder="Search product..." autocomplete="off">
                <div class="product-list" id="productSearchList"></div>
            </div>
        </div>
    </div>

    <div id="historyModal" class="modal-overlay no-print">
        <div class="modal-content">
            <span class="modal-close" id="closeHistoryBtn">&times;</span>
            <h2>📜 Print History (Last 30 Days)</h2>
            <div id="historyListContainer"></div>
        </div>
    </div>

    <div id="sellHistoryModal" class="modal-overlay no-print">
        <div class="modal-content sell-history-modal">
            <span class="modal-close" id="closeSellHistoryBtn">&times;</span>
            <div class="sell-history-header">
                <h2 class="m-0">📊 Sell History & Accounting</h2>
                <button id="refreshAccountingBtn" class="btn btn-warning btn-sm refresh-accounting-btn">🔄 Refresh Data</button>
            </div>
            <div id="sellHistoryContainer" class="table-wrapper">
                <table class="accounting-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Inv Count</th>
                            <th>Total Sales</th>
                            <th>Total Paid</th>
                            <th>Due Amount</th>
                        </tr>
                    </thead>
                    <tbody id="sellHistoryBody"></tbody>
                </table>
            </div>
            <div class="sell-history-invoices-section">
                <h3>📜 My Invoices</h3>
                <div class="table-wrapper">
                    <table>
                        <thead><tr><th>Date</th><th>Invoice No</th><th>Total Amount</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody id="sellHistoryInvoicesBody"></tbody>
                    </table>
                </div>
                <div id="sellHistoryLoadMoreContainer" class="sell-history-load-more"></div>
            </div>
        </div>
    </div>

    <div id="adminModal" class="modal-overlay no-print">
        <div class="modal-content admin-modal-content">
            <span class="modal-close" id="closeAdminBtn">&times;</span>
            <h2>⚙️ Admin Panel</h2>
            <div class="admin-tab-container">
                <button class="admin-tab-btn active" id="monitorTabBtn">📊 Sales Monitor</button>
                <button class="admin-tab-btn" id="allUserDetailsTabBtn">👤 All User Details</button>
                <button class="admin-tab-btn" id="productTabBtn">🛍️ Product Management</button>
                <button class="admin-tab-btn" id="stockTabBtn">📦 Stock Management</button>
                <button class="admin-tab-btn" id="userTabBtn">👥 User Management</button>
                <button class="admin-tab-btn" id="backupTabBtn">🗂️ Backup & Restore</button>
                <button class="admin-tab-btn" id="settingsTabBtn">⚙️ Settings</button>
            </div>

            <!-- Monitor Section -->
            <div id="monitorSection" class="admin-section display-none">
                <div class="admin-section-header">
                    <h3>📊 All Users Sales Monitor</h3>
                    <div class="admin-header-actions">
                        <button class="btn btn-info btn-sm delete-notif-btn" id="deleteNotifBtn" title="Pending Delete Requests">🔔 Notifications<span id="deleteNotifBadge" class="notif-badge" style="display:none;">0</span></button>
                        <button class="btn btn-warning btn-sm" id="refreshMonitorBtn">🔄 Refresh</button>
                        <button class="btn btn-danger btn-sm" id="deleteAllSalesBtn">Delete All</button>
                    </div>
                </div>
                <div class="table-wrapper">
                    <table>
                        <thead><tr><th>User</th><th>Date</th><th>Invoice No</th><th>Total Amount</th><th>Action</th></tr></thead>
                        <tbody id="monitorTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- All User Details Section -->
            <div id="allUserDetailsSection" class="admin-section display-none">
                <div id="userListSubSection">
                    <h3>👤 All Registered Users</h3>
                    <div class="table-wrapper">
                        <table>
                            <thead><tr><th>Username</th><th>Total Sales</th><th>Due</th><th>Action</th></tr></thead>
                            <tbody id="allUsersDetailTableBody"></tbody>
                        </table>
                    </div>
                </div>
                
                <div id="singleUserDetailSubSection" class="single-user-detail-section display-none">
                    <div class="admin-section-header">
                        <h3 id="detailViewUserName">👤 User Details</h3>
                        <button class="btn btn-secondary btn-sm" id="backToUserListBtn">⬅️ Back to List</button>
                    </div>
                    
                    <div class="admin-tab-container sub-tab-container">
                        <button class="admin-tab-btn active" id="subTabShopInfo">🏪 Seller Shop Info</button>
                        <button class="admin-tab-btn" id="subTabSalesHistory">📊 Sales History</button>
                        <button class="admin-tab-btn" id="subTabCacheControl">⚙️ Cache Control</button>
                    </div>

                    <!-- Sub Tab: Shop Info -->
                    <div id="subSectionShopInfo" class="sub-admin-section">
                        <div class="admin-section-header">
                            <h4>🏪 Saved Shops (Customers)</h4>
                            <div class="admin-header-actions">
                                <button class="btn btn-warning btn-sm" id="refreshUserShopInfoBtn">🔄 Refresh</button>
                                <button class="btn btn-danger btn-sm" id="deleteAllCustomersBtn">Delete All</button>
                                <label class="btn btn-success btn-sm file-import-label">
                                    📥 Import Restore
                                    <input type="file" id="importUserShopInfoFile" accept=".json" class="display-none">
                                </label>
                                <button class="btn btn-primary btn-sm" id="downloadUserShopInfoBtn">📥 Download Shop Info</button>
                            </div>
                        </div>
                        <div class="table-wrapper">
                            <table>
                                <thead><tr><th>Bill To</th><th>Ship To</th><th>Phone</th><th>Action</th></tr></thead>
                                <tbody id="userShopInfoTableBody"></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Sub Tab: Sales History -->
                    <div id="subSectionSalesHistory" class="sub-admin-section display-none">
                        <h4>📊 Sales History</h4>
                        <div class="table-wrapper">
                            <table>
                                <thead><tr><th>Date</th><th>Invoice No</th><th>Total</th><th>Action</th></tr></thead>
                                <tbody id="userSalesHistoryTableBody"></tbody>
                            </table>
                        </div>
                        <div id="userSalesHistoryLoadMoreContainer" style="text-align: center; padding: 10px;"></div>
                    </div>

                    <!-- Sub Tab: Cache Control -->
                    <div id="subSectionCacheControl" class="sub-admin-section display-none">
                        <h4>⚙️ Remote Cache Control</h4>
                        <div class="cache-control-card">
                            <p class="cache-control-info">You can remotely clear or restore this user's local browser data.</p>
                            <div class="cache-control-actions">
                                <button class="btn btn-danger" id="remoteClearCacheBtn">🧹 Remote Clear Cache</button>
                                <button class="btn btn-success" id="remoteRestoreCacheBtn">🔄 Force Full Sync (Restore)</button>
                            </div>
                            <div id="remoteCacheStatus" class="remote-cache-status"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product Section -->
            <div id="productSection" class="admin-section display-none">
                <h3>🛍️ Product List (Add/Edit/Delete)</h3>
                
                <div id="productFormContainer" class="product-form-container">
                    <div class="table-wrapper product-form-table-wrapper">
                        <table class="product-form-table">
                            <thead>
                                <tr class="product-form-header">
                                    <th class="product-name-th">Product Name</th>
                                    <th class="product-price-th">Unit Price (Optional)</th>
                                    <th class="product-action-th"></th>
                                </tr>
                            </thead>
                            <tbody id="productFormBody" class="background-transparent">
                                <!-- Rows will be added here via JS -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="product-form-footer">
                        <button class="btn btn-primary btn-sm" id="addNewProductRowBtn">➕ New Row</button>
                        <div class="product-form-actions">
                            <button class="btn btn-secondary btn-sm display-none" id="cancelProductEditBtn">Cancel Edit</button>
                            <button class="btn btn-success" id="saveProductsBtn">Update Product List</button>
                        </div>
                    </div>
                </div>
                
                <div class="product-import-export-bar">
                    <button class="btn btn-primary btn-sm" id="exportProductsTxtBtn">📤 Export Products (TXT)</button>
                    <label class="btn btn-success btn-sm file-import-label">
                        📥 Import Products (TXT)
                        <input type="file" id="importProductsTxtFile" accept=".txt" class="display-none">
                    </label>
                    <div id="productImportStatus" class="product-import-status"></div>
                </div>

                <div class="table-wrapper">
                    <table>
                        <thead><tr><th>Product Name</th><th>Price</th><th>Action</th></tr></thead>
                        <tbody id="productTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Stock Section -->
            <div id="stockSection" class="admin-section display-none">
                <h3>📦 Stock Management (Stock In/Out)</h3>
                <div class="table-wrapper">
                    <table>
                        <thead><tr><th>Product Name</th><th>Current Stock</th><th>Stock In (+) / Out (-)</th><th>Action</th></tr></thead>
                        <tbody id="stockTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- User Management Section -->
            <div id="userSection" class="admin-section display-none">
                <h3>👥 User Management (Create New User)</h3>
                <div class="add-product-form">
                    <input type="text" id="newRegUsername" placeholder="New Username">
                    <input type="text" id="newRegPassword" placeholder="Password">
                    <button class="btn btn-success" id="createUserBtn">Create User</button>
                </div>
                <div class="table-wrapper">
                    <table>
                        <thead><tr><th>Username</th><th>Password</th><th>Action</th></tr></thead>
                        <tbody id="userTableBody"></tbody>
                    </table>
                </div>
            </div>

    <!-- Backup Section -->
            <div id="backupSection" class="admin-section display-none">
                <h3>🗂️ Backup & Restore System</h3>
                <p class="settings-info backup-intro">Exports all Firebase collections (users, invoices, products, customers, stocks, settings) plus full local browser cache snapshot.</p>
                <div class="backup-restore-card">
                    <div class="backup-actions">
                        <button class="btn btn-primary" id="exportDataBtn">📤 Export All Data (JSON)</button>
                        <label class="btn btn-success file-import-label">
                            📥 Import Restore
                            <input type="file" id="importFile" accept=".json" class="display-none">
                        </label>
                    </div>
                    <div id="backupStatus" class="backup-status"></div>
                </div>

                <div class="danger-zone-card">
                    <h4 class="danger-title">⚠️ Danger Zone</h4>
                    <p class="danger-info">Warning! Clicking the button below will delete your database data.</p>
                    <button class="btn btn-danger" id="openCleanModalBtn">🗑️ All Data Clean (Warning!)</button>
                </div>
            </div>

            <!-- Settings Section -->
            <div id="settingsSection" class="admin-section display-none">
                <h3>⚙️ Application Settings</h3>

                <!-- Storage Monitor (Admin Only) -->
                <div id="storageMonitor" class="storage-monitor-card">
                    <h4 class="storage-monitor-title">📊 Full Storage Monitor</h4>
                    <div id="storageDetailsGrid" class="storage-details-grid">
                        <!-- Dynamic content will be injected here -->
                    </div>
                    <div id="storageKeyDetails" class="storage-key-details"></div>
                    <div class="total-storage-usage-box">
                        <div class="total-storage-label">Total Browser Storage Usage</div>
                        <div id="totalStorageUsage" class="total-storage-value">0.00 MB / 5.00 MB</div>
                    </div>
                </div>

                <div class="settings-card">
                    <div class="settings-item">
                        <h4 class="settings-title">Browser Cache</h4>
                        <p class="settings-info">If data is not syncing correctly, try clearing the local browser cache.</p>
                        <button class="btn btn-warning" id="clearCacheBtn">🧹 Clear Local Cache</button>
                    </div>
                    <div class="settings-item border-top">
                        <h4 class="settings-title">Global Synchronization</h4>
                        <p class="settings-info">Force all users to refresh their local data from the server on their next visit.</p>
                        <button class="btn btn-primary" id="forceGlobalSyncBtn">🔄 Force Global Sync (All Users)</button>
                    </div>
                    <div class="settings-item border-top">
                        <h4 class="settings-title">Default Configuration</h4>
                        <p class="settings-info">Save current company details and note as default for all new invoices.</p>
                        <button class="btn btn-success" id="btnSaveDefaultInSettings">💾 Save Current as Default</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Request Notification Modal -->
    <div id="deleteNotifModal" class="modal-overlay no-print" style="display:none;">
        <div class="modal-content delete-notif-modal">
            <span class="modal-close" id="closeDeleteNotifBtn">&times;</span>
            <h2>🔔 Pending Delete Requests</h2>
            <div id="deleteNotifList" class="delete-notif-list"></div>
        </div>
    </div>

    <!-- Full Data Clean Confirmation Modal -->
    <div id="cleanConfirmModal" class="modal-overlay no-print">
        <div class="modal-content clean-confirm-modal">
            <h3 class="clean-confirm-title">🗑️ Are you sure?</h3>
            <p class="clean-confirm-info">This will permanently delete database records and clear all local browser caches on this device (login session is kept).</p>
            
            <div class="clean-options-box">
                <label class="clean-option-label">
                    <input type="checkbox" id="cleanIncludeProducts" class="clean-checkbox">
                    Also delete all products &amp; company default settings
                </label>
            </div>

            <div class="clean-actions">
                <button class="btn btn-secondary flex-1" id="closeCleanModalBtn">Cancel</button>
                <button class="btn btn-danger flex-1" id="confirmFullCleanBtn">Delete</button>
            </div>
        </div>
    </div>
</div>
`;

// Render the application skeleton
function renderApp() {
    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.innerHTML = APP_HTML;
    }
    
    // Setup date field events manually since we removed inline handlers
    const invoiceDate = document.getElementById('invoiceDate');
    if (invoiceDate) {
        invoiceDate.addEventListener('focus', function() {
            this.type = 'date';
            if (this.getAttribute('data-raw')) this.value = this.getAttribute('data-raw');
        });
        invoiceDate.addEventListener('blur', function() {
            if (this.value && this.type === 'date') {
                this.setAttribute('data-raw', this.value);
                const d = this.value;
                this.type = 'text';
                this.value = formatDate(d);
            } else if (!this.value) {
                this.type = 'text';
            }
        });
    }
}

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, serverTimestamp, startAfter, writeBatch, increment, Timestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCsOe9szTWsAridmVbma-2xLUYXbsC8r0g",
    authDomain: "myprojactsss.firebaseapp.com",
    projectId: "myprojactsss",
    storageBucket: "myprojactsss.firebasestorage.app",
    messagingSenderId: "208899454401",
    appId: "1:208899454401:web:15b7409502050b21c36b40",
    measurementId: "G-KLSPHF5EHD",
    databaseURL: "https://myprojactsss-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

let db;
try {
    if (!firebaseConfig.apiKey) {
        console.warn("Firebase configuration missing!");
    } else {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log("Firebase Initialized");
    }
} catch (e) { console.error("Firebase Init Error:", e); }

const LOGO_URL = 'https://cdn.jsdelivr.net/gh/2dgameralif/srhealthcare-resource@main/srhealthcare%20logo.png';
const LOGIN_SESSION_KEY = 'invoice_logged_in_user_v1';
const REMEMBER_ME_KEY = 'invoice_remembered_user';

let currentUser = null;
let globalProductMap = {}; // productId -> productData
let globalStockMap = {}; // productId -> quantity
let globalCustomerList = [];
let activeProductInput = null;
let printReplacements = [];
let savedPageTitle = null;
let reloadAfterPrint = false;
let isPrintPrepared = false;
let printFinishCallback = null;
let printCleanupTimer = null;
const FORCE_IMMEDIATE_SYNC_KEY = 'force_immediate_sync_v1';
const MOBILE_SUGGESTION_MQ = window.matchMedia('(max-width: 768px)');
function isMobileViewport() {
    return window.matchMedia('(max-width: 768px)').matches;
}

// Pagination state
let historyLastDoc = null;
let monitorLastDoc = null;
let monitorDisplayedCount = 0;
let monitorServerMode = false;
const MONITOR_PAGE_SIZE = 50;
const MONITOR_CACHE_MAX = 100;
const ADMIN_MONITOR_CACHE = 'admin_sales_monitor_cache_v1';
const SELL_HISTORY_PAGE_SIZE = 10;
const SELL_HISTORY_CACHE_MAX = 10;
const USER_SALES_HISTORY_INITIAL_PAGE_SIZE = 15;
const USER_SALES_HISTORY_LOAD_MORE_SIZE = 10;
let currentDetailUserId = null; // To track which user is being viewed in detail
let deleteNotifPollInterval = null;
let sellHistoryLastDoc = null;
let userSalesHistoryLastDoc = null;
let userSalesHistoryHasMore = false;
let userSalesHistoryCache = [];

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// --- Optimized Delta Sync & Cache System (V3 - Map Architecture) ---
const CACHE_KEYS = {
    PRODUCTS: 'erp_cached_products_v3',
    STOCKS: 'erp_cached_stocks_v3',
    CUSTOMERS: 'erp_cached_customers_v3',
    SETTINGS: 'erp_cached_settings_v3',
    LAST_SYNC: 'erp_last_sync_timestamps_v3',
    VERSIONS: 'erp_global_versions_v3',
    SELL_HISTORY: 'erp_sell_history_v3'
};

const ADMIN_USERS_CACHE = 'admin_cached_users_list_v1';
const FIRESTORE_BACKUP_COLLECTIONS = ["users", "invoices", "products", "customers", "stocks", "settings", "deleteRequests"];

function getStorageByteSize(key, value) {
    return (String(key).length + String(value ?? '').length) * 2;
}

function getCacheItemCount(key, value) {
    if (!value) return 0;
    try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed.length;
        if (parsed && typeof parsed === 'object') {
            if (Array.isArray(parsed.items)) return parsed.items.length;
            return Object.keys(parsed).length;
        }
    } catch (e) { /* plain string */ }
    return value ? 1 : 0;
}

function categorizeStorageKey(key) {
    if (key === CACHE_KEYS.PRODUCTS) return 'Products Cache';
    if (key === CACHE_KEYS.STOCKS) return 'Stocks Cache';
    if (key === CACHE_KEYS.SETTINGS) return 'Settings Cache';
    if (key === CACHE_KEYS.SELL_HISTORY) return 'Sales History Cache';
    if (key === CACHE_KEYS.LAST_SYNC) return 'Sync Timestamps';
    if (key === CACHE_KEYS.VERSIONS) return 'Version Cache';
    if (key === ADMIN_MONITOR_CACHE) return 'Sales Monitor Cache';
    if (key === ADMIN_USERS_CACHE) return 'Admin Users Cache';
    if (key === 'cachedUsers_v1_1') return 'Sell History Users Cache';
    if (key === REMEMBER_ME_KEY) return 'Remember Me (Auth)';
    if (key === LOGIN_SESSION_KEY) return 'Login Session';
    if (key.startsWith(`${CACHE_KEYS.CUSTOMERS}_`)) return 'User Customers Cache';
    if (key.startsWith(`${CACHE_KEYS.SELL_HISTORY}_`)) return 'User Sell History Cache';
    if (key.startsWith('admin_cache_customers_')) return 'Admin Shop Info Cache';
    if (key.startsWith('admin_cache_sales_')) return 'Admin User Sales Cache';
    if (key.startsWith('local_cache_version_')) return 'Remote Sync Version';
    if (key.startsWith('erp_')) return 'ERP System Cache';
    return 'Other Browser Data';
}

function exportBrowserCacheSnapshot() {
    const local = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) local[key] = localStorage.getItem(key);
    }
    const session = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) session[key] = sessionStorage.getItem(key);
    }
    return { localStorage: local, sessionStorage: session, exportedAt: new Date().toISOString() };
}

function importBrowserCacheSnapshot(snapshot, { skipAuth = true } = {}) {
    if (!snapshot) return;
    if (snapshot.localStorage) {
        Object.entries(snapshot.localStorage).forEach(([key, val]) => {
            if (skipAuth && key === REMEMBER_ME_KEY) return;
            localStorage.setItem(key, val);
        });
    }
    if (snapshot.sessionStorage) {
        Object.entries(snapshot.sessionStorage).forEach(([key, val]) => {
            if (skipAuth && key === LOGIN_SESSION_KEY) return;
            sessionStorage.setItem(key, val);
        });
    }
}

function clearAllAppLocalCaches({ keepAuth = true } = {}) {
    const session = sessionStorage.getItem(LOGIN_SESSION_KEY);
    const remember = keepAuth ? localStorage.getItem(REMEMBER_ME_KEY) : null;
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (!keepAuth || key !== REMEMBER_ME_KEY)) keysToRemove.push(key);
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    lastSyncTimes = { products: 0, stocks: 0, customers: 0, invoices_monitor: 0 };
    globalProductMap = {};
    globalStockMap = {};
    globalCustomerList = [];
    monitorLastDoc = null;
    monitorDisplayedCount = 0;
    monitorServerMode = false;
    if (session) sessionStorage.setItem(LOGIN_SESSION_KEY, session);
    if (remember) localStorage.setItem(REMEMBER_ME_KEY, remember);
}

function restoreFirestoreFields(value) {
    if (value === null || value === undefined) return value;
    if (Array.isArray(value)) return value.map(restoreFirestoreFields);
    if (typeof value === 'object') {
        if (value.seconds !== undefined && value.nanoseconds !== undefined) {
            return new Timestamp(value.seconds, value.nanoseconds);
        }
        const out = {};
        for (const [k, v] of Object.entries(value)) out[k] = restoreFirestoreFields(v);
        return out;
    }
    return value;
}

function serializeFirestoreForBackup(value) {
    if (value === null || value === undefined) return value;
    if (typeof value.toMillis === 'function') {
        return { seconds: value.seconds, nanoseconds: value.nanoseconds };
    }
    if (Array.isArray(value)) return value.map(serializeFirestoreForBackup);
    if (typeof value === 'object') {
        const out = {};
        for (const [k, v] of Object.entries(value)) out[k] = serializeFirestoreForBackup(v);
        return out;
    }
    return value;
}

function parseProductsTxt(text) {
    const cleaned = String(text || '').replace(/^\uFEFF/, '');
    const toImport = [];
    const hasBlankSeparators = /\r?\n\s*\r?\n/.test(cleaned);

    if (hasBlankSeparators) {
        cleaned.split(/\r?\n\s*\r?\n/).map(b => b.trim()).filter(Boolean).forEach(block => {
            const lines = block.split(/\r?\n/).map(l => l.trim()).filter(l => l !== '');
            const name = lines[0];
            if (!name) return;
            const priceRaw = lines[1];
            const price = priceRaw === undefined || priceRaw === '' ? 0 : parseFloat(priceRaw);
            if (!isNaN(price)) toImport.push({ name, price });
        });
    } else {
        const lines = cleaned.split(/\r?\n/).map(l => l.trim()).filter(l => l !== '');
        for (let i = 0; i < lines.length; i += 2) {
            const name = lines[i];
            if (!name) continue;
            const priceRaw = lines[i + 1];
            const price = priceRaw === undefined || priceRaw === '' ? 0 : parseFloat(priceRaw);
            if (!isNaN(price)) toImport.push({ name, price });
        }
    }
    return toImport;
}

async function restoreBackupCollection(colName, docs) {
    if (!docs?.length) return 0;
    let count = 0;
    const withId = docs.filter(d => d.id);
    const withoutId = docs.filter(d => !d.id);
    const BATCH_SIZE = 400;

    for (let i = 0; i < withId.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        withId.slice(i, i + BATCH_SIZE).forEach(docData => {
            const { id, ...raw } = docData;
            batch.set(doc(db, colName, id), restoreFirestoreFields(raw), { merge: true });
            count++;
        });
        await batch.commit();
    }

    for (const docData of withoutId) {
        const { id, ...raw } = docData;
        await addDoc(collection(db, colName), restoreFirestoreFields(raw));
        count++;
    }
    return count;
}

function loadMonitorCache() {
    try {
        const raw = localStorage.getItem(ADMIN_MONITOR_CACHE);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveMonitorCache(list) {
    localStorage.setItem(ADMIN_MONITOR_CACHE, JSON.stringify(sortMonitorCache(list).slice(0, MONITOR_CACHE_MAX)));
}

function invalidateMonitorCache() {
    localStorage.removeItem(ADMIN_MONITOR_CACHE);
    lastSyncTimes.invoices_monitor = 0;
    localStorage.setItem(CACHE_KEYS.LAST_SYNC, JSON.stringify(lastSyncTimes));
    const versions = JSON.parse(localStorage.getItem(CACHE_KEYS.VERSIONS) || '{}');
    delete versions.salesVersion;
    delete versions.historyVersion;
    localStorage.setItem(CACHE_KEYS.VERSIONS, JSON.stringify(versions));
}

function getInvoiceSortTime(inv) {
    const t = inv?.timestamp || inv?.date;
    const ms = Date.parse(t);
    return isNaN(ms) ? 0 : ms;
}

function getMonitorUpdatedAtMs(inv) {
    if (inv?.updatedAt?.toMillis) return inv.updatedAt.toMillis();
    if (inv?.updatedAt?.seconds != null) return inv.updatedAt.seconds * 1000;
    return getInvoiceSortTime(inv);
}

function sortMonitorCache(list) {
    return [...list].sort((a, b) => getMonitorUpdatedAtMs(b) - getMonitorUpdatedAtMs(a));
}

function getSellHistoryCacheKey(userId) {
    return `${CACHE_KEYS.SELL_HISTORY}_${userId}`;
}

function loadSellHistoryCache(userId) {
    try {
        const raw = localStorage.getItem(getSellHistoryCacheKey(userId));
        if (!raw) return { items: [], historyVersion: 0 };
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return { items: parsed, historyVersion: 0 };
        return { items: parsed.items || [], historyVersion: parsed.historyVersion || 0 };
    } catch (e) {
        return { items: [], historyVersion: 0 };
    }
}

function sortSellHistoryCache(list) {
    return [...list].sort((a, b) => getInvoiceSortTime(b) - getInvoiceSortTime(a));
}

function saveSellHistoryCache(userId, items, historyVersion) {
    const sorted = sortSellHistoryCache(items).slice(0, SELL_HISTORY_CACHE_MAX);
    localStorage.setItem(getSellHistoryCacheKey(userId), JSON.stringify({ items: sorted, historyVersion }));
}

function invalidateSellHistoryCache(userId) {
    localStorage.removeItem(getSellHistoryCacheKey(userId));
}

function prependSellHistoryCache(userId, invoice) {
    const cache = loadSellHistoryCache(userId);
    const localVersions = getLocalMonitorVersions();
    const newHistoryVersion = localVersions.historyVersion + 1;
    const newSalesVersion = localVersions.salesVersion + 1;
    const merged = [{ ...invoice }, ...cache.items.filter(i => i.id !== invoice.id)];
    saveSellHistoryCache(userId, merged, newHistoryVersion);
    saveLocalMonitorVersions(newSalesVersion, newHistoryVersion);
}

function removeSellHistoryCacheItem(userId, invoiceId) {
    const cache = loadSellHistoryCache(userId);
    saveSellHistoryCache(userId, cache.items.filter(i => i.id !== invoiceId), cache.historyVersion);
}

function updateSellHistoryLoadMoreButton(hasMore) {
    const container = document.getElementById('sellHistoryLoadMoreContainer');
    if (!container) return;
    if (hasMore) {
        container.innerHTML = '<button class="btn btn-secondary btn-sm" id="loadMoreSellHistoryBtn">Load More</button>';
        document.getElementById('loadMoreSellHistoryBtn').onclick = () => loadSellHistoryInvoices(true);
    } else {
        container.innerHTML = '';
    }
}

function getLocalMonitorVersions() {
    const versions = JSON.parse(localStorage.getItem(CACHE_KEYS.VERSIONS) || '{}');
    return {
        salesVersion: parseInt(versions.salesVersion) || 0,
        historyVersion: parseInt(versions.historyVersion) || 0
    };
}

function saveLocalMonitorVersions(salesVersion, historyVersion) {
    const versions = JSON.parse(localStorage.getItem(CACHE_KEYS.VERSIONS) || '{}');
    versions.salesVersion = salesVersion;
    versions.historyVersion = historyVersion;
    localStorage.setItem(CACHE_KEYS.VERSIONS, JSON.stringify(versions));
}

function getLocalCustomerVersion() {
    const versions = JSON.parse(localStorage.getItem(CACHE_KEYS.VERSIONS) || '{}');
    return parseInt(versions.customerVersion) || 0;
}

function saveLocalCustomerVersion(customerVersion) {
    const versions = JSON.parse(localStorage.getItem(CACHE_KEYS.VERSIONS) || '{}');
    versions.customerVersion = customerVersion;
    localStorage.setItem(CACHE_KEYS.VERSIONS, JSON.stringify(versions));
}

async function getServerCustomerVersion() {
    const snap = await getDoc(doc(db, "settings", "appConfig"));
    if (!snap.exists()) return 1;
    const data = snap.data();
    return parseInt(data.customerVersion) || 1;
}

async function customerVersionChanged() {
    const server = await getServerCustomerVersion();
    const local = getLocalCustomerVersion();
    return server !== local;
}

async function syncLocalCustomerVersionFromServer() {
    const server = await getServerCustomerVersion();
    saveLocalCustomerVersion(server);
}

async function getServerMonitorVersions() {
    const snap = await getDoc(doc(db, "settings", "appConfig"));
    if (!snap.exists()) return { salesVersion: 1, historyVersion: 1 };
    const data = snap.data();
    return {
        salesVersion: parseInt(data.salesVersion) || 1,
        historyVersion: parseInt(data.historyVersion) || 1
    };
}

async function monitorSalesVersionsChanged() {
    const server = await getServerMonitorVersions();
    const local = getLocalMonitorVersions();
    return server.salesVersion !== local.salesVersion || server.historyVersion !== local.historyVersion;
}

async function syncLocalMonitorVersionsFromServer() {
    const server = await getServerMonitorVersions();
    saveLocalMonitorVersions(server.salesVersion, server.historyVersion);
}

function monitorHasMoreToLoad(cache) {
    if (monitorDisplayedCount < cache.length) return true;
    return cache.length >= MONITOR_CACHE_MAX;
}

function mergeMonitorItems(cache, items) {
    const map = new Map(cache.map(i => [i.id, i]));
    items.forEach(item => {
        if (item.deleted === true) map.delete(item.id);
        else map.set(item.id, item);
    });
    return sortMonitorCache([...map.values()]);
}

function removeMonitorCacheItem(id) {
    const cache = loadMonitorCache().filter(i => i.id !== id);
    saveMonitorCache(cache);
    return cache;
}

function bumpMonitorSyncFromItems(items) {
    let latestTs = lastSyncTimes.invoices_monitor || 0;
    let foundTimestamp = false;
    items.forEach(item => {
        if (item.updatedAt?.toMillis) {
            foundTimestamp = true;
            latestTs = Math.max(latestTs, item.updatedAt.toMillis());
        } else if (item.updatedAt?.seconds) {
            foundTimestamp = true;
            latestTs = Math.max(latestTs, item.updatedAt.seconds * 1000);
        }
    });
    if (!foundTimestamp && items.length > 0) {
        latestTs = Date.now();
    }
    if (latestTs > (lastSyncTimes.invoices_monitor || 0)) {
        saveSyncTime('invoices_monitor', latestTs);
    }
}

async function syncMonitorIncremental() {
    if (!db) return false;
    const lastSync = lastSyncTimes.invoices_monitor || 0;
    try {
        const q = query(
            collection(db, "invoices"),
            where("updatedAt", ">", new Date(lastSync)),
            orderBy("updatedAt", "asc")
        );
        const snap = await getDocs(q);
        if (snap.empty) return false;

        const updates = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const cache = mergeMonitorItems(loadMonitorCache(), updates);
        saveMonitorCache(cache);
        bumpMonitorSyncFromItems(updates);
        return true;
    } catch (e) {
        if (e.code !== 'failed-precondition' && e.code !== 'invalid-argument') {
            console.warn("Monitor incremental sync failed:", e);
        }
        return false;
    }
}

async function syncUserSalesIncremental(userId) {
    if (!db) return false;
    const cacheKey = `admin_cache_sales_${userId}`;
    const cached = localStorage.getItem(cacheKey);
    let currentCache = cached ? JSON.parse(cached) : [];

    // Incremental sync for a specific user
    try {
        // Get latest timestamp from cache
        let latestTs = 0;
        currentCache.forEach(item => {
            if (item.updatedAt?.toMillis) {
                latestTs = Math.max(latestTs, item.updatedAt.toMillis());
            } else if (item.updatedAt?.seconds) {
                latestTs = Math.max(latestTs, item.updatedAt.seconds * 1000);
            }
        });

        const q = query(
            collection(db, "invoices"),
            where("user", "==", userId),
            where("updatedAt", ">", new Date(latestTs)),
            orderBy("updatedAt", "asc")
        );
        const snap = await getDocs(q);
        if (snap.empty) return false;

        const updates = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const mergedCache = mergeMonitorItems(currentCache, updates);
        localStorage.setItem(cacheKey, JSON.stringify(mergedCache));
        return true;
    } catch (e) {
        if (e.code !== 'failed-precondition' && e.code !== 'invalid-argument') {
            console.warn("User sales incremental sync failed:", e);
        }
        return false;
    }
}

async function syncUserCustomersIncremental(userId) {
    if (!db) return false;
    const cacheKey = `admin_cache_customers_${userId}`;
    const cached = localStorage.getItem(cacheKey);
    let currentCache = cached ? JSON.parse(cached) : [];

    // Incremental sync for a specific user's customers
    try {
        // Get latest timestamp from cache
        let latestTs = 0;
        currentCache.forEach(item => {
            if (item.updatedAt?.toMillis) {
                latestTs = Math.max(latestTs, item.updatedAt.toMillis());
            } else if (item.updatedAt?.seconds) {
                latestTs = Math.max(latestTs, item.updatedAt.seconds * 1000);
            }
        });

        const q = query(
            collection(db, "customers"),
            where("user", "==", userId),
            where("updatedAt", ">", new Date(latestTs)),
            orderBy("updatedAt", "asc")
        );
        const snap = await getDocs(q);
        if (snap.empty) return false;

        const updates = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const mergedCache = mergeMonitorItems(currentCache, updates);
        localStorage.setItem(cacheKey, JSON.stringify(mergedCache));
        return true;
    } catch (e) {
        if (e.code !== 'failed-precondition' && e.code !== 'invalid-argument') {
            console.warn("User customers incremental sync failed:", e);
        }
        return false;
    }
}

function getCustomerDocId(userId, billTo) {
    const normalized = billTo.trim().toLowerCase();
    let h = 0;
    const s = `${userId}|${normalized}`;
    for (let i = 0; i < s.length; i++) {
        h = ((h << 5) - h) + s.charCodeAt(i);
        h |= 0;
    }
    return `c_${userId}_${Math.abs(h)}`;
}

function invalidateUsersCache() {
    localStorage.removeItem('cachedUsers_v1_1');
    localStorage.removeItem(ADMIN_USERS_CACHE);
}

function persistStockCache() {
    const dataMap = {};
    Object.entries(globalStockMap).forEach(([pid, qty]) => {
        dataMap[pid] = { productId: pid, quantity: qty, id: pid };
    });
    localStorage.setItem(CACHE_KEYS.STOCKS, JSON.stringify(dataMap));
}

// Initialize or load sync timestamps
let lastSyncTimes = JSON.parse(localStorage.getItem(CACHE_KEYS.LAST_SYNC) || '{"products": 0, "stocks": 0, "customers": 0, "invoices_monitor": 0}');

function saveSyncTime(type, time) {
    lastSyncTimes[type] = time;
    localStorage.setItem(CACHE_KEYS.LAST_SYNC, JSON.stringify(lastSyncTimes));
}

async function syncCollectionIncremental(colName, lastSyncKey, localDataMap, onUpdate, useUserFilter = false) {
    if (!db) return localDataMap;
    try {
        const lastSync = lastSyncTimes[lastSyncKey] || 0;
        let constraints = [
            where("updatedAt", ">", new Date(lastSync)),
            orderBy("updatedAt", "asc")
        ];
        
        if (useUserFilter && currentUser) {
            constraints.unshift(where("user", "==", currentUser));
        }

        const q = query(collection(db, colName), ...constraints);

        const snap = await getDocs(q);
        if (snap.empty) return localDataMap;

        let updatedMap = { ...localDataMap };
        let latestTimestamp = lastSync;

        snap.forEach(docSnap => {
            const data = docSnap.data();
            const id = docSnap.id;
            
            if (data.updatedAt) {
                const ts = data.updatedAt.toMillis();
                if (ts > latestTimestamp) latestTimestamp = ts;
            }

            if (data.deleted === true) {
                delete updatedMap[id];
            } else {
                updatedMap[id] = { id, ...data };
            }
        });

        saveSyncTime(lastSyncKey, latestTimestamp);
        if (onUpdate) onUpdate(updatedMap);
        return updatedMap;
    } catch (e) {
        console.error(`Sync Error [${colName}]:`, e);
        if (e.code === 'failed-precondition' || e.code === 'invalid-argument') {
            return await fetchFullCollection(colName, lastSyncKey, useUserFilter);
        }
        return localDataMap;
    }
}

async function fetchFullCollection(colName, lastSyncKey, useUserFilter = false) {
    let constraints = [];
    if (useUserFilter && currentUser) {
        constraints.push(where("user", "==", currentUser));
    }
    const snap = await getDocs(query(collection(db, colName), ...constraints));
    let dataMap = {};
    let latestTs = 0;
    snap.forEach(d => {
        const data = d.data();
        if (data.deleted !== true) {
            const item = { id: d.id, ...data };
            dataMap[d.id] = item;
            if (item.updatedAt) {
                const ts = item.updatedAt.toMillis();
                if (ts > latestTs) latestTs = ts;
            }
        }
    });
    saveSyncTime(lastSyncKey, latestTs);
    return dataMap;
}

// --- Version System (For Emergency/Schema Migration) ---
async function ensureAppConfig() {
    if (!db) return;
    try {
        const configRef = doc(db, "settings", "appConfig");
        const snap = await getDoc(configRef);
        const defaults = { productVersion: 1, stockVersion: 1, salesVersion: 1, historyVersion: 1, customerVersion: 1, settingsVersion: 1 };
        if (!snap.exists()) await setDoc(configRef, defaults);
    } catch (e) {}
}

async function incrementVersions(types) {
    if (!db || !types?.length) return;
    const valid = types.filter(t => t && t !== 'USERS');
    if (!valid.length) return;
    try {
        const configRef = doc(db, "settings", "appConfig");
        const updates = {};
        valid.forEach(t => { updates[t] = increment(1); });
        await updateDoc(configRef, updates);
    } catch (e) {
        try {
            await ensureAppConfig();
            const configRef = doc(db, "settings", "appConfig");
            const updates = {};
            valid.forEach(t => { updates[t] = increment(1); });
            await updateDoc(configRef, updates);
        } catch (e2) { console.warn("Version bump failed:", e2); }
    }
}

async function incrementVersion(type) {
    return incrementVersions([type]);
}

function clearLocalStorageCache() {
    if (!confirm("⚠️ A to Z Clear Local Cache?\nThis will remove ALL stored data including products, customers, sales monitor cache, and admin caches from this browser.\n(Login session will be kept)")) return;
    clearAllAppLocalCaches({ keepAuth: true });
    alert("✅ All local storage cleared successfully!");
    location.reload();
}

async function getWithCache(type, fetchFunc, cacheKey) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        try { return JSON.parse(cached); } catch (e) {}
    }
    const fresh = await fetchFunc();
    if (fresh) localStorage.setItem(cacheKey, JSON.stringify(fresh));
    return fresh;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function formatDateTimeBD(invoice) {
    let date;
    // Try to get date from invoice's timestamp or updatedAt or date field
    if (invoice?.timestamp?.toMillis) {
        date = new Date(invoice.timestamp.toMillis());
    } else if (invoice?.updatedAt?.toMillis) {
        date = new Date(invoice.updatedAt.toMillis());
    } else if (invoice?.timestamp) {
        date = new Date(invoice.timestamp);
    } else if (invoice?.updatedAt) {
        date = new Date(invoice.updatedAt);
    } else if (invoice?.date) {
        date = new Date(invoice.date);
    } else {
        return formatDate(invoice?.date || '');
    }
    
    if (isNaN(date.getTime())) {
        return formatDate(invoice?.date || '');
    }
    
    // Format date
    const day = String(date.getDate()).padStart(2, '0');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dateStr = `${day} ${month} ${year}`;
    
    // Format Bangladesh time (Asia/Dhaka time zone) using Intl.DateTimeFormat
    const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date);
    
    return `<div style="font-weight:500;">${dateStr}</div><div style="font-size:0.85em;opacity:0.9;">${timeStr}</div>`;
}

function extractInvoiceNumber(str) {
    if (!str) return 0;
    const matches = str.match(/\d+/g);
    if (!matches) return 0;
    return parseInt(matches[matches.length - 1]) || 0;
}

async function performLogin() {
    if (!db) return alert("Firebase not connected!");
    const userEl = document.getElementById('loginUsername');
    const passEl = document.getElementById('loginPassword');
    const loginBtn = document.getElementById('loginBtn');
    const errorEl = document.getElementById('loginError');
    const user = userEl.value.trim();
    const pass = passEl.value.trim();
    const remember = document.getElementById('rememberMe').checked;
    if (!user || !pass) { errorEl.textContent = 'Enter username and password'; errorEl.style.display = 'block'; return; }
    loginBtn.disabled = true; loginBtn.textContent = 'Verifying...'; errorEl.textContent = 'Verifying data...'; errorEl.style.display = 'block'; errorEl.style.color = '#60a5fa';
    try {
        const docSnap = await getDoc(doc(db, "users", user));
        if (docSnap.exists() && String(docSnap.data().password) === String(pass)) {
            sessionStorage.setItem(LOGIN_SESSION_KEY, user); currentUser = user;
            if (remember) localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify({username: user, password: pass}));
            else localStorage.removeItem(REMEMBER_ME_KEY);
            showMainApp();
        } else { errorEl.textContent = 'Incorrect username or password'; errorEl.style.color = '#f87171'; }
    } catch (e) { errorEl.textContent = 'Server connection problem.'; errorEl.style.color = '#f87171'; } finally { loginBtn.disabled = false; loginBtn.textContent = 'Login'; }
}

function logout() { sessionStorage.removeItem(LOGIN_SESSION_KEY); location.reload(); }

async function showMainApp() {
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('mainInvoiceWrapper').style.display = 'block';
    
    const isAdmin = (currentUser === 'admin');
    document.getElementById('adminPanelBtn').style.display = (isAdmin ? 'inline-block' : 'none');
    document.getElementById('btnSaveDefault').style.display = (isAdmin ? 'inline-block' : 'none');
    document.getElementById('companyDetails').readOnly = !isAdmin;
    
    if (!window._appInitialized) { await initializeAppLogic(); window._appInitialized = true; }
    if (isAdmin) startDeleteNotifPolling();
}

async function initializeAppLogic() {
    if (!db) return;
    document.getElementById('usernameDisplay').textContent = currentUser;
    
    await ensureAppConfig();

    // --- Remote Cache Control Mechanism ---
    try {
        const userRef = doc(db, "users", currentUser);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const serverCacheVersion = userData.forceClearCache || 0;
            const localCacheVersion = parseInt(localStorage.getItem(`local_cache_version_${currentUser}`)) || 0;
            
            if (serverCacheVersion > localCacheVersion) {
                console.log("Remote Clear Cache Signal Received!");
                clearAllAppLocalCaches({ keepAuth: true });
                localStorage.setItem(`local_cache_version_${currentUser}`, serverCacheVersion);
                sessionStorage.setItem(FORCE_IMMEDIATE_SYNC_KEY, '1');
                alert("System data updated. Refreshing...");
                location.reload();
                return;
            }
        }
    } catch (e) { console.error("Remote command error:", e); }
    
    // Initial load from cache (Map based)
    globalProductMap = JSON.parse(localStorage.getItem(CACHE_KEYS.PRODUCTS) || "{}");
    const cachedStocksMap = JSON.parse(localStorage.getItem(CACHE_KEYS.STOCKS) || "{}");
    globalStockMap = {};
    Object.values(cachedStocksMap).forEach(s => globalStockMap[s.productId] = s.quantity);
    globalCustomerList = JSON.parse(localStorage.getItem(`${CACHE_KEYS.CUSTOMERS}_${currentUser}`) || "[]");

    // UI initial setup
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const dateInput = document.getElementById('invoiceDate');
    dateInput.setAttribute('data-raw', todayStr);
    dateInput.value = formatDate(todayStr);
    document.getElementById('logoPreview').src = LOGO_URL;
    document.getElementById('logoPreview').style.display = 'block';

    // Load settings (Always full fetch for settings for safety)
    const settingsSnap = await getDoc(doc(db, "settings", "company"));
    if (settingsSnap.exists()) {
        const s = settingsSnap.data();
        if (s.companyDetails) { document.getElementById('companyDetails').value = s.companyDetails; autoResize(document.getElementById('companyDetails')); }
        if (s.defaultNote) document.getElementById('invoiceNote').value = s.defaultNote;
    }

    // Background delta sync after UI is ready (saves startup reads)
    if (sessionStorage.getItem(FORCE_IMMEDIATE_SYNC_KEY)) {
        sessionStorage.removeItem(FORCE_IMMEDIATE_SYNC_KEY);
        syncAppData().catch(e => console.warn("Immediate sync:", e));
    } else {
        setTimeout(() => { syncAppData().catch(e => console.warn("Background sync:", e)); }, 2500);
    }

    // User-specific Invoice Numbering
    try {
        const userSnap = await getDoc(doc(db, "users", currentUser));
        let nextNum = 1;
        if (userSnap.exists() && userSnap.data().invoiceCounter !== undefined) {
            nextNum = (parseInt(userSnap.data().invoiceCounter) || 0) + 1;
        }
        document.getElementById('invoiceNumber').value = `Invoice No ${nextNum}`;
    } catch (e) {
        document.getElementById('invoiceNumber').value = 'Invoice No 1';
    }
    
    if (document.getElementById('invoiceBody').children.length === 0) addInvoiceRow();
    calculateGrandTotal();
}

async function syncProducts() {
    globalProductMap = await syncCollectionIncremental("products", "products", globalProductMap, (dataMap) => {
        localStorage.setItem(CACHE_KEYS.PRODUCTS, JSON.stringify(dataMap));
    });
}

async function syncStocks() {
    const localStocksMap = {};
    Object.entries(globalStockMap).forEach(([pid, qty]) => {
        localStocksMap[pid] = { productId: pid, quantity: qty, id: pid };
    });
    
    await syncCollectionIncremental("stocks", "stocks", localStocksMap, (dataMap) => {
        globalStockMap = {};
        Object.values(dataMap).forEach(s => globalStockMap[s.productId] = s.quantity);
        localStorage.setItem(CACHE_KEYS.STOCKS, JSON.stringify(dataMap));
    });
}

async function syncCustomers() {
    const customerMap = {};
    globalCustomerList.forEach(c => customerMap[c.id] = c);
    // Use user-specific sync key and enable user filter to ensure privacy
    await syncCollectionIncremental("customers", "customers_" + currentUser, customerMap, (dataMap) => {
        globalCustomerList = Object.values(dataMap);
        localStorage.setItem(`${CACHE_KEYS.CUSTOMERS}_${currentUser}`, JSON.stringify(globalCustomerList));
    }, true);
}

async function syncAppData() {
    await Promise.all([syncProducts(), syncStocks(), syncCustomers()]);
}

async function refreshProductList() {
    await syncProducts();
}

async function refreshCustomerList() {
    await syncCustomers();
}

function isMobileSuggestionView() {
    return MOBILE_SUGGESTION_MQ.matches;
}

function hideCustomerSuggestions() {
    const box = document.getElementById('customerSuggestions');
    if (!box) return;
    box.style.display = 'none';
    resetCustomerSuggestionsPlacement();
}

function resetCustomerSuggestionsPlacement() {
    const box = document.getElementById('customerSuggestions');
    if (!box) return;
    if (box._portalParent) {
        box._portalParent.appendChild(box);
        box._portalParent = null;
    }
    box.classList.remove('suggestion-floating');
    ['position', 'left', 'top', 'right', 'bottom', 'width', 'maxWidth', 'zIndex'].forEach((prop) => {
        box.style[prop] = '';
    });
}

function repositionCustomerSuggestions() {
    const box = document.getElementById('customerSuggestions');
    const billTo = document.getElementById('billTo');
    if (!box || !billTo || box.style.display === 'none') return;

    if (!isMobileSuggestionView()) {
        resetCustomerSuggestionsPlacement();
        return;
    }

    const rect = billTo.getBoundingClientRect();
    const pad = 12;
    const width = Math.min(rect.width, window.innerWidth - pad * 2);

    if (!box._portalParent) {
        box._portalParent = box.parentElement;
        document.body.appendChild(box);
        box.classList.add('suggestion-floating');
    }

    const left = Math.max(pad, Math.min(rect.left, window.innerWidth - width - pad));
    box.style.position = 'fixed';
    box.style.left = `${left}px`;
    box.style.top = `${rect.bottom + 4}px`;
    box.style.width = `${width}px`;
    box.style.right = 'auto';
    box.style.bottom = 'auto';
    box.style.maxWidth = 'none';
    box.style.zIndex = '10001';
}

function initCustomerSuggestionListeners() {
    const onViewportChange = () => {
        const box = document.getElementById('customerSuggestions');
        if (box && box.style.display !== 'none') repositionCustomerSuggestions();
    };
    window.addEventListener('resize', onViewportChange);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', onViewportChange);
        window.visualViewport.addEventListener('scroll', onViewportChange);
    }
    window.addEventListener('scroll', onViewportChange, true);
}

function filterCustomers() {
    const qStr = document.getElementById('billTo').value.trim().toLowerCase();
    const box = document.getElementById('customerSuggestions');
    
    // Ensure customers are synced if typing starts and list is empty
    if (globalCustomerList.length === 0) syncCustomers();
    
    if (!qStr) { hideCustomerSuggestions(); return; }
    
    // Use a Set with a composite key (Name + Address + Phone) to allow different entries for same name
    const uniqueCustomers = [];
    const seenKeys = new Set();
    
    globalCustomerList.forEach(c => {
        if (c.billTo && c.billTo.toLowerCase().includes(qStr)) {
            const compositeKey = `${c.billTo}|${c.shipTo || ''}|${c.phone || ''}`.toLowerCase();
            if (!seenKeys.has(compositeKey)) {
                uniqueCustomers.push(c);
                seenKeys.add(compositeKey);
            }
        }
    });
    
    if (uniqueCustomers.length === 0) { hideCustomerSuggestions(); return; }
    
    box.innerHTML = uniqueCustomers.map(c => `
        <div class="suggestion-item" 
             data-billto="${c.billTo}" 
             data-shipto="${c.shipTo || ''}" 
             data-phone="${c.phone || ''}"
             style="padding: 10px; cursor: pointer; border-bottom: 1px solid #eee;">
             <strong>${c.billTo}</strong><br>
             <small style="color: #666;">${c.shipTo || ''} ${c.phone ? ' | ' + c.phone : ''}</small>
        </div>
    `).join('');
    
    box.style.display = 'block';
    repositionCustomerSuggestions();
    
    box.querySelectorAll('.suggestion-item').forEach(item => {
        const applySuggestion = (e) => {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('billTo').value = item.dataset.billto;
            document.getElementById('shipTo').value = item.dataset.shipto;
            document.getElementById('phoneField').value = item.dataset.phone;
            hideCustomerSuggestions();
            autoResize(document.getElementById('billTo'));
        };
        item.addEventListener('pointerdown', applySuggestion);
    });
}

async function dbFetchStock() { 
    await syncStocks();
    return globalStockMap;
}

async function dbUpdateStock(stockObj) {
    const entries = Object.entries(stockObj);
    if (!db || !entries.length) return;
    try {
        const batch = writeBatch(db);
        for (const [pid, qty] of entries) {
            batch.set(doc(db, "stocks", pid), {
                productId: pid,
                quantity: qty,
                updatedAt: serverTimestamp()
            }, { merge: true });
        }
        await batch.commit();
        await incrementVersions(['stockVersion']);
        persistStockCache();
    } catch (e) { console.error("Stock Update Error:", e); }
}

function autoResize(textarea) { textarea.style.height = 'auto'; textarea.style.height = textarea.scrollHeight + 'px'; }

function addInvoiceRow() {
    const tbody = document.getElementById('invoiceBody');
    const row = document.createElement('tr');
    row.innerHTML = `<td>
        <input type="text" class="product-name" placeholder="Select Product" readonly>
        <input type="hidden" class="product-id">
    </td>
        <td><input type="number" class="qty" value="1" min="1"></td>
        <td><input type="number" class="rate" value="0" min="0" step="0.01"></td>
        <td><input type="number" class="amount" value="0.00" readonly></td>
        <td><button class="btn btn-danger remove-btn">✕</button></td>`;
    tbody.appendChild(row);
    row.querySelector('.product-name').onclick = function() { openProductPopup(this); };
    const qtyInput = row.querySelector('.qty');
    qtyInput.addEventListener('input', function() {
        const v = this.value.trim();
        if (v !== '' && parseFloat(v) < 1) this.value = 1;
        calculateRow(this);
    });
    qtyInput.addEventListener('blur', function() {
        const v = parseFloat(this.value);
        if (!v || v < 1) this.value = 1;
        calculateRow(this);
    });
    row.querySelector('.rate').oninput = function() { if(this.value < 0) this.value = 0; calculateRow(this); };
    row.querySelector('.remove-btn').onclick = function() { removeRow(this); };
}

function calculateRow(el) { const row = el.closest('tr'); const qty = parseFloat(row.querySelector('.qty').value) || 0; const rate = parseFloat(row.querySelector('.rate').value) || 0; row.querySelector('.amount').value = (qty * rate).toFixed(2); calculateGrandTotal(); }

function calculateGrandTotal() {
    const symbol = document.getElementById('currencySelect').value;
    let sub = 0; document.querySelectorAll('.amount').forEach(a => sub += parseFloat(a.value) || 0);
    const discP = parseFloat(document.getElementById('discountPercent').value) || 0;
    const discA = sub * discP / 100; const final = sub - discA;
    
    const finalStr = symbol + ' ' + final.toFixed(2);
    document.getElementById('grandTotalMain').textContent = finalStr;
    document.getElementById('printGrandTotalTop').textContent = finalStr;
    
    document.getElementById('printSubTotal').textContent = symbol + ' ' + sub.toFixed(2);
    document.getElementById('printDiscountPercent').textContent = discP;
    document.getElementById('printDiscountAmount').textContent = '- ' + symbol + ' ' + discA.toFixed(2);
    document.getElementById('printGrandTotal').textContent = finalStr;
}

function removeRow(btn) { if (document.getElementById('invoiceBody').children.length > 1) { btn.closest('tr').remove(); calculateGrandTotal(); } else alert('At least one row is required!'); }

function openProductPopup(input) { 
    activeProductInput = input; 
    document.getElementById('productSearchInput').value = ''; 
    syncProducts(); // Sync in background when popup opens
    filterProducts(); 
    document.getElementById('productSearchPopup').style.display = 'flex'; 
    document.getElementById('productSearchInput').focus(); 
}

function filterProducts() {
    const qStr = document.getElementById('productSearchInput').value.toLowerCase();
    const list = document.getElementById('productSearchList');
    const products = Object.values(globalProductMap);
    const filtered = qStr ? products.filter(p => p.name && p.name.toLowerCase().includes(qStr)) : products;
    if (filtered.length === 0) { list.innerHTML = '<div class="product-list-item no-match">No products found</div>'; return; }
    list.innerHTML = filtered.map(p => {
        const priceDisplay = p.price && p.price > 0 ? `BDT ${p.price}` : 'Manual Price';
        return `<div class="product-list-item" data-id="${p.id}" data-name="${p.name}" data-price="${p.price || 0}">${p.name} - ${priceDisplay}</div>`;
    }).join('');
    list.querySelectorAll('.product-list-item').forEach(item => {
        if (!item.classList.contains('no-match')) {
            item.onclick = () => { 
                activeProductInput.value = item.dataset.name; 
                const row = activeProductInput.closest('tr'); 
                row.querySelector('.product-id').value = item.dataset.id;
                const price = parseFloat(item.dataset.price);
                const rateField = row.querySelector('.rate');
                rateField.value = price > 0 ? price : ''; 
                calculateRow(rateField); 
                document.getElementById('productSearchPopup').style.display = 'none';
                if (price === 0) {
                    rateField.focus();
                    rateField.select();
                }
            };
        }
    });
}

async function printInvoice() {
    if (!db) return alert("Firebase not connected!");
    const printBtn = document.getElementById('printBtn');
    const isMobilePrintFlow = isMobileViewport();
    const rows = []; let isValid = true;
    document.querySelectorAll('#invoiceBody tr').forEach(r => {
        const name = r.querySelector('.product-name').value;
        const pid = r.querySelector('.product-id').value;
        if (!name || !pid) { isValid = false; return; }
        rows.push({ 
            productId: pid, 
            name: name, 
            qty: parseFloat(r.querySelector('.qty').value) || 0, 
            rate: parseFloat(r.querySelector('.rate').value) || 0, 
            amount: parseFloat(r.querySelector('.amount').value) || 0 
        });
    });
    if (!isValid || rows.length === 0) return alert("Please select products!");
    
    const grandTotalVal = document.getElementById('printGrandTotal').textContent.split(' ')[1] || "0.00";
    
    const data = { 
        user: currentUser, 
        timestamp: new Date().toISOString(), 
        date: formatDate(document.getElementById('invoiceDate').value), 
        invoiceNumber: document.getElementById('invoiceNumber').value, 
        companyDetails: document.getElementById('companyDetails').value, 
        phone: document.getElementById('phoneField').value, 
        billTo: document.getElementById('billTo').value, 
        shipTo: document.getElementById('shipTo').value, 
        currency: document.getElementById('currencySelect').value, 
        discountPercent: parseFloat(document.getElementById('discountPercent').value) || 0, 
        grandTotal: grandTotalVal, 
        note: document.getElementById('invoiceNote').value, 
        items: rows 
    };

    if (isMobilePrintFlow) {
        reloadAfterPrint = false;
        openPrintDialog();
    }

    printBtn.disabled = true; printBtn.textContent = 'Saving...';
    try {
        const batch = writeBatch(db);
        const invRef = doc(collection(db, "invoices"));
        batch.set(invRef, { ...data, updatedAt: serverTimestamp() });

        const hasBillTo = !!data.billTo.trim();
        let customerData = null;
        let custDocId = null;

        if (hasBillTo) {
            custDocId = getCustomerDocId(currentUser, data.billTo.trim());
            customerData = {
                user: currentUser,
                billTo: data.billTo.trim(),
                shipTo: data.shipTo.trim(),
                phone: data.phone.trim(),
                lastUpdated: new Date().toISOString(),
                updatedAt: serverTimestamp()
            };
            batch.set(doc(db, "customers", custDocId), customerData, { merge: true });
        }

        const stockUpdates = {};
        rows.forEach(item => {
            if (item.productId) {
                const newQty = (globalStockMap[item.productId] || 0) - item.qty;
                stockUpdates[item.productId] = newQty;
                globalStockMap[item.productId] = newQty;
            }
        });
        for (const [pid, qty] of Object.entries(stockUpdates)) {
            batch.set(doc(db, "stocks", pid), {
                productId: pid,
                quantity: qty,
                updatedAt: serverTimestamp()
            }, { merge: true });
        }
        persistStockCache();

        const currentInvNum = extractInvoiceNumber(data.invoiceNumber);
        const saleAmount = parseFloat(data.grandTotal) || 0;
        const userRef = doc(db, "users", currentUser);
        batch.update(userRef, {
            totalSales: increment(saleAmount),
            invoiceCounter: currentInvNum,
            invoiceCount: increment(1)
        });

        const configRef = doc(db, "settings", "appConfig");
        const versionBumps = {
            salesVersion: increment(1),
            historyVersion: increment(1)
        };
        if (Object.keys(stockUpdates).length) versionBumps.stockVersion = increment(1);
        if (hasBillTo) versionBumps.customerVersion = increment(1);
        batch.update(configRef, versionBumps);

        await batch.commit();

        if (hasBillTo && customerData) {
            const existingIdx = globalCustomerList.findIndex(c =>
                c.billTo === customerData.billTo &&
                (c.shipTo || '') === (customerData.shipTo || '') &&
                (c.phone || '') === (customerData.phone || '')
            );
            const localCust = { id: custDocId, ...customerData };
            if (existingIdx > -1) {
                globalCustomerList[existingIdx] = { ...globalCustomerList[existingIdx], ...localCust };
            } else {
                globalCustomerList.push(localCust);
            }
            localStorage.setItem(`${CACHE_KEYS.CUSTOMERS}_${currentUser}`, JSON.stringify(globalCustomerList));
        }

        invalidateUsersCache();
        localStorage.removeItem(`admin_cache_sales_${currentUser}`);
        prependSellHistoryCache(currentUser, { id: invRef.id, ...data });
        saveMonitorCache(mergeMonitorItems(loadMonitorCache(), [{ id: invRef.id, ...data }]));

        alert("Invoice saved successfully!");
        reloadAfterPrint = !isMobilePrintFlow;
        if (!isMobilePrintFlow) openPrintDialog();
    } catch (e) { console.error("Save Invoice Error:", e); alert("Error saving invoice!"); } finally { printBtn.disabled = false; printBtn.textContent = '🖨️ Print'; }
}

function replaceWithDiv(input) { 
    const div = document.createElement('div'); 
    div.className = input.className + ' print-replacement'; 
    let val = input.value || '';
    if (input.id === 'invoiceDate') {
        val = formatDate(val);
    }
    div.textContent = val; 
    return div; 
}
function sanitizePrintFilename(name) {
    return String(name || '').replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, ' ').trim() || 'Invoice';
}

function getPrintDocumentTitle() {
    const username = (document.getElementById('usernameDisplay')?.textContent || currentUser || 'User').trim();
    const invoiceNo = (document.getElementById('invoiceNumber')?.value || 'Invoice').trim();
    return sanitizePrintFilename(`${username} & ${invoiceNo}`);
}

function restorePrintDom() {
    const wrapper = document.querySelector('.invoice-wrapper');
    if (wrapper) wrapper.classList.remove('shrink-level-1', 'shrink-level-2', 'shrink-level-3', 'shrink-level-4');
    printReplacements.forEach(i => {
        i.input.style.display = '';
        if (i.rep?.parentNode) i.rep.parentNode.removeChild(i.rep);
    });
    printReplacements = [];
    if (savedPageTitle !== null) {
        document.title = savedPageTitle;
        savedPageTitle = null;
    }
}

function beforePrint() { 
    if (isPrintPrepared) return;
    isPrintPrepared = true;
    savedPageTitle = document.title;
    document.title = getPrintDocumentTitle();

    const rowCount = document.querySelectorAll('#invoiceBody tr').length;
    const wrapper = document.querySelector('.invoice-wrapper');
    wrapper.classList.remove('shrink-level-1', 'shrink-level-2', 'shrink-level-3', 'shrink-level-4');
    
    if (rowCount > 40) wrapper.classList.add('shrink-level-4');
    else if (rowCount > 30) wrapper.classList.add('shrink-level-3');
    else if (rowCount > 22) wrapper.classList.add('shrink-level-2');
    else if (rowCount > 15) wrapper.classList.add('shrink-level-1');

    const selectors = ['#companyDetails','#invoiceNumber','#phoneField','#billTo','#shipTo','#invoiceNote','.product-name','.qty','.rate','.amount','#invoiceDate']; 
    selectors.forEach(s => { 
        document.querySelectorAll(s).forEach(input => { 
            const rep = replaceWithDiv(input); 
            input.parentNode.insertBefore(rep, input); 
            input.style.display = 'none'; 
            printReplacements.push({input, rep}); 
        }); 
    }); 
}
function afterPrint() { 
    if (!isPrintPrepared) return;
    isPrintPrepared = false;
    if (printCleanupTimer) {
        clearTimeout(printCleanupTimer);
        printCleanupTimer = null;
    }
    restorePrintDom();
    const shouldReload = reloadAfterPrint;
    reloadAfterPrint = false;
    const onDone = printFinishCallback;
    printFinishCallback = null;
    if (onDone) onDone();
    if (shouldReload) location.reload();
}

function scheduleAfterPrintCleanup() {
    let finished = false;
    const finish = () => {
        if (finished) return;
        finished = true;
        afterPrint();
    };

    if (window.matchMedia) {
        const mq = window.matchMedia('print');
        const onPrintEnd = (e) => {
            if (!e.matches) {
                if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', onPrintEnd);
                else if (typeof mq.removeListener === 'function') mq.removeListener(onPrintEnd);
                setTimeout(finish, 200);
            }
        };
        if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onPrintEnd);
        else if (typeof mq.addListener === 'function') mq.addListener(onPrintEnd);
    }

    printCleanupTimer = setTimeout(finish, 5000);
}

function openPrintDialog(onDone) {
    printFinishCallback = onDone || null;
    if (printCleanupTimer) {
        clearTimeout(printCleanupTimer);
        printCleanupTimer = null;
    }
    try {
        beforePrint();
        window.print();
        scheduleAfterPrintCleanup();
    } catch (error) {
        console.error('Print dialog error:', error);
        afterPrint();
        alert('Print dialog খুলতে সমস্যা হয়েছে। মোবাইলে browser share/print option ব্যবহার করুন।');
    }
}

async function deleteInvoiceWithRestore(invoiceId, callback, skipConfirm = false) {
    if (!skipConfirm && !confirm('Are you sure you want to delete this invoice? Stock will be restored and user accounting will be updated.')) return;
    try {
        const invRef = doc(db, "invoices", invoiceId);
        const invSnap = await getDoc(invRef);
        if (!invSnap.exists()) return alert("Invoice not found!");
        const data = invSnap.data();

        const batch = writeBatch(db);
        const stockUpdates = {};

        if (data.items && Array.isArray(data.items)) {
            for (const item of data.items) {
                if (item.productId) {
                    const newQty = (globalStockMap[item.productId] || 0) + (parseFloat(item.qty) || 0);
                    stockUpdates[item.productId] = newQty;
                    globalStockMap[item.productId] = newQty;
                }
            }
            for (const [pid, qty] of Object.entries(stockUpdates)) {
                batch.set(doc(db, "stocks", pid), {
                    productId: pid,
                    quantity: qty,
                    updatedAt: serverTimestamp()
                }, { merge: true });
            }
            persistStockCache();
        }

        if (data.user) {
            const userRef = doc(db, "users", data.user);
            const userUpdates = { invoiceCount: increment(-1) };
            if (data.grandTotal) {
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const currentTotalSales = parseFloat(userSnap.data().totalSales) || 0;
                    const invoiceAmount = parseFloat(data.grandTotal) || 0;
                    userUpdates.totalSales = Math.max(0, currentTotalSales - invoiceAmount);
                }
            }
            batch.update(userRef, userUpdates);
        }

        batch.delete(invRef);
        await batch.commit();

        try { await deleteDoc(doc(db, "deleteRequests", invoiceId)); } catch (_) {}

        const versionTypes = ['salesVersion', 'historyVersion'];
        if (Object.keys(stockUpdates).length) versionTypes.push('stockVersion');
        await incrementVersions(versionTypes);
        invalidateUsersCache();
        if (data.user) {
            localStorage.removeItem(`admin_cache_sales_${data.user}`);
        }
        removeMonitorCacheItem(invoiceId);
        if (data.user) removeSellHistoryCacheItem(data.user, invoiceId);

        alert("Invoice deleted, stock restored, and user accounting updated!");
        if (callback) callback();
    } catch (e) {
        console.error("Delete Error:", e);
        alert("Error deleting invoice!");
    }
}

async function openHistory(isNext = false) {
    if (!db) return; 
    const modal = document.getElementById('historyModal'); 
    const container = document.getElementById('historyListContainer'); 
    modal.style.display = 'flex'; 
    
    if (!isNext) {
        container.innerHTML = 'Loading...';
        historyLastDoc = null;
    }

    try {
        let q = query(
            collection(db, "invoices"), 
            where("user", "==", currentUser), 
            orderBy("timestamp", "desc"), 
            limit(20)
        );
        
        if (isNext && historyLastDoc) {
            q = query(q, startAfter(historyLastDoc));
        }

        const snap = await getDocs(q);
        
        if (snap.empty && !isNext) { 
            container.innerHTML = 'No history found'; 
            return; 
        }

        let tableBody;
        if (!isNext) {
            container.innerHTML = `
                <table id="historyTable">
                    <thead><tr><th>Date</th><th>No.</th><th>Total</th><th>Action</th></tr></thead>
                    <tbody></tbody>
                </table>
                <div id="historyLoadMoreContainer" style="text-align:center; padding: 10px;"></div>
            `;
            tableBody = container.querySelector('tbody');
        } else {
            tableBody = container.querySelector('#historyTable tbody');
        }

        snap.forEach(d => { 
            const e = d.data();
            const json = encodeURIComponent(JSON.stringify({...e, id: d.id})); 
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${e.date}</td>
                <td>${e.invoiceNumber}</td>
                <td>${e.currency}${e.grandTotal}</td>
                <td>
                    <button class="btn btn-primary btn-sm load-inv" data-json="${json}">View</button>
                    ${currentUser === 'admin' ? `<button class="btn btn-danger btn-sm del-inv" data-id="${d.id}">Delete</button>` : ''}
                 </td>
            `;
            tableBody.appendChild(row);
        });

        // Bind events for rows
        tableBody.querySelectorAll('.load-inv').forEach(b => b.onclick = () => loadInvoiceUI(JSON.parse(decodeURIComponent(b.dataset.json))));
        tableBody.querySelectorAll('.del-inv').forEach(b => b.onclick = () => deleteInvoiceWithRestore(b.dataset.id, () => openHistory(false)));

        historyLastDoc = snap.docs[snap.docs.length - 1];
        
        const loadMoreBtnContainer = document.getElementById('historyLoadMoreContainer');
        if (snap.docs.length === 20) {
            loadMoreBtnContainer.innerHTML = '<button class="btn btn-secondary btn-sm" id="loadMoreHistoryBtn">Load More</button>';
            document.getElementById('loadMoreHistoryBtn').onclick = () => openHistory(true);
        } else {
            loadMoreBtnContainer.innerHTML = '';
        }
    } catch (e) { 
        console.error("History Error:", e);
        if (!isNext) container.innerHTML = 'Error loading data.'; 
    }
}

function loadInvoiceUI(e) {
    if (!e) return; 
    document.getElementById('companyDetails').value = e.companyDetails || ''; 
    document.getElementById('invoiceNumber').value = e.invoiceNumber || ''; 
    const dateInput = document.getElementById('invoiceDate');
    dateInput.value = formatDate(e.date) || ''; 
    const d = new Date(e.date);
    if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        dateInput.setAttribute('data-raw', `${yyyy}-${mm}-${dd}`);
    }
    document.getElementById('phoneField').value = e.phone || ''; 
    document.getElementById('billTo').value = e.billTo || ''; 
    document.getElementById('shipTo').value = e.shipTo || ''; 
    document.getElementById('invoiceNote').value = e.note || ''; 
    document.getElementById('currencySelect').value = e.currency || 'BDT'; 
    document.getElementById('discountPercent').value = e.discountPercent || 0;
    const tbody = document.getElementById('invoiceBody'); tbody.innerHTML = '';
    if (e.items && Array.isArray(e.items)) { e.items.forEach(item => { addInvoiceRow(); const row = tbody.lastElementChild; row.querySelector('.product-name').value = item.name || ''; row.querySelector('.qty').value = item.qty || 1; row.querySelector('.rate').value = item.rate || 0; calculateRow(row.querySelector('.rate')); }); }
    document.getElementById('historyModal').style.display = 'none'; document.getElementById('adminModal').style.display = 'none'; autoResize(document.getElementById('companyDetails'));
}

async function showProducts() {
    document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
    document.getElementById('productSection').style.display = 'block';
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '<tr><td colspan="3">Loading...</td></tr>';
    
    // Initialize form with one empty row if it's empty
    resetProductForm();

    await refreshProductList();
    const products = Object.values(globalProductMap);
    tbody.innerHTML = products.map(p => `<tr><td>${p.name}</td><td>BDT ${p.price || 0}</td><td><button class="btn btn-primary btn-sm edit-p" data-id="${p.id}">Edit</button> <button class="btn btn-danger btn-sm del-p" data-id="${p.id}">Del</button></td>`).join('');
    
    tbody.querySelectorAll('.edit-p').forEach(b => b.onclick = () => { 
        const p = globalProductMap[b.dataset.id]; 
        const formBody = document.getElementById('productFormBody');
        formBody.innerHTML = ''; // Clear all rows for edit
        addProductManagementRow(p.name, p.price, p.id);
        document.getElementById('cancelProductEditBtn').style.display = 'inline-block';
        document.getElementById('saveProductsBtn').textContent = 'Update Product';
        document.getElementById('addNewProductRowBtn').style.display = 'none'; // Hide new row btn during single edit
    });

    tbody.querySelectorAll('.del-p').forEach(b => b.onclick = async () => { 
        if (confirm('Delete this product?')) { 
            try { 
                await updateDoc(doc(db, "products", b.dataset.id), { 
                    deleted: true, 
                    updatedAt: serverTimestamp() 
                }); 
                await incrementVersion('productVersion'); 
                await showProducts(); 
            } catch (e) { alert("Error deleting!"); } 
        } 
    });
}

function addProductManagementRow(name = '', price = '', id = '') {
    const tbody = document.getElementById('productFormBody');
    const row = document.createElement('tr');
    row.style.background = "transparent";
    row.innerHTML = `
        <td style="padding: 5px; background: transparent; border: none;"><input type="text" class="p-name" value="${name}" placeholder="Product Name" style="width: 100%; background: #0f172a; color: #f8fafc; border: 1px solid #334155; padding: 8px; border-radius: 6px;"></td>
        <td style="padding: 5px; background: transparent; border: none;"><input type="number" class="p-price" value="${price}" placeholder="0.00" step="0.01" style="width: 100%; background: #0f172a; color: #f8fafc; border: 1px solid #334155; padding: 8px; border-radius: 6px;"></td>
        <td style="text-align: center; padding: 5px; background: transparent; border: none;"><button class="btn btn-danger btn-sm remove-p-row" ${id ? 'disabled' : ''} style="padding: 5px 10px;">✕</button></td>
        <input type="hidden" class="p-id" value="${id}">
    `;
    tbody.appendChild(row);
    row.querySelector('.remove-p-row').onclick = function() { 
        if (tbody.children.length > 1) row.remove(); 
        else alert("At least one row is required!");
    };
}

async function saveProducts() {
    const rows = document.querySelectorAll('#productFormBody tr');
    const saveBtn = document.getElementById('saveProductsBtn');
    const productsToSave = [];
    
    let hasEmptyName = false;
    rows.forEach(row => {
        const name = row.querySelector('.p-name').value.trim();
        const price = parseFloat(row.querySelector('.p-price').value) || 0;
        const id = row.querySelector('.p-id').value;
        if (name) {
            productsToSave.push({ id, name, price });
        } else if (rows.length === 1 || id) {
            hasEmptyName = true;
        }
    });

    if (hasEmptyName && productsToSave.length === 0) return alert("Please enter a product name!");
    if (productsToSave.length === 0) return alert("No products to save!");

    saveBtn.disabled = true; 
    saveBtn.textContent = 'Saving...';
    
    try {
        for (const p of productsToSave) {
            const productData = { 
                name: p.name, 
                price: p.price, 
                updatedAt: serverTimestamp() 
            };
            if (p.id) {
                await updateDoc(doc(db, "products", p.id), productData);
            } else {
                await addDoc(collection(db, "products"), productData);
            }
        }
        
        await incrementVersion('productVersion');
        resetProductForm(); 
        await showProducts(); 
        alert("Saved successfully!");
    } catch (e) { 
        console.error("Save Error:", e);
        alert("Error saving!"); 
    } finally { 
        saveBtn.disabled = false; 
        saveBtn.textContent = 'Update Product List'; 
    }
}

function resetProductForm() { 
    const formBody = document.getElementById('productFormBody');
    formBody.innerHTML = '';
    addProductManagementRow();
    document.getElementById('cancelProductEditBtn').style.display = 'none';
    document.getElementById('saveProductsBtn').textContent = 'Update Product List';
    document.getElementById('addNewProductRowBtn').style.display = 'inline-block';
}

async function exportProductsTxt() {
    try {
        await syncProducts();
        let content = "";
        let count = 0;
        Object.values(globalProductMap).forEach(p => {
            if (p.name && !p.deleted) {
                content += `${p.name}\n${p.price ?? 0}\n\n`;
                count++;
            }
        });
        if (!count) return alert("No products to export.");
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `products_backup_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) { console.error("Export products error:", e); alert("Error exporting!"); }
}

async function importProductsTxt(event) {
    const file = event.target.files[0];
    if (!file) return;
    const status = document.getElementById('productImportStatus');
    status.textContent = '⏳ Importing...';
    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const toImport = parseProductsTxt(e.target.result);
                if (!toImport.length) {
                    status.textContent = '❌ No valid products found. Format: Product Name on one line, Price on next line, blank line between products.';
                    event.target.value = '';
                    return;
                }
                let count = 0;
                for (let i = 0; i < toImport.length; i += 450) {
                    const chunk = toImport.slice(i, i + 450);
                    const batch = writeBatch(db);
                    chunk.forEach(p => {
                        batch.set(doc(collection(db, "products")), {
                            name: p.name,
                            price: p.price,
                            updatedAt: serverTimestamp()
                        });
                    });
                    await batch.commit();
                    count += chunk.length;
                }
                await incrementVersions(['productVersion']);
                await refreshProductList();
                await showProducts();
                status.textContent = `✅ ${count} products imported.`;
                alert(`Imported ${count} products successfully`);
            } catch (err) {
                console.error("Import products error:", err);
                status.textContent = '❌ Error importing!';
                alert("Error importing products!");
            }
            event.target.value = '';
        };
        reader.onerror = () => {
            status.textContent = '❌ Error reading file!';
            event.target.value = '';
        };
        reader.readAsText(file, 'UTF-8');
    } catch (e) {
        status.textContent = '❌ Error importing!';
        event.target.value = '';
    }
}

async function showStock() {
    document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
    document.getElementById('stockSection').style.display = 'block';
    const tbody = document.getElementById('stockTableBody'); tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
    try {
        const stocks = await dbFetchStock();
        const products = Object.values(globalProductMap);
        tbody.innerHTML = products.map(p => `<tr><td>${p.name}</td><td>${stocks[p.id] || 0}</td><td><input type="number" class="st-up" data-id="${p.id}" style="width:80px"></td><td><button class="btn btn-primary btn-sm up-btn">Update</button></td>`).join('');
        tbody.querySelectorAll('.up-btn').forEach(b => b.onclick = async () => { 
            const input = b.closest('tr').querySelector('.st-up'); 
            const val = parseFloat(input.value) || 0; 
            if (val !== 0) { 
                const pid = input.dataset.id; 
                const newQty = (stocks[pid] || 0) + val;
                await dbUpdateStock({[pid]: newQty}); 
                globalStockMap[pid] = newQty; // Update local map immediately for UI
                await showStock(); 
            } 
        });
    } catch(e) { tbody.innerHTML = '<tr><td colspan="4">Error occurred</td></tr>'; }
}

async function showAllUserDetails() {
    document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
    document.querySelectorAll('#adminModal .admin-modal-content > .admin-tab-container .admin-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('allUserDetailsTabBtn').classList.add('active');
    document.getElementById('allUserDetailsSection').style.display = 'block';
    document.getElementById('userListSubSection').style.display = 'block';
    document.getElementById('singleUserDetailSubSection').style.display = 'none';
    
    const tbody = document.getElementById('allUsersDetailTableBody');
    tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
    
    try {
        const users = await getWithCache('ADMIN_USERS', async () => {
            const snap = await getDocs(collection(db, "users"));
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }, ADMIN_USERS_CACHE);
        tbody.innerHTML = users.map(u => {
            const totalSales = parseFloat(u.totalSales) || 0;
            const totalPaid = parseFloat(u.totalPaid) || 0;
            const due = totalSales - totalPaid;
            return `<tr>
                <td>${u.id}</td>
                <td>BDT ${totalSales.toFixed(2)}</td>
                <td style="color: ${due > 0 ? '#f87171' : '#4ade80'}">BDT ${due.toFixed(2)}</td>
                <td><button class="btn btn-primary btn-sm view-user-detail" data-id="${u.id}">View Details</button></td>
            </tr>`;
        }).join('');
        
        tbody.querySelectorAll('.view-user-detail').forEach(b => {
            b.onclick = () => openUserDetailView(b.dataset.id);
        });
    } catch (e) { tbody.innerHTML = '<tr><td colspan="4">Error loading users.</td></tr>'; }
}

async function openUserDetailView(userId) {
    currentDetailUserId = userId;
    document.getElementById('userListSubSection').style.display = 'none';
    document.getElementById('singleUserDetailSubSection').style.display = 'block';
    document.getElementById('detailViewUserName').textContent = `👤 User: ${userId}`;
    
    // Switch to default sub-tab
    document.querySelectorAll('.sub-admin-section').forEach(s => s.style.display = 'none');
    document.getElementById('subSectionShopInfo').style.display = 'block';
    document.querySelectorAll('#singleUserDetailSubSection .admin-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('subTabShopInfo').classList.add('active');
    
    loadUserShopInfo(userId);
}

async function loadUserShopInfo(userId) {
    const tbody = document.getElementById('userShopInfoTableBody');
    tbody.innerHTML = '<table><td colspan="3">Loading...</td></tr>';
    
    try {
        // Check admin local cache first to save reads
        const cacheKey = `admin_cache_customers_${userId}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            renderShopInfo(JSON.parse(cached));

            // Check if version changed and do incremental sync
            if (await customerVersionChanged()) {
                const changed = await syncUserCustomersIncremental(userId);
                await syncLocalCustomerVersionFromServer();
                if (changed) {
                    const refreshed = JSON.parse(localStorage.getItem(cacheKey) || '[]');
                    renderShopInfo(refreshed);
                }
            }
            return;
        }
        
        await fetchUserShopInfoFromServer(userId, cacheKey);
        await syncLocalCustomerVersionFromServer();
    } catch (e) { tbody.innerHTML = '<td><td colspan="3">Error.</td></tr>'; }
}

async function fetchUserShopInfoFromServer(userId, cacheKey) {
    const q = query(collection(db, "customers"), where("user", "==", userId));
    const snap = await getDocs(q);
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    localStorage.setItem(cacheKey, JSON.stringify(data));
    renderShopInfo(data);
}

function renderShopInfo(data) {
    const tbody = document.getElementById('userShopInfoTableBody');
    if (data.length === 0) { tbody.innerHTML = '<tr><td colspan="4">No shop info found.</td></tr>'; return; }
    tbody.innerHTML = data.map(c => `
        <tr>
            <td>${c.billTo}</td>
            <td>${c.shipTo || ''}</td>
            <td>${c.phone || ''}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-customer-btn" data-id="${c.id}">Delete</button>
            </td>
        </tr>
    `).join('');
    
    // Bind delete buttons
    tbody.querySelectorAll('.delete-customer-btn').forEach(btn => {
        btn.onclick = () => deleteCustomer(btn.dataset.id);
    });
}

async function deleteCustomer(docId) {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
        await deleteDoc(doc(db, "customers", docId));
        await incrementVersion('customerVersion');
        // Invalidate cache and refresh
        const cacheKey = `admin_cache_customers_${currentDetailUserId}`;
        localStorage.removeItem(cacheKey);
        await loadUserShopInfo(currentDetailUserId);
        alert('Customer deleted successfully!');
    } catch (e) {
        console.error('Error deleting customer:', e);
        alert('Error deleting customer!');
    }
}

async function deleteAllCustomers() {
    if (!confirm('Are you sure you want to delete ALL customers for this user? This cannot be undone!')) return;
    try {
        const q = query(collection(db, "customers"), where("user", "==", currentDetailUserId));
        const snap = await getDocs(q);
        const batch = writeBatch(db);
        snap.docs.forEach(d => {
            batch.delete(doc(db, "customers", d.id));
        });
        await batch.commit();
        await incrementVersion('customerVersion');
        // Invalidate cache and refresh
        const cacheKey = `admin_cache_customers_${currentDetailUserId}`;
        localStorage.removeItem(cacheKey);
        await loadUserShopInfo(currentDetailUserId);
        alert('All customers deleted successfully!');
    } catch (e) {
        console.error('Error deleting all customers:', e);
        alert('Error deleting all customers!');
    }
}

async function loadUserSalesHistory(userId, forceRefresh = false, isLoadMore = false) {
    const tbody = document.getElementById('userSalesHistoryTableBody');
    if (!isLoadMore) {
        tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
        userSalesHistoryLastDoc = null;
        userSalesHistoryCache = [];
        userSalesHistoryHasMore = false;
    }
    
    try {
        if (!isLoadMore) {
            const cacheKey = `admin_cache_sales_${userId}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached && !forceRefresh) {
                const parsed = JSON.parse(cached);
                userSalesHistoryCache = sortSellHistoryCache(parsed);
                renderUserSalesHistory(userSalesHistoryCache.slice(0, USER_SALES_HISTORY_INITIAL_PAGE_SIZE), false);
                userSalesHistoryHasMore = userSalesHistoryCache.length > USER_SALES_HISTORY_INITIAL_PAGE_SIZE;
                updateUserSalesHistoryLoadMoreButton();

                // Check if versions changed and do incremental sync
                if (await monitorSalesVersionsChanged()) {
                    const changed = await syncUserSalesIncremental(userId);
                    await syncLocalMonitorVersionsFromServer();
                    if (changed) {
                        const refreshed = JSON.parse(localStorage.getItem(cacheKey) || '[]');
                        userSalesHistoryCache = sortSellHistoryCache(refreshed);
                        renderUserSalesHistory(userSalesHistoryCache.slice(0, USER_SALES_HISTORY_INITIAL_PAGE_SIZE), false);
                        userSalesHistoryHasMore = userSalesHistoryCache.length > USER_SALES_HISTORY_INITIAL_PAGE_SIZE;
                        updateUserSalesHistoryLoadMoreButton();
                    }
                }
                return;
            }
        }
        await fetchUserSalesFromServer(userId, isLoadMore);
        if (!isLoadMore) {
            // Save local versions after first load
            await syncLocalMonitorVersionsFromServer();
        }
    } catch (e) { 
        if (!isLoadMore) {
            tbody.innerHTML = '<tr><td colspan="4">Error.</td></tr>'; 
        }
    }
}

async function fetchUserSalesFromServer(userId, isLoadMore = false) {
    const cacheKey = `admin_cache_sales_${userId}`;
    try {
        const pageSize = isLoadMore ? USER_SALES_HISTORY_LOAD_MORE_SIZE : USER_SALES_HISTORY_INITIAL_PAGE_SIZE;
        let q = query(collection(db, "invoices"), where("user", "==", userId), orderBy("timestamp", "desc"), limit(pageSize));
        if (isLoadMore && userSalesHistoryLastDoc) {
            q = query(q, startAfter(userSalesHistoryLastDoc));
        }
        
        let snap;
        try {
            snap = await getDocs(q);
        } catch (err) {
            console.warn("OrderBy failed, falling back:", err);
            q = query(collection(db, "invoices"), where("user", "==", userId), limit(pageSize));
            if (isLoadMore && userSalesHistoryLastDoc) {
                q = query(q, startAfter(userSalesHistoryLastDoc));
            }
            snap = await getDocs(q);
        }
        
        const newData = snap.docs.map(d => ({...d.data(), id: d.id}));
        const sortedNewData = sortSellHistoryCache(newData);
        
        if (isLoadMore) {
            userSalesHistoryCache = [...userSalesHistoryCache, ...sortedNewData];
            renderUserSalesHistory(sortedNewData, true);
        } else {
            userSalesHistoryCache = sortedNewData;
            localStorage.setItem(cacheKey, JSON.stringify(userSalesHistoryCache));
            renderUserSalesHistory(sortedNewData, false);
        }
        
        userSalesHistoryLastDoc = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;
        userSalesHistoryHasMore = snap.docs.length === pageSize;
        updateUserSalesHistoryLoadMoreButton();
    } catch (e) {
        console.error("Fetch Sales History Error:", e);
        if (!isLoadMore) {
            document.getElementById('userSalesHistoryTableBody').innerHTML = '<tr><td colspan="4">Error fetching data.</td></tr>';
        }
    }
}

function updateUserSalesHistoryLoadMoreButton() {
    const container = document.getElementById('userSalesHistoryLoadMoreContainer');
    if (!container) return;
    if (userSalesHistoryHasMore) {
        container.innerHTML = '<button class="btn btn-secondary btn-sm" id="loadMoreUserSalesHistoryBtn">Load More</button>';
        document.getElementById('loadMoreUserSalesHistoryBtn').onclick = () => loadUserSalesHistory(currentDetailUserId, false, true);
    } else {
        container.innerHTML = '';
    }
}

function renderUserSalesHistory(data, append = false) {
    const tbody = document.getElementById('userSalesHistoryTableBody');
    if (!tbody) return;
    
    if (data.length === 0 && !append) { 
        tbody.innerHTML = '<tr><td colspan="4">No history.</td></tr>'; 
        return; 
    }
    
    const rowsHtml = data.map(e => {
        const json = encodeURIComponent(JSON.stringify(e));
        return `<tr>
            <td>${formatDateTimeBD(e)}</td>
            <td>${e.invoiceNumber}</td>
            <td>${e.currency}${e.grandTotal}</td>
            <td>
                <button class="btn btn-primary btn-sm view-inv-sub" data-json="${json}">View</button>
                <button class="btn btn-success btn-sm print-inv-sub" data-json="${json}">🖨️ Print</button>
                <button class="btn btn-danger btn-sm del-inv-sub" data-id="${e.id}">Del</button>
            </td>
        </tr>`;
    }).join('');
    
    if (append) {
        tbody.insertAdjacentHTML('beforeend', rowsHtml);
    } else {
        tbody.innerHTML = rowsHtml;
    }
    
    // Bind actions to all buttons (in case of append, we need to re-bind or just bind the new ones - here we re-bind all for simplicity)
    tbody.querySelectorAll('.view-inv-sub').forEach(b => b.onclick = () => loadInvoiceUI(JSON.parse(decodeURIComponent(b.dataset.json))));
    tbody.querySelectorAll('.print-inv-sub').forEach(b => b.onclick = () => directPrintInvoice(JSON.parse(decodeURIComponent(b.dataset.json))));
    tbody.querySelectorAll('.del-inv-sub').forEach(b => b.onclick = () => deleteInvoiceWithRestore(b.dataset.id, () => loadUserSalesHistory(currentDetailUserId, true)));
}

function ensureMonitorLoadMoreContainer() {
    const tbody = document.getElementById('monitorTableBody');
    if (!tbody || document.getElementById('monitorLoadMoreContainer')) return;
    const container = document.createElement('div');
    container.id = 'monitorLoadMoreContainer';
    container.style.textAlign = 'center';
    container.style.padding = '10px';
    tbody.closest('table').after(container);
}

function buildMonitorRowHtml(e) {
    const json = encodeURIComponent(JSON.stringify(e));
    return `<tr style="height: 60px;">
        <td>${e.user || 'Unknown'}</td>
        <td>${formatDateTimeBD(e)}</td>
        <td>${e.invoiceNumber || ''}</td>
        <td>${e.currency || ''}${e.grandTotal || '0'}</td>
        <td>
            <button class="btn btn-primary btn-sm view-inv" data-json="${json}">View</button>
            <button class="btn btn-success btn-sm print-inv-admin" data-json="${json}">🖨️ Print</button>
            <button class="btn btn-danger btn-sm del-inv-admin" data-id="${e.id}">Delete</button>
        </td>
    </tr>`;
}

function bindMonitorRowActions(tbody) {
    tbody.querySelectorAll('.view-inv').forEach(b => b.onclick = () => loadInvoiceUI(JSON.parse(decodeURIComponent(b.dataset.json))));
    tbody.querySelectorAll('.print-inv-admin').forEach(b => b.onclick = () => directPrintInvoice(JSON.parse(decodeURIComponent(b.dataset.json))));
    tbody.querySelectorAll('.del-inv-admin').forEach(b => b.onclick = () => deleteInvoiceWithRestore(b.dataset.id, () => {
        removeMonitorCacheItem(b.dataset.id);
        showMonitor(false);
    }));
}

function renderMonitorTable(items, append = false) {
    const tbody = document.getElementById('monitorTableBody');
    if (!tbody) return;

    if (items.length === 0 && !append) {
        tbody.innerHTML = '<tr><td colspan="5">No data found</td></tr>';
        return;
    }

    const rowsHtml = items.map(buildMonitorRowHtml).join('');
    if (append) tbody.insertAdjacentHTML('beforeend', rowsHtml);
    else tbody.innerHTML = rowsHtml;
    bindMonitorRowActions(tbody);
}

function updateMonitorLoadMoreButton(hasMore) {
    const loadMoreBtnContainer = document.getElementById('monitorLoadMoreContainer');
    if (!loadMoreBtnContainer) return;
    if (hasMore) {
        loadMoreBtnContainer.innerHTML = '<button class="btn btn-secondary btn-sm" id="loadMoreMonitorBtn">Load More</button>';
        document.getElementById('loadMoreMonitorBtn').onclick = () => showMonitor(true);
    } else {
        loadMoreBtnContainer.innerHTML = '';
    }
}

async function fetchMonitorPageFromServer(isNext = false) {
    const cache = loadMonitorCache();
    let q = query(collection(db, "invoices"), orderBy("updatedAt", "desc"), limit(MONITOR_PAGE_SIZE));

    if (monitorLastDoc) {
        q = query(q, startAfter(monitorLastDoc));
    } else if (cache.length > 0) {
        const oldestCached = cache[cache.length - 1];
        if (oldestCached?.updatedAt?.toMillis) {
            q = query(q, startAfter(oldestCached.updatedAt));
        } else if (oldestCached?.updatedAt?.seconds != null) {
            q = query(q, startAfter(new Timestamp(oldestCached.updatedAt.seconds, oldestCached.updatedAt.nanoseconds || 0)));
        }
    }

    let snap;
    try {
        snap = await getDocs(q);
    } catch (err) {
        console.warn("OrderBy updatedAt failed, trying without orderBy:", err);
        q = query(collection(db, "invoices"), limit(MONITOR_PAGE_SIZE));
        if (monitorLastDoc) q = query(q, startAfter(monitorLastDoc));
        snap = await getDocs(q);
    }

    if (snap.empty && !isNext && monitorDisplayedCount === 0) {
        renderMonitorTable([]);
        updateMonitorLoadMoreButton(false);
        return;
    }

    if (snap.empty) {
        updateMonitorLoadMoreButton(false);
        return;
    }

    const pageItems = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderMonitorTable(pageItems, isNext || monitorDisplayedCount > 0);
    monitorDisplayedCount += pageItems.length;
    monitorLastDoc = snap.docs[snap.docs.length - 1];
    updateMonitorLoadMoreButton(snap.docs.length === MONITOR_PAGE_SIZE);
}

async function showMonitor(isNext = false, forceRefresh = false) {
    document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
    const section = document.getElementById('monitorSection');
    if (section) section.style.display = 'block';

    const tbody = document.getElementById('monitorTableBody');
    if (!tbody) return;

    ensureMonitorLoadMoreContainer();

    if (forceRefresh) {
        invalidateMonitorCache();
        isNext = false;
    }

    if (!isNext) {
        monitorLastDoc = null;
        monitorServerMode = false;
        document.getElementById('monitorLoadMoreContainer').innerHTML = '';

        const cache = loadMonitorCache();
        if (cache.length > 0 && !forceRefresh) {
            monitorDisplayedCount = Math.min(cache.length, MONITOR_PAGE_SIZE);
            renderMonitorTable(cache.slice(0, monitorDisplayedCount));
            updateMonitorLoadMoreButton(monitorHasMoreToLoad(cache));

            if (await monitorSalesVersionsChanged()) {
                const changed = await syncMonitorIncremental();
                await syncLocalMonitorVersionsFromServer();
                if (changed) {
                    const refreshed = loadMonitorCache();
                    monitorDisplayedCount = Math.min(refreshed.length, monitorDisplayedCount || MONITOR_PAGE_SIZE);
                    renderMonitorTable(refreshed.slice(0, monitorDisplayedCount));
                }
                updateMonitorLoadMoreButton(monitorHasMoreToLoad(loadMonitorCache()));
            }
            return;
        }

        tbody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';

        try {
            if (await monitorSalesVersionsChanged()) {
                await syncMonitorIncremental();
                await syncLocalMonitorVersionsFromServer();
                const syncedCache = loadMonitorCache();
                if (syncedCache.length > 0) {
                    monitorDisplayedCount = Math.min(syncedCache.length, MONITOR_PAGE_SIZE);
                    renderMonitorTable(syncedCache.slice(0, monitorDisplayedCount));
                    updateMonitorLoadMoreButton(monitorHasMoreToLoad(syncedCache));
                    return;
                }
            }

            monitorServerMode = true;
            monitorDisplayedCount = 0;
            await fetchMonitorPageFromServer(false);
        } catch (e) {
            console.error("Monitor Error:", e);
            tbody.innerHTML = '<tr><td colspan="5">Error loading data. Check console.</td></tr>';
        }
        return;
    }

    try {
        const cache = loadMonitorCache();
        if (!monitorServerMode && monitorDisplayedCount < cache.length) {
            const nextBatch = cache.slice(monitorDisplayedCount, monitorDisplayedCount + MONITOR_PAGE_SIZE);
            monitorDisplayedCount += nextBatch.length;
            renderMonitorTable(nextBatch, true);
            if (monitorDisplayedCount >= cache.length && cache.length >= MONITOR_CACHE_MAX) {
                monitorServerMode = true;
            }
            updateMonitorLoadMoreButton(monitorServerMode ? true : monitorHasMoreToLoad(cache));
            return;
        }

        monitorServerMode = true;
        await fetchMonitorPageFromServer(true);
    } catch (e) {
        console.error("Monitor Error:", e);
    }
}

async function showUsers() {
    document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
    document.getElementById('userSection').style.display = 'block';
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '<tr><td colspan="3">Loading...</td></tr>';
    try {
        const users = await getWithCache('ADMIN_USERS', async () => {
            const snap = await getDocs(collection(db, "users"));
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }, ADMIN_USERS_CACHE);
        tbody.innerHTML = users.map(u => {
            return `<tr><td>${u.id}</td><td>${u.password}</td><td>${u.id !== 'admin' ? `<button class="btn btn-danger btn-sm del-user" data-id="${u.id}">Delete</button>` : 'System'}</td>`;
        }).join('');
        tbody.querySelectorAll('.del-user').forEach(b => b.onclick = async () => {
            if (confirm('Delete this user?')) {
                try {
                    await deleteDoc(doc(db, "users", b.dataset.id));
                    invalidateUsersCache();
                    showUsers();
                } catch (err) { alert("Error deleting!"); }
            }
        });
    } catch (e) { tbody.innerHTML = '<tr><td colspan="3">Error occurred</td></tr>'; }
}

function showBackup() {
    document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
    document.getElementById('backupSection').style.display = 'block';
    document.getElementById('backupStatus').textContent = '';
}

function updateStorageMonitor() {
    if (currentUser !== 'admin') return;

    const grid = document.getElementById('storageDetailsGrid');
    const details = document.getElementById('storageKeyDetails');
    if (!grid) return;

    const categories = {};
    let totalBytes = 0;
    const allEntries = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const val = localStorage.getItem(key) || '';
        const size = getStorageByteSize(key, val);
        totalBytes += size;
        const entry = { key, size, count: getCacheItemCount(key, val), storage: 'localStorage' };
        allEntries.push(entry);
        const cat = categorizeStorageKey(key);
        if (!categories[cat]) categories[cat] = { size: 0, count: 0, keys: 0 };
        categories[cat].size += size;
        categories[cat].count += entry.count;
        categories[cat].keys += 1;
    }

    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (!key) continue;
        const val = sessionStorage.getItem(key) || '';
        const size = getStorageByteSize(key, val);
        totalBytes += size;
        const entry = { key, size, count: getCacheItemCount(key, val), storage: 'sessionStorage' };
        allEntries.push(entry);
        const cat = categorizeStorageKey(key);
        if (!categories[cat]) categories[cat] = { size: 0, count: 0, keys: 0 };
        categories[cat].size += size;
        categories[cat].count += entry.count;
        categories[cat].keys += 1;
    }

    const sortedCats = Object.entries(categories).sort((a, b) => b[1].size - a[1].size);
    grid.innerHTML = sortedCats.map(([name, data]) => {
        const sizeKB = (data.size / 1024).toFixed(2);
        const countLabel = data.count > 0 ? `${data.count} items` : `${data.keys} key${data.keys !== 1 ? 's' : ''}`;
        return `
            <div class="storage-category-card">
                <div class="storage-category-name">${name}</div>
                <div class="storage-category-size">${sizeKB} KB</div>
                <div class="storage-category-meta">${countLabel}</div>
            </div>
        `;
    }).join('') || '<div class="storage-category-card"><div class="storage-category-name">No cached data</div></div>';

    if (details) {
        const sortedEntries = [...allEntries].sort((a, b) => b.size - a.size);
        details.innerHTML = `
            <div class="storage-key-details-title">All cached keys (${sortedEntries.length})</div>
            <div class="storage-key-details-list">
                ${sortedEntries.map(e => `
                    <div class="storage-key-row">
                        <span class="storage-key-name" title="${e.key}">${e.key}</span>
                        <span class="storage-key-meta">${e.storage} · ${(e.size / 1024).toFixed(2)} KB${e.count ? ` · ${e.count} items` : ''}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
    const totalEl = document.getElementById('totalStorageUsage');
    if (totalEl) totalEl.textContent = `${totalMB} MB / 5.00 MB (${allEntries.length} keys)`;
}

async function remoteClearCache(userId) {
    if (!confirm(`Clear local storage for user: ${userId}? User will be forced to re-sync data.`)) return;
    const status = document.getElementById('remoteCacheStatus');
    status.textContent = '⏳ Sending clear command...';
    try {
        await updateDoc(doc(db, "users", userId), { forceClearCache: Date.now() });
        
        localStorage.removeItem(`admin_cache_customers_${userId}`);
        localStorage.removeItem(`admin_cache_sales_${userId}`);
        invalidateMonitorCache();

        status.textContent = '✅ Clear command sent & admin caches cleared!';
    } catch (e) { status.textContent = '❌ Error sending command.'; }
}

async function remoteRestoreCache(userId) {
    if (!confirm(`Force full sync for user: ${userId}? All saved customer, product and stock data will be re-downloaded to their device on next visit.`)) return;
    const status = document.getElementById('remoteCacheStatus');
    status.textContent = '⏳ Sending restore command...';
    try {
        await incrementVersions(['customerVersion', 'productVersion', 'stockVersion']);
        await updateDoc(doc(db, "users", userId), { forceClearCache: Date.now() });
        status.textContent = '✅ Restore command sent! User will re-sync all data on next visit.';
    } catch (e) { status.textContent = '❌ Error sending command.'; }
}

async function importUserShopInfo(event, userId) {
    const file = event.target.files[0];
    if (!file) return;
    if (!confirm(`Import shop info for user: ${userId}? This will merge with existing data.`)) return;
    
    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (!Array.isArray(data)) throw new Error("Invalid format");
                
                for (const item of data) {
                    const { id, updatedAt, ...rest } = item;
                    // Force current user ID to the imported data
                    const customerData = {
                        ...rest,
                        user: userId,
                        updatedAt: serverTimestamp()
                    };
                    
                    if (customerData.billTo) {
                        const custId = getCustomerDocId(userId, customerData.billTo);
                        await setDoc(doc(db, "customers", custId), customerData, { merge: true });
                    }
                }
                
                await incrementVersion('customerVersion');
                await updateDoc(doc(db, "users", userId), { forceClearCache: Date.now() });
                
                localStorage.removeItem(`admin_cache_customers_${userId}`);
                alert(`✅ ${data.length} shop records imported for ${userId}!`);
                loadUserShopInfo(userId);
            } catch (err) { alert("❌ Invalid JSON file!"); }
        };
        reader.readAsText(file);
    } catch (e) { alert("❌ Error reading file!"); }
    event.target.value = '';
}

async function downloadUserShopInfo(userId) {
    const cacheKey = `admin_cache_customers_${userId}`;
    const data = JSON.parse(localStorage.getItem(cacheKey) || "[]");
    if (data.length === 0) return alert("No shop info to download.");
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shop_info_${userId}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function createUser() {
    const user = document.getElementById('newRegUsername').value.trim();
    const pass = document.getElementById('newRegPassword').value.trim();
    if (!user || !pass) return alert("Enter username and password!");
    try {
        await setDoc(doc(db, "users", user), {
            password: pass,
            totalSales: 0,
            totalPaid: 0,
            invoiceCount: 0,
            invoiceCounter: 0
        });
        invalidateUsersCache();
        document.getElementById('newRegUsername').value = '';
        document.getElementById('newRegPassword').value = '';
        showUsers();
        alert("New user created successfully!");
    } catch (e) { alert("Error creating user!"); }
}

async function deleteAllSales() {
    if (!confirm('Warning! All invoice data will be permanently deleted. Are you sure?')) return;
    const password = prompt('Enter admin password:');
    if (!password) return;
    try {
        const docSnap = await getDoc(doc(db, "users", "admin"));
        if (docSnap.exists() && String(docSnap.data().password) === String(password)) {
            const snap = await getDocs(collection(db, "invoices"));
            const batchPromises = snap.docs.map(d => deleteDoc(doc(db, "invoices", d.id)));
            await Promise.all(batchPromises);
            
            // Reset all users' accounting data
            const userSnap = await getDocs(collection(db, "users"));
            const userBatchPromises = userSnap.docs.map(d => updateDoc(doc(db, "users", d.id), {
                totalSales: 0,
                invoiceCount: 0,
                invoiceCounter: 0,
                forceClearCache: Date.now()
            }));
            await Promise.all(userBatchPromises);
            
            // Also delete all deleteRequests
            const deleteReqSnap = await getDocs(collection(db, "deleteRequests"));
            const deleteReqPromises = deleteReqSnap.docs.map(d => deleteDoc(doc(db, "deleteRequests", d.id)));
            await Promise.all(deleteReqPromises);
            
            await incrementVersions(['salesVersion', 'historyVersion']);
            invalidateUsersCache();
            invalidateMonitorCache();
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const k = localStorage.key(i);
                if (k && k.startsWith('admin_cache_sales_')) localStorage.removeItem(k);
                if (k && k.startsWith('admin_cache_customers_')) localStorage.removeItem(k);
            }
            clearAllAppLocalCaches({ keepAuth: true });
            showMonitor(false, true);
            alert("All sales data deleted!");
        } else alert("Wrong password!");
    } catch (e) { alert("Error deleting!"); }
}

async function forceGlobalSync() {
    if (!db) return alert("Firebase not connected!");
    const btn = document.getElementById('forceGlobalSyncBtn');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = '🔄 Syncing...';
    try {
        const configRef = doc(db, "settings", "appConfig");
        const snap = await getDoc(configRef);
        let versions = { productVersion: 1, stockVersion: 1, salesVersion: 1, historyVersion: 1, customerVersion: 1, settingsVersion: 1 };
        if (snap.exists()) {
            const data = snap.data();
            for (let k in versions) {
                versions[k] = (parseInt(data[k]) || 0) + 1;
            }
        }
        await setDoc(configRef, versions);
        clearAllAppLocalCaches({ keepAuth: true });
        alert("Global sync forced! All users will download fresh data on their next visit.");
        location.reload();
    } catch (e) {
        console.error("Global Sync Error:", e);
        alert("Error forcing global sync!");
    } finally {
        btn.disabled = false;
        btn.textContent = originalText;
    }
}

async function exportAllData() {
    const status = document.getElementById('backupStatus');
    status.textContent = '⏳ Exporting database & local cache...';
    try {
        const backup = {
            metadata: {
                backupDate: new Date().toISOString(),
                exportedBy: currentUser,
                totalDocuments: 0,
                collections: FIRESTORE_BACKUP_COLLECTIONS,
                appVersion: 'v3'
            }
        };
        for (const colName of FIRESTORE_BACKUP_COLLECTIONS) {
            const snap = await getDocs(collection(db, colName));
            backup[colName] = snap.docs.map(d => serializeFirestoreForBackup({ id: d.id, ...d.data() }));
            backup.metadata.totalDocuments += snap.size;
        }
        backup.localBrowserCache = exportBrowserCacheSnapshot();
        backup.metadata.localCacheKeys =
            Object.keys(backup.localBrowserCache.localStorage).length +
            Object.keys(backup.localBrowserCache.sessionStorage).length;

        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `full_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
        status.textContent = `✅ Exported ${backup.metadata.totalDocuments} DB records + ${backup.metadata.localCacheKeys} local cache keys.`;
    } catch (e) {
        console.error('Export error:', e);
        status.textContent = '❌ Error exporting!';
    }
}

async function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!confirm('Warning! This will merge imported data with existing records. Documents with same IDs will be overwritten. Local browser cache from the backup will also be restored. Continue?')) return;
    const status = document.getElementById('backupStatus');
    status.textContent = '⏳ Importing data...';
    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const backup = JSON.parse(e.target.result);
                const backupData = backup.data || backup;
                const hasDbData = FIRESTORE_BACKUP_COLLECTIONS.some(c => Array.isArray(backupData[c]) && backupData[c].length > 0);
                if (!hasDbData && !backupData.localBrowserCache) {
                    throw new Error('Invalid backup file: no database collections or local cache found.');
                }
                let restoredCount = 0;

                for (const colName of FIRESTORE_BACKUP_COLLECTIONS) {
                    if (backupData[colName] && Array.isArray(backupData[colName])) {
                        restoredCount += await restoreBackupCollection(colName, backupData[colName]);
                    }
                }

                clearAllAppLocalCaches({ keepAuth: true });
                if (backupData.localBrowserCache) {
                    importBrowserCacheSnapshot(backupData.localBrowserCache, { skipAuth: true });
                }

                const configRef = doc(db, "settings", "appConfig");
                const snap = await getDoc(configRef);
                if (snap.exists()) {
                    const v = snap.data();
                    await updateDoc(configRef, {
                        productVersion: (v.productVersion || 0) + 1,
                        stockVersion: (v.stockVersion || 0) + 1,
                        salesVersion: (v.salesVersion || 0) + 1,
                        historyVersion: (v.historyVersion || 0) + 1,
                        customerVersion: (v.customerVersion || 0) + 1,
                        settingsVersion: (v.settingsVersion || 0) + 1
                    });
                } else {
                    await ensureAppConfig();
                }

                status.textContent = `✅ Restored ${restoredCount} DB records${backupData.localBrowserCache ? ' + local cache' : ''}.`;
                alert("Restore completed! Page will reload.");
                location.reload();
            } catch (err) {
                status.textContent = '❌ Invalid backup file!';
                console.error(err);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    } catch (e) { status.textContent = '❌ Error importing!'; }
}

async function cleanAllData() {
    const includeProducts = document.getElementById('cleanIncludeProducts').checked;
    const status = document.getElementById('backupStatus');
    document.getElementById('cleanConfirmModal').style.display = 'none';
    status.textContent = '⏳ Deleting database & local cache...';
    try {
        const collections = ["invoices", "customers", "stocks", "settings", "deleteRequests"];
        if (includeProducts) collections.push("products");

        for (const colName of collections) {
            const snap = await getDocs(collection(db, colName));
            const toDelete = snap.docs.filter(d => {
                if (colName === 'settings' && d.id === 'appConfig') return false;
                if (colName === 'settings' && d.id === 'company' && !includeProducts) return false;
                return true;
            });
            const deleteBatchSize = 400;
            for (let i = 0; i < toDelete.length; i += deleteBatchSize) {
                const batch = writeBatch(db);
                toDelete.slice(i, i + deleteBatchSize).forEach(d => batch.delete(doc(db, colName, d.id)));
                await batch.commit();
            }
        }

        const userSnap = await getDocs(collection(db, "users"));
        for (const d of userSnap.docs) {
            if (d.id === 'admin') {
                await updateDoc(doc(db, "users", "admin"), {
                    totalSales: 0,
                    totalPaid: 0,
                    invoiceCounter: 0,
                    invoiceCount: 0,
                    forceClearCache: Date.now()
                });
            } else {
                await deleteDoc(doc(db, "users", d.id));
            }
        }

        const configRef = doc(db, "settings", "appConfig");
        const vSnap = await getDoc(configRef);
        if (vSnap.exists()) {
            const v = vSnap.data();
            await updateDoc(configRef, {
                productVersion: (v.productVersion || 0) + 1,
                stockVersion: (v.stockVersion || 0) + 1,
                salesVersion: (v.salesVersion || 0) + 1,
                historyVersion: (v.historyVersion || 0) + 1,
                customerVersion: (v.customerVersion || 0) + 1,
                settingsVersion: (v.settingsVersion || 0) + 1
            });
        } else {
            await ensureAppConfig();
        }

        clearAllAppLocalCaches({ keepAuth: true });
        invalidateUsersCache();

        status.textContent = '✅ Database & all local caches cleaned. (Admin preserved)';
        alert("Clean completed! All sales data removed. Admin user preserved. Page will reload.");
        location.reload();
    } catch (e) {
        console.error("Clean error:", e);
        status.textContent = '❌ Error deleting data!';
    }
}

async function openSellHistory(forceRefresh = false) {
    if (!db) return;
    const modal = document.getElementById('sellHistoryModal');
    const tbody = document.getElementById('sellHistoryBody');
    modal.style.display = 'flex';
    tbody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
    document.getElementById('sellHistoryInvoicesBody').innerHTML = '<tr><td colspan="5">Loading...</td></tr>';

    if (forceRefresh) {
        invalidateUsersCache();
        invalidateSellHistoryCache(currentUser);
    }

    try {
        const usersData = await getWithCache('USERS', async () => {
            const userSnap = await getDocs(collection(db, "users"));
            return userSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        }, 'cachedUsers_v1_1');

        let html = '';
        const targetUsers = (currentUser === 'admin') ? usersData : usersData.filter(u => u.id === currentUser);
        for (const user of targetUsers) {
            const invoiceCount = parseInt(user.invoiceCount, 10) || 0;
            const totalSales = parseFloat(user.totalSales) || 0;
            const totalPaid = parseFloat(user.totalPaid) || 0;
            const dueAmount = totalSales - totalPaid;
            html += `<tr>
                <td>${user.id}</td>
                <td>${invoiceCount}</td>
                <td>BDT ${totalSales.toFixed(2)} ${currentUser === 'admin' ? `<button class="edit-accounting-btn" onclick="window.updateAccountingField('${user.id}', 'totalSales', ${totalSales})">✏️ Edit</button>` : ''}</td>
                <td>BDT ${totalPaid.toFixed(2)} ${currentUser === 'admin' ? `<button class="edit-accounting-btn" onclick="window.updateAccountingField('${user.id}', 'totalPaid', ${totalPaid})">✏️ Edit</button>` : ''}</td>
                <td style="color: ${dueAmount > 0 ? '#f87171' : '#4ade80'}; font-weight: bold;">BDT ${dueAmount.toFixed(2)}</td>
            </tr>`;
        }
        tbody.innerHTML = html || '<tr><td colspan="5">No data found</td></tr>';
    } catch (e) { tbody.innerHTML = '<tr><td colspan="5">Error loading data</td></tr>'; }

    await loadSellHistoryInvoices(false, forceRefresh);
}

async function fetchPendingDeleteRequestIds(userId) {
    const pendingIds = new Set();
    try {
        const snap = await getDocs(query(collection(db, "deleteRequests"), where("status", "==", "pending")));
        snap.forEach(d => {
            if (d.data().user === userId) pendingIds.add(d.id);
        });
    } catch (e) {
        console.warn("Pending delete requests fetch failed:", e);
    }
    return pendingIds;
}

async function loadSellHistoryInvoices(isLoadMore = false, forceRefresh = false) {
    const tbody = document.getElementById('sellHistoryInvoicesBody');
    if (!tbody || !db) return;

    if (!isLoadMore) {
        sellHistoryLastDoc = null;
        document.getElementById('sellHistoryLoadMoreContainer').innerHTML = '';
        if (forceRefresh) invalidateSellHistoryCache(currentUser);
    }

    const pendingIds = await fetchPendingDeleteRequestIds(currentUser);

    if (!isLoadMore && !forceRefresh) {
        const serverVersions = await getServerMonitorVersions();
        const cache = loadSellHistoryCache(currentUser);
        if (cache.items.length > 0 && cache.historyVersion === serverVersions.historyVersion) {
            renderSellHistoryInvoices(cache.items, pendingIds, false);
            updateSellHistoryLoadMoreButton(cache.items.length >= SELL_HISTORY_PAGE_SIZE);
            return;
        }
    }

    if (!isLoadMore) {
        tbody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
    }

    try {
        let q = query(
            collection(db, "invoices"),
            where("user", "==", currentUser),
            orderBy("timestamp", "desc"),
            limit(SELL_HISTORY_PAGE_SIZE)
        );

        if (isLoadMore && sellHistoryLastDoc) {
            q = query(q, startAfter(sellHistoryLastDoc));
        } else if (isLoadMore) {
            const cache = loadSellHistoryCache(currentUser);
            const oldest = cache.items[cache.items.length - 1];
            if (oldest?.timestamp) {
                q = query(q, startAfter(oldest.timestamp));
            }
        }

        let snap;
        try {
            snap = await getDocs(q);
        } catch (err) {
            console.warn("Sell history orderBy failed, falling back:", err);
            q = query(collection(db, "invoices"), where("user", "==", currentUser), limit(SELL_HISTORY_PAGE_SIZE));
            if (isLoadMore && sellHistoryLastDoc) q = query(q, startAfter(sellHistoryLastDoc));
            snap = await getDocs(q);
        }

        if (snap.empty && !isLoadMore) {
            tbody.innerHTML = '<tr><td colspan="5">No invoices found.</td></tr>';
            updateSellHistoryLoadMoreButton(false);
            return;
        }

        if (snap.empty && isLoadMore) {
            updateSellHistoryLoadMoreButton(false);
            return;
        }

        const invoices = snap.docs.map(d => ({ ...d.data(), id: d.id }));

        if (!isLoadMore) {
            const serverVersions = await getServerMonitorVersions();
            saveSellHistoryCache(currentUser, invoices, serverVersions.historyVersion);
            saveLocalMonitorVersions(serverVersions.salesVersion, serverVersions.historyVersion);
            renderSellHistoryInvoices(invoices, pendingIds, false);
        } else {
            renderSellHistoryInvoices(invoices, pendingIds, true);
        }

        sellHistoryLastDoc = snap.docs[snap.docs.length - 1];
        updateSellHistoryLoadMoreButton(snap.docs.length === SELL_HISTORY_PAGE_SIZE);
    } catch (e) {
        console.error("Sell History Invoices Error:", e);
        if (!isLoadMore) tbody.innerHTML = '<tr><td colspan="5">Error loading invoices.</td></tr>';
    }
}

function buildSellHistoryRowHtml(e, pendingIds) {
    const json = encodeURIComponent(JSON.stringify(e));
    const isPending = pendingIds.has(e.id);
    const statusHtml = isPending
        ? '<span class="invoice-status-pending">Pending</span>'
        : '<span class="invoice-status-active">Active</span>';
    const deleteBtn = isPending
        ? '<button class="btn btn-secondary btn-sm" disabled>Pending</button>'
        : `<button class="btn btn-danger btn-sm del-inv-user" data-id="${e.id}">Delete</button>`;
    return `<tr>
        <td>${e.date || ''}</td>
        <td>${e.invoiceNumber || ''}</td>
        <td>${e.currency || ''}${e.grandTotal || '0'}</td>
        <td>${statusHtml}</td>
        <td>
            <button class="btn btn-primary btn-sm view-inv-user" data-json="${json}">View</button>
            ${deleteBtn}
        </td>
    </tr>`;
}

function bindSellHistoryRowActions(rows) {
    rows.forEach(row => {
        row.querySelectorAll('.view-inv-user').forEach(b => {
            b.onclick = () => {
                loadInvoiceUI(JSON.parse(decodeURIComponent(b.dataset.json)));
                document.getElementById('sellHistoryModal').style.display = 'none';
            };
        });
        row.querySelectorAll('.del-inv-user').forEach(b => {
            b.onclick = () => requestInvoiceDelete(b.dataset.id);
        });
    });
}

function renderSellHistoryInvoices(data, pendingIds, append = false) {
    const tbody = document.getElementById('sellHistoryInvoicesBody');
    if (!data.length && !append) {
        tbody.innerHTML = '<tr><td colspan="5">No invoices found.</td></tr>';
        return;
    }
    const rowsHtml = data.map(e => buildSellHistoryRowHtml(e, pendingIds)).join('');
    if (append) {
        const beforeCount = tbody.querySelectorAll('tr').length;
        tbody.insertAdjacentHTML('beforeend', rowsHtml);
        const newRows = [...tbody.querySelectorAll('tr')].slice(beforeCount);
        bindSellHistoryRowActions(newRows);
    } else {
        tbody.innerHTML = rowsHtml;
        bindSellHistoryRowActions([...tbody.querySelectorAll('tr')]);
    }
}

async function refreshSellHistoryPendingState() {
    const pendingIds = await fetchPendingDeleteRequestIds(currentUser);
    document.querySelectorAll('#sellHistoryInvoicesBody tr').forEach(row => {
        const delBtn = row.querySelector('.del-inv-user');
        if (!delBtn) return;
        const invoiceId = delBtn.dataset.id;
        if (!pendingIds.has(invoiceId)) return;
        const statusCell = row.cells[3];
        if (statusCell) statusCell.innerHTML = '<span class="invoice-status-pending">Pending</span>';
        delBtn.outerHTML = '<button class="btn btn-secondary btn-sm" disabled>Pending</button>';
    });
}

async function requestInvoiceDelete(invoiceId) {
    if (!confirm('Are you sure you want to request deletion of this invoice? Admin approval is required.')) return;
    try {
        const existing = await getDoc(doc(db, "deleteRequests", invoiceId));
        if (existing.exists() && existing.data().status === 'pending') {
            return alert('This invoice already has a pending delete request.');
        }
        const invSnap = await getDoc(doc(db, "invoices", invoiceId));
        if (!invSnap.exists()) return alert('Invoice not found!');
        const inv = invSnap.data();
        if (inv.user !== currentUser) return alert('You can only delete your own invoices.');

        await setDoc(doc(db, "deleteRequests", invoiceId), {
            invoiceId,
            user: currentUser,
            invoiceNumber: inv.invoiceNumber || '',
            date: inv.date || '',
            grandTotal: inv.grandTotal || 0,
            currency: inv.currency || '',
            status: 'pending',
            requestedAt: serverTimestamp()
        });
        alert('Delete request submitted! Waiting for admin approval.');
        await refreshSellHistoryPendingState();
    } catch (e) {
        console.error("Delete Request Error:", e);
        alert('Failed to submit delete request.');
    }
}

async function fetchAllPendingDeleteRequests() {
    try {
        const q = query(collection(db, "deleteRequests"), where("status", "==", "pending"));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) {
        console.warn("Fetch pending delete requests failed:", e);
        return [];
    }
}

async function updateDeleteNotificationBadge() {
    const badge = document.getElementById('deleteNotifBadge');
    const btn = document.getElementById('deleteNotifBtn');
    if (!badge || !btn || currentUser !== 'admin') return;
    const requests = await fetchAllPendingDeleteRequests();
    const count = requests.length;
    if (count > 0) {
        badge.textContent = count > 99 ? '99+' : String(count);
        badge.style.display = 'inline-flex';
    } else {
        badge.style.display = 'none';
    }
}

function startDeleteNotifPolling() {
    if (deleteNotifPollInterval) clearInterval(deleteNotifPollInterval);
    if (currentUser !== 'admin') return;
    updateDeleteNotificationBadge();
    deleteNotifPollInterval = setInterval(updateDeleteNotificationBadge, 30000);
}

async function openDeleteNotificationPanel() {
    const modal = document.getElementById('deleteNotifModal');
    const list = document.getElementById('deleteNotifList');
    if (!modal || !list) return;
    modal.style.display = 'flex';
    list.innerHTML = '<p>Loading...</p>';

    const requests = await fetchAllPendingDeleteRequests();
    if (!requests.length) {
        list.innerHTML = '<p class="delete-notif-empty">No pending delete requests.</p>';
        return;
    }

    list.innerHTML = requests.map(r => `
        <div class="delete-notif-item">
            <div class="delete-notif-info">
                <strong>👤 ${r.user}</strong>
                <span>Invoice: ${r.invoiceNumber || 'N/A'}</span>
                <span>Date: ${r.date || ''}</span>
                <span>Amount: ${r.currency || ''}${r.grandTotal || '0'}</span>
            </div>
            <div class="delete-notif-actions">
                <button class="btn btn-success btn-sm approve-del-req" data-id="${r.invoiceId || r.id}">✓ Approve</button>
                <button class="btn btn-danger btn-sm reject-del-req" data-id="${r.invoiceId || r.id}">✗ Reject</button>
            </div>
        </div>
    `).join('');

    list.querySelectorAll('.approve-del-req').forEach(b => b.onclick = () => approveDeleteRequest(b.dataset.id));
    list.querySelectorAll('.reject-del-req').forEach(b => b.onclick = () => rejectDeleteRequest(b.dataset.id));
}

async function approveDeleteRequest(invoiceId) {
    if (!confirm('Approve and permanently delete this invoice? Stock will be restored and user accounting will be updated.')) return;
    await deleteInvoiceWithRestore(invoiceId, async () => {
        await updateDeleteNotificationBadge();
        showMonitor(false, true);
        const requests = await fetchAllPendingDeleteRequests();
        if (requests.length) openDeleteNotificationPanel();
        else document.getElementById('deleteNotifModal').style.display = 'none';
    }, true);
}

async function rejectDeleteRequest(invoiceId) {
    if (!confirm('Reject this delete request? The invoice will remain active.')) return;
    try {
        await deleteDoc(doc(db, "deleteRequests", invoiceId));
        alert('Delete request rejected.');
        updateDeleteNotificationBadge();
        openDeleteNotificationPanel();
    } catch (e) {
        console.error("Reject delete error:", e);
        alert('Failed to reject request.');
    }
}

window.updateAccountingField = async (userId, field, currentVal) => {
    const input = prompt(`Enter new amount (Use + or - to adjust):`, currentVal);
    if (input === null || input.trim() === "") return;
    let amount; const trimmedInput = input.trim();
    if (trimmedInput.startsWith('+')) amount = (parseFloat(currentVal) || 0) + parseFloat(trimmedInput.substring(1));
    else if (trimmedInput.startsWith('-')) amount = (parseFloat(currentVal) || 0) - parseFloat(trimmedInput.substring(1));
    else amount = parseFloat(trimmedInput);
    if (isNaN(amount)) return alert("Enter a valid number!");
    try {
        await updateDoc(doc(db, "users", userId), { [field]: amount });
        invalidateUsersCache();
        alert("Updated successfully!"); openSellHistory();
    } catch (e) { alert("Update failed!"); }
};

async function directPrintInvoice(invoiceData) {
    if (!invoiceData) return;
    const originalUser = document.getElementById('usernameDisplay').textContent;
    try {
        document.getElementById('usernameDisplay').textContent = invoiceData.user || 'Unknown';
        loadInvoiceUI(invoiceData);
        openPrintDialog(() => {
            document.getElementById('usernameDisplay').textContent = originalUser;
        });
    } catch (e) { alert("Print failed!"); document.getElementById('usernameDisplay').textContent = originalUser; }
}

// ==================== DOMAIN LOCK SYSTEM ====================
async function checkDomainAccess() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/2dgameralif/srhealthcare-resource/main/Domain.json');
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const allowedDomains = await response.json();
        const currentHost = window.location.hostname;
        
        if (Array.isArray(allowedDomains)) {
            return allowedDomains.includes(currentHost) || allowedDomains.includes('*');
        }
        return false;
    } catch (error) {
        console.error('Domain lock error:', error);
        return false;  // ব্যর্থ হলেও ব্লক করবে (সুরক্ষিত)
    }
}
// ===========================================================

function initAppEvents() {
    document.getElementById('loginBtn').onclick = performLogin;
    document.getElementById('logoutBtn').onclick = logout;
    document.getElementById('addRowBtn').onclick = addInvoiceRow;
    document.getElementById('btnSaveDefault').onclick = async () => { 
        const companyVal = document.getElementById('companyDetails').value;
        const noteVal = document.getElementById('invoiceNote').value;
        try { 
            await setDoc(doc(db, "settings", "company"), { companyDetails: companyVal, defaultNote: noteVal }); 
            await incrementVersion('settingsVersion');
            alert("Default settings saved!"); 
        }
        catch (e) { alert("Error saving!"); }
    };
    document.getElementById('loginPassword').onkeypress = (e) => { if (e.key === 'Enter') performLogin(); };
    document.getElementById('currencySelect').onchange = calculateGrandTotal;
    document.getElementById('discountPercent').oninput = calculateGrandTotal;
    document.getElementById('printBtn').onclick = printInvoice;
    document.getElementById('sellHistoryBtn').onclick = () => openSellHistory();
    document.getElementById('refreshAccountingBtn').onclick = () => openSellHistory(true);
    document.getElementById('adminPanelBtn').onclick = () => { 
        document.getElementById('adminModal').style.display = 'flex'; 
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('monitorTabBtn').classList.add('active');
        updateDeleteNotificationBadge();
        showMonitor(); 
    };
    document.getElementById('closeSellHistoryBtn').onclick = () => document.getElementById('sellHistoryModal').style.display = 'none';
    document.getElementById('closeAdminBtn').onclick = () => document.getElementById('adminModal').style.display = 'none';
    document.getElementById('productTabBtn').onclick = () => { document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active')); document.getElementById('productTabBtn').classList.add('active'); showProducts(); };
    document.getElementById('allUserDetailsTabBtn').onclick = showAllUserDetails;
    document.getElementById('stockTabBtn').onclick = () => { document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active')); document.getElementById('stockTabBtn').classList.add('active'); showStock(); };
    document.getElementById('monitorTabBtn').onclick = () => { document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active')); document.getElementById('monitorTabBtn').classList.add('active'); showMonitor(); };
    document.getElementById('userTabBtn').onclick = () => { document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active')); document.getElementById('userTabBtn').classList.add('active'); showUsers(); };
    document.getElementById('backupTabBtn').onclick = () => { document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active')); document.getElementById('backupTabBtn').classList.add('active'); showBackup(); };
    
    // --- Sub-tabs in User Details ---
    document.getElementById('subTabShopInfo').onclick = () => {
        document.querySelectorAll('#singleUserDetailSubSection .admin-tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('subTabShopInfo').classList.add('active');
        document.querySelectorAll('.sub-admin-section').forEach(s => s.style.display = 'none');
        document.getElementById('subSectionShopInfo').style.display = 'block';
        loadUserShopInfo(currentDetailUserId);
    };
    document.getElementById('subTabSalesHistory').onclick = () => {
        document.querySelectorAll('#singleUserDetailSubSection .admin-tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('subTabSalesHistory').classList.add('active');
        document.querySelectorAll('.sub-admin-section').forEach(s => s.style.display = 'none');
        document.getElementById('subSectionSalesHistory').style.display = 'block';
        loadUserSalesHistory(currentDetailUserId);
    };
    document.getElementById('subTabCacheControl').onclick = () => {
        document.querySelectorAll('#singleUserDetailSubSection .admin-tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('subTabCacheControl').classList.add('active');
        document.querySelectorAll('.sub-admin-section').forEach(s => s.style.display = 'none');
        document.getElementById('subSectionCacheControl').style.display = 'block';
        document.getElementById('remoteCacheStatus').textContent = '';
    };
    document.getElementById('backToUserListBtn').onclick = showAllUserDetails;
    document.getElementById('remoteClearCacheBtn').onclick = () => remoteClearCache(currentDetailUserId);
    document.getElementById('remoteRestoreCacheBtn').onclick = () => remoteRestoreCache(currentDetailUserId);
    document.getElementById('importUserShopInfoFile').onchange = (e) => importUserShopInfo(e, currentDetailUserId);
    document.getElementById('downloadUserShopInfoBtn').onclick = () => downloadUserShopInfo(currentDetailUserId);
    document.getElementById('refreshUserShopInfoBtn').onclick = () => {
        localStorage.removeItem(`admin_cache_customers_${currentDetailUserId}`);
        loadUserShopInfo(currentDetailUserId);
    };
    document.getElementById('deleteAllCustomersBtn').onclick = deleteAllCustomers;

    document.getElementById('settingsTabBtn').onclick = () => { 
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active')); 
        document.getElementById('settingsTabBtn').classList.add('active'); 
        document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none'); 
        document.getElementById('settingsSection').style.display = 'block'; 
        updateStorageMonitor();
    };
    document.getElementById('clearCacheBtn').onclick = clearLocalStorageCache;
    document.getElementById('forceGlobalSyncBtn').onclick = forceGlobalSync;
    document.getElementById('btnSaveDefaultInSettings').onclick = () => document.getElementById('btnSaveDefault').click();
    document.getElementById('saveProductsBtn').onclick = saveProducts;
    document.getElementById('addNewProductRowBtn').onclick = () => addProductManagementRow();
    document.getElementById('exportProductsTxtBtn').onclick = exportProductsTxt;
    document.getElementById('importProductsTxtFile').onchange = importProductsTxt;
    document.getElementById('createUserBtn').onclick = createUser;
    document.getElementById('deleteAllSalesBtn').onclick = deleteAllSales;
    document.getElementById('refreshMonitorBtn').onclick = () => showMonitor(false, true);
    document.getElementById('deleteNotifBtn').onclick = openDeleteNotificationPanel;
    document.getElementById('closeDeleteNotifBtn').onclick = () => document.getElementById('deleteNotifModal').style.display = 'none';
    document.getElementById('exportDataBtn').onclick = exportAllData;
    document.getElementById('importFile').onchange = importData;
    document.getElementById('openCleanModalBtn').onclick = () => document.getElementById('cleanConfirmModal').style.display = 'flex';
    document.getElementById('closeCleanModalBtn').onclick = () => document.getElementById('cleanConfirmModal').style.display = 'none';
    document.getElementById('confirmFullCleanBtn').onclick = cleanAllData;
    document.getElementById('cancelProductEditBtn').onclick = resetProductForm;
    document.getElementById('productSearchInput').oninput = debounce(filterProducts, 300);
    document.getElementById('billTo').oninput = debounce(function() {
        filterCustomers();
        autoResize(this);
        repositionCustomerSuggestions();
    }, 300);
    initCustomerSuggestionListeners();
    document.getElementById('productSearchPopup').onclick = (e) => { if (e.target.id === 'productSearchPopup') document.getElementById('productSearchPopup').style.display = 'none'; };
    document.addEventListener('pointerdown', (e) => {
        const box = document.getElementById('customerSuggestions');
        const billTo = document.getElementById('billTo');
        if (!box || box.style.display === 'none') return;
        if (billTo.contains(e.target) || box.contains(e.target)) return;
        hideCustomerSuggestions();
    });
    document.getElementById('companyDetails').oninput = function() { autoResize(this); };
    window.onbeforeprint = beforePrint; window.onafterprint = afterPrint;
}

// DOMContentLoaded with Domain Lock
window.addEventListener('DOMContentLoaded', async () => {
    // --- Domain Lock Check (সবার আগে) ---
    const isDomainAllowed = await checkDomainAccess();
    if (!isDomainAllowed) {
        const appDiv = document.getElementById('app');
        if (appDiv) {
            appDiv.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #f1f5f9; font-family: sans-serif;">
                    <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); text-align: center; max-width: 400px;">
                        <h1 style="color: #dc2626; margin-bottom: 0.5rem;">⛔ Hosting Denied</h1>
                        <p style="color: #334155;">This application is not authorized to run on <strong>${window.location.hostname}</strong>.</p>
                        <p style="font-size: 0.875rem; color: #64748b;">Contact <Dev Alif/> 01576429840</p>
                    </div>
                </div>
            `;
        }
        return; // আর কোনো কোড চলবে না
    }

    // --- মূল অ্যাপ্লিকেশন লোড (আগের সব লজিক) ---
    renderApp();
    initAppEvents();
    const sess = sessionStorage.getItem(LOGIN_SESSION_KEY);
    if (sess) { currentUser = sess; showMainApp(); }
    else {
        const rem = localStorage.getItem(REMEMBER_ME_KEY);
        if (rem) { try { const data = JSON.parse(rem); document.getElementById('loginUsername').value = data.username || ''; document.getElementById('loginPassword').value = data.password || ''; document.getElementById('rememberMe').checked = true; } catch(e) {} }
    }
});

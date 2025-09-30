import { 
    collection, 
    doc, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy,
    onSnapshot 
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from './firebase-config.js';

// Global variables
let currentCategory = null;
let clickCount = 0;
let isAdminLoggedIn = false;

// DOM elements
const cafeName = document.getElementById('cafeName');
const welcomeText = document.getElementById('welcomeText');
const categories = document.querySelector('.categories');
const menuItems = document.getElementById('menuItems');
const backBtn = document.getElementById('backBtn');
const categoryTitle = document.getElementById('categoryTitle');
const itemsList = document.getElementById('itemsList');
const loading = document.getElementById('loading');
const adminModal = document.getElementById('adminModal');
const closeAdmin = document.getElementById('closeAdmin');
const adminLogin = document.getElementById('adminLogin');
const adminDashboard = document.getElementById('adminDashboard');
const adminPassword = document.getElementById('adminPassword');
const loginBtn = document.getElementById('loginBtn');
const editCafeName = document.getElementById('editCafeName');
const editWelcomeText = document.getElementById('editWelcomeText');
const saveCafeInfo = document.getElementById('saveCafeInfo');
const categorySelect = document.getElementById('categorySelect');
const menuItemsAdmin = document.getElementById('menuItemsAdmin');
const addMenuItem = document.getElementById('addMenuItem');

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load cafe info
        await loadCafeInfo();
        
        // Load menu items
        await loadMenuItems();
        
        // Setup event listeners
        setupEventListeners();
        
        // Hide loading
        loading.style.display = 'none';
    } catch (error) {
        console.error('Error initializing app:', error);
        loading.innerHTML = '<p>Hata: Menü yüklenemedi</p>';
    }
});

// Setup event listeners
function setupEventListeners() {
    // Cafe name click for admin access
    cafeName.addEventListener('click', handleCafeNameClick);
    
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            showCategoryItems(category);
        });
    });
    
    // Back button
    backBtn.addEventListener('click', () => {
        showCategories();
    });
    
    // Admin modal
    closeAdmin.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });
    
    // Admin login
    loginBtn.addEventListener('click', handleAdminLogin);
    
    // Save cafe info
    saveCafeInfo.addEventListener('click', saveCafeInfoHandler);
    
    // Add menu item
    addMenuItem.addEventListener('click', addMenuItemHandler);
    
    // Category select change
    categorySelect.addEventListener('change', loadAdminMenuItems);
}

// Handle cafe name click for admin access
function handleCafeNameClick() {
    clickCount++;
    cafeName.classList.add('clicked');
    
    setTimeout(() => {
        cafeName.classList.remove('clicked');
    }, 300);
    
    if (clickCount >= 5) {
        adminModal.style.display = 'flex';
        clickCount = 0;
    }
}

// Load cafe information
async function loadCafeInfo() {
    try {
        const cafeDoc = await getDoc(doc(db, 'cafe', 'info'));
        if (cafeDoc.exists()) {
            const data = cafeDoc.data();
            cafeName.textContent = data.name || 'THEE BBUBB CAFE';
            welcomeText.textContent = data.welcomeText || 'Hoşgeldiniz';
        }
    } catch (error) {
        console.error('Error loading cafe info:', error);
    }
}

// Load menu items
async function loadMenuItems() {
    try {
        const menuItemsRef = collection(db, 'menuItems');
        const q = query(menuItemsRef, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        
        // Store menu items globally for easy access
        window.menuItemsData = {};
        snapshot.forEach(doc => {
            const data = doc.data();
            if (!window.menuItemsData[data.category]) {
                window.menuItemsData[data.category] = [];
            }
            window.menuItemsData[data.category].push({
                id: doc.id,
                ...data
            });
        });
    } catch (error) {
        console.error('Error loading menu items:', error);
    }
}

// Show category items
function showCategoryItems(category) {
    currentCategory = category;
    const categoryNames = {
        'hotdrinks': 'SICAK İÇECEKLER',
        'colddrinks': 'SOĞUK İÇECEKLER',
        'foods': 'ANA YEMEKLER',
        'desserts': 'TATLILAR',
        'snacks': 'ATIŞTIRMALIKLAR',
        'hookah': 'NARGİLE'
    };
    
    categoryTitle.textContent = categoryNames[category];
    categories.style.display = 'none';
    menuItems.style.display = 'block';
    
    // Display items
    displayMenuItems(category);
}

// Display menu items
function displayMenuItems(category) {
    const items = window.menuItemsData[category] || [];
    itemsList.innerHTML = '';
    
    if (items.length === 0) {
        itemsList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Bu kategoride henüz ürün bulunmuyor.</p>';
        return;
    }
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
            <div class="item-header">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${item.price}₺</div>
            </div>
            ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
        `;
        itemsList.appendChild(itemElement);
    });
}

// Show categories
function showCategories() {
    categories.style.display = 'block';
    menuItems.style.display = 'none';
    currentCategory = null;
}

// Handle admin login
async function handleAdminLogin() {
    const password = adminPassword.value;
    
    if (password === 'admin123') { // Default password
        isAdminLoggedIn = true;
        adminLogin.style.display = 'none';
        adminDashboard.style.display = 'block';
        
        // Load current cafe info
        editCafeName.value = cafeName.textContent;
        editWelcomeText.value = welcomeText.textContent;
        
        // Load admin menu items
        await loadAdminMenuItems();
    } else {
        alert('Yanlış şifre!');
    }
}

// Save cafe info
async function saveCafeInfoHandler() {
    try {
        const cafeRef = doc(db, 'cafe', 'info');
        await updateDoc(cafeRef, {
            name: editCafeName.value,
            welcomeText: editWelcomeText.value
        });
        
        // Update display
        cafeName.textContent = editCafeName.value;
        welcomeText.textContent = editWelcomeText.value;
        
        alert('Kafe bilgileri güncellendi!');
    } catch (error) {
        console.error('Error saving cafe info:', error);
        alert('Hata: Kafe bilgileri kaydedilemedi');
    }
}

// Load admin menu items
async function loadAdminMenuItems() {
    const category = categorySelect.value;
    const items = window.menuItemsData[category] || [];
    
    menuItemsAdmin.innerHTML = '';
    
    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'admin-menu-item';
        itemElement.innerHTML = `
            <input type="text" value="${item.name}" data-field="name" data-id="${item.id}">
            <input type="text" value="${item.price}" data-field="price" data-id="${item.id}">
            <input type="text" value="${item.description || ''}" data-field="description" data-id="${item.id}">
            <button onclick="deleteMenuItem('${item.id}')">Sil</button>
        `;
        menuItemsAdmin.appendChild(itemElement);
    });
}

// Add menu item
async function addMenuItemHandler() {
    const category = categorySelect.value;
    const name = prompt('Ürün adı:');
    const price = prompt('Fiyat:');
    const description = prompt('Açıklama (opsiyonel):');
    
    if (name && price) {
        try {
            await addDoc(collection(db, 'menuItems'), {
                category: category,
                name: name,
                price: price,
                description: description || '',
                order: (window.menuItemsData[category]?.length || 0) + 1
            });
            
            // Reload menu items
            await loadMenuItems();
            await loadAdminMenuItems();
            
            alert('Ürün eklendi!');
        } catch (error) {
            console.error('Error adding menu item:', error);
            alert('Hata: Ürün eklenemedi');
        }
    }
}

// Delete menu item
async function deleteMenuItem(itemId) {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
        try {
            await deleteDoc(doc(db, 'menuItems', itemId));
            
            // Reload menu items
            await loadMenuItems();
            await loadAdminMenuItems();
            
            alert('Ürün silindi!');
        } catch (error) {
            console.error('Error deleting menu item:', error);
            alert('Hata: Ürün silinemedi');
        }
    }
}

// Make functions globally available
window.deleteMenuItem = deleteMenuItem;

// QR Menu App - Main JavaScript
class QRMenuApp {
    constructor() {
        this.categories = [];
        this.menuItems = [];
        this.cafeInfo = {};
        this.isLoading = true;
        
        this.init();
    }

    async init() {
        try {
            this.showLoading();
            await this.loadData();
            this.renderCategories();
            this.setupEventListeners();
            this.hideLoading();
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError('Menü yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
        }
    }

    async loadData() {
        try {
            // Load cafe info
            const cafeResponse = await fetch('/api/cafe-info');
            if (cafeResponse.ok) {
                this.cafeInfo = await cafeResponse.json();
                this.updateCafeInfo();
            }

            // Load categories
            const categoriesResponse = await fetch('/api/categories');
            if (categoriesResponse.ok) {
                this.categories = await categoriesResponse.json();
            }

            // Load menu items
            const menuResponse = await fetch('/api/menu');
            if (menuResponse.ok) {
                this.menuItems = await menuResponse.json();
            }
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to demo data if API fails
            this.loadDemoData();
        }
    }

    loadDemoData() {
        this.cafeInfo = {
            name: "THEE BBUBB CAFE",
            description: "Hoşgeldiniz",
            instagram: "https://instagram.com/theebbubbcafe"
        };

        this.categories = [
            {
                id: 1,
                name: "SICAK İÇECEKLER",
                description: "Sıcak içeceklerimiz",
                icon: "☕",
                order: 1
            },
            {
                id: 2,
                name: "SOĞUK İÇECEKLER",
                description: "Soğuk içeceklerimiz",
                icon: "🧊",
                order: 2
            },
            {
                id: 3,
                name: "ANA YEMEKLER",
                description: "Ana yemeklerimiz",
                icon: "🍽️",
                order: 3
            },
            {
                id: 4,
                name: "TATLILAR",
                description: "Tatlılarımız",
                icon: "🍰",
                order: 4
            },
            {
                id: 5,
                name: "ATIŞTIRMALIKLAR",
                description: "Atıştırmalıklarımız",
                icon: "🍿",
                order: 5
            },
            {
                id: 6,
                name: "NARGİLE",
                description: "Nargile çeşitlerimiz",
                icon: "🚬",
                order: 6
            }
        ];

        this.menuItems = [
            // Hot Drinks
            { id: 1, category_id: 1, name: "Türk Kahvesi", description: "Geleneksel Türk kahvesi", price: "15₺" },
            { id: 2, category_id: 1, name: "Espresso", description: "İtalyan espresso", price: "12₺" },
            { id: 3, category_id: 1, name: "Americano", description: "Sıcak americano", price: "14₺" },
            { id: 4, category_id: 1, name: "Cappuccino", description: "Kremalı cappuccino", price: "16₺" },
            { id: 5, category_id: 1, name: "Latte", description: "Sütlü latte", price: "18₺" },
            { id: 6, category_id: 1, name: "Mocha", description: "Çikolatalı mocha", price: "20₺" },
            
            // Cold Drinks
            { id: 7, category_id: 2, name: "Soğuk Kahve", description: "Buzlu soğuk kahve", price: "16₺" },
            { id: 8, category_id: 2, name: "Frappé", description: "Yunan frappé", price: "18₺" },
            { id: 9, category_id: 2, name: "Iced Tea", description: "Buzlu çay", price: "12₺" },
            { id: 10, category_id: 2, name: "Limonata", description: "Taze limonata", price: "10₺" },
            { id: 11, category_id: 2, name: "Ayran", description: "Taze ayran", price: "8₺" },
            
            // Main Dishes
            { id: 12, category_id: 3, name: "Mantı", description: "Ev yapımı mantı", price: "35₺" },
            { id: 13, category_id: 3, name: "Lahmacun", description: "İnce hamurlu lahmacun", price: "25₺" },
            { id: 14, category_id: 3, name: "Pide", description: "Çeşitli pide çeşitleri", price: "30₺" },
            { id: 15, category_id: 3, name: "Köfte", description: "Izgara köfte", price: "40₺" },
            { id: 16, category_id: 3, name: "Tavuk Şiş", description: "Marine edilmiş tavuk şiş", price: "45₺" },
            
            // Desserts
            { id: 17, category_id: 4, name: "Baklava", description: "Antep fıstıklı baklava", price: "25₺" },
            { id: 18, category_id: 4, name: "Künefe", description: "Sıcak künefe", price: "30₺" },
            { id: 19, category_id: 4, name: "Sütlaç", description: "Ev yapımı sütlaç", price: "15₺" },
            { id: 20, category_id: 4, name: "Tiramisu", description: "İtalyan tiramisu", price: "28₺" },
            { id: 21, category_id: 4, name: "Cheesecake", description: "New York cheesecake", price: "32₺" },
            
            // Snacks
            { id: 22, category_id: 5, name: "Patates Kızartması", description: "Çıtır patates kızartması", price: "18₺" },
            { id: 23, category_id: 5, name: "Soğan Halkası", description: "Kızarmış soğan halkası", price: "20₺" },
            { id: 24, category_id: 5, name: "Çiğ Börek", description: "Ev yapımı çiğ börek", price: "22₺" },
            { id: 25, category_id: 5, name: "Sigara Böreği", description: "Peynirli sigara böreği", price: "25₺" },
            
            // Hookah
            { id: 26, category_id: 6, name: "Elma Nargile", description: "Elma aromalı nargile", price: "80₺" },
            { id: 27, category_id: 6, name: "Çilek Nargile", description: "Çilek aromalı nargile", price: "80₺" },
            { id: 28, category_id: 6, name: "Mint Nargile", description: "Nane aromalı nargile", price: "80₺" },
            { id: 29, category_id: 6, name: "Karışık Nargile", description: "Karışık meyve aromalı", price: "85₺" }
        ];
    }

    updateCafeInfo() {
        if (this.cafeInfo.name) {
            document.querySelector('.cafe-name').textContent = this.cafeInfo.name;
        }
        if (this.cafeInfo.description) {
            document.querySelector('.welcome-text').textContent = this.cafeInfo.description;
        }
        if (this.cafeInfo.instagram) {
            const instagramLink = document.querySelector('.instagram-link');
            instagramLink.href = this.cafeInfo.instagram;
        }
    }

    renderCategories() {
        const categoriesGrid = document.getElementById('categoriesGrid');
        if (!categoriesGrid) return;

        // Sort categories by order
        const sortedCategories = [...this.categories].sort((a, b) => a.order - b.order);

        categoriesGrid.innerHTML = sortedCategories.map(category => `
            <div class="category-card" data-category-id="${category.id}" tabindex="0" role="button" aria-label="${category.name}">
                <div class="category-icon">${category.icon}</div>
                <h3 class="category-name">${category.name}</h3>
                <p class="category-description">${category.description}</p>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Category click handlers
        document.addEventListener('click', (e) => {
            const categoryCard = e.target.closest('.category-card');
            if (categoryCard) {
                const categoryId = parseInt(categoryCard.dataset.categoryId);
                this.showMenuItems(categoryId);
            }
        });

        // Modal close handlers
        document.addEventListener('click', (e) => {
            if (e.target.id === 'closeModal' || e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Category keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const categoryCard = e.target.closest('.category-card');
                if (categoryCard) {
                    e.preventDefault();
                    const categoryId = parseInt(categoryCard.dataset.categoryId);
                    this.showMenuItems(categoryId);
                }
            }
        });
    }

    showMenuItems(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (!category) return;

        const items = this.menuItems.filter(item => item.category_id === categoryId);
        
        const modal = document.getElementById('menuModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = category.name;
        modalBody.innerHTML = items.length > 0 
            ? items.map(item => `
                <div class="menu-item">
                    <div class="item-info">
                        <h4 class="item-name">${item.name}</h4>
                        <p class="item-description">${item.description}</p>
                    </div>
                    <div class="item-price">${item.price}</div>
                </div>
            `).join('')
            : '<p style="text-align: center; color: #666; padding: 2rem;">Bu kategoride henüz ürün bulunmuyor.</p>';

        modal.classList.add('show');
        modal.style.display = 'flex';
        
        // Focus management for accessibility
        const closeBtn = document.getElementById('closeModal');
        closeBtn.focus();
    }

    closeModal() {
        const modal = document.getElementById('menuModal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }

    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QRMenuApp();
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('App is online');
});

window.addEventListener('offline', () => {
    console.log('App is offline');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

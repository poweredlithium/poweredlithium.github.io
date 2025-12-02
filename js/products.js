// Powered Lithium - Products Page JavaScript
// Handles product listing and search functionality

let allProducts = [];
let searchTerm = '';
let filteredProducts = [];
let currentPage = 1;
const PAGE_SIZE = 6;

// Load products from JSON file
async function loadProductsData() {
    try {
        // Show loading state
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="text-white-50 mt-3">Loading products...</p>
                </div>
            `;
        }

        // Try different paths in case of path issues
        let response = await fetch('data/products.json');
        
        // If that fails, try alternative path
        if (!response.ok) {
            response = await fetch('./data/products.json');
        }
        
        if (!response.ok) {
            throw new Error(`Failed to load products: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validate data structure
        if (!data || !data.products || !Array.isArray(data.products)) {
            throw new Error('Invalid products data format. Expected {products: []}');
        }
        
        allProducts = data.products;
        console.log(`Loaded ${allProducts.length} products`);
        
        return allProducts;
    } catch (error) {
        console.error('Error loading products:', error);
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-danger mb-2">Error loading products</p>
                    <p class="text-white-50">${error.message}</p>
                    <p class="text-white-50 mt-3">Please check:</p>
                    <ul class="text-white-50 text-start" style="display: inline-block;">
                        <li>File path: data/products.json exists</li>
                        <li>Using a web server (not file://)</li>
                        <li>JSON file is valid</li>
                    </ul>
                    <button class="btn btn-success mt-3" onclick="location.reload()">Retry</button>
                </div>
            `;
        }
        return [];
    }
}

// Display products in grid
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }

    if (!products || products.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-white-50">No products found.</p>
                ${searchTerm ? '<p class="text-white-50 mt-2">Try a different search term.</p>' : ''}
            </div>
        `;
        updateProductCount(0);
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-4" id="product-${product.id}">
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/400x300/00ff00/000000?text=${encodeURIComponent(product.name)}'">
                <div class="product-card-body">
                    <h5>${product.name}</h5>
                    <p class="model">Model: ${product.model}</p>
                    <p class="specs">
                        <strong>Voltage:</strong> ${product.voltage}<br>
                        <strong>Capacity:</strong> ${product.capacity}<br>
                        <strong>Type:</strong> ${product.type}<br>
                        <strong>Cycles:</strong> ${product.cycleLife}
                    </p>
                    <p class="price">${product.price}</p>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline-success btn-sm w-100 mb-2">
                        <i class="bi bi-eye me-1"></i>View Details
                    </a>
                    ${product.isCustomizable ? `
                    <a href="product-detail.html?id=${product.id}#customize" class="btn btn-success btn-sm w-100">
                        <i class="bi bi-gear me-1"></i>Customize & Get Quote
                    </a>
                    ` : `
                    <a href="product-detail.html?id=${product.id}" class="btn btn-success btn-sm w-100">
                        <i class="bi bi-cart me-1"></i>View & Purchase
                    </a>
                    `}
                </div>
            </div>
        </div>
    `).join('');

    // Add fade-in animation
    productsGrid.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    updateProductCount(products.length);
}

// Apply search filter and reset pagination
function applyFilters() {
    filteredProducts = [...allProducts];

    if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase().trim();
        filteredProducts = allProducts.filter(product => {
            const searchableText = `
                ${product.name} ${product.model} ${product.voltage} ${product.capacity} 
                ${product.type} ${product.description || ''} ${product.category || ''} 
                ${product.cycleLife}
            `.toLowerCase();
            return searchableText.includes(term);
        });
    }

    currentPage = 1;
    renderCurrentPage();
}

// Render current page of products
function renderCurrentPage() {
    const totalProducts = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

    // Clamp currentPage
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const pageItems = filteredProducts.slice(startIndex, endIndex);

    displayProducts(pageItems);
    renderPagination(totalPages);
}

// Render pagination controls
function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '';

    // Previous button
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link bg-dark text-white border-secondary" data-page="${currentPage - 1}" aria-label="Previous">
                &laquo;
            </button>
        </li>
    `;

    // Page numbers (simple implementation, all pages since count is small)
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <button class="page-link bg-dark text-white border-secondary" data-page="${i}">${i}</button>
            </li>
        `;
    }

    // Next button
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link bg-dark text-white border-secondary" data-page="${currentPage + 1}" aria-label="Next">
                &raquo;
            </button>
        </li>
    `;

    pagination.innerHTML = html;

    // Attach click handlers
    pagination.querySelectorAll('button[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = parseInt(e.currentTarget.getAttribute('data-page'));
            if (!isNaN(page) && page >= 1 && page <= totalPages && page !== currentPage) {
                currentPage = page;
                renderCurrentPage();
            }
        });
    });
}

// Update product count display
function updateProductCount(count) {
    let countElement = document.getElementById('product-count');
    if (!countElement) {
        const pageHeader = document.querySelector('.page-header .container');
        if (pageHeader) {
            countElement = document.createElement('p');
            countElement.id = 'product-count';
            countElement.className = 'text-white-50 mt-2';
            pageHeader.appendChild(countElement);
        }
    }
    if (countElement) {
        countElement.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
    }
}


// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    
    if (searchInput) {
        // Search on input (with debounce)
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchTerm = e.target.value;
                applyFilters();
            }, 300); // Wait 300ms after user stops typing
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchTerm = e.target.value;
                applyFilters();
            }
        });
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchTerm = '';
                applyFilters();
            }
        });
    }
}

// Setup contact buttons
function setupContactButtons() {
    // WhatsApp button
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setTimeout(() => {
                if (typeof siteConfig !== 'undefined' && siteConfig && siteConfig.company && siteConfig.company.whatsapp) {
                    const whatsappNumber = siteConfig.company.whatsapp.replace(/[^0-9]/g, '');
                    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
                    window.open(whatsappUrl, '_blank');
                } else {
                    alert('WhatsApp number not configured. Please check config/config.json');
                }
            }, 200);
        });
    }

    // Phone button
    const phoneBtn = document.getElementById('phone-btn');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setTimeout(() => {
                if (typeof siteConfig !== 'undefined' && siteConfig && siteConfig.company && siteConfig.company.phone) {
                    const phoneNumber = siteConfig.company.phone.replace(/[^0-9+]/g, '');
                    window.location.href = `tel:${phoneNumber}`;
                } else {
                    alert('Phone number not configured. Please check config/config.json');
                }
            }, 200);
        });
    }
}

// Initialize products page
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Products page loaded, initializing...');
    
    // Load products
    const products = await loadProductsData();
    
    if (products && products.length > 0) {
        console.log(`Displaying ${products.length} products`);
        filteredProducts = [...products];
        renderCurrentPage();
    } else {
        console.warn('No products loaded');
    }

    // Setup search functionality
    setupSearch();
    
    // Setup WhatsApp and phone buttons
    setupContactButtons();
});

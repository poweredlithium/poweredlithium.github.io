// Powered Lithium - Product Detail Page JavaScript

let currentProduct = null;

// Get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Load product data
async function loadProduct() {
    const productId = getProductIdFromURL();
    
    if (!productId) {
        showError();
        return;
    }

    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error('Failed to load products');
        }
        
        const data = await response.json();
        const product = data.products.find(p => p.id === productId);
        
        if (!product) {
            showError();
            return;
        }
        
        currentProduct = product;
        displayProduct(product);
        setupContactLinks(product);
    } catch (error) {
        console.error('Error loading product:', error);
        showError();
    }
}

// Display product information
function displayProduct(product) {
    // Hide loading, show content
    document.getElementById('product-loading').style.display = 'none';
    document.getElementById('product-content').style.display = 'block';
    
    // Basic info
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('breadcrumb-product').textContent = product.name;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-model').textContent = product.model;
    document.getElementById('product-price').textContent = product.price || 'Contact for pricing';
    document.getElementById('product-description').textContent = product.description;
    
    // Image
    const productImage = document.getElementById('product-image');
    const productImageContainer = productImage.parentElement;
    if (product.image && product.image.trim() !== '') {
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.style.display = 'block';
        productImage.onerror = function() {
            this.style.display = 'none';
            let placeholder = productImageContainer.querySelector('.product-image-placeholder');
            if (!placeholder) {
                placeholder = document.createElement('div');
                placeholder.className = 'product-image-placeholder';
                placeholder.style.cssText = 'height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; border-radius: 8px;';
                placeholder.innerHTML = '<i class="bi bi-battery-charging fs-1"></i>';
                productImageContainer.appendChild(placeholder);
            }
            placeholder.style.display = 'flex';
        };
        let placeholder = productImageContainer.querySelector('.product-image-placeholder');
        if (placeholder) placeholder.style.display = 'none';
    } else {
        productImage.style.display = 'none';
        let placeholder = productImageContainer.querySelector('.product-image-placeholder');
        if (!placeholder) {
            placeholder = document.createElement('div');
            placeholder.className = 'product-image-placeholder';
            placeholder.style.cssText = 'height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; border-radius: 8px;';
            placeholder.innerHTML = '<i class="bi bi-battery-charging fs-1"></i>';
            productImageContainer.appendChild(placeholder);
        }
        placeholder.style.display = 'flex';
    }
    
    // Specifications
    const specsTable = document.getElementById('specifications-table');
    if (product.specifications) {
        specsTable.innerHTML = `
            <tr>
                <td><strong>Voltage</strong></td>
                <td>${product.voltage}</td>
            </tr>
            <tr>
                <td><strong>Capacity</strong></td>
                <td>${product.capacity}</td>
            </tr>
            <tr>
                <td><strong>Type</strong></td>
                <td>${product.type}</td>
            </tr>
            <tr>
                <td><strong>Cycle Life</strong></td>
                <td>${product.cycleLife}</td>
            </tr>
            <tr>
                <td><strong>Weight</strong></td>
                <td>${product.specifications.weight || 'N/A'}</td>
            </tr>
            <tr>
                <td><strong>Dimensions</strong></td>
                <td>${product.specifications.dimensions || 'N/A'}</td>
            </tr>
            <tr>
                <td><strong>Max Charge Current</strong></td>
                <td>${product.specifications.maxChargeCurrent || 'N/A'}</td>
            </tr>
            <tr>
                <td><strong>Max Discharge Current</strong></td>
                <td>${product.specifications.maxDischargeCurrent || 'N/A'}</td>
            </tr>
            <tr>
                <td><strong>Operating Temperature</strong></td>
                <td>${product.specifications.operatingTemp || 'N/A'}</td>
            </tr>
            <tr>
                <td><strong>Warranty</strong></td>
                <td>${product.specifications.warranty || 'N/A'}</td>
            </tr>
        `;
    }
    
    // Features
    const featuresList = document.getElementById('features-list');
    if (product.features && product.features.length > 0) {
        featuresList.innerHTML = product.features.map(feature => `
            <li class="text-white-50 mb-2">
                <i class="bi bi-check-circle-fill text-success me-2"></i>${feature}
            </li>
        `).join('');
    }
    
    // Applications
    const applicationsBadges = document.getElementById('applications-badges');
    if (product.applications && product.applications.length > 0) {
        applicationsBadges.innerHTML = product.applications.map(app => `
            <span class="badge bg-success me-2 mb-2" style="font-size: 1rem; padding: 0.5rem 1rem;">${app}</span>
        `).join('');
    }
}

// Setup contact links with prefilled product information
function setupContactLinks(product) {
    // Wait for config to load
    setTimeout(() => {
        const productInfo = `Product: ${product.name}%0AModel: ${product.model}%0AVoltage: ${product.voltage}%0ACapacity: ${product.capacity}`;
        const subject = encodeURIComponent(`Inquiry about ${product.name} (${product.model})`);
        const body = encodeURIComponent(`Hello,%0A%0AI am interested in the following product:%0A%0AProduct: ${product.name}%0AModel: ${product.model}%0AVoltage: ${product.voltage}%0ACapacity: ${product.capacity}%0A%0APlease provide more information and pricing.%0A%0AThank you!`);
        
        // WhatsApp link
        const whatsappLink = document.getElementById('whatsapp-link');
        if (whatsappLink && typeof siteConfig !== 'undefined' && siteConfig && siteConfig.company && siteConfig.company.whatsapp) {
            const whatsappNumber = siteConfig.company.whatsapp.replace(/[^0-9]/g, '');
            whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${productInfo}`;
            whatsappLink.target = '_blank';
        }
        
        // Email link
        const emailLink = document.getElementById('email-link');
        if (emailLink && typeof siteConfig !== 'undefined' && siteConfig && siteConfig.company && siteConfig.company.email) {
            emailLink.href = `mailto:${siteConfig.company.email}?subject=${subject}&body=${body}`;
        }
        
        // Phone link
        const phoneLink = document.getElementById('phone-link');
        if (phoneLink && typeof siteConfig !== 'undefined' && siteConfig && siteConfig.company && siteConfig.company.phone) {
            const phoneNumber = siteConfig.company.phone.replace(/[^0-9]/g, '');
            phoneLink.href = `tel:+91${phoneNumber}`;
        }
    }, 300);
}

// Show error message
function showError() {
    document.getElementById('product-loading').style.display = 'none';
    document.getElementById('product-error').style.display = 'block';
}

// Update current year
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateCurrentYear();
    loadProduct();
});


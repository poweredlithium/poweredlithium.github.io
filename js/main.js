// Powered Lithium - Main JavaScript
// Handles homepage functionality and common features

let productsData = [];

// Load products data
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error('Failed to load products');
        }
        const data = await response.json();
        productsData = data.products;
        return data;
    } catch (error) {
        console.error('Error loading products:', error);
        return { products: [] };
    }
}

// Display key features on homepage
function displayKeyFeatures() {
    const featuresContainer = document.getElementById('key-features');
    if (!featuresContainer) return;

    const features = [
        {
            icon: 'bi-shield-check',
            title: 'Quality Assurance',
            description: 'All our batteries undergo rigorous testing to ensure reliability, safety, and peak performance. ISO certified manufacturing processes.'
        },
        {
            icon: 'bi-lightning-charge',
            title: 'High Performance',
            description: '5000+ deep cycles with built-in BMS protection. Advanced LiFePO4 technology for maximum efficiency and longevity.'
        },
        {
            icon: 'bi-headset',
            title: 'Expert Support',
            description: 'Our knowledgeable team provides personalized assistance to help you find the perfect battery solution for your specific needs.'
        },
        {
            icon: 'bi-truck',
            title: 'Fast Delivery',
            description: 'Quick and reliable shipping worldwide. We ensure your batteries arrive safely and on time, ready to power your projects.'
        },
        {
            icon: 'bi-award',
            title: '5-Year Warranty',
            description: 'Comprehensive warranty coverage for peace of mind. We stand behind our products with industry-leading warranty terms.'
        },
        {
            icon: 'bi-globe',
            title: 'Wide Applications',
            description: 'Perfect for RVs, solar systems, e-mobility, marine, off-grid, and commercial applications. Versatile solutions for every need.'
        }
    ];

    featuresContainer.innerHTML = features.map(feature => `
        <div class="col-md-6 col-lg-4">
            <div class="feature-box text-center h-100">
                <i class="bi ${feature.icon} text-success fs-1 mb-3"></i>
                <h5 class="text-white mb-3">${feature.title}</h5>
                <p class="text-white-50">${feature.description}</p>
            </div>
        </div>
    `).join('');
}

// Initialize homepage features
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for config to load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Load homepage-specific content
    if (document.getElementById('key-features')) {
        displayKeyFeatures();
    }

    // Setup WhatsApp buttons
    setupWhatsAppButtons();
    setupPhoneButtons();
});

// Setup WhatsApp contact buttons
function setupWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('#whatsapp-btn, #whatsapp-contact-btn');
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Wait for config to be available
            setTimeout(() => {
                if (siteConfig && siteConfig.company && siteConfig.company.whatsapp) {
                    const whatsappNumber = siteConfig.company.whatsapp.replace(/[^0-9]/g, '');
                    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
                    window.open(whatsappUrl, '_blank');
                } else {
                    e.preventDefault();
                    alert('WhatsApp number not configured. Please contact us via email or phone.');
                }
            }, 200);
        });
    });
}

// Setup phone contact buttons
function setupPhoneButtons() {
    const phoneButtons = document.querySelectorAll('#phone-btn, #phone-contact-btn');
    phoneButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            setTimeout(() => {
                if (siteConfig && siteConfig.company && siteConfig.company.phone) {
                    const phoneNumber = siteConfig.company.phone.replace(/[^0-9+]/g, '');
                    window.location.href = `tel:${phoneNumber}`;
                } else {
                    e.preventDefault();
                    alert('Phone number not configured.');
                }
            }, 200);
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#product-')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .application-card, .feature-box');
    animateElements.forEach(el => observer.observe(el));
});


// Powered Lithium - Configuration Loader
// This file loads configuration from config.json and makes it available globally

let siteConfig = {};

async function loadConfig() {
    try {
        const response = await fetch('config/config.json');
        if (!response.ok) {
            throw new Error('Failed to load configuration');
        }
        siteConfig = await response.json();
        applyConfig();
    } catch (error) {
        console.error('Error loading configuration:', error);
        // Fallback to default config if file fails to load
        siteConfig = {
            company: {
                name: "Powered Lithium",
                tagline: "Reliable Lithium Battery Solutions for Every Need",
                description: "Powered Lithium is a leading provider of high-quality lithium battery solutions.",
                email: "info@poweredlithium.com",
                phone: "+1 (555) 123-4567",
                whatsapp: "+15551234567",
                address: {
                    street: "123 Battery Street",
                    city: "Power City",
                    state: "PC 12345",
                    country: "United States"
                }
            },
            socialMedia: {
                instagram: "https://instagram.com/poweredlithium",
                facebook: "https://facebook.com/poweredlithium",
                twitter: "https://twitter.com/poweredlithium"
            },
            contact: {
                businessHours: {
                    weekdays: "9:00 AM - 6:00 PM",
                    weekend: "10:00 AM - 4:00 PM",
                    timezone: "EST"
                }
            }
        };
        applyConfig();
    }
}

function applyConfig() {
    // Update company tagline
    const taglineElement = document.getElementById('company-tagline');
    if (taglineElement && siteConfig.company.tagline) {
        taglineElement.textContent = siteConfig.company.tagline;
    }

    // Update company description
    const descriptionElements = document.querySelectorAll('#company-description');
    descriptionElements.forEach(el => {
        if (siteConfig.company.description) {
            el.textContent = siteConfig.company.description;
        }
    });

    // Update footer contact info
    const footerEmail = document.getElementById('footer-email');
    if (footerEmail && siteConfig.company.email) {
        footerEmail.innerHTML = `<i class="bi bi-envelope me-2"></i>${siteConfig.company.email}`;
    }

    const footerPhone = document.getElementById('footer-phone');
    if (footerPhone && siteConfig.company.phone) {
        footerPhone.innerHTML = `<i class="bi bi-telephone me-2"></i>${siteConfig.company.phone}`;
    }

    const footerAddress = document.getElementById('footer-address');
    if (footerAddress && siteConfig.company.address) {
        const addr = siteConfig.company.address;
        footerAddress.innerHTML = `<i class="bi bi-geo-alt me-2"></i>${addr.street}, ${addr.city}, ${addr.state}, ${addr.country}`;
    }

    // Update social media links
    const instagramLinks = document.querySelectorAll('#instagram-link, #instagram-link-footer');
    instagramLinks.forEach(link => {
        if (siteConfig.socialMedia.instagram) {
            link.href = siteConfig.socialMedia.instagram;
        }
    });

    const facebookLinks = document.querySelectorAll('#facebook-link, #facebook-link-footer');
    facebookLinks.forEach(link => {
        if (siteConfig.socialMedia.facebook) {
            link.href = siteConfig.socialMedia.facebook;
        }
    });

    const twitterLinks = document.querySelectorAll('#twitter-link, #twitter-link-footer');
    twitterLinks.forEach(link => {
        if (siteConfig.socialMedia.twitter) {
            link.href = siteConfig.socialMedia.twitter;
        }
    });

    // Update contact page
    const whatsappContactBtn = document.getElementById('whatsapp-contact-btn');
    if (whatsappContactBtn && siteConfig.company.whatsapp) {
        const whatsappUrl = `https://wa.me/${siteConfig.company.whatsapp.replace(/[^0-9]/g, '')}`;
        whatsappContactBtn.href = whatsappUrl;
        const whatsappDisplay = document.getElementById('whatsapp-display');
        if (whatsappDisplay) {
            whatsappDisplay.textContent = siteConfig.company.whatsapp;
        }
    }

    const emailContactBtn = document.getElementById('email-contact-btn');
    if (emailContactBtn && siteConfig.company.email) {
        emailContactBtn.href = `mailto:${siteConfig.company.email}`;
        const emailDisplay = document.getElementById('email-display');
        if (emailDisplay) {
            emailDisplay.textContent = siteConfig.company.email;
        }
    }

    const phoneContactBtn = document.getElementById('phone-contact-btn');
    if (phoneContactBtn && siteConfig.company.phone) {
        phoneContactBtn.href = `tel:${siteConfig.company.phone}`;
        const phoneDisplay = document.getElementById('phone-display');
        if (phoneDisplay) {
            phoneDisplay.textContent = siteConfig.company.phone;
        }
    }

    // Update business hours
    const businessHoursWeekdays = document.getElementById('business-hours-weekdays');
    if (businessHoursWeekdays && siteConfig.contact.businessHours) {
        businessHoursWeekdays.textContent = `Weekdays: ${siteConfig.contact.businessHours.weekdays} ${siteConfig.contact.businessHours.timezone}`;
    }

    const businessHoursWeekend = document.getElementById('business-hours-weekend');
    if (businessHoursWeekend && siteConfig.contact.businessHours) {
        businessHoursWeekend.textContent = `Weekend: ${siteConfig.contact.businessHours.weekend} ${siteConfig.contact.businessHours.timezone}`;
    }

    // Update company address on contact page
    const companyAddress = document.getElementById('company-address');
    if (companyAddress && siteConfig.company.address) {
        const addr = siteConfig.company.address;
        companyAddress.innerHTML = `<i class="bi bi-geo-alt-fill me-2"></i><strong>${siteConfig.company.name}</strong><br>${addr.street}<br>${addr.city}, ${addr.state}<br>${addr.country}`;
    }

    // Update about page description
    const aboutDescription = document.getElementById('about-description');
    if (aboutDescription && siteConfig.company.description) {
        aboutDescription.textContent = siteConfig.company.description;
    }
}

// Update current year
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    updateCurrentYear();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { siteConfig, loadConfig };
}


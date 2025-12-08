// Powered Lithium - Contact Page JavaScript
// Handles contact method buttons

// Setup contact method buttons
function setupContactMethodButtons() {
    setTimeout(() => {
        // WhatsApp
        const whatsappBtn = document.getElementById('whatsapp-contact-btn');
        if (whatsappBtn) {
            if (typeof siteConfig !== 'undefined' && siteConfig && siteConfig.company && siteConfig.company.whatsapp) {
                const whatsappNumber = siteConfig.company.whatsapp.replace(/[^0-9]/g, '');
                whatsappBtn.href = `https://wa.me/${whatsappNumber}`;
            } else {
                console.warn('WhatsApp number not configured');
            }
        }

        // Email
        const emailBtn = document.getElementById('email-contact-btn');
        if (emailBtn) {
            if (typeof siteConfig !== 'undefined' && siteConfig && siteConfig.company && siteConfig.company.email) {
                emailBtn.href = `mailto:${siteConfig.company.email}`;
            } else {
                console.warn('Email not configured');
            }
        }

        // Phone
        const phoneBtn = document.getElementById('phone-contact-btn');
        if (phoneBtn) {
            if (typeof siteConfig !== 'undefined' && siteConfig && siteConfig.company && siteConfig.company.phone) {
                const phoneNumber = siteConfig.company.phone.replace(/[^0-9]/g, '');
                phoneBtn.href = `tel:+91${phoneNumber}`;
            } else {
                console.warn('Phone number not configured');
            }
        }
    }, 300);
}

// Initialize contact page
document.addEventListener('DOMContentLoaded', () => {
    setupContactMethodButtons();
});

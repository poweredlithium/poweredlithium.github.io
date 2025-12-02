// Powered Lithium - Theme Toggle Script
// Handles dark/light theme switching

(function() {
    'use strict';

    // Get theme from localStorage or default to dark
    const getStoredTheme = () => localStorage.getItem('theme') || 'dark';
    const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

    // Set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        setStoredTheme(theme);
        updateThemeToggle(theme);
    };

    // Update theme toggle button appearance
    const updateThemeToggle = (theme) => {
        const themeIcon = document.getElementById('themeIcon');
        const themeText = document.getElementById('themeText');
        
        if (themeIcon && themeText) {
            if (theme === 'light') {
                themeIcon.className = 'bi bi-sun-fill';
                themeText.textContent = 'Light';
            } else {
                themeIcon.className = 'bi bi-moon-fill';
                themeText.textContent = 'Dark';
            }
        }
    };

    // Initialize theme on page load
    const initTheme = () => {
        const currentTheme = getStoredTheme();
        setTheme(currentTheme);
    };

    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = getStoredTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Setup theme toggle button
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    });

    // Make functions available globally for other scripts
    window.setTheme = setTheme;
    window.getStoredTheme = getStoredTheme;
    window.toggleTheme = toggleTheme;
})();


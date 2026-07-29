// js/app.js

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update Icon
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', newTheme === 'light' ? 'moon' : 'sun');
        lucide.createIcons();
    }
}

// Load Theme on Startup
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', savedTheme === 'light' ? 'moon' : 'sun');
    }
    
    // Initialize Lucide icons if not already done inline
    if (window.lucide) {
        lucide.createIcons();
    }
});

# Theme Toggle Guide

## Overview
The website now supports both **Dark** and **Light** themes with a toggle button available on all pages.

## Features

### Theme Toggle Button
- **Location**: Fixed position in top-right corner of all pages
- **Icon**: Changes between moon (dark) and sun (light) icons
- **Text**: Shows current theme name
- **Mobile**: On mobile devices, only icon is shown (text hidden)

### Theme Persistence
- Theme preference is saved in browser's localStorage
- Theme persists across page navigation
- Theme persists across browser sessions

## How to Use

1. **Toggle Theme**: Click the theme toggle button in the top-right corner
2. **Theme Switches**: Instantly switches between dark and light themes
3. **Auto-Save**: Your preference is automatically saved

## Theme Differences

### Dark Theme (Default)
- Dark backgrounds (#000000, #0a0a0a)
- Bright green accents (#00ff00)
- White text
- Modern, tech-focused appearance

### Light Theme
- Light backgrounds (#ffffff, #f8f9fa)
- Darker green accents (#00cc00)
- Dark text
- Clean, professional appearance

## Files Modified

### New Files
- `css/theme.css` - Theme-specific styles
- `js/theme.js` - Theme toggle functionality

### Updated Files
- `contact.html` - Enhanced styling + theme toggle
- `index.html` - Added theme toggle
- `products.html` - Added theme toggle
- `about.html` - Added theme toggle
- `css/style.css` - Added theme variables

## Customization

### Changing Theme Colors

Edit `css/theme.css`:

```css
/* Light Theme Colors */
:root[data-theme="light"] {
    --primary-green: #00cc00;  /* Change this */
    --bg-darker: #ffffff;       /* Change this */
    /* ... */
}

/* Dark Theme Colors */
:root[data-theme="dark"] {
    --primary-green: #00ff00;  /* Change this */
    --bg-darker: #000000;      /* Change this */
    /* ... */
}
```

### Changing Toggle Button Position

Edit `css/theme.css`:

```css
.theme-toggle {
    top: 80px;    /* Change vertical position */
    right: 20px;  /* Change horizontal position */
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Technical Details

- Uses CSS custom properties (CSS variables)
- localStorage for persistence
- Smooth transitions between themes
- No page reload required
- Works across all pages

## Contact Page Enhancements

The contact page has been redesigned with:
- Modern card-based layout
- Better spacing and visual hierarchy
- Enhanced hover effects
- Improved mobile responsiveness
- Info cards for business hours and social links
- Better visual organization



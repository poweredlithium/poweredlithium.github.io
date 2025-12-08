# Powered Lithium Website

A modern, responsive website for Powered Lithium - a lithium battery solutions company.

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern dark theme with green accents
- ✅ Product catalog with JSON-based data storage
- ✅ SEO optimized with meta tags and structured data
- ✅ Easy customization via config files
- ✅ Contact integration (WhatsApp, Email, Phone)
- ✅ Social media integration (Instagram, Facebook, Twitter/X)
- ✅ Ready for future API/database integration

## Project Structure

```
PL/
├── index.html          # Homepage
├── products.html       # Products listing page
├── about.html          # About us page
├── contact.html        # Contact page
├── logo.png            # Company logo
├── banner-logo.png     # Banner logo
├── css/
│   ├── style.css       # Main stylesheet
│   └── custom.css      # Custom styles (easy to modify)
├── js/
│   ├── config.js       # Configuration loader
│   ├── main.js         # Main JavaScript (homepage)
│   ├── products.js     # Products page functionality
│   └── contact.js      # Contact page functionality
├── data/
│   └── products.json   # Product data (JSON format)
├── config/
│   └── config.json     # Site configuration
└── README.md           # This file
```

## Quick Start

1. **Open the website**: Simply open `index.html` in a web browser
2. **For local development**: Use a local server (recommended)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

## Customization

### Update Company Information

Edit `config/config.json` to update:
- Company name, tagline, description
- Contact information (email, phone, WhatsApp)
- Social media URLs
- Business hours
- Address

### Add/Edit Products

Edit `data/products.json` to:
- Add new products
- Modify existing products
- Update categories

### Change Colors/Styles

Edit `css/custom.css` or `css/style.css`:
- Primary green color: `--primary-green: #00ff00;`
- Background colors: `--bg-dark`, `--bg-darker`
- Text colors: `--text-white`, `--text-gray`

### Update Social Media Links

Edit `config/config.json` → `socialMedia` section:
```json
"socialMedia": {
    "instagram": "https://instagram.com/yourhandle",
    "facebook": "https://facebook.com/yourpage",
    "twitter": "https://twitter.com/yourhandle"
}
```

## Future API Integration

The project is structured to easily integrate with a backend API:

### Current Structure (JSON-based)
- Products: `data/products.json`
- Config: `config/config.json`

### Future API Structure
When ready to use a database/API, you can:

1. **Create API endpoints** (e.g., `/api/products`, `/api/config`)
2. **Update JavaScript files** to fetch from API instead of JSON:
   ```javascript
   // Change from:
   fetch('data/products.json')
   
   // To:
   fetch('/api/products')
   ```
3. **Add API folder structure**:
   ```
   api/
   ├── products.js       # Products API endpoints
   ├── contact.js       # Contact form API
   └── config.js        # Config API
   ```

### Example API Integration

In `js/products.js`, replace:
```javascript
const response = await fetch('data/products.json');
```

With:
```javascript
const response = await fetch('/api/products');
```

## SEO Features

- Meta tags for description, keywords, Open Graph
- Structured data (JSON-LD) for search engines
- Semantic HTML5 structure
- Alt tags for images
- Proper heading hierarchy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with CSS variables
- **Bootstrap 5.3.2**: Responsive framework
- **Bootstrap Icons**: Icon library
- **JavaScript (ES6+)**: Modern JavaScript features
- **JSON**: Data storage format

## Contact Integration

The website includes three contact methods:

1. **WhatsApp**: Opens WhatsApp chat (configured in `config/config.json`)
2. **Email**: Opens default email client
3. **Phone**: Initiates phone call (mobile devices)

## License

© 2024 Powered Lithium. All rights reserved.

## Support

For questions or customization help, contact:
- Email: info@poweredlithium.com
- WhatsApp: +1 (555) 123-4567

---

**Note**: Update contact information in `config/config.json` before going live.



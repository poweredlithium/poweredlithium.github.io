# Quick Start Guide - Powered Lithium Website

## 🚀 Getting Started

1. **Open the website**: Simply double-click `index.html` or open it in your web browser
2. **For better experience**: Use a local server (recommended for development)

### Using Python:
```bash
python -m http.server 8000
```
Then visit: http://localhost:8000

### Using Node.js:
```bash
npx http-server
```

## 📝 First Steps

### 1. Update Company Information
Edit `config/config.json`:
- Company name, email, phone, WhatsApp
- Social media URLs (Instagram, Facebook, Twitter/X)
- Address and business hours

### 2. Add Your Products
Edit `data/products.json`:
- Add/modify product details
- Update product images (replace placeholder URLs)
- Add new categories if needed

### 3. Customize Colors
Edit `css/custom.css`:
- Change primary green color: `--primary-green: #00ff00;`
- Modify background colors
- Adjust text colors

### 4. Update Domain (Before Going Live)
- Update `sitemap.xml` with your actual domain
- Update `robots.txt` with your domain
- Update meta tags in HTML files with your domain

## 📱 Contact Methods

The website includes three contact methods:
1. **WhatsApp**: Configured in `config/config.json` → `company.whatsapp`
2. **Email**: Configured in `config/config.json` → `company.email`
3. **Phone**: Configured in `config/config.json` → `company.phone`

## 🎨 Customization

### Change Logo
Replace `logo.png` and `banner-logo.png` with your own logos (keep same filenames)

### Add More Pages
1. Create new HTML file (e.g., `services.html`)
2. Copy structure from existing pages
3. Update navigation in all HTML files
4. Add link to `sitemap.xml`

### Modify Styles
- Main styles: `css/style.css`
- Custom styles: `css/custom.css` (easier to modify)

## 🔧 Future API Integration

When ready to use a database/API:
1. See `api/README.md` for structure
2. Update JavaScript files to fetch from `/api/` instead of JSON files
3. Keep JSON files as backup/fallback

## ✅ Checklist Before Going Live

- [ ] Update all contact information in `config/config.json`
- [ ] Replace placeholder product images with real images
- [ ] Update social media URLs
- [ ] Update domain in `sitemap.xml` and `robots.txt`
- [ ] Test all contact buttons (WhatsApp, Email, Phone)
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check SEO meta tags
- [ ] Test contact form (currently shows success message - integrate with backend when ready)

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `ICONS_GUIDE.md` - Icon usage guide
- `api/README.md` - Future API structure

## 🎯 Key Files

- **Configuration**: `config/config.json`
- **Products**: `data/products.json`
- **Styles**: `css/style.css` and `css/custom.css`
- **Main Pages**: `index.html`, `products.html`, `about.html`, `contact.html`

---

**Ready to launch!** 🚀



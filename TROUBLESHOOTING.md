# Troubleshooting Guide - Products Page

## Products Not Showing

### Issue: Products page is blank or shows "Loading..." forever

**Possible Causes & Solutions:**

1. **CORS Error (Most Common)**
   - **Problem**: Opening `index.html` directly in browser (file:// protocol) causes CORS errors
   - **Solution**: Use a local web server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js
     npx http-server
     ```
   - Then access: `http://localhost:8000/products.html`

2. **JSON File Path Issue**
   - **Problem**: JSON file not found
   - **Solution**: 
     - Verify `data/products.json` exists
     - Check browser console (F12) for errors
     - Ensure file path is correct relative to HTML file

3. **JSON Format Error**
   - **Problem**: Invalid JSON syntax
   - **Solution**:
     - Validate JSON at https://jsonlint.com/
     - Check for missing commas, brackets, or quotes
     - Ensure all product objects have required fields

4. **JavaScript Errors**
   - **Problem**: JavaScript not loading or errors in console
   - **Solution**:
     - Open browser console (F12)
     - Check for red error messages
     - Verify `js/products.js` file exists and is loaded
     - Check that Bootstrap JS is loaded before custom scripts

## Filters Not Working

### Issue: Category/Voltage/Capacity filters don't work

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify that `displayAdditionalFilters()` is being called
3. Ensure products have `category`, `voltage`, and `capacity` fields
4. Check that filter dropdowns are created in the DOM

## Search Not Working

### Issue: Search bar doesn't filter products

**Solutions:**
1. Check that search input has `id="searchInput"`
2. Verify `setupSearch()` function is called on page load
3. Check browser console for errors
4. Ensure search is triggered (300ms delay after typing)

## Products Display But Look Wrong

### Issue: Products show but styling is broken

**Solutions:**
1. Verify `css/style.css` is loaded
2. Check Bootstrap CSS is loaded
3. Clear browser cache (Ctrl+F5)
4. Check for CSS conflicts

## Quick Debug Steps

1. **Open Browser Console** (F12)
2. **Check Network Tab**: Verify `products.json` loads (status 200)
3. **Check Console Tab**: Look for JavaScript errors
4. **Check Elements Tab**: Verify products-grid div exists and has content

## Testing Checklist

- [ ] Open page via web server (not file://)
- [ ] Check browser console for errors
- [ ] Verify products.json loads successfully
- [ ] Test category filter buttons
- [ ] Test voltage dropdown filter
- [ ] Test capacity dropdown filter
- [ ] Test search functionality
- [ ] Test "Clear All Filters" button
- [ ] Test product modal (View Details)
- [ ] Test on mobile device/responsive view

## Common Error Messages

### "Failed to load products"
- **Cause**: Network error or file not found
- **Fix**: Check file path, use web server

### "Invalid products data format"
- **Cause**: JSON structure doesn't match expected format
- **Fix**: Verify JSON has `products` array

### "Cannot read property 'map' of undefined"
- **Cause**: Products array is undefined
- **Fix**: Check JSON structure, ensure products array exists

## Still Having Issues?

1. Check `data/products.json` structure matches expected format
2. Verify all required product fields are present:
   - id, name, model, voltage, capacity, type, category
3. Test with sample data first
4. Check browser compatibility (modern browsers recommended)



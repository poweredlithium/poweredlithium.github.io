# API Structure for Future Integration

This folder is prepared for future API/database integration.

## Planned API Endpoints

### Products API
```
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
GET    /api/products/category/:category  # Get products by category
POST   /api/products          # Create product (admin)
PUT    /api/products/:id      # Update product (admin)
DELETE /api/products/:id     # Delete product (admin)
```

### Contact API
```
POST   /api/contact           # Submit contact form
GET    /api/contact/messages  # Get messages (admin)
```

### Configuration API
```
GET    /api/config            # Get site configuration
PUT    /api/config            # Update configuration (admin)
```

## Database Schema Example

### Products Table
```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(100),
    voltage VARCHAR(50),
    capacity VARCHAR(50),
    type VARCHAR(50),
    cycle_life VARCHAR(100),
    description TEXT,
    price VARCHAR(100),
    category VARCHAR(100),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE product_features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    feature TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_specifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    spec_key VARCHAR(100),
    spec_value VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    application VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Configuration Table
```sql
CREATE TABLE site_config (
    id INT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(100) UNIQUE,
    config_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Example API Implementation (Node.js/Express)

### products.js
```javascript
const express = require('express');
const router = express.Router();
const db = require('../database'); // Your database connection

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await db.query('SELECT * FROM products');
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await db.query(
            'SELECT * FROM products WHERE id = ?',
            [req.params.id]
        );
        res.json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

## Migration from JSON to API

1. **Set up database** using the schema above
2. **Import JSON data** into database
3. **Create API endpoints** as shown above
4. **Update JavaScript files**:
   - Change `fetch('data/products.json')` to `fetch('/api/products')`
   - Update error handling for API responses
5. **Test thoroughly** before deploying

## Environment Variables

Create `.env` file:
```
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=powered_lithium
API_PORT=3000
```

## Notes

- Keep JSON files as backup/fallback
- Implement proper authentication for admin endpoints
- Add rate limiting for public endpoints
- Use environment variables for sensitive data
- Implement proper error handling and logging



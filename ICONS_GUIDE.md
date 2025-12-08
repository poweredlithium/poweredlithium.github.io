# Icons Guide - Powered Lithium Website

This website uses **Bootstrap Icons** (primary) and **FlatIcon** (available) for icons.

## Bootstrap Icons (Currently Used)

Bootstrap Icons are already integrated and being used throughout the site.

### Usage Examples:
```html
<!-- Battery icon -->
<i class="bi bi-battery-full"></i>

<!-- Lightning icon -->
<i class="bi bi-lightning-charge-fill"></i>

<!-- Social media icons -->
<i class="bi bi-instagram"></i>
<i class="bi bi-facebook"></i>
<i class="bi bi-twitter-x"></i>

<!-- Contact icons -->
<i class="bi bi-whatsapp"></i>
<i class="bi bi-envelope"></i>
<i class="bi bi-telephone"></i>
```

### Available Icons:
Visit: https://icons.getbootstrap.com/

## FlatIcon Integration

FlatIcon CDN is already included in all HTML pages. To use FlatIcon icons:

### Method 1: Using FlatIcon CDN (Current Setup)
```html
<!-- Already included in HTML head -->
<link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css">

<!-- Usage -->
<i class="fi fi-rr-battery"></i>
```

### Method 2: Download and Use Font Files (Recommended for Production)

1. Visit https://www.flaticon.com/
2. Search for icons you need (e.g., "battery", "power", "energy")
3. Download the icon pack
4. Extract and place font files in `css/fonts/flaticon/`
5. Add CSS:

```css
@font-face {
    font-family: "Flaticon";
    src: url("../fonts/flaticon/Flaticon.eot");
    src: url("../fonts/flaticon/Flaticon.eot?#iefix") format("embedded-opentype"),
         url("../fonts/flaticon/Flaticon.woff2") format("woff2"),
         url("../fonts/flaticon/Flaticon.woff") format("woff"),
         url("../fonts/flaticon/Flaticon.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

.fi:before {
    font-family: "Flaticon";
    font-style: normal;
    font-weight: normal;
}
```

### Recommended FlatIcon Icons for Battery Website:

- Battery icons: `fi-rr-battery`, `fi-rr-battery-three-quarters`
- Power icons: `fi-rr-bolt`, `fi-rr-lightning`
- Energy icons: `fi-rr-energy`, `fi-rr-power`
- Solar icons: `fi-rr-sun`, `fi-rr-solar-panel`
- Car/RV icons: `fi-rr-car`, `fi-rr-caravan`
- Settings icons: `fi-rr-settings`, `fi-rr-gear`

## Switching Between Icon Libraries

To replace Bootstrap Icons with FlatIcon:

1. Find the icon class (e.g., `bi bi-battery-full`)
2. Find equivalent FlatIcon (e.g., `fi fi-rr-battery`)
3. Replace in HTML

Example:
```html
<!-- Before (Bootstrap) -->
<i class="bi bi-battery-full"></i>

<!-- After (FlatIcon) -->
<i class="fi fi-rr-battery"></i>
```

## Custom Icon Colors

Both icon libraries support CSS color changes:

```css
.icon-green {
    color: #00ff00; /* Powered Lithium green */
}

.icon-white {
    color: #ffffff;
}
```

```html
<i class="bi bi-battery-full icon-green"></i>
```

## Notes

- Bootstrap Icons: Free, no attribution required
- FlatIcon: Free with attribution, or paid for commercial use without attribution
- Both libraries are responsive and scalable
- Icons can be styled with CSS (size, color, etc.)



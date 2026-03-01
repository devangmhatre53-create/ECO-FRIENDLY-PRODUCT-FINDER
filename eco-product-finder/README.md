# Eco-Friendly Product Finder

A modern, responsive website to discover environmentally friendly products and view their carbon footprint impact. Built with **HTML, CSS, and vanilla JavaScript** (no frameworks) — suitable for a software developer portfolio or resume project.

## Features

- **Home page** — Hero section, search bar, featured eco products, category links (Reusable, Organic Skincare, Sustainable Fashion, Eco Home, Zero Waste Kitchen)
- **Product listing** — Filter by category, sort by eco score / carbon / price, search by name
- **Product detail** — Large image, description, materials, sustainability benefits, **carbon footprint comparison chart**, user reviews with 5-star rating
- **Login / Register** — Tabbed form; demo admin login: `admin` / `admin`
- **Admin dashboard** — Add, edit, delete products; manage categories (admin only)
- **Design** — Green eco theme (light green, white, dark green), fully responsive, smooth animations, **dark/light mode toggle**
- **Eco score** — 1–10 badge on each product; animated meter on detail page
- **Data** — Stored in LocalStorage (products, categories, user, theme)

## How to run

1. Open `index.html` in a browser, or serve the folder with any static server (e.g. `npx serve .`).
2. Use **Login** → email: `admin`, password: `admin` to access the Admin dashboard.

## File structure

```
eco-product-finder/
├── index.html          # Home
├── products.html        # Product listing
├── product-detail.html  # Product details + chart + reviews
├── login.html           # Login / Register
├── admin.html           # Admin dashboard
├── style.css            # Global styles, theme, responsive
├── data.js              # Seed data, LocalStorage helpers
├── app.js               # Nav, theme, search redirect, product card render
├── products.js          # Listing filters & sort
├── product-detail.js    # Detail page + carbon chart + reviews
├── login.js             # Auth (LocalStorage)
├── admin.js             # CRUD products & categories
└── README.md
```

## Tech stack

- Semantic HTML5, ARIA where helpful
- CSS custom properties (light/dark theme), Flexbox/Grid, responsive breakpoints
- Vanilla JavaScript (IIFEs, no build step)
- LocalStorage for persistence

## Portfolio highlights

- Clean, professional UI with eco-friendly color palette
- Carbon footprint comparison chart (this product vs industry avg vs best in class)
- Animated eco score meter and card hover effects
- Form validation, modal dialogs, responsive tables
- Role-based access (admin gate) and multi-page navigation

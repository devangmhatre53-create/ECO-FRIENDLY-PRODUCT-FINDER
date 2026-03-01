/**
 * Eco-Friendly Product Finder — Shared app logic
 * Navigation, theme toggle, search redirect, mobile menu.
 */

(function () {
  'use strict';

  const THEME_KEY = 'eco_theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme || 'light');
    if (theme) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {}
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  }

  function getCategoryName(categoryId) {
    const categories = typeof getStoredCategories === 'function' ? getStoredCategories() : [];
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  }

  /**
   * Build product card DOM node (for listing and featured sections).
   * @param {Object} product
   * @param {string} baseUrl - e.g. '' or 'products.html' for links
   */
  window.renderProductCard = function (product, baseUrl) {
    const href = (baseUrl ? baseUrl + (baseUrl.includes('?') ? '&' : '?') : 'product-detail.html?') + 'id=' + encodeURIComponent(product.id);
    const categoryName = getCategoryName(product.category);
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML =
      '<a href="' + escapeAttr(href) + '" class="product-card-link">' +
        '<div class="product-card-image">' +
          '<img src="' + escapeAttr(product.image || '') + '" alt="' + escapeAttr(product.name) + '" loading="lazy" />' +
          '<span class="eco-score-badge" aria-label="Eco score ' + product.ecoScore + ' out of 10">' + product.ecoScore + '</span>' +
        '</div>' +
        '<div class="product-card-body">' +
          '<h3 class="product-card-title">' + escapeHtml(product.name) + '</h3>' +
          '<p class="product-card-category">' + escapeHtml(categoryName) + '</p>' +
          '<div class="product-card-meta">' +
            '<span class="product-card-price">$' + Number(product.price).toFixed(2) + '</span>' +
            '<span class="product-card-carbon">' + Number(product.carbonKg).toFixed(1) + ' kg CO₂</span>' +
          '</div>' +
        '</div>' +
      '</a>';
    return card;
  };

  function escapeAttr(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.replace(/"/g, '&quot;');
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Theme toggle button
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    // Mobile nav toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('is-open');
      });
    }

    // Hero search form: redirect to products with query
    const heroSearchForm = document.getElementById('hero-search-form');
    const heroSearchInput = document.getElementById('hero-search-input');
    if (heroSearchForm && heroSearchInput) {
      heroSearchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const q = (heroSearchInput.value || '').trim();
        window.location.href = 'products.html' + (q ? '?q=' + encodeURIComponent(q) : '');
      });
    }
  });
})();

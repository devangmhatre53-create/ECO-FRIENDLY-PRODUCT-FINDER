/**
 * Products listing page: filter, sort, render grid.
 */

(function () {
  'use strict';

  var products = [];
  var categories = [];

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function render() {
    var searchEl = document.getElementById('products-search');
    var categoryEl = document.getElementById('filter-category');
    var sortEl = document.getElementById('sort-by');
    var gridEl = document.getElementById('products-grid');
    var emptyEl = document.getElementById('products-empty');

    var search = (searchEl && searchEl.value) ? searchEl.value.trim().toLowerCase() : '';
    var categoryId = (categoryEl && categoryEl.value) ? categoryEl.value : '';
    var sort = (sortEl && sortEl.value) ? sortEl.value : 'default';

    var filtered = products.filter(function (p) {
      if (search && p.name.toLowerCase().indexOf(search) === -1) return false;
      if (categoryId && p.category !== categoryId) return false;
      return true;
    });

    if (sort === 'ecoScore') {
      filtered.sort(function (a, b) { return (b.ecoScore || 0) - (a.ecoScore || 0); });
    } else if (sort === 'carbon') {
      filtered.sort(function (a, b) { return (a.carbonKg || 0) - (b.carbonKg || 0); });
    } else if (sort === 'price-asc') {
      filtered.sort(function (a, b) { return (a.price || 0) - (b.price || 0); });
    } else if (sort === 'price-desc') {
      filtered.sort(function (a, b) { return (b.price || 0) - (a.price || 0); });
    }

    if (!gridEl) return;

    gridEl.innerHTML = '';
    filtered.forEach(function (p) {
      var card = window.renderProductCard(p, 'product-detail.html');
      gridEl.appendChild(card);
    });

    if (emptyEl) {
      emptyEl.style.display = filtered.length === 0 ? 'block' : 'none';
    }
  }

  function initCategories() {
    var select = document.getElementById('filter-category');
    if (!select) return;
    categories.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      select.appendChild(opt);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    products = getStoredProducts();
    categories = getStoredCategories();

    var q = getQueryParam('q');
    var category = getQueryParam('category');

    var searchInput = document.getElementById('products-search');
    if (searchInput && q) {
      searchInput.value = q;
    }

    var categorySelect = document.getElementById('filter-category');
    if (categorySelect && category) {
      categorySelect.value = category;
    }

    initCategories();
    render();

    document.getElementById('products-search').addEventListener('input', render);
    document.getElementById('filter-category').addEventListener('change', render);
    document.getElementById('sort-by').addEventListener('change', render);
  });
})();

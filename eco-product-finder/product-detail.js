/**
 * Product detail page: load product by id, render description, materials,
 * benefits, carbon comparison chart, and reviews.
 */

(function () {
  'use strict';

  function getProductId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function starRating(rating) {
    var full = Math.floor(rating);
    var half = rating - full >= 0.5 ? 1 : 0;
    var empty = 5 - full - half;
    var html = '';
    for (var i = 0; i < full; i++) html += '★';
    if (half) html += '½';
    for (var j = 0; j < empty; j++) html += '☆';
    return html;
  }

  function avgRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    var sum = reviews.reduce(function (acc, r) { return acc + (r.rating || 0); }, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  /**
   * Carbon comparison: this product vs industry average (e.g. 5 kg) and vs best in class (e.g. 0.5 kg).
   */
  function renderCarbonChart(product, maxCarbon) {
    var val = Number(product.carbonKg) || 0;
    maxCarbon = maxCarbon || 6;
    var best = 0.5;
    var industry = 5;
    var max = Math.max(val, industry, best);
    var scale = max > 0 ? 100 / max : 0;

    return (
      '<div class="carbon-chart">' +
        '<h3>Carbon footprint comparison</h3>' +
        '<div class="chart-bars">' +
          '<div class="chart-bar-row">' +
            '<span class="chart-bar-label">This product</span>' +
            '<div class="chart-bar-track">' +
              '<div class="chart-bar-fill" style="width:' + (val * scale) + '%"></div>' +
            '</div>' +
            '<span class="chart-bar-value">' + val.toFixed(1) + ' kg</span>' +
          '</div>' +
          '<div class="chart-bar-row">' +
            '<span class="chart-bar-label">Industry avg.</span>' +
            '<div class="chart-bar-track">' +
              '<div class="chart-bar-fill" style="width:' + (industry * scale) + '%"></div>' +
            '</div>' +
            '<span class="chart-bar-value">' + industry + ' kg</span>' +
          '</div>' +
          '<div class="chart-bar-row">' +
            '<span class="chart-bar-label">Best in class</span>' +
            '<div class="chart-bar-track">' +
              '<div class="chart-bar-fill" style="width:' + (best * scale) + '%"></div>' +
            '</div>' +
            '<span class="chart-bar-value">' + best + ' kg</span>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderReviews(reviews) {
    if (!reviews || reviews.length === 0) {
      return '<p class="review-text">No reviews yet.</p>';
    }
    var html = '<ul class="reviews-list">';
    reviews.forEach(function (r) {
      html +=
        '<li class="review-item">' +
          '<div class="review-header">' +
            '<span class="review-stars" aria-label="Rating ' + r.rating + ' out of 5">' + starRating(r.rating) + '</span>' +
            '<span class="review-author">' + escapeHtml(r.author) + '</span>' +
            '<span class="review-date">' + escapeHtml(r.date || '') + '</span>' +
          '</div>' +
          '<p class="review-text">' + escapeHtml(r.text || '') + '</p>' +
        '</li>';
    });
    html += '</ul>';
    return html;
  }

  function getCategoryName(categoryId) {
    var categories = getStoredCategories();
    var cat = categories.find(function (c) { return c.id === categoryId; });
    return cat ? cat.name : categoryId;
  }

  function renderProduct(product) {
    var categoryName = getCategoryName(product.category);
    var avg = avgRating(product.reviews);
    var materialsList = (product.materials || []).map(function (m) { return '<li>' + escapeHtml(m) + '</li>'; }).join('');
    var benefitsList = (product.benefits || []).map(function (b) { return '<li>' + escapeHtml(b) + '</li>'; }).join('');

    return (
      '<div class="product-detail-grid">' +
        '<div class="product-detail-image-wrap">' +
          '<div class="product-detail-image">' +
            '<img src="' + escapeHtml(product.image || '') + '" alt="' + escapeHtml(product.name) + '" />' +
          '</div>' +
        '</div>' +
        '<div class="product-detail-info">' +
          '<h1>' + escapeHtml(product.name) + '</h1>' +
          '<p class="product-detail-category" style="color: var(--text-muted); font-size: 0.9rem;">' + escapeHtml(categoryName) + '</p>' +
          '<div class="product-detail-meta">' +
            '<span class="eco-score-large">' +
              '<span aria-label="Eco score ' + product.ecoScore + ' out of 10">' + product.ecoScore + '</span>/10 ' +
              '<div class="eco-score-meter"><div class="eco-score-meter-fill" style="width:' + (product.ecoScore * 10) + '%"></div></div>' +
            '</span>' +
            '<span class="product-detail-price">$' + Number(product.price).toFixed(2) + '</span>' +
            '<span class="product-detail-carbon">' + Number(product.carbonKg).toFixed(1) + ' kg CO₂ footprint</span>' +
          '</div>' +
          '<div class="product-detail-description">' + escapeHtml(product.description || '') + '</div>' +
          '<div class="detail-block">' +
            '<h3>Materials used</h3>' +
            '<ul>' + materialsList + '</ul>' +
          '</div>' +
          '<div class="detail-block">' +
            '<h3>Sustainability benefits</h3>' +
            '<ul>' + benefitsList + '</ul>' +
          '</div>' +
          renderCarbonChart(product) +
          '<div class="detail-block">' +
            '<h3>User reviews</h3>' +
            '<div class="rating-summary">' +
              '<span class="rating-big">' + avg.toFixed(1) + '</span>' +
              '<span class="review-stars">' + starRating(avg) + '</span>' +
              '<span style="color: var(--text-muted); font-size: 0.9rem;">(' + (product.reviews ? product.reviews.length : 0) + ' reviews)</span>' +
            '</div>' +
            renderReviews(product.reviews) +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var id = getProductId();
    var root = document.getElementById('product-detail-root');
    var notFound = document.getElementById('product-not-found');

    if (!id) {
      if (root) root.innerHTML = '';
      if (notFound) notFound.style.display = 'block';
      return;
    }

    var products = getStoredProducts();
    var product = products.find(function (p) { return p.id === id; });

    if (!product) {
      if (root) root.innerHTML = '';
      if (notFound) notFound.style.display = 'block';
      return;
    }

    if (notFound) notFound.style.display = 'none';
    if (root) root.innerHTML = renderProduct(product);

    document.title = product.name + ' — Eco-Friendly Product Finder';
  });
})();

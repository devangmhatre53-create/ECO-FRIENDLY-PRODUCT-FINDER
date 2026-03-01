/**
 * Admin dashboard: gate by role, list products/categories, add/edit/delete.
 */

(function () {
  'use strict';

  var gateEl = document.getElementById('admin-gate');
  var dashboardEl = document.getElementById('admin-dashboard');
  var productsTbody = document.getElementById('admin-products-tbody');
  var categoriesTbody = document.getElementById('admin-categories-tbody');

  function getCurrentUser() {
    try {
      var raw = localStorage.getItem(ECO_STORAGE_KEYS.user);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function renderProducts() {
    var products = getStoredProducts();
    var categories = getStoredCategories();
    function catName(id) {
      var c = categories.find(function (x) { return x.id === id; });
      return c ? c.name : id;
    }
    if (!productsTbody) return;
    productsTbody.innerHTML = '';
    products.forEach(function (p) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + escapeHtml(p.name) + '</td>' +
        '<td>' + escapeHtml(catName(p.category)) + '</td>' +
        '<td>$' + Number(p.price).toFixed(2) + '</td>' +
        '<td>' + p.ecoScore + '</td>' +
        '<td>' + Number(p.carbonKg).toFixed(1) + '</td>' +
        '<td><div class="admin-actions-cell">' +
          '<button type="button" class="btn btn-secondary btn-sm btn-edit" data-id="' + escapeAttr(p.id) + '">Edit</button>' +
          '<button type="button" class="btn btn-danger btn-sm btn-delete" data-id="' + escapeAttr(p.id) + '">Delete</button>' +
        '</div></td>';
      productsTbody.appendChild(tr);
    });
    productsTbody.querySelectorAll('.btn-edit').forEach(function (btn) {
      btn.addEventListener('click', function () { openProductModal(btn.getAttribute('data-id')); });
    });
    productsTbody.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', function () { deleteProduct(btn.getAttribute('data-id')); });
    });
  }

  function renderCategories() {
    var categories = getStoredCategories();
    if (!categoriesTbody) return;
    categoriesTbody.innerHTML = '';
    categories.forEach(function (c) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + escapeHtml(c.id) + '</td>' +
        '<td>' + escapeHtml(c.name) + '</td>' +
        '<td><div class="admin-actions-cell">' +
          '<button type="button" class="btn btn-danger btn-sm btn-delete-cat" data-id="' + escapeAttr(c.id) + '">Delete</button>' +
        '</div></td>';
      categoriesTbody.appendChild(tr);
    });
    categoriesTbody.querySelectorAll('.btn-delete-cat').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (confirm('Delete category "' + btn.getAttribute('data-id') + '"?')) {
          deleteCategory(btn.getAttribute('data-id'));
        }
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.replace(/"/g, '&quot;');
  }

  function openProductModal(id) {
    var modal = document.getElementById('product-modal');
    var title = document.getElementById('product-modal-title');
    var form = document.getElementById('product-form');
    if (!modal || !form) return;

    var products = getStoredProducts();
    var categories = getStoredCategories();
    var select = document.getElementById('product-category');
    if (select) {
      select.innerHTML = '';
      categories.forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.name;
        select.appendChild(opt);
      });
    }

    if (id) {
      var product = products.find(function (p) { return p.id === id; });
      if (product) {
        title.textContent = 'Edit product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-ecoScore').value = product.ecoScore;
        document.getElementById('product-carbonKg').value = product.carbonKg;
        document.getElementById('product-image').value = product.image || '';
        document.getElementById('product-description').value = product.description || '';
      }
    } else {
      title.textContent = 'Add product';
      form.reset();
      document.getElementById('product-id').value = '';
    }
    modal.hidden = false;
  }

  function closeProductModal() {
    var modal = document.getElementById('product-modal');
    if (modal) modal.hidden = true;
  }

  function deleteProduct(id) {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    var products = getStoredProducts().filter(function (p) { return p.id !== id; });
    setStoredProducts(products);
    renderProducts();
  }

  function deleteCategory(id) {
    var categories = getStoredCategories().filter(function (c) { return c.id !== id; });
    setStoredCategories(categories);
    renderCategories();
    renderProducts();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      if (gateEl) gateEl.innerHTML = '<p>Admin access required.</p><a href="login.html" class="btn btn-primary mt-2">Login</a>';
      return;
    }
    if (gateEl) gateEl.style.display = 'none';
    if (dashboardEl) dashboardEl.style.display = 'block';

    renderProducts();
    renderCategories();

    document.getElementById('admin-add-product').addEventListener('click', function () { openProductModal(null); });
    document.getElementById('product-modal-cancel').addEventListener('click', closeProductModal);
    document.getElementById('product-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var id = document.getElementById('product-id').value;
      var products = getStoredProducts();
      var payload = {
        name: document.getElementById('product-name').value.trim(),
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value) || 0,
        ecoScore: Math.min(10, Math.max(1, parseInt(document.getElementById('product-ecoScore').value, 10) || 5)),
        carbonKg: parseFloat(document.getElementById('product-carbonKg').value) || 0,
        image: document.getElementById('product-image').value.trim() || 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400',
        description: document.getElementById('product-description').value.trim(),
        materials: [],
        benefits: [],
        reviews: [],
      };
      if (id) {
        var idx = products.findIndex(function (p) { return p.id === id; });
        if (idx >= 0) {
          payload.id = products[idx].id;
          payload.materials = products[idx].materials || [];
          payload.benefits = products[idx].benefits || [];
          payload.reviews = products[idx].reviews || [];
          products[idx] = payload;
        }
      } else {
        payload.id = 'p_' + Date.now();
        products.push(payload);
      }
      setStoredProducts(products);
      closeProductModal();
      renderProducts();
    });

    var categoryModal = document.getElementById('category-modal');
    document.getElementById('admin-add-category').addEventListener('click', function () {
      document.getElementById('category-form').reset();
      categoryModal.hidden = false;
    });
    document.getElementById('category-modal-cancel').addEventListener('click', function () {
      categoryModal.hidden = true;
    });
    document.getElementById('category-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var id = document.getElementById('category-id').value.trim().toLowerCase().replace(/\s+/g, '-');
      var name = document.getElementById('category-name').value.trim();
      var categories = getStoredCategories();
      if (categories.some(function (c) { return c.id === id; })) {
        alert('Category ID already exists.');
        return;
      }
      categories.push({ id: id, name: name });
      setStoredCategories(categories);
      renderCategories();
      categoryModal.hidden = true;
    });
  });
})();

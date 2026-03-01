/**
 * Login / Register page: tabs, form submit, store user in LocalStorage.
 * Demo: admin / admin logs in as admin for dashboard access.
 */

(function () {
  'use strict';

  var tabLogin = document.getElementById('tab-login');
  var tabRegister = document.getElementById('tab-register');
  var panelLogin = document.getElementById('panel-login');
  var panelRegister = document.getElementById('panel-register');
  var toggleHint = document.getElementById('toggle-hint');
  var toggleLink = document.getElementById('toggle-link');

  function showLogin() {
    tabLogin.classList.add('is-active');
    tabLogin.setAttribute('aria-selected', 'true');
    tabRegister.classList.remove('is-active');
    tabRegister.setAttribute('aria-selected', 'false');
    panelLogin.classList.add('is-active');
    panelLogin.hidden = false;
    panelRegister.classList.remove('is-active');
    panelRegister.hidden = true;
    if (toggleHint) toggleHint.textContent = "Don't have an account?";
    if (toggleLink) toggleLink.textContent = 'Register';
  }

  function showRegister() {
    tabRegister.classList.add('is-active');
    tabRegister.setAttribute('aria-selected', 'true');
    tabLogin.classList.remove('is-active');
    tabLogin.setAttribute('aria-selected', 'false');
    panelRegister.classList.add('is-active');
    panelRegister.hidden = false;
    panelLogin.classList.remove('is-active');
    panelLogin.hidden = true;
    if (toggleHint) toggleHint.textContent = 'Already have an account?';
    if (toggleLink) toggleLink.textContent = 'Login';
  }

  function saveUser(user) {
    try {
      localStorage.setItem(ECO_STORAGE_KEYS.user, JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user.', e);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (tabLogin) tabLogin.addEventListener('click', showLogin);
    if (tabRegister) tabRegister.addEventListener('click', showRegister);
    if (toggleLink) toggleLink.addEventListener('click', function (e) {
      e.preventDefault();
      if (panelLogin.classList.contains('is-active')) showRegister();
      else showLogin();
    });

    var loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = (document.getElementById('login-email').value || '').trim();
        var password = (document.getElementById('login-password').value || '');
        var isAdmin = email.toLowerCase() === 'admin' && password === 'admin';
        saveUser({
          email: email,
          name: isAdmin ? 'Admin' : email.split('@')[0],
          role: isAdmin ? 'admin' : 'user',
        });
        alert(isAdmin ? 'Logged in as Admin. You can access the Admin dashboard.' : 'Logged in successfully.');
        window.location.href = isAdmin ? 'admin.html' : 'index.html';
      });
    }

    var registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (document.getElementById('register-name').value || '').trim();
        var email = (document.getElementById('register-email').value || '').trim();
        saveUser({ name: name, email: email, role: 'user' });
        alert('Account created. You are now logged in.');
        window.location.href = 'index.html';
      });
    }
  });
})();

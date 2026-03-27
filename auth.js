(function () {
  var LOGIN_KEY = 'nk_loggedIn';
  var TIME_KEY = 'nk_loginTime';
  var EXPIRY_DAYS = 30;
  var LOGIN_PAGE = 'login.html';

  function isLoginPage() {
    return window.location.pathname.indexOf('login.html') !== -1;
  }

  function clearSession() {
    localStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem(TIME_KEY);
  }

  function checkAuth() {
    if (isLoginPage()) return;

    var loggedIn = localStorage.getItem(LOGIN_KEY);
    var loginTime = localStorage.getItem(TIME_KEY);

    if (!loggedIn || !loginTime) {
      window.location.replace(LOGIN_PAGE);
      return;
    }

    var elapsed = Date.now() - parseInt(loginTime, 10);
    var expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

    if (elapsed > expiryMs) {
      clearSession();
      window.location.replace(LOGIN_PAGE + '?expired=1');
      return;
    }
  }

  window.nkLogout = function () {
    clearSession();
    window.location.replace(LOGIN_PAGE);
  };

  function addLogoutButton() {
    if (isLoginPage()) return;

    var style = document.createElement('style');
    style.textContent = [
      '#nk-logout-btn{',
      '  position:fixed;bottom:24px;right:24px;z-index:9997;',
      '  background:#f32121;color:#fff;border:none;',
      '  padding:10px 22px;border-radius:25px;',
      '  font-size:14px;font-weight:600;cursor:pointer;',
      '  font-family:Roboto,sans-serif;letter-spacing:.5px;',
      '  box-shadow:0 3px 12px rgba(243,33,33,.45);',
      '  transition:background .2s,box-shadow .2s;',
      '}',
      '#nk-logout-btn:hover{background:#c0392b;box-shadow:0 5px 16px rgba(243,33,33,.55);}'
    ].join('');
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.id = 'nk-logout-btn';
    btn.textContent = 'Logout';
    btn.onclick = window.nkLogout;
    document.body.appendChild(btn);
  }

  // Auto-logout after 30 seconds of inactivity
  var INACTIVITY_TIMEOUT = 30 * 1000; // 30 seconds
  var inactivityTimer;

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(function () {
      clearSession();
      window.location.replace(LOGIN_PAGE + '?expired=1');
    }, INACTIVITY_TIMEOUT);
  }

  function startInactivityWatcher() {
    if (isLoginPage()) return;
    var events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll', 'click'];
    events.forEach(function (evt) {
      document.addEventListener(evt, resetInactivityTimer, true);
    });
    resetInactivityTimer(); // start the timer immediately
  }

  // Run auth check immediately (before page content renders)
  checkAuth();

  // Inject logout button and start inactivity watcher once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      addLogoutButton();
      startInactivityWatcher();
    });
  } else {
    addLogoutButton();
    startInactivityWatcher();
  }
})();

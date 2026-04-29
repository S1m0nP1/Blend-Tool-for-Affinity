(function () {
  var SUPPORT_URL = 'https://www.buymeacoffee.com/S1m0nP';
  var BUTTON_TEXT = 'Support this project';
  var STORAGE_KEY = 'support_widget_dismissed_until';
  var DISMISS_DAYS = 14;

  function shouldShowPrompt() {
    try {
      var until = localStorage.getItem(STORAGE_KEY);
      if (!until) return true;
      return Date.now() > Number(until);
    } catch (e) {
      return true;
    }
  }

  function dismissPrompt() {
    try {
      var next = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch (e) {
      // ignore storage failures
    }
  }

  function createButton() {
    var btn = document.createElement('a');
    btn.href = SUPPORT_URL;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.textContent = BUTTON_TEXT;
    btn.setAttribute('aria-label', BUTTON_TEXT);

    btn.style.position = 'fixed';
    btn.style.right = '16px';
    btn.style.bottom = '16px';
    btn.style.zIndex = '9999';
    btn.style.padding = '10px 14px';
    btn.style.borderRadius = '999px';
    btn.style.background = '#111827';
    btn.style.color = '#ffffff';
    btn.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    btn.style.fontSize = '14px';
    btn.style.fontWeight = '600';
    btn.style.textDecoration = 'none';
    btn.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.2)';

    btn.addEventListener('mouseenter', function () {
      btn.style.transform = 'translateY(-1px)';
      btn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.24)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translateY(0)';
      btn.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.2)';
    });

    return btn;
  }

  function createDismiss() {
    var dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.textContent = 'Not now';
    dismiss.style.position = 'fixed';
    dismiss.style.right = '16px';
    dismiss.style.bottom = '58px';
    dismiss.style.zIndex = '9999';
    dismiss.style.padding = '6px 10px';
    dismiss.style.border = '1px solid #d1d5db';
    dismiss.style.borderRadius = '8px';
    dismiss.style.background = '#ffffff';
    dismiss.style.color = '#111827';
    dismiss.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    dismiss.style.fontSize = '12px';
    dismiss.style.cursor = 'pointer';

    dismiss.addEventListener('click', function () {
      dismissPrompt();
      var button = document.getElementById('support-widget-button');
      if (button) button.remove();
      dismiss.remove();
    });

    return dismiss;
  }

  function mount() {
    if (!shouldShowPrompt()) return;
    if (document.getElementById('support-widget-button')) return;

    var button = createButton();
    button.id = 'support-widget-button';
    document.body.appendChild(button);
    document.body.appendChild(createDismiss());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

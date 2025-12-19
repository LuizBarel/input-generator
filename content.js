let lastRightClickedElement = null;

// Capture right button click on editable texts
document.addEventListener('contextmenu', (e) => {
  const target = e.target;

  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
    lastRightClickedElement = target;
  }
}, true);

// Receive messages of background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillInput' && lastRightClickedElement) {
    const element = lastRightClickedElement;

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = request.value;

      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (element.isContentEditable) {
      element.textContent = request.value;

      element.dispatchEvent(new Event('input', { bubbles: true }));
    }

    sendResponse({ success: true });
  }

  return true;
});

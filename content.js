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
    let value = request.value;

    // data chega em ISO (YYYY-MM-DD); só campos type="date" aceitam esse formato
    if (request.kind === 'birthdate' && element.type !== 'date') {
      const [year, month, day] = value.split('-');
      value = `${day}/${month}/${year}`;
    }

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = value;

      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (element.isContentEditable) {
      element.textContent = value;

      element.dispatchEvent(new Event('input', { bubbles: true }));
    }

    sendResponse({ success: true });
  }

  return true;
});

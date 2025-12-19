// Armazenar o último elemento clicado com botão direito
let lastRightClickedElement = null;

// Capturar clique direito em elementos editáveis
document.addEventListener('contextmenu', (e) => {
  const target = e.target;
  
  // Verificar se é um input ou textarea
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
    lastRightClickedElement = target;
  }
}, true);

// Receber mensagens do background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillInput' && lastRightClickedElement) {
    const element = lastRightClickedElement;
    
    // Preencher o campo
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = request.value;
      
      // Disparar eventos para que frameworks detectem a mudança
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (element.isContentEditable) {
      element.textContent = request.value;
      
      // Disparar evento de input
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Feedback visual
    element.style.backgroundColor = '#90EE90';
    setTimeout(() => {
      element.style.backgroundColor = '';
    }, 500);
    
    sendResponse({ success: true });
  }
  
  return true;
});

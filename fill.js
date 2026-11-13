// Preenche o campo focado. Roda dentro da página (injetada via chrome.scripting),
// por isso precisa ser autossuficiente: não pode usar nada do escopo do service worker.
function fillField(kind, value) {
  // o clique direito foca o campo; desce em shadow roots abertos para achar o elemento real
  let element = document.activeElement;
  while (element && element.shadowRoot && element.shadowRoot.activeElement) {
    element = element.shadowRoot.activeElement;
  }
  if (!element) return false;

  // data chega em ISO (YYYY-MM-DD); só campos type="date" aceitam esse formato
  if (kind === 'birthdate' && element.type !== 'date') {
    const [year, month, day] = value.split('-');
    value = `${day}/${month}/${year}`;
  }

  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  if (element.isContentEditable) {
    element.textContent = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  }

  return false;
}


export { fillField };

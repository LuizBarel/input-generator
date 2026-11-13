import { GENERATORS_BY_ID } from './generators.js';
import { createMenu } from './menu.js';
import { fillField } from './fill.js';

// cria o menu de contexto ao instalar/atualizar a extensão
chrome.runtime.onInstalled.addListener(createMenu);

// gera o valor do tipo escolhido e preenche o campo focado na aba
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const type = GENERATORS_BY_ID[info.menuItemId];
  if (!type || !tab) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id, frameIds: [info.frameId || 0] },
    func: fillField,
    args: [info.menuItemId, type.generate()]
  }).catch((error) => {
    console.error('Erro ao preencher o campo:', error);
  });
});

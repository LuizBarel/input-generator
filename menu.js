import { GROUPS, GENERATORS } from './generators.js';

const ROOT_ID = 'inputGenerator';

// Monta o menu "Gerar Input" (grupos + tipos) a partir do registro de geradores.
export function createMenu() {
  chrome.contextMenus.create({
    id: ROOT_ID,
    title: 'Gerar Input',
    contexts: ['editable']
  });

  GROUPS.forEach(group => {
    chrome.contextMenus.create({
      id: group.id,
      parentId: ROOT_ID,
      title: group.title,
      contexts: ['editable']
    });
  });

  GENERATORS.forEach(type => {
    chrome.contextMenus.create({
      id: type.id,
      parentId: type.group,
      title: type.title,
      contexts: ['editable']
    });
  });
}

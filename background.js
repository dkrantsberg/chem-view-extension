/*  background.js – non-persistent (event) */

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "chemview-draw",
      title: "Show Chemical Structure",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "chemview-draw" && info.selectionText && tab.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: "chemview:draw",
        smiles: info.selectionText.trim()
      });
    }
  });
  
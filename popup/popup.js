document.getElementById("addBrainrotViewer").addEventListener("click", async () => {
    chrome.runtime.sendMessage({ action: 'addDraggableContainer' });
});

document.getElementById("removeAllBrainrotViewer").addEventListener("click", async () => {
    chrome.runtime.sendMessage({ action: 'removeAllDraggableContainer' });
});
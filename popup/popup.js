document.getElementById("addBrainrotViewer").addEventListener("click", async () => {
    chrome.runtime.sendMessage({ action: 'addDraggableContainer' });
});
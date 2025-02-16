document.getElementById("addBrainrotViewer").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.runtime.sendMessage({ action: 'addDraggableContainer' });
});
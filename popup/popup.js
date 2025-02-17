$("#addBrainrotViewer").on("click", async () => {
    const mult = $("#addBrainrotViewerMult").val();
    chrome.runtime.sendMessage({ action: 'addDraggableContainer', mult: mult });
});

$("#removeAllBrainrotViewer").on("click", async () => {
    chrome.runtime.sendMessage({ action: 'removeAllDraggableContainer' });
});
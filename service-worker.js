chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'addDraggableContainer') {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const activeTab = tabs[0];
			if (activeTab && activeTab.id) {
			  // Send a message to the content script
			  chrome.tabs.sendMessage(activeTab.id, { action: 'addDraggableContainer' });
			}
		  });
	}
});
//Handles popup.js->content.js communication
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

//init default options
chrome.runtime.onInstalled.addListener(() => {
	// Set default options if they don't exist already
	chrome.storage.sync.get(['ytEmbeds'], (settings) => {
		if (!settings.ytEmbeds) {
			const defaultYtEmbeds = [
				`L_fcrOyoWZ8`,
				`tbsvz8pF84U`
			];
			chrome.storage.sync.set({ ytEmbeds: defaultYtEmbeds });
		}
	});
});
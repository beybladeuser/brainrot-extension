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
	if (message.action === 'removeAllDraggableContainer') {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const activeTab = tabs[0];
			if (activeTab && activeTab.id) {
				// Send a message to the content script
				chrome.tabs.sendMessage(activeTab.id, { action: 'removeAllDraggableContainer' });
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
				//[vid_id, width, height, platform]
				[`L_fcrOyoWZ8`,`560`, `315`, `yt`],
				[`7ghSziUQnhs`,`560`, `315`, `yt`],
				[`Xuv1wMsUz5c`,`560`, `315`, `yt`],
				[`bjnTsq0GnoA`,`560`, `315`, `yt`],
				[`zZ7AimPACzc`, `144`, `315`, `yt`],
				[`MoDM6ppz5OE`, `250`, `315`, `yt`],
				//[`HAsemyRhNj8`, `175`, `315`, `yt`],
				//[`6786a1d2e6e68`, `560`, `315`, `ph`],
			];
			chrome.storage.sync.set({ ytEmbeds: defaultYtEmbeds });
		}
	});
});
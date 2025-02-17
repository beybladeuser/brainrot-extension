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
				`<iframe width="560" height="315" src="https://www.youtube.com/embed/L_fcrOyoWZ8?si=ER26A200E_NMjDgu&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
				`<iframe width="560" height="315" src="https://www.youtube.com/embed/tbsvz8pF84U?si=EXTaVszmlCFL5zEy&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
			];
			chrome.storage.sync.set({ ytEmbeds: defaultYtEmbeds });
		}
	});
});
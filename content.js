chrome.runtime.onMessage.addListener((message) => {
	if (message.action === 'addDraggableContainer') {
		addDraggableContainer();  // Call the function when the message is received
	}
});

function addDraggableContainer() {
	var count = $("#brainrotDraggableContainerCount").length;
	if (count == 0) {
		$("body").append(`<input id="brainrotDraggableContainerCount" type="hidden" value="0">`);
	}
	count = $("#brainrotDraggableContainerCount").val();

	$("body").append(`
        <div id="brainrotDraggableContainer-${count}" class="brainrotDraggableContainer"></div>
    `);

	const draggableContainer = $(`#brainrotDraggableContainer-${count}`);

	$("#brainrotDraggableContainerCount").val(parseInt(count) + 1)
	draggableContainer.draggable();

	fetch(chrome.runtime.getURL("brainrot-viewer.html"))
		.then((response) => response.text())
		.then((html) => {
			draggableContainer.append(html);
			$(`#brainrotDraggableContainer-${count} .brainrotViewerRemoveButton`).on("click", () => {
				removeDraggableContainer(draggableContainer);
			});

			const iframeContainer = $(`#brainrotDraggableContainer-${count} .brainrotIframeContainer`);
			chrome.storage.sync.get(['ytEmbeds'], (settings) => {
				const selectedEmbed = Math.floor(Math.random() * settings.ytEmbeds.length);

				iframeContainer.append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${settings.ytEmbeds[selectedEmbed]}?controls=0&amp;autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);

				const iframe = $(`#brainrotDraggableContainer-${count} iframe`);
				draggableContainer.on("dragstart", () => {
					iframe.css("pointer-events", "none");
					draggableContainer.css({
						"z-index": "9999",
					});
				});

				draggableContainer.on("dragstop", () => {
					iframe.css("pointer-events", "auto");
					draggableContainer.css({
						"z-index": "",
					});
				});
			});

		})
		.catch((err) => console.error("Error loading HTML:", err));
}

function removeDraggableContainer(draggableContainer) {
	draggableContainer.remove();
}
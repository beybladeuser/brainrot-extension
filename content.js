chrome.runtime.onMessage.addListener((message) => {
	if (message.action === 'addDraggableContainer') {
		for (let index = 0; index < message.mult; index++) {
			addDraggableContainer();
		}
	}
	if (message.action === 'removeAllDraggableContainer') {
		removeDraggableContainer($(".brainrotDraggableContainer"));
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
				iframeContainer.append(buildEmbedString(settings));

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

				const maxX = $(window).width() - draggableContainer.outerWidth();
				const maxY = $(window).height() - draggableContainer.outerHeight();

				const randomX = Math.floor(Math.random() * maxX);
				const randomY = Math.floor(Math.random() * maxY);

				draggableContainer.css({
					left: `${randomX}px`,
					top: `${randomY}px`
				});
			});

		})
		.catch((err) => console.error("Error loading HTML:", err));
}

function removeDraggableContainer(draggableContainer) {
	draggableContainer.remove();
}

function buildEmbedString(settings) {
	const selectedEmbed = Math.floor(Math.random() * settings.ytEmbeds.length);

	const id = settings.ytEmbeds[selectedEmbed][0];
	const width = settings.ytEmbeds[selectedEmbed][1];
	const height = settings.ytEmbeds[selectedEmbed][2];
	const platform = settings.ytEmbeds[selectedEmbed][3];

	if (platform == "yt") {
		//youtube embed
		return `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${id}?controls=0&amp;autoplay=1&amp;loop=1&amp;playlist=${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
	}
	else if (platform == "ph") {
		//uwu embed
		return `<iframe src="https://www.pornhub.com/embed/${id}" frameborder="0" width="${width}" height="${height}" scrolling="no" allowfullscreen></iframe>`
	}
}
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
        <div id="brainrotDraggableContainer-${count}" class="brainrotDraggableContainer">
		</div>
    `);

	const draggableContainer = $(`#brainrotDraggableContainer-${count}`);

	$("#brainrotDraggableContainerCount").val(parseInt(count) + 1)
	draggableContainer.draggable();

	fetch(chrome.runtime.getURL("brainrot-viewer.html"))
		.then((response) => response.text())
		.then((html) => {
			draggableContainer.append(html);
			const iframe = $(`#brainrotDraggableContainer-${count} iframe`);
			draggableContainer.on("dragstart", () => {
				iframe.css("pointer-events", "none");
			});

			draggableContainer.on("dragstop", () => {
				iframe.css("pointer-events", "auto");
			});
		})
		.catch((err) => console.error("Error loading HTML:", err));

}
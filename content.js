chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'addDraggableContainer') {
        addDraggableContainer();  // Call the function when the message is received
    }
});

function addDraggableContainer() {
	const count = $(".brainrotDraggableContainer").length;
	console.log()

    $("body").append(`
        <div id="brainrotDraggableContainer-${count}" class="brainrotDraggableContainer">
		</div>
    `);
	const draggableContainer = $(`#brainrotDraggableContainer-${count}`);
    draggableContainer.draggable();

	fetch(chrome.runtime.getURL("brainrot-viewer.html"))
        .then((response) => response.text())
        .then((html) => {
            draggableContainer.append(html);
        })
        .catch((err) => console.error("Error loading HTML:", err));

}
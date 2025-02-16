addDraggableContainer();
addDraggableContainer();

function addDraggableContainer() {
	const count = $(".brainrotDraggableContainer").length;
	console.log()

    $("body").append(`
        <div id="brainrotDraggableContainer-${count}" class="brainrotDraggableContainer">Drag Me!</div>
    `);
    $(`#brainrotDraggableContainer-${count}`).draggable();
}
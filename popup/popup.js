$(document).ready(() => {
    $("#addBrainrotViewer").on("click", async () => {
        const mult = $("#addBrainrotViewerMult").val();
        chrome.runtime.sendMessage({ action: 'addDraggableContainer', mult: mult });
    });

    $("#removeAllBrainrotViewer").on("click", async () => {
        chrome.runtime.sendMessage({ action: 'removeAllDraggableContainer' });
    });

    const brainrotEmbedEditor = $("#brainrotEmbedEditor")
    chrome.storage.sync.get(['ytEmbeds'], (settings) => {
        settings.ytEmbeds.forEach((element, index) => {
            const embedString = `<div id="brainrotEmbedEditor-${index}" class="d-flex flex-row pb-1">
                <div class="input-group mb-1">
                    <span class="input-group-text" id="brainrotEmbedEditor-${index}-id">Id</span>
                    <input value="${element[0]}" type="text" class="form-control" placeholder="6786a1d2e6e68" aria-label="Id" aria-describedby="brainrotEmbedEditor-${index}-id">
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text" id="brainrotEmbedEditor-${index}-width">W</span>
                    <input value="${element[1]}" type="number" class="form-control" placeholder="560" aria-label="Width" aria-describedby="brainrotEmbedEditor-${index}-width">
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text" id="brainrotEmbedEditor-${index}-height">H</span>
                    <input value="${element[2]}" type="number" class="form-control" placeholder="315" aria-label="Height" aria-describedby="brainrotEmbedEditor-${index}-height">
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text" id="brainrotEmbedEditor-${index}-platform">P</span>
                    <input value="${element[3]}" type="text" class="form-control" placeholder="yt" aria-label="Platform" aria-describedby="brainrotEmbedEditor-${index}-platform">
                </div>
            </div>`;
            brainrotEmbedEditor.append(embedString);
            $(`#brainrotEmbedEditor-${index} input`).on("change", saveYtEmbedChanges);
        });
    });
});

async function saveYtEmbedChanges() {
    chrome.storage.sync.get(['ytEmbedsParamCount'], (settings) => {
        const newYtEmbed = [];
        $(`#brainrotEmbedEditor input`).each((index, element) => {
            if (index % settings.ytEmbedsParamCount == 0) {
                newYtEmbed.push([]);
            }
            newYtEmbed[newYtEmbed.length-1].push($(element).val())
        });
        chrome.storage.sync.set({ ytEmbeds: newYtEmbed });
    });
}
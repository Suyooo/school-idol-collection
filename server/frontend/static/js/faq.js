let currentCopy = undefined;
let currentHash = undefined;
let linkNode = undefined;

function enterQuestion(e) {
    currentHash = "#" + e.target.id;
    currentCopy = window.location.href.split("#")[0] + currentHash;
    linkNode.detach().appendTo(e.target);
}

$(() => {
    linkNode = $("<div>").addClass("link");
    linkNode.on("click", () => {
        history.pushState({}, undefined, currentCopy);
        navigator.clipboard.writeText(currentCopy).catch(() => null);
    });
    $(".question")
        .on("mouseenter", enterQuestion)
        .on("mouseleave", () => {
            linkNode.detach();
        });
});
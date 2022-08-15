function submit() {
    const data = {
        pattern: patternid,
        cards: $("input[type=checkbox]:checked").toArray().map(e => {
            return {
                id: $(e).data("id"),
                line: Number($(e).data("line"))
            }
        })
    };
    console.log(data);
    $.ajax({
        type: "PUT",
        url: "/pattern/set/",
        contentType: "application/json",
        data: JSON.stringify(data)
    }).done((res) => {
        window.location.href = "/card/" + data.cards[0].id + "/";
    }).fail((jqxhr, textStatus, error) => {
        alert("Error while saving: " + error);
    });
}

$("#submit").on("click", submit);
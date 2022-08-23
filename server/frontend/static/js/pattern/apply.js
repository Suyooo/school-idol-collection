function submit() {
    const data = {
        id: patternid,
        applyTo: $("input.assign[type=checkbox]:checked").toArray()
            .map(e => parseInt($(e).data("skill")))
    };

    $.ajax({
        type: "PUT",
        url: "/api/pattern/apply/",
        contentType: "application/json",
        data: JSON.stringify(data)
    }).done((res) => {
        alert("Pattern successfully applied to " + (data.applyTo.length) + " Skill(s).")
    }).fail((jqxhr, textStatus, error) => {
        alert("Error while saving: " + error);
    });
}

function toggleAll(e) {
    const checked = $(e.target).prop("checked");
    $("input.assign[type=checkbox]").prop("checked", checked);
}

$("#all").on("change", toggleAll);
$("#submit").on("click", submit);
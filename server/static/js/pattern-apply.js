function submit() {
    const data = {
        id: patternid,
        applyTo: $("input.assign[type=checkbox]:checked").toArray().map(e => {
            if ($(e).hasClass("assign-card")) {
                return {
                    cardNo: $(e).data("cardno"),
                    line: parseInt($(e).data("line"))
                }
            } else {
                return {
                    groupId: $(e).data("groupid"),
                    line: parseInt($(e).data("line"))
                }
            }
        })
    };

    $.ajax({
        type: "PUT",
        url: "/pattern/apply/",
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
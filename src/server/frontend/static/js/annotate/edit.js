const skillField = $("#skill");
const result = $("#result");
const submitBtn = $("#sub");
const error = $("#error");

function doMarkup() {
    submitBtn.hide();
    error.hide();
    if ((skillField.val().match(/{{/g) || []).length !== (skillField.val().match(/}}/g) || []).length) {
        error.show().text("Unmatched {{ }} pair");
        return;
    }
    result.text(skillField.val());
    result.html(result.html().replace(/{{[a-z]*:/,"<a>").replace("}}","</a>"));
    submitBtn.show();
}

function pill(e) {
    const startPos = skillField.prop("selectionStart");
    const endPos = skillField.prop("selectionEnd");
    const text = skillField.val();

    skillField.val(text.substring(0, startPos) + "{{" + $(e.currentTarget).text() + ":" +
        text.substring(startPos, endPos) + "}}" + text.substring(endPos));
    doMarkup();
}

function submit() {
    submitBtn.hide();
    const data = {
        id: skillid,
        skill: skillField.val()
    }
    $.ajax({
        type: "PUT",
        url: "/api/annotate/",
        contentType: "application/json",
        data: JSON.stringify(data)
    }).done((res) => {
        window.location.href = "/card/" + redircardno + "/";
    }).fail((jqxhr, textStatus, error) => {
        alert("Error while saving: " + error);
        submitBtn.show();
    });
}

skillField.on("keyup", doMarkup);
$("#annotation_div .pill").on("click", pill);
submitBtn.on("click", submit);
doMarkup();
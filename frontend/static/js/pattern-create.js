const example = $("#example");
const regex = $("#regex");
const template = $("#template");
const submitBtn = $("#submit");
const regexError = $("#regex_error");
const templateError = $("#template_error");
const groupMatches = [...new Array(15)].map(i => $("#group" + (i + 1) + "_match"));

function tryPattern() {
    if (example[0] === undefined) {
        submitBtn.show();
        return;
    }

    submitBtn.hide();
    if (regex.val() === "") {
        regexError.hide();
        return;
    }

    if (regex.val().charAt(0) !== "^" || regex.val().charAt(regex.val().length - 1) !== "$") {
        regexError.text("regex must start/end with ^/$").show();
        return;
    }

    let r;
    try {
        r = new RegExp(regex.val());
    } catch (e) {
        regexError.text(e.message).show();
        return;
    }

    if (!r.test(example.val())) {
        regexError.text("not matching example").show();
        return;
    }
    regexError.hide();

    let skill = template.val();
    templateError.html("").hide();
    if (skill === "") {
        return;
    }

    const match = r.exec(example.val());
    groupMatches.forEach((e, i) => {
        const g = i + 1;
        if (g < match.length) {
            e.text(match[g]);
            let type = $("input[name='group" + g + "']:checked")?.attr("id");
            if (type === undefined) {
                templateError.append($("<div>").text("group " + g + " has no type set"));
                templateError.show();
                return;
            }
            type = type.charAt(type.length - 1);
            const pre = skill;
            if (type === "0") {
                skill = skill.replace(new RegExp("<" + g + ">", "g"), "EXAMPLE NAME");
                skill = skill.replace(new RegExp("<" + g + "a>", "g"), "[A]");
            } else if (type === "1") {
                skill = skill.replace(new RegExp("<" + g + ">", "g"), "EXAMPLE SONG");
                skill = skill.replace(new RegExp("<" + g + "a>", "g"), "[A]");
            } else if (type === "2") {
                skill = skill.replace(new RegExp("<" + g + ">", "g"), "EXAMPLE COSTUME");
                skill = skill.replace(new RegExp("<" + g + "a>", "g"), "[A]");
            } else if (type === "3") {
                skill = skill.replace(new RegExp("<" + g + ">", "g"), "EXAMPLE MEMORY");
                skill = skill.replace(new RegExp("<" + g + "a>", "g"), "[A]");
            } else if (type === "4") {
                const n = Number(match[g].normalize('NFKC'));
                skill = skill.replace(new RegExp("<" + g + ">", "g"), "" + n);
                skill = skill.replace(new RegExp("<" + g + "s>", "g"), n === 1 ? "" : "s");
                skill = skill.replace(new RegExp("<" + g + "sr>", "g"), n === 1 ? "s" : "");
                skill = skill.replace(new RegExp("<" + g + "x> ", "g"), n === 1 ? "" : n + " ");
                skill = skill.replace(new RegExp("<" + g + "e>", "g"), n === 1 ? "each" : "every " + n);
            } else if (type === "5") {
                const n = Number(match[g].normalize('NFKC'));
                const word = n < 0 || n > 12 ? "" + n : ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"][n];
                skill = skill.replace(new RegExp("<" + g + ">", "g"), word);
                skill = skill.replace(new RegExp("<" + g + "s>", "g"), n === 1 ? "" : "s");
                skill = skill.replace(new RegExp("<" + g + "sr>", "g"), n === 1 ? "s" : "");
                skill = skill.replace(new RegExp("<" + g + "x> ", "g"), n === 1 ? "" : word + " ");
                skill = skill.replace(new RegExp("<" + g + "e>", "g"), n === 1 ? "each" : "every " + word);
            } else if (type === "6") {
                const n = Number(match[g].normalize('NFKC'));
                const word = ["1st", "2nd", "3rd"][n - 1];
                skill = skill.replace(new RegExp("<" + g + ">", "g"), word);
            } else if (type === "7") {
                skill = skill.replace(new RegExp("<" + g + ">", "g"), "EXAMPLE PIECES");
            } else {
                templateError.append($("<div>").text("unknown group type " + type));
                templateError.show();
                return;
            }
            if (pre === skill) {
                templateError.append($("<div>").text("group " + g + " had no effect on template"));
                templateError.show();
            }
        } else e.text("");
    });

    if (templateError.html() !== "") {
        return;
    }
    if (skill.indexOf("<") !== -1) {
        templateError.append($("<div>").text("leftover replacement tokens"));
        templateError.show();
        return;
    }
    if (skill.indexOf("undefined") !== -1) {
        templateError.append($("<div>").text("result contains undefined"));
        templateError.show();
        return;
    }
    if (skill.indexOf("NaN") !== -1) {
        templateError.append($("<div>").text("result contains NaN"));
        templateError.show();
        return;
    }
    if (skill.search(/[０−９]/) !== -1) {
        templateError.append($("<div>").text("result contains fullwidth digits"));
        templateError.show();
        return;
    }
    if (templateError.html() !== "") {
        return;
    }

    $("#result").text(skill);
    submitBtn.show();
}

function regexPill(e) {
    navigator.clipboard.writeText($(e.currentTarget).text()).then(() => regex.trigger("focus"));
}

function templatePill(e) {
    navigator.clipboard.writeText($(e.currentTarget).text()).then(() => template.trigger("focus"));
}

function submit() {
    submitBtn.hide();
    const groupCount = (regex.val().match(/(?<!\\)\((?!\?:)/g) || []).length;
    const data = {
        patternid: patternid,
        triggers: $("#trigDiv input").toArray().map(e => $(e).prop("checked")),
        regex: regex.val(),
        template: template.val(),
        grouptypes: [...new Array(groupCount)]
            .map((g, i) => $("input[name='group" + (i + 1) + "']:checked").attr("id") || alert("Group #" + (i + 1) + " has no type set."))
            .map(s => s.charAt(s.length - 1)).join("")
    }
    $.ajax({
        type: "PUT",
        url: "/pattern/add/",
        contentType: "application/json",
        data: JSON.stringify(data)
    }).done((res) => {
        window.location.href = "/pattern/assign/" + res.patternId + "/";
    }).fail((jqxhr, textStatus, error) => {
        alert("Error while saving: " + error);
        submitBtn.show();
    });
}

example.on("keyup", tryPattern);
regex.on("keyup", tryPattern);
template.on("keyup", tryPattern);
submitBtn.on("click", submit);
$("input[type='radio']").on("click", tryPattern);
$("#regex_div .pill").on("click", regexPill);
$("#template_div .pill").on("click", templatePill);
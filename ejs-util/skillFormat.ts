import Language from "../consts/language";
import Annotation from "../annotator/annotation";
import Trigger from "../consts/triggers";
import Attribute from "../consts/attributes";
import PieceInfo from "../cards/pieceInfo";
import {num} from "../translate/skills/regex";
import {pieceFormat} from "./pieceFormat";

const triggerPatternJpn = /^(【[^【】]*?】(?:\/【[^【】]*?】)*)(.*?)$/g;
const abilityPatternJpn = /【(RUSH|LIVE)】/g;
const skillIconPatternJpn = /【([^【】]*?)】/g;
const namePatternJpn = /[『「][^『「』」]*?[』」]/g;
const lpBonusPatternJpn = /♪ライブP＋[^♪]*?♪/g;
const lpMalusPatternJpn = /♪ライブP－[^♪]*?♪/g;
const pieceGainPatternJpn = /＋(?:【(オール|赤|緑|青)】)+/g;
const idolizedConditionPatternJpn = /【覚醒\(仮\)】/g;
const piecePatternJpn = /(?:【(?:オール|赤|緑|青)】)+/g;
const attrReqPatternJpn = /【([０-９])([０-９])([０-９])】/g;
const lyricsPatternJpn = /^[^【].*?$/;

const triggerPatternEng = /^(\[[^\[\]]*?](?:\/\[[^\[\]]*?])*)(.*?)$/g;
const abilityPatternEng = /\[(RUSH|LIVE)]/g;
const skillIconPatternEng = /\[([^\[\]]*?)]/g;
const namePatternEng = /"[^"]*?"/g;
const lpBonusPatternEng = /♪Live Points \+[^♪]*?♪/g;
const lpMalusPatternEng = /♪Live Points -[^♪]*?♪/g;
const pieceGainPatternEng = /\+(?:\[(ALL|SMILE|PURE|COOL)])+/g;
const idolizedConditionPatternEng = /\[Idolized \(Piece Bonus\)]/g;
const piecePatternEng = /(?:\[(?:ALL|SMILE|PURE|COOL)])+/g;
const attrReqPatternEng = /\[(\d)(\d)(\d)]/g;
const lyricsPatternEng = /^[^\[].*?$/;

function resolveAnnotation(match: string, pre: string, type: string, param: string, post: string): string {
    const annotation = Annotation.getAnnotation(type, param);
    return "<a href='" + annotation.getHTMLLink() + "'>" + pre + annotation.getHTMLText() + post + '</a>';
}

function resolveSkill(match: string, triggers: string, skillLine: string, bracket: string, triggerFunc: (jpn: string) => Trigger) {
    let postSkillLine = "";
    const i = skillLine.indexOf(bracket);
    if (i !== -1) {
        postSkillLine = skillLine.substring(i, skillLine.length);
        skillLine = skillLine.substring(0, i);
    }
    return triggers.split("/").map(s => "<span class='skill " + triggerFunc(s.substring(1, s.length - 1)).className + "'>" + s + "</span>").join("/") +
        skillLine + ((skillLine.length > 0 && (triggers.indexOf(Trigger[7].jpn) !== -1 || triggers.indexOf(Trigger[7].eng) !== -1)) ? "<span class='skill sp-end'></span>" : '') + postSkillLine;
}

function resolveSkillJpn(match: string, triggers: string, skillLine: string) {
    return resolveSkill(match, triggers, skillLine, "（", Trigger.fromJpn);
}

function resolveSkillEng(match: string, triggers: string, skillLine: string) {
    return resolveSkill(match, triggers, skillLine, "(", Trigger.fromEng);
}

function resolveAbility(match: string, abilityType: string) {
    return '<span class="ability ' + abilityType.toLowerCase() + '">' + match + '</span>';
}

function resolveSkillIcon(match: string, triggerFunc: (label: string) => Trigger, triggerName: string) {
    try {
        return "<span class='skill " + triggerFunc(triggerName).className + "'>" + match + "</span>";
    } catch (e) {
        return undefined;
    }
}

function resolveSkillIconJpn(match: string, triggerName: string) {
    return resolveSkillIcon(match, Trigger.fromJpn, triggerName) || match;
}

function resolveSkillIconEng(match: string, triggerName: string) {
    return resolveSkillIcon(match, Trigger.fromEng, triggerName) || match;
}

function resolvePiece(lang: string, leftBracket: string, rightBracket: string, attrs: Attribute[]) {
    // @ts-ignore
    return "<b>" + attrs.map(attr => "<span class='piece " + attr.cssClassName + "'>" + leftBracket + attr[lang].toUpperCase() + rightBracket + "</span>").join("") + "</b>";
}

function resolvePieceJpn(match: string) {
    return resolvePiece("jpn", "【", "】", match.substring(1, match.length - 1).split("】【").map(PieceInfo.pieceToAttributeJpn));
}

function resolvePieceEng(match: string) {
    return resolvePiece("className", "[", "]", match.substring(1, match.length - 1).split("][").map(PieceInfo.pieceToAttributeEng));
}

function resolveAttrReq(smile: string, pure: string, cool: string, pre: string, post: string) {
    return "<span class='attrreq'>" + pre + pieceFormat(new PieceInfo(0, Number(num(smile)), Number(num(pure)), Number(num(cool)))) + post + "</span>";
}

function resolveAttrReqJpn(match: string, smile: string, pure: string, cool: string) {
    return resolveAttrReq(smile, pure, cool, "【", "】");
}

function resolveAttrReqEng(match: string, smile: string, pure: string, cool: string) {
    return resolveAttrReq(smile, pure, cool, "[", "]");
}

export function skillFormat(s: string | undefined, lang: Language, isFullSkillLine: boolean): string {
    if (s == undefined) {
        return "ー";
    }
    return s.split("\n").map(line => {
        if (lang == Language.JPN) {
            if (isFullSkillLine && lyricsPatternJpn.test(line)) {
                line = "<i>" + line + "</i>";
            } else {
                line = line.replace(Annotation.annotationPattern, resolveAnnotation);
                line = line.replace(pieceGainPatternJpn, "<b>$&</b>");
                line = line.replace(idolizedConditionPatternJpn, "<span class='idolized'>$&</span>")
                if (isFullSkillLine) line = line.replace(namePatternJpn, "<span class='redtext'>$&</span>")
                line = line.replace(lpBonusPatternJpn, "<span class='redtext'>$&</span>")
                line = line.replace(lpMalusPatternJpn, "<span class='bluetext'>$&</span>")
                if (isFullSkillLine) line = line.replace(triggerPatternJpn, resolveSkillJpn);
                line = line.replace(attrReqPatternJpn, resolveAttrReqJpn);
                line = line.replace(/【RUSH】\/【LIVE】/g, "<b><span class=\"ability rush\">【RUSH】</span><span class=\"ability or\">/</span><span class=\"ability live\">【LIVE】</span></b>");
                line = line.replace(abilityPatternJpn, resolveAbility);
                line = line.replace(skillIconPatternJpn, resolveSkillIconJpn);
                line = line.replace(piecePatternJpn, resolvePieceJpn);
                line = line.replace(/【☆】/g, "<span class='star'>$&</span>");
                line = line.replace(/「/g, "｢");
                line = line.replace(/」/g, "｣");
                line = line.replace(/《([^《》]*?)》/g, "<b>⟪$1⟫</b>");
            }
        } else {
            if (isFullSkillLine && lyricsPatternEng.test(line)) {
                line = "<i>" + line + "</i>";
            } else {
                line = line.replace(/{{card:/g, "{{card-en:");
                line = line.replace(Annotation.annotationPattern, resolveAnnotation);
                line = line.replace(pieceGainPatternEng, "<b>$&</b>");
                line = line.replace(idolizedConditionPatternEng, "<span class='idolized'>$&</span>")
                if (isFullSkillLine) line = line.replace(namePatternEng, "<span class='redtext'>$&</span>")
                line = line.replace(lpBonusPatternEng, "<span class='redtext'>$&</span>")
                line = line.replace(lpMalusPatternEng, "<span class='bluetext'>$&</span>")
                if (isFullSkillLine) line = line.replace(triggerPatternEng, resolveSkillEng);
                line = line.replace(attrReqPatternEng, resolveAttrReqEng);
                line = line.replace(/\[RUSH]\/\[LIVE]/g, "<b><span class=\"ability rush\">[RUSH]</span><span class=\"ability or\">/</span><span class=\"ability live\">[LIVE]</span></b>");
                line = line.replace(abilityPatternEng, resolveAbility);
                line = line.replace(skillIconPatternEng, resolveSkillIconEng);
                line = line.replace(piecePatternEng, resolvePieceEng);
                line = line.replace(/(1|2|3|one|two|three|has|each|more|no|with|without) (Stars?)/g, "<span class='nowrap'>$1 <span class='star'>$2</span></span>");
                line = line.replace(/⟪([^⟪⟫]*?)⟫/g, "<b>⟪$1⟫</b>");
            }
        }
        return line;
    }).join("<br>");
}

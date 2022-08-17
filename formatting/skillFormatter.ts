import Language from "../types/language";
import Annotation from "../annotator/annotation";
import Trigger, {TriggerNameEng, TriggerNameJpn} from "../types/trigger";
import Attribute, {PieceAttributeEngName, PieceAttributeJpnName} from "../types/attribute";
import PieceInfo from "../types/pieceInfo";
import {num} from "../translate/skills/regex";
import pieceFormat from "./pieceFormat";

type SkillFormatterRegexes =
    "lyrics"
    | "pieceGain"
    | "idolizedCondition"
    | "name"
    | "fullSkillWithTrigger"
    | "lpBonus"
    | "lpMalus"
    | "attrRequirement"
    | "abilityRushOrLive"
    | "ability"
    | "trigger"
    | "piece"
    | "stars"
    | "action";
type SkillFormatterTemplates = "rushOrLive" | "stars";

export default class SkillFormatter {
    private readonly lang: Language;
    private readonly regexes: { [K in SkillFormatterRegexes]: RegExp };
    private readonly templates: { [K in SkillFormatterTemplates]: string };

    private readonly nullLine: string;

    private constructor(lang: Language,
                        regexes: { [K in SkillFormatterRegexes]: RegExp },
                        templates: { [K in SkillFormatterTemplates]: string }) {
        this.lang = lang;
        this.regexes = regexes;
        this.templates = templates;

        this.nullLine = (lang === Language.JPN) ? "[skill line missing]" : "[translation missing]";
    }

    private async resolveAnnotation(match: string, pre: string, type: string, param: string, post: string): Promise<string> {
        const annotation = Annotation.makeAnnotation(type, param, this.lang);
        if (annotation === undefined) return match;
        return "<a href='" + (await annotation.getHTMLLink()) + "'>" + pre + (await annotation.getHTMLText()) + post + '</a>';
    }

    private resolveFullSkill(match: string, triggers: string, skillLine: string) {
        let postSkillLine = "";
        const i = skillLine.indexOf(this.lang.leftRoundBracket);
        if (i !== -1) {
            postSkillLine = skillLine.substring(i, skillLine.length);
            skillLine = skillLine.substring(0, i);
        }
        const triggerObjects = triggers.split("/").map(s => Trigger.get(s.substring(1, s.length - 1) as (TriggerNameJpn | TriggerNameEng)));
        return triggerObjects
                .map(t => "<span class='skill " + t.cssClassName + "'>" + t[this.lang.triggerNameProperty] + "</span>")
                .join("/")
            + skillLine
            + ((skillLine.length > 0 && triggerObjects.indexOf(Trigger.get("Special Practice")) !== -1)
                ? "<span class='skill sp-end'></span>"
                : "")
            + postSkillLine;
    }

    private static resolveAbility(match: string, abilityType: string) {
        return '<span class="ability ' + abilityType.toLowerCase() + '">' + match + '</span>';
    }

    private static resolveTrigger(match: string, triggerFunc: (label: TriggerNameJpn | TriggerNameEng) => Trigger, triggerName: string) {
        try {
            return "<span class='skill " + triggerFunc(triggerName as (TriggerNameJpn | TriggerNameEng)).cssClassName + "'>" + match + "</span>";
        } catch (e) {
            return match;
        }
    }

    private resolvePiece(match: string) {
        return "<b>"
            + match.substring(1, match.length - 1)
                .split(this.lang.rightSquareBracket + this.lang.leftSquareBracket)
                .map(attrsSplit => {
                    const attr = Attribute.get(attrsSplit as (PieceAttributeJpnName | PieceAttributeEngName));
                    return "<span class='piece " + attr.cssClassName + "'>"
                        + this.lang.leftSquareBracket + attr[this.lang.pieceNameProperty] + this.lang.rightSquareBracket
                        + "</span>"
                })
                .join("")
            + "</b>";
    }

    private resolveAttrRequirement(smile: string, pure: string, cool: string) {
        return "<span class='attrreq nowrap'>"
            + this.lang.leftSquareBracket
            + pieceFormat(new PieceInfo(0, num(smile), num(pure), num(cool)), this.lang)
            + this.lang.rightSquareBracket
            + "</span>";
    }

    async format(s: string[], isFullSkillLine: boolean): Promise<string> {
        if (s.length === 0) {
            return "ー";
        }
        const formattedLines: string[] = [];
        for (const origLine of s) {
            let line = origLine;
            if (isFullSkillLine && this.regexes.lyrics.test(line)) {
                line = "<i>" + line + "</i>";
            } else {
                let i = line.indexOf("{{");
                while (i !== -1) {
                    const match = line.substring(i - 1).match(Annotation.annotationPattern);
                    if (match !== null) {
                        const repl = await this.resolveAnnotation(match[0], match[1], match[2], match[3], match[4]);
                        line = line.replace(Annotation.annotationPattern, repl);
                    }
                    i = line.indexOf("{{", i);
                }

                line = line.replace(this.regexes.pieceGain, "<b class='nowrap'>$&</b>");
                line = line.replace(this.regexes.idolizedCondition, "<span class='idolized'>$&</span>");
                if (isFullSkillLine) {
                    line = line.replace(this.regexes.name, "<span class='redtext'>$&</span>");
                    line = line.replace(this.regexes.fullSkillWithTrigger, this.resolveFullSkill);
                }
                line = line.replace(this.regexes.lpBonus, "<span class='redtext nowrap'>$&</span>");
                line = line.replace(this.regexes.lpMalus, "<span class='bluetext nowrap'>$&</span>");
                line = line.replace(this.regexes.attrRequirement, this.resolveAttrRequirement);
                line = line.replace(this.regexes.abilityRushOrLive, this.templates.rushOrLive);
                line = line.replace(this.regexes.ability, SkillFormatter.resolveAbility);
                line = line.replace(this.regexes.trigger, SkillFormatter.resolveTrigger);
                line = line.replace(this.regexes.piece, this.resolvePiece);
                line = line.replace(this.regexes.stars, this.templates.stars);
                line = line.replace(this.regexes.action, "<b>⟪$1⟫</b>");
                if (this.lang == Language.JPN) {
                    // unify things a little by replacing full-width quotation marks with half-width ones
                    line = line.replace(/「/g, "｢");
                    line = line.replace(/」/g, "｣");
                }
            }
            formattedLines.push(line);
        }
        return formattedLines.join("<br>");
    }

    static readonly JPN = new SkillFormatter(Language.JPN, {
        lyrics: /^[^【].*?$/,
        pieceGain: /＋(?:【(オール|赤|緑|青)】)+/g,
        idolizedCondition: /【覚醒\(仮\)】/g,
        name: /[『「][^『「』」]*?[』」]/g,
        fullSkillWithTrigger: /^(【[^【】]*?】(?:\/【[^【】]*?】)*)(.*?)$/g,
        lpBonus: /♪ライブP＋[^♪]*?♪/g,
        lpMalus: /♪ライブP－[^♪]*?♪/g,
        attrRequirement: /【([０-９])([０-９])([０-９])】/g,
        abilityRushOrLive: /【RUSH】\/【LIVE】/g,
        ability: /【(RUSH|LIVE)】/g,
        trigger: /【([^【】]*?)】/g,
        piece: /(?:【(?:オール|赤|緑|青)】)+/g,
        stars: /【☆】/g,
        action: /《([^《》]*?)》/g
    }, {
        rushOrLive: "<span class='nowrap'><span class=\"ability rush\">【RUSH】</span><span class=\"ability or\">/</span><span class=\"ability live\">【LIVE】</span></span>",
        stars: "<span class='star'>$&</span>"
    });

    static readonly ENG = new SkillFormatter(Language.ENG, {
        lyrics: /^[^\[].*?$/,
        pieceGain: /\+(?:\[(ALL|SMILE|PURE|COOL)])+/g,
        idolizedCondition: /\[Idolized \(Piece Bonus\)]/g,
        name: /"[^"]*?"/g,
        fullSkillWithTrigger: /^(\[[^\[\]]*?](?:\/\[[^\[\]]*?])*)(.*?)$/g,
        lpBonus: /♪Live Points \+[^♪]*?♪/g,
        lpMalus: /♪Live Points -[^♪]*?♪/g,
        attrRequirement: /\[(\d)(\d)(\d)]/g,
        abilityRushOrLive: /\[RUSH]\/\[LIVE]/g,
        ability: /\[(RUSH|LIVE)]/g,
        trigger: /\[([^\[\]]*?)]/g,
        piece: /(?:\[(?:ALL|SMILE|PURE|COOL)])+/g,
        stars: /(1|2|3|one|two|three|has|each|more|no|with|without) (Stars?)/g,
        action: /⟪([^⟪⟫]*?)⟫/g
    }, {
        rushOrLive: "<span class='nowrap'><span class=\"ability rush\">[RUSH]</span><span class=\"ability or\">/</span><span class=\"ability live\">[LIVE]</span></span>",
        stars: "<span class='nowrap'>$1 <span class='star'>$2</span></span>"
    });
}
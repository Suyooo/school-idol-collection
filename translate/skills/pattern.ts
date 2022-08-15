import Trigger from "../../consts/triggers";
import PatternGroupType from "./patternGroupTypes";
import Log from "../../utils/logger";
import DB, {patternRow} from "../../utils/db";
import ParseError from "../../errors/parse";
import ErrorWithCause from "../../errors/errorWithCause";

const getPatternStmt = DB.prepare("SELECT * FROM patterns WHERE id = ?");
const insertPatternStmt = DB.prepare("INSERT OR REPLACE INTO patterns(triggers, regex, template, grouptypes) VALUES(?,?,?,?)");
const updatePatternStmt = DB.prepare("INSERT OR REPLACE INTO patterns(id, triggers, regex, template, grouptypes) VALUES(?,?,?,?,?)");

export function getPattern(id: number) {
    const r: patternRow = getPatternStmt.get(id);
    if (r === undefined) return undefined;
    return Pattern.loadFromRow(r);
}

export function addPattern(patternid: number | undefined, triggers: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean], regex: string, template: string, grouptypes: string) {
    const trigBitmask = triggers.map((t, i) => t ? 1 << i : 0).reduce((acc, i) => acc + i, 0);
    const res = patternid === undefined
        ? insertPatternStmt.run(trigBitmask, regex, template, grouptypes)
        : updatePatternStmt.run(patternid, trigBitmask, regex, template, grouptypes);
    return res.lastInsertRowid;
}

export class Pattern {
    readonly id: number;
    readonly triggers: Trigger[];
    readonly pattern: RegExp;
    readonly template: string;
    readonly groupTypes: PatternGroupType[];

    constructor(id: number, triggers: Trigger[], pattern: RegExp, template: string, groupTypes: PatternGroupType[]) {
        this.id = id;
        this.triggers = triggers;
        this.pattern = pattern;
        if (this.pattern.source.charAt(0) != "^")
            Log.warn("PATTERN", "Pattern #" + id + " does not start with ^");
        if (this.pattern.source.charAt(this.pattern.source.length - 1) != "$")
            Log.warn("PATTERN", "Pattern #" + id + " does not end with $");
        if (this.pattern.source.indexOf("\\d") !== -1 && this.pattern.source.indexOf("{{card:(\\d*)}}") !== -1)
            Log.warn("PATTERN", "Pattern #" + id + " contains digits character class outside card annotation");
        this.template = template;
        this.groupTypes = groupTypes;
    }

    static loadFromRow(row: patternRow): Pattern {
        const triggerIds = [];
        let i = 0;
        while (row.triggers > 0) {
            if ((row.triggers & 1) == 1) triggerIds.push(i);
            i++;
            row.triggers = row.triggers >> 1;
        }
        return new Pattern(row.id, triggerIds.map(i => Trigger[i]), new RegExp(row.regex), row.template,
            [...row.grouptypes].map(c => PatternGroupType[Number(c)]));
    }

    testSkill(skill: string): boolean {
        return this.pattern.test(skill);
    }

    translateSkill(skill: string): string {
        const match = this.pattern.exec(skill);
        if (match === null) {
            throw new ParseError("Pattern is not applicable");
        }
        if (match.length - 1 != this.groupTypes.length)
            Log.warn("PATTERN", "Pattern #" + this.id + " has " + (match.length - 1) + " groups but " + this.groupTypes.length + " types");

        const allRepls: string[] = new Array(this.groupTypes.length);
        try {
            for (let gi = 0; gi < this.groupTypes.length; gi++) {
                allRepls[gi] = this.groupTypes[gi].getReplacement(match[gi + 1]);
            }
        } catch (e) {
            throw new ErrorWithCause("Error while getting replacements: " + e.message, e);
        }

        let res = this.template;
        for (let gi = 0; gi < this.groupTypes.length; gi++) {
            let thisRes = res;
            thisRes = thisRes.replace(new RegExp("<" + (gi + 1) + ">", "g"), allRepls[gi]);
            for (const [from, to] of this.groupTypes[gi].getExtraReplacements(match[gi + 1], gi + 1, allRepls)) {
                thisRes = thisRes.replace(new RegExp(from, "g"), to);
            }

            if (thisRes == res) {
                Log.warn("PATTERN", "Replacements for Group #" + (gi + 1) + " in Pattern #" + this.id + " had no effect");
                Log.warn("PATTERN", "Skill: " + skill);
                Log.warn("PATTERN", "Pattern: " + this.pattern.source);
                Log.warn("PATTERN", "Template: " + this.template);
            }
            res = thisRes;
        }

        if (res.indexOf("<") !== -1) {
            Log.warn("PATTERN", "Pattern #" + this.id + " seems to have unused replacement tokens");
            Log.warn("PATTERN", "Result: " + res);
            Log.warn("PATTERN", "Pattern: " + this.pattern.source);
            Log.warn("PATTERN", "Template: " + this.template);
        }
        if (res.indexOf("undefined") !== -1) {
            Log.warn("PATTERN", "Pattern #" + this.id + " contains \"undefined\", something might have broken");
            Log.warn("PATTERN", "Result: " + res);
            Log.warn("PATTERN", "Pattern: " + this.pattern.source);
            Log.warn("PATTERN", "Template: " + this.template);
        }
        if (res.indexOf("NaN") !== -1) {
            Log.warn("PATTERN", "Pattern #" + this.id + " contains \"NaN\", something might have broken");
            Log.warn("PATTERN", "Result: " + res);
            Log.warn("PATTERN", "Pattern: " + this.pattern.source);
            Log.warn("PATTERN", "Template: " + this.template);
        }
        if (res.search(/[０−９]/) !== -1) {
            Log.warn("PATTERN", "Pattern #" + this.id + " contains fullwidth digits, something might have broken");
            Log.warn("PATTERN", "Result: " + res);
            Log.warn("PATTERN", "Pattern: " + this.pattern.source);
            Log.warn("PATTERN", "Template: " + this.template);
        }
        return res;
    }
}
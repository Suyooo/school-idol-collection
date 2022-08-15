import {
    AllowNull,
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

/*export function addPattern(patternid: number | undefined, triggers: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean], regex: string, template: string, grouptypes: string) {
    const trigBitmask = triggers.map((t, i) => t ? 1 << i : 0).reduce((acc, i) => acc + i, 0);
    const res = patternid === undefined
        ? insertPatternStmt.run(trigBitmask, regex, template, grouptypes)
        : updatePatternStmt.run(patternid, trigBitmask, regex, template, grouptypes);
    return res.lastInsertRowid;
}*/

@Table({timestamps: false})
export class Pattern extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    triggers: number; // TODO: getter/setter from bitmask to Trigger array

    @AllowNull(false)
    @Column
    pattern: string;

    @AllowNull(false)
    @Column
    template: string;

    @AllowNull(false)
    @Column
    groupTypes: string; // TODO: getter/setter from string to PatternGroupType array


    /*static loadFromRow(row: patternRow): Pattern {
        const triggerIds = [];
        let i = 0;
        while (row.triggers > 0) {
            if ((row.triggers & 1) == 1) triggerIds.push(i);
            i++;
            row.triggers = row.triggers >> 1;
        }
        return new Pattern(row.id, triggerIds.map(i => Trigger[i]), new RegExp(row.regex), row.template,
            [...row.grouptypes].map(c => PatternGroupType[Number(c)]));
    }*/

    /*testSkill(skill: string): boolean {
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
    }*/
}
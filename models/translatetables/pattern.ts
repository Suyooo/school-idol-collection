import {
    AllowNull,
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

import Trigger, {TriggerID} from "../../types/trigger";
import PatternGroupType, {PatternGroupTypeID} from "../../types/patternGroupType";

@Table({timestamps: false})
export default class TranslateTablePattern extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    triggers: number;

    get triggerArray(): Trigger[] {
        const triggers: Trigger[] = [];
        let triggerBitmask: number = this.triggers;
        let i: number = 0;
        while (triggerBitmask > 0 && i < 8) {
            if ((triggerBitmask & 1) == 1) triggers.push(Trigger.get(<TriggerID>i));
            i++;
            triggerBitmask = triggerBitmask >> 1;
        }
        return triggers;
    }

    set triggerArray(triggers: Trigger[]) {
        this.triggers = triggers.map(t => 1 << t.id).reduce((acc, i) => acc + i, 0);
    }

    @AllowNull(false)
    @Column
    regex: string;

    @AllowNull(false)
    @Column
    template: string;

    @AllowNull(false)
    @Column
    groupTypes: string;

    get groupTypeArray(): PatternGroupType[] {
        const types = [];
        let typeString: string = this.groupTypes;
        for (let i: number = 0; i < typeString.length; i++) {
            const n: number = parseInt(typeString.charAt(i));
            types.push(PatternGroupType.get(<PatternGroupTypeID>n));
        }
        return types;
    }

    set groupTypeArray(types: PatternGroupType[]) {
        let typeString: string = "";
        for (let i: number = 0; i < types.length; i++) {
            typeString += types[i].id;
        }
        this.groupTypes = typeString;
    }

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
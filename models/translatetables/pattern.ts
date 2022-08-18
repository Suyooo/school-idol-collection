import {
    AllowNull,
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

import Trigger, {TriggerID, TriggerNameJpn} from "../../types/trigger";
import PatternGroupType, {PatternGroupTypeID} from "../../types/patternGroupType";
import DB from "../db";
import {escapeForRegex} from "../../utils/regex";
import {splitTriggersFromSkill} from "../../translation/skills";

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


    static buildSkeletonFromSkill(skillLine: string): TranslateTablePattern {
        const { skill, triggers } = splitTriggersFromSkill(skillLine);
        const skel = DB.TranslateTablePattern.build({
            triggers: 0,
            regex: "^" + escapeForRegex(skill) + "$",
            template: skill,
            groupTypes: ""
        });
        skel.triggerArray = triggers;
        return skel;
    }
}
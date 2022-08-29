import {
    AfterUpdate,
    AllowNull,
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

import Trigger, {TriggerID} from "../../translation/trigger";
import PatternGroupType, {PatternGroupTypeID} from "../../translation/patternGroupType";
import DB from "../db";
import {escapeForRegex} from "../../utils/convert";
import {splitTriggersFromSkill} from "../../translation/skills";
import {QueryOptions} from "sequelize";

@Table({timestamps: false})
export default class TranslationPattern extends Model {
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


    static buildSkeletonFromSkill(skillLine: string): TranslationPattern {
        const {skill, triggers} = splitTriggersFromSkill(skillLine);
        const skel = DB.TranslationPattern.build({
            triggers: 0,
            regex: "^" + escapeForRegex(skill) + "$",
            template: skill,
            groupTypes: ""
        });
        skel.triggerArray = triggers;
        return skel;
    }

    @AfterUpdate
    static async purgeTranslations(pattern: TranslationPattern, options: QueryOptions) {
        await DB.Skill.update(
            {eng: null, patternId: null},
            {
                where: {pattern: pattern.id},
                transaction: options.transaction
            });
    }
}
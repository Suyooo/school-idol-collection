import {
    AfterUpdate,
    AllowNull,
    AutoIncrement,
    Column, DataType,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

import DB from "../db";
import Trigger from "$translation/trigger";
import type {TriggerID} from "$translation/trigger";
import PatternGroupType from "$translation/patternGroupType";
import type {PatternGroupTypeID} from "$translation/patternGroupType";
import {escapeForRegex} from "$utils/convert";
import {splitTriggersFromSkill} from "$translation/skills";
import type {QueryOptions} from "sequelize";

@Table({
    modelName: "TranslationPattern",
    timestamps: false
})
export default class TranslationPattern extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    pattId!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    triggers!: number;

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
    @Column(DataType.STRING)
    regex!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    template!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    groupTypes!: string;

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
                where: {pattern: pattern.pattId},
                transaction: options.transaction
            });
    }
}
import {AfterUpdate, Attribute, Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";
import type {QueryOptions} from "@sequelize/core";

import Trigger from "$translation/trigger.js";
import type {TriggerID} from "$translation/trigger.js";
import PatternGroupType from "$translation/patternGroupType.js";
import type {PatternGroupTypeID} from "$translation/patternGroupType.js";
import {escapeForRegex} from "$utils/convert.js";
import {splitTriggersFromSkill} from "$translation/skills.js";

@Table({
    modelName: "TranslationPattern",
    timestamps: false
})
export default class TranslationPattern extends Model {
    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    })
    declare id: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare triggers: number;

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

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare regex: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare template: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare groupTypes: string;

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
        const skel = TranslationPattern.build({
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
        await TranslationPattern.associations.Skill.target.update(
            {eng: null, patternId: null},
            {
                where: {pattern: pattern.id},
                transaction: options.transaction
            });
    }
}
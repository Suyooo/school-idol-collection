import type {ParseNodePrepared} from "$lib/format/format.js";
import searchQuery from "$lib/search/query.js";
import {
    AfterCreate,
    AfterUpdate,
    Attribute,
    BeforeUpdate,
    BelongsTo,
    HasMany,
    Table
} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model,} from "@sequelize/core";
import type {QueryOptions} from "@sequelize/core";

import type Card from "$models/card/card.js";
import type CardMemberGroup from "$models/card/memberGroup.js";
import type TranslationPattern from "$models/translation/pattern.js";
import type Annotation from "$models/skill/annotation.js";

import AnnotationEnum from "$lib/enums/annotation.js";

@Table({
    modelName: "Skill",
    timestamps: false,
    validate: {
        eitherCardOrGroup(this: Skill) {
            if ((this.cardNo === null) === (this.groupId === null)) {
                if (this.cardNo === null)
                    throw new Error("Skill is not assigned to either a card or a group, must be exactly one");
                else
                    throw new Error("Skill is not assigned to both a card and a group, must be exactly one");
            }
            return true;
        }
    }
})
export class SkillBase extends Model {
    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    })
    declare id: number;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: true
    })
    declare cardNo: string | null;
    /* inverse of association in Card */
    declare card: Card | null;

    isCardSkill(): this is SkillCard {
        return this.cardNo !== null;
    }

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    })
    declare groupId: number | null;
    /* inverse of association in CardMemberGroup */
    declare group: CardMemberGroup | null;

    isGroupSkill(): this is SkillGroup {
        return this.groupId !== null;
    }

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare line: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED
    })
    declare patternId: number | null;
    @BelongsTo((s) => s.models.TranslationPattern, {
        as: "pattern", foreignKey: "patternId"
    })
    declare pattern: TranslationPattern | null;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare jpn: string;
    declare jpnPreparsed?: ParseNodePrepared[];

    @Attribute({
        type: DataTypes.STRING,
        allowNull: true
    })
    declare eng: string | null;
    declare engPreparsed?: ParseNodePrepared[] | null;

    @HasMany((s) => s.models.Annotation, {
        as: "annotation", foreignKey: "skillId", inverse: {as: "skill"}
    })
    declare annotations: Annotation[];

    @BeforeUpdate
    static async clearAnnotations(skill: Skill, options: QueryOptions) {
        if (skill.changed("jpn"))
            await SkillBase.associations.Annotation.target.destroy({
                where: {skillId: skill.id, isEng: false},
                transaction: options.transaction
            });
        if (skill.changed("eng"))
            await SkillBase.associations.Annotation.target.destroy({
                where: {skillId: skill.id, isEng: true},
                transaction: options.transaction
            });
    }

    @AfterCreate
    @AfterUpdate
    static async recordAnnotations(skill: Skill, options: QueryOptions) {
        if (skill.changed("jpn")) {
            for (const [_, key, parameter] of skill.jpn.matchAll(/{{(.*?):(.*?)}}/g)) {
                const type = AnnotationEnum.fromKey(key);
                const annotation = <Annotation>await SkillBase.associations.Annotation.target.create({
                    skillId: skill.id,
                    isEng: false,
                    type: type.id,
                    parameter
                }, {transaction: options.transaction});
                await SkillBase.associations.Link.target
                    .bulkCreate((await searchQuery(type.getSearchFilters(parameter), "viewCardNoOnly", options))
                        .map(c => ({
                            from: annotation.id,
                            to: c.cardNo
                        })), {transaction: options.transaction});
            }
        }
        if (skill.changed("eng") && skill.eng !== null) {
            for (const [_, key, parameter] of skill.eng.matchAll(/{{(.*?):(.*?)}}/g)) {
                const type = AnnotationEnum.fromKey(key);
                const annotation = <Annotation>await SkillBase.associations.Annotation.target.create({
                    skillId: skill.id,
                    isEng: true,
                    type: type.id,
                    parameter
                }, {transaction: options.transaction});
                await SkillBase.associations.Link.target
                    .bulkCreate((await searchQuery(type.getSearchFilters(parameter), "viewCardNoOnly", options))
                        .map(c => ({
                            from: annotation.id,
                            to: c.cardNo
                        })), {transaction: options.transaction});
            }
        }
    }
}

export class SkillCard extends SkillBase {
    declare cardNo: string;
    declare card: Card;
    declare groupId: null;
    declare group: null;
}

export class SkillGroup extends SkillBase {
    declare cardNo: null;
    declare card: null;
    declare groupId: number;
    declare group: CardMemberGroup;
}

type Skill = SkillCard | SkillGroup;
export default Skill;
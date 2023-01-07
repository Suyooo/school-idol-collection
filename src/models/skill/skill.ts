import {
    AfterCreate,
    AfterUpdate,
    AllowNull,
    AutoIncrement,
    BeforeUpdate,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Min,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import type {QueryOptions} from "sequelize";
import DB from "$models/db";

import type Card from "$models/card/card";
import CardMemberGroup from "$models/card/memberGroup";
import TranslationPattern from "$models/translation/pattern";

import AnnotationType from "$types/annotationType";
import type {AnnotationTypeKey} from "$types/annotationType";
import Annotation from "$models/skill/annotation";
import {CardBase} from "$models/card/card";

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
        }
    }
})
export class SkillBase extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    skillId!: number;

    @ForeignKey(() => CardBase)
    @Column(DataType.STRING)
    cardNo!: string | null;
    @BelongsTo(() => CardBase)
    card!: Card | null;

    isCardSkill(): this is SkillCard {
        return this.cardNo !== null;
    }

    @ForeignKey(() => CardMemberGroup)
    @Column(DataType.NUMBER)
    groupId!: number | null;
    @BelongsTo(() => CardMemberGroup)
    group!: CardMemberGroup | null;

    isGroupSkill(): this is SkillGroup {
        return this.groupId !== null;
    }

    @AllowNull(false)
    @Min(0)
    @Column
    line!: number;

    @ForeignKey(() => TranslationPattern)
    @Column(DataType.NUMBER)
    patternId!: number | null;

    @BelongsTo(() => TranslationPattern)
    pattern!: TranslationPattern | null;

    @AllowNull(false)
    @Column
    jpn!: string;

    @Column(DataType.STRING)
    eng!: string | null;

    @HasMany(() => Annotation)
    annotations!: Annotation[];

    @BeforeUpdate
    static async clearAnnotations(skill: Skill, options: QueryOptions) {
        if (skill.changed("jpn"))
            await DB.Annotation.destroy({
                where: {skillId: skill.skillId, isEng: false},
                transaction: options.transaction
            });
        if (skill.changed("eng"))
            await DB.Annotation.destroy({
                where: {skillId: skill.skillId, isEng: true},
                transaction: options.transaction
            });
    }

    @AfterCreate
    @AfterUpdate
    static async recordAnnotations(skill: Skill, options: QueryOptions) {
        if (skill.changed("jpn")) {
            for (const [_, key, parameter] of skill.jpn.matchAll(/{{(.*?):(.*?)}}/g)) {
                const type = AnnotationType.get(key as AnnotationTypeKey);
                const annotation = await DB.Annotation.create({
                    skillId: skill.skillId,
                    isEng: false,
                    type: type.id,
                    parameter
                }, {transaction: options.transaction});
                await DB.Link.bulkCreate((await type.getCards(parameter, {transaction: options.transaction})).map(c => ({
                    from: annotation.annoId,
                    to: c.cardNo
                })), {transaction: options.transaction});
            }
        }
        if (skill.changed("eng") && skill.eng !== null) {
            for (const [_, key, parameter] of skill.eng.matchAll(/{{(.*?):(.*?)}}/g)) {
                const type = AnnotationType.get(key as AnnotationTypeKey);
                const annotation = await DB.Annotation.create({
                    skillId: skill.skillId,
                    isEng: true,
                    type: type.id,
                    parameter
                }, {transaction: options.transaction});
                await DB.Link.bulkCreate((await type.getCards(parameter, {transaction: options.transaction})).map(c => ({
                    from: annotation.annoId,
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
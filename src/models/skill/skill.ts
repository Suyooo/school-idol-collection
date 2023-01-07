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

import Card from "$models/card/card";
import CardMemberGroup from "$models/card/memberGroup";
import TranslationPattern from "$models/translation/pattern";

import AnnotationType from "$types/annotationType";
import type {AnnotationTypeKey} from "$types/annotationType";
import Annotation from "$models/skill/annotation";

@Table({timestamps: false})
export default class Skill extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    skillId!: number;

    @ForeignKey(() => Card)
    @Column(DataType.STRING)
    cardNo!: string | null;
    @BelongsTo(() => Card)
    card!: Card | null;

    @ForeignKey(() => CardMemberGroup)
    @Column(DataType.NUMBER)
    groupId!: number | null;
    @BelongsTo(() => CardMemberGroup)
    group!: CardMemberGroup | null;

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
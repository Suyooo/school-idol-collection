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
import {QueryOptions} from "sequelize";
import DB from "../db";

import Card from "../card/card";
import CardMemberGroup from "../card/memberGroup";
import TranslationPattern from "../translation/pattern";

import AnnotationType, {AnnotationTypeKey} from "../../types/annotationType";
import Annotation from "./annotation";

@Table({timestamps: false})
export default class Skill extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Card)
    @Column(DataType.STRING)
    cardNo: string | null;
    @BelongsTo(() => Card)
    card: Card;

    @ForeignKey(() => CardMemberGroup)
    @Column(DataType.NUMBER)
    groupId: number | null;
    @BelongsTo(() => CardMemberGroup)
    group: CardMemberGroup;

    @AllowNull(false)
    @Min(0)
    @Column
    line!: number;

    @ForeignKey(() => TranslationPattern)
    @Column(DataType.NUMBER)
    patternId: number | null;

    @BelongsTo(() => TranslationPattern)
    pattern: TranslationPattern;

    @AllowNull(false)
    @Column
    jpn!: string;

    @Column(DataType.STRING)
    eng: string | null;

    @HasMany(() => Annotation)
    annotations!: Annotation[];

    @BeforeUpdate
    static async clearAnnotations(skill: Skill, options: QueryOptions) {
        if (skill.changed("jpn"))
            await DB.Annotation.destroy({
                where: {skillId: skill.id, isEng: false},
                transaction: options.transaction
            });
        if (skill.changed("eng"))
            await DB.Annotation.destroy({
                where: {skillId: skill.id, isEng: true},
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
                    skillId: skill.id,
                    isEng: false,
                    type: type.id,
                    parameter
                }, {transaction: options.transaction});
                await DB.Link.bulkCreate((await type.getCards(parameter)).map(c => ({
                    from: annotation.id,
                    to: c.cardNo
                })), {transaction: options.transaction});
            }
        }
        if (skill.changed("eng") && skill.eng !== null) {
            for (const [_, key, parameter] of skill.eng.matchAll(/{{(.*?):(.*?)}}/g)) {
                const type = AnnotationType.get(key as AnnotationTypeKey);
                const annotation = await DB.Annotation.create({
                    skillId: skill.id,
                    isEng: true,
                    type: type.id,
                    parameter
                }, {transaction: options.transaction});
                await DB.Link.bulkCreate((await type.getCards(parameter)).map(c => ({
                    from: annotation.id,
                    to: c.cardNo
                })), {transaction: options.transaction});
            }
        }
    }
}
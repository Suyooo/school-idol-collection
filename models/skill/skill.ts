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

    @BeforeUpdate
    static async clearAnnotations(skill: Skill, options: QueryOptions) {
        if (skill.changed("jpn"))
            await DB.AnnotationRecord.destroy({
                where: {skillId: skill.id, isEng: false},
                transaction: options.transaction
            });
        if (skill.changed("eng"))
            await DB.AnnotationRecord.destroy({
                where: {skillId: skill.id, isEng: true},
                transaction: options.transaction
            });
    }

    @AfterCreate
    @AfterUpdate
    static async recordAnnotations(skill: Skill, options: QueryOptions) {
        if (skill.changed("jpn")) {
            for (const [_, key, parameter] of skill.jpn.matchAll(/{{(.*?):(.*?)}}/g)) {
                await DB.AnnotationRecord.create({
                    skillId: skill.id,
                    isEng: false,
                    type: AnnotationType.get(key as AnnotationTypeKey).id,
                    parameter
                }, {transaction: options.transaction});
            }
        }
        if (skill.changed("eng") && skill.eng !== null) {
            for (const [_, key, parameter] of skill.eng.matchAll(/{{(.*?):(.*?)}}/g)) {
                await DB.AnnotationRecord.create({
                    skillId: skill.id,
                    isEng: true,
                    type: AnnotationType.get(key as AnnotationTypeKey).id,
                    parameter
                }, {transaction: options.transaction});
            }
        }
    }
}
import type { AnnotationID } from "$l/enums/annotation.js";
import type Card from "$m/card/card.js";
import type Link from "$m/skill/link.js";
import type Skill from "$m/skill/skill.js";
import { DataTypes, Model } from "@sequelize/core";
import { Attribute, BelongsToMany, Table } from "@sequelize/core/decorators-legacy";

@Table({
    modelName: "Annotation",
    timestamps: false,
})
export default class Annotation extends Model {
    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    declare id: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    })
    declare skillId: number;
    /* inverse of association in Skill */
    declare skill: Skill;

    @Attribute({
        type: DataTypes.BOOLEAN,
        allowNull: false,
    })
    declare isEng: boolean;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    })
    declare type: AnnotationID;

    @Attribute({
        type: DataTypes.STRING(4096),
        allowNull: false,
    })
    declare parameter: string;

    @BelongsToMany((s) => s.models.Card, {
        foreignKey: "from",
        otherKey: "to",
        inverse: { as: "linkedBy" },
        through: {
            model: (s) => s.models.Link,
            unique: false,
        },
    })
    declare links: (Card & { Link: Link })[];
}

import {Attribute, BelongsToMany, Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";

import type Card from "$models/card/card.js";
import type Link from "$models/skill/link.js";
import type Skill from "$models/skill/skill.js";

import AnnotationType from "$lib/types/annotationType.js";
import type {AnnotationTypeID} from "$lib/types/annotationType.js";

@Table({
    modelName: "Annotation",
    timestamps: false
})
export default class Annotation extends Model {
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
    declare skillId: number;
    /* inverse of association in Skill */
    declare skill: Skill;

    @Attribute({
        type: DataTypes.BOOLEAN,
        allowNull: false
    })
    declare isEng: boolean;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare type: AnnotationTypeID;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare parameter: string;

    @BelongsToMany((s) => s.models.Card, {
        as: "links",
        foreignKey: "from",
        otherKey: "to",
        inverse: { as: "linkedBy" },
        through: {
            model: (s) => s.models.Link,
            unique: false
        }
    })
    declare links: (Card & { Link: Link })[];
}
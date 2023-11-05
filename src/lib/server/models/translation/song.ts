import { DataTypes, Model } from "@sequelize/core";
import { Attribute, Table } from "@sequelize/core/decorators-legacy";
import type { GroupID } from "$lib/enums/group.js";

@Table({
	modelName: "TranslationSong",
	timestamps: false,
})
export default class TranslationSong extends Model {
	@Attribute({
		type: DataTypes.INTEGER.UNSIGNED,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	})
	declare id: number;

	@Attribute({
		type: DataTypes.STRING(512),
		unique: true,
		allowNull: false,
	})
	declare jpn: string;

	@Attribute({
		type: DataTypes.STRING(512),
		allowNull: false,
	})
	declare eng: string;

	@Attribute({
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
	})
	declare group: GroupID;
}

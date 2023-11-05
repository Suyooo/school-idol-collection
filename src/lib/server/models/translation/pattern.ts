import { DataTypes, Model } from "@sequelize/core";
import type { QueryOptions } from "@sequelize/core";
import { AfterUpdate, Attribute, Table } from "@sequelize/core/decorators-legacy";
import TriggerEnum from "$lib/enums/trigger.js";
import PatternGroupType from "$lib/translation/patternGroupType.js";
import type { PatternGroupTypeID } from "$lib/translation/patternGroupType.js";

@Table({
	modelName: "TranslationPattern",
	timestamps: false,
})
export default class TranslationPattern extends Model {
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
	declare triggers: number;

	get triggerArray(): TriggerEnum[] {
		return TriggerEnum.bitmaskToTriggers(this.triggers);
	}

	set triggerArray(triggers: TriggerEnum[]) {
		this.triggers = TriggerEnum.triggersToBitmask(triggers);
	}

	@Attribute({
		type: DataTypes.STRING(4096),
		allowNull: false,
	})
	declare regex: string;

	@Attribute({
		type: DataTypes.STRING(4096),
		allowNull: false,
	})
	declare template: string;

	@Attribute({
		type: DataTypes.STRING,
		allowNull: false,
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

	@AfterUpdate
	static async purgeTranslations(pattern: TranslationPattern, options: QueryOptions) {
		await pattern.sequelize.models.Skill.update(
			{ eng: null, patternId: null },
			{
				where: { patternId: pattern.id },
				transaction: options.transaction,
			}
		);
	}
}

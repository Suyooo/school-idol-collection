import { Op, literal, where } from "@sequelize/core";
import type { Includeable } from "@sequelize/core";
import type { IncludeOptions } from "@sequelize/core/_non-semver-use-at-your-own-risk_/model.js";
import { CardBase } from "$models/card/card.js";
import type { Sequelize } from "$models/db.js";
import type { AttributeID } from "$lib/enums/attribute.js";
import type { CardMemberRarity, CardSongRarity } from "$lib/enums/cardRarity.js";
import type CardSongRequirementType from "$lib/enums/cardSongRequirementType.js";
import type CardType from "$lib/enums/cardType.js";
import type { GroupID } from "$lib/enums/group.js";
import { SearchNumberCond } from "$lib/search/types.js";

export function addScopes(sequelize: Sequelize) {
	CardBase.addScope("searchMemberRarity", (rarity: CardMemberRarity) => ({
		include: {
			model: sequelize.m.CardMemberExtraInfo,
			required: true,
			where: { "$member.rarity$": rarity },
		},
	}));
	CardBase.addScope("searchType", (id: CardType) => ({
		where: { type: id },
	}));
	CardBase.addScope("searchGroup", (ids: GroupID[]) => ({
		where: { group: { [Op.in]: ids } },
	}));
	CardBase.addScope("searchSongRarity", (rarity: CardSongRarity) => ({
		include: {
			model: sequelize.m.CardSongExtraInfo,
			required: true,
			where: { "$song.rarity$": rarity },
		},
	}));
	CardBase.addScope("searchIdolizable", (isIdolized: boolean) => ({
		include: {
			model: sequelize.m.CardMemberExtraInfo,
			required: true,
			where: { "$member.idolizeType$": isIdolized ? { [Op.gt]: 0 } : 0 },
		},
	}));
	CardBase.addScope("searchAbility", (param: [boolean | null, boolean | null]) => ({
		include: {
			model: sequelize.m.CardMemberExtraInfo,
			required: true,
			where: {
				...(param[0] === null ? {} : { "$member.abilityRush$": param[0] }),
				...(param[1] === null ? {} : { "$member.abilityLive$": param[1] }),
			},
		},
	}));
	CardBase.addScope("searchYear", (year: 1 | 2 | 3) => ({
		include: {
			model: sequelize.m.CardMemberExtraInfo,
			required: true,
			where: { year },
		},
	}));
	CardBase.addScope("searchGenericMultiColumnLike", (term: string, columns: string[], include?: IncludeOptions) =>
		include ?
			{
				include: {
					...include,
					where: {
						[Op.or]: columns.map((col) => ({ [col]: { [Op.like]: "%" + term + "%" } })),
					},
				},
			}
		:	{
				where: {
					[Op.or]: columns.map((col) => ({ [col]: { [Op.like]: "%" + term + "%" } })),
				},
			}
	);
	CardBase.addScope(
		"searchGenericNumberWithMod",
		(num: number, cond: SearchNumberCond, column: string, columnLiteral: boolean, include?: Includeable) => {
			const op =
				cond === SearchNumberCond.GREATER_OR_EQUAL ? Op.gte
				: cond === SearchNumberCond.LESS_OR_EQUAL ? Op.lte
				: Op.eq;
			if (columnLiteral) return { include, where: where(literal(column), { [op]: num }) };
			else return { include, where: { [column]: { [op]: num } } };
		}
	);
	CardBase.addScope("searchBonus", (hasBonus: boolean) => ({
		include: {
			model: sequelize.m.CardMemberExtraInfo,
			required: true,
			where: { "$member.pieceBdayAttribute$": hasBonus ? { [Op.not]: null } : null },
		},
	}));
	CardBase.addScope("searchAttribute", (attribute: AttributeID) => ({
		include: {
			model: sequelize.m.CardSongExtraInfo,
			required: true,
			where: { "$song.attribute$": attribute },
		},
	}));
	CardBase.addScope("searchRequirementType", (reqType: CardSongRequirementType) => ({
		include: {
			model: sequelize.m.CardSongExtraInfo,
			required: true,
			where: { "$song.requirementType$": reqType },
		},
	}));
}

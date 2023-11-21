import type { Includeable, ScopeOptions } from "@sequelize/core";
import AttributeEnum from "$lib/enums/attribute.js";
import { CardMemberRarity, CardSongRarity } from "$lib/enums/cardRarity.js";
import CardSongRequirementType from "$lib/enums/cardSongRequirementType.js";
import CardType from "$lib/enums/cardType.js";
import GroupEnum from "$lib/enums/group.js";
import { queryMapSorter, removePseudoFilters } from "$lib/search/querymap.js";
import {
	type KeysAll,
	type KeysNumberCond,
	type KeysNumberFixed,
	type KeysReal,
	type KeysText,
	type KeysTextFree,
	type KeysTextOptions,
	type KeysTextOptionsParams,
	SearchNumberCond,
	type SearchParam,
	type SearchQueryMap,
} from "$lib/search/types.js";
import { ordinal } from "$lib/utils/grammar.js";

export function queryMapToFilterList(query: SearchQueryMap): SearchFilter[] {
	return ((Object.keys(query) as KeysAll[]).filter(removePseudoFilters) as KeysReal[])
		.sort(queryMapSorter)
		.map((k) => makeSearchFilter(k, query[k]!));
}

export function filterListToQueryMap(filters: SearchFilter[]): SearchQueryMap {
	return filters.map((f) => f.mapping).reduce((map, next) => ({ ...map, ...next }));
}

export type SearchFilterTyped<K extends KeysReal> = {
	mapping: { [k: string]: SearchParam<K> };
	scopes: ScopeOptions[];
	explain: string;
};
export type SearchFilter = SearchFilterTyped<KeysReal>;

type SearchFilterGenerator<K extends KeysReal> = (param: SearchParam<K>) => SearchFilterTyped<K>;

function generatorMatch<K extends KeysTextFree | KeysNumberFixed>(
	key: K,
	scopeName: string,
	explain: (param: SearchParam<K>) => string
): SearchFilterGenerator<K> {
	return (param) => {
		return {
			mapping: { [key]: param },
			scopes: [{ method: [scopeName, param] }],
			explain: explain(param),
		};
	};
}

function generatorTextFreeTranslatable<K extends KeysTextFree>(
	key: K,
	columnNames: string[],
	explainLabel: string,
	include?: Includeable
): SearchFilterGenerator<KeysTextFree> {
	return (param) => {
		return {
			mapping: { [key]: param },
			scopes: [{ method: ["searchGenericMultiColumnLike", param, columnNames, include] }],
			explain: `${explainLabel} contains ${param}`,
		};
	};
}

function generatorTextOptions<K extends KeysTextOptions>(
	key: K,
	scopeName: string,
	options: { [P in KeysTextOptionsParams<K>]: [string, any] }
): SearchFilterGenerator<KeysTextOptions> {
	return (param) => {
		const option = options[param as KeysTextOptionsParams<K>];
		return {
			mapping: { [key]: param },
			scopes: [{ method: [scopeName, option[1]] }],
			explain: option[0],
		};
	};
}

function generatorNumberCond<K extends KeysNumberCond>(
	key: K,
	columnName: string,
	columnIsLiteral: boolean,
	explainLabel: string,
	postfixExplainLabel: boolean,
	include?: Includeable
): SearchFilterGenerator<KeysNumberCond> {
	return (param) => {
		const [num, cond] = param;
		const condExplain =
			cond === SearchNumberCond.LESS_OR_EQUAL ? " or less"
			: SearchNumberCond.GREATER_OR_EQUAL ? " or more"
			: "";
		return {
			mapping: { [key]: param },
			scopes: [{ method: ["searchGenericNumberWithMod", num, cond, columnName, columnIsLiteral, include] }],
			explain:
				postfixExplainLabel ?
					`${num}${condExplain} ${explainLabel}${num === 1 ? "" : "s"}`
				:	`${explainLabel} is ${num}${condExplain}`,
		};
	};
}

const generators: { [K in KeysText]: SearchFilterGenerator<KeysText> } & {
	[K in KeysNumberFixed]: SearchFilterGenerator<KeysNumberFixed>;
} & { [K in KeysNumberCond]: SearchFilterGenerator<KeysNumberCond> } = {
	id: generatorMatch("id", "filterId", (p) => `ID ${p.toString().padStart(4, "0")}`),
	group: generatorTextOptions("group", "searchGroup", {
		muse: ["µ's", GroupEnum.MUSE.toIdsWithSubs()],
		aqours: ["Aqours", GroupEnum.AQOURS.toIdsWithSubs()],
		printemps: ["Printemps", GroupEnum.PRINTEMPS.toIdsWithSubs()],
		lilywhite: ["lily white", GroupEnum.LILY_WHITE.toIdsWithSubs()],
		bibi: ["BiBi", GroupEnum.BIBI.toIdsWithSubs()],
		cyaron: ["CYaRon!", GroupEnum.CYARON.toIdsWithSubs()],
		azalea: ["AZALEA", GroupEnum.AZALEA.toIdsWithSubs()],
		guiltykiss: ["Guilty Kiss", GroupEnum.GUILTY_KISS.toIdsWithSubs()],
		saintsnow: ["Saint Snow", GroupEnum.SAINT_SNOW.toIdsWithSubs()],
	}),
	type: generatorTextOptions("type", "searchType", {
		member: ["Members", CardType.MEMBER],
		song: ["Songs", CardType.SONG],
		memory: ["Memories", CardType.MEMORY],
	}),
	name: generatorTextFreeTranslatable("name", ["nameJpn", "nameEng"], "Name"),
	set: generatorMatch("set", "filterSet", (p) => `In Set ${p}`),
	skill: generatorTextFreeTranslatable("skill", ["$skills.jpn$", "$skills.eng$"], "Skill", {
		association: "skills",
		separate: false,
		required: true,
		attributes: ["jpn", "eng"],
	}),

	// Member
	memberrarity: generatorTextOptions("memberrarity", "searchMemberRarity", {
		r: ["Rarity R", CardMemberRarity.R],
		sr: ["Rarity SR", CardMemberRarity.SR],
		hr: ["Rarity HR", CardMemberRarity.HR],
		special: ["Rarity Special", CardMemberRarity.Special],
		secret: ["Rarity Secret", CardMemberRarity.Secret],
		pr: ["Rarity PR", CardMemberRarity.PR],
		n: ["Rarity N", CardMemberRarity.N],
		ssr: ["Rarity SSR", CardMemberRarity.SSR],
	}),
	year: generatorMatch("year", "searchYear", (p) => `${ordinal(p)} Year`),
	cost: generatorNumberCond("cost", "$member.cost$", false, "Cost", false, {
		association: "member",
		required: true,
		attributes: ["cost"],
	}),
	ability: generatorTextOptions("ability", "searchAbility", {
		noability: ["No Ability", [false, false]],
		rush: ["[RUSH]", [true, null]],
		live: ["[LIVE]", [null, true]],
		rushorlive: ["[RUSH/LIVE]", [true, true]],
	}),
	costume: generatorTextFreeTranslatable("costume", ["$member.costumeJpn$", "$member.costumeEng$"], "Costume", {
		association: "member",
		required: true,
		attributes: ["costumeJpn", "costumeEng"],
	}),
	pieces: generatorNumberCond(
		"pieces",
		"member.piecesSmile + member.piecesPure + member.piecesCool + member.piecesAll",
		true,
		"Piece",
		true,
		{
			association: "member",
			required: true,
			attributes: ["piecesSmile", "piecesPure", "piecesCool", "piecesAll"],
		}
	),
	allpieces: generatorNumberCond("allpieces", "$member.piecesAll$", false, "[ALL] Piece", true, {
		association: "member",
		required: true,
		attributes: ["piecesAll"],
	}),
	smilepieces: generatorNumberCond("smilepieces", "$member.piecesSmile$", false, "[SMILE] Piece", true, {
		association: "member",
		required: true,
		attributes: ["piecesSmile"],
	}),
	purepieces: generatorNumberCond("purepieces", "$member.piecesPure$", false, "[SMILE] Piece", true, {
		association: "member",
		required: true,
		attributes: ["piecesPure"],
	}),
	coolpieces: generatorNumberCond("coolpieces", "$member.piecesCool$", false, "[SMILE] Piece", true, {
		association: "member",
		required: true,
		attributes: ["piecesCool"],
	}),
	bonus: generatorTextOptions("bonus", "searchBonus", {
		bonus: ["Has Birthday Bonus", true],
		nobonus: ["No Birthday Bonus", false],
	}),
	idolizable: generatorTextOptions("idolizable", "searchIdolizable", {
		idolizable: ["Is Idolizable", true],
		notidolizable: ["Not Idolizable", false],
	}),

	// Song
	songrarity: generatorTextOptions("songrarity", "searchSongRarity", {
		m: ["Rarity M", CardSongRarity.M],
		gr: ["Rarity GR", CardSongRarity.GR],
	}),
	attribute: generatorTextOptions("attribute", "searchAttribute", {
		neutral: ["Neutral", AttributeEnum.ALL.id],
		smile: ["Smile", AttributeEnum.SMILE.id],
		pure: ["Pure", AttributeEnum.PURE.id],
		cool: ["Cool", AttributeEnum.COOL.id],
		orange: ["Orange", AttributeEnum.ORANGE.id],
	}),
	livepoints: generatorNumberCond("livepoints", "$song.lpBase$", false, "Base Live Points", true, {
		association: "song",
		required: true,
		attributes: ["lpBase"],
	}),
	requirementtype: generatorTextOptions("requirementtype", "searchRequirementType", {
		anypiece: ["With Any Piece Requirement", CardSongRequirementType.ANY_PIECE],
		attributepiece: ["With Attribute Piece Requirement", CardSongRequirementType.ATTR_PIECE],
	}),
	required: generatorNumberCond("required", "$song.anyRequirement.piecesAll$", false, "Required Piece", true, {
		association: "song",
		required: true,
		include: [
			{
				association: "anyRequirement",
				required: true,
				attributes: ["piecesAll"],
			},
		],
	}),
	smilerequired: generatorNumberCond(
		"smilerequired",
		"$song.attrRequirement.piecesSmile$",
		false,
		"Required [SMILE] Piece",
		true,
		{
			association: "song",
			required: true,
			include: [
				{
					association: "attrRequirement",
					required: true,
					attributes: ["piecesSmile"],
				},
			],
		}
	),
	purerequired: generatorNumberCond(
		"purerequired",
		"$song.attrRequirement.piecesPure$",
		false,
		"Required [PURE] Piece",
		true,
		{
			association: "song",
			required: true,
			include: [
				{
					association: "attrRequirement",
					required: true,
					attributes: ["piecesPure"],
				},
			],
		}
	),
	coolrequired: generatorNumberCond(
		"coolrequired",
		"$song.attrRequirement.piecesCool$",
		false,
		"Required [COOL] Piece",
		true,
		{
			association: "song",
			required: true,
			include: [
				{
					association: "attrRequirement",
					required: true,
					attributes: ["piecesCool"],
				},
			],
		}
	),
} as const;

export default function makeSearchFilter<K extends KeysReal>(key: K, param: SearchParam<K>): SearchFilterTyped<K> {
	return (generators[key] as SearchFilterGenerator<K>)(param);
}

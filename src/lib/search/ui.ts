import { escapeForSearch, unescapeForSearch } from "$lib/search/escape.js";

type NumberQueryMod = "" | "+" | "-";

export type SearchUiOptions = {
	cardName?: string;
	group?: "muse" | "aqours" | "printemps" | "lilywhite" | "bibi" | "cyaron" | "azalea" | "guiltykiss" | "saintsnow";
	cardSet?: string;
	skillText?: string;
	cardType?: "" | "member" | "song" | "memory";
	memberRarity?: "" | "r" | "sr" | "hr" | "special" | "secret" | "pr" | "n" | "ssr";
	memberYear?: "" | "year=1" | "year=2" | "year=3";
	memberCost?: "" | "0" | "1" | "2" | "3";
	memberCostMod?: NumberQueryMod;
	memberIdolizable?: "" | "idolizable" | "notidolizable";
	memberAbility?: "" | "noability" | "live" | "rush" | "rushorlive";
	memberCostume?: string;
	memberPieces?: string;
	memberPiecesMod?: NumberQueryMod;
	memberPiecesSmile?: string;
	memberPiecesSmileMod?: NumberQueryMod;
	memberPiecesPure?: string;
	memberPiecesPureMod?: NumberQueryMod;
	memberPiecesCool?: string;
	memberPiecesCoolMod?: NumberQueryMod;
	memberPiecesAll?: string;
	memberPiecesAllMod?: NumberQueryMod;
	memberPieceBonus?: "" | "bonus" | "nobonus";
	songRarity?: "" | "m" | "gr";
	songAttribute?: "" | "neutral" | "smile" | "pure" | "cool" | "orange";
	songRequirementType?: "" | "anypiece" | "attributepiece";
	songLivePoints?: string;
	songLivePointsMod?: NumberQueryMod;
	songPiecesSmile?: string;
	songPiecesSmileMod?: NumberQueryMod;
	songPiecesPure?: string;
	songPiecesPureMod?: NumberQueryMod;
	songPiecesCool?: string;
	songPiecesCoolMod?: NumberQueryMod;
	songPiecesAll?: string;
	songPiecesAllMod?: NumberQueryMod;
};

export function uiOptionIsSet(value: any): value is string {
	return value !== undefined && value !== null && value !== "";
}

const mapSelectInput: Map<
	keyof SearchUiOptions,
	{ urlParamOptions: string[]; condition?: (options: SearchUiOptions) => boolean }
> = new Map([
	[
		"group",
		{
			urlParamOptions: [
				"muse",
				"aqours",
				"printemps",
				"lilywhite",
				"bibi",
				"cyaron",
				"azalea",
				"guiltykiss",
				"saintsnow",
			],
		},
	],
	["cardType", { urlParamOptions: ["member", "song", "memory"] }],
	[
		"memberRarity",
		{
			urlParamOptions: ["r", "sr", "hr", "special", "secret", "pr", "n", "ssr"],
			condition: (options: SearchUiOptions) => options.cardType === "member",
		},
	],
	[
		"memberYear",
		{
			urlParamOptions: ["year=1", "year=2", "year=3"],
			condition: (options) => options.cardType === "member",
		},
	],
	[
		"memberAbility",
		{
			urlParamOptions: ["noability", "rush", "live", "rushorlive"],
			condition: (options) => options.cardType === "member",
		},
	],
	[
		"memberPieceBonus",
		{
			urlParamOptions: ["nobonus", "bonus"],
			condition: (options) => options.cardType === "member",
		},
	],
	[
		"memberIdolizable",
		{
			urlParamOptions: ["notidolizable", "idolizable"],
			condition: (options) => options.cardType === "member",
		},
	],
	["songRarity", { urlParamOptions: ["m", "gr"], condition: (options) => options.cardType === "song" }],
	[
		"songAttribute",
		{
			urlParamOptions: ["neutral", "smile", "pure", "cool", "orange"],
			condition: (options) => options.cardType === "song",
		},
	],
	[
		"songRequirementType",
		{
			urlParamOptions: ["anypiece", "attributepiece"],
			condition: (options) => options.cardType === "song",
		},
	],
]);
const mapSelectInputReverse: Map<string, keyof SearchUiOptions> = new Map(
	[...mapSelectInput.entries()]
		.map(([name, { urlParamOptions }]) =>
			urlParamOptions.map((param) => <[string, keyof SearchUiOptions]>[param, name])
		)
		.flat()
);

const mapTextInput: Map<
	keyof SearchUiOptions,
	{ urlParam: string; condition?: (options: SearchUiOptions) => boolean }
> = new Map([
	["cardName", { urlParam: "name" }],
	["cardSet", { urlParam: "set" }],
	["skillText", { urlParam: "skill" }],
	["memberCostume", { urlParam: "costume", condition: (options: SearchUiOptions) => options.cardType === "member" }],
]);
const mapTextInputReverse: Map<string, keyof SearchUiOptions> = new Map(
	[...mapTextInput.entries()].map(([name, { urlParam }]) => <[string, keyof SearchUiOptions]>[urlParam, name])
);

const mapNumberInput: Map<
	keyof SearchUiOptions,
	{ urlParam: string; condition?: (options: SearchUiOptions) => boolean }
> = new Map([
	["memberCost", { urlParam: "cost", condition: (options) => options.cardType === "member" }],
	["memberPieces", { urlParam: "pieces", condition: (options) => options.cardType === "member" }],
	["memberPiecesSmile", { urlParam: "smilepieces", condition: (options) => options.cardType === "member" }],
	["memberPiecesPure", { urlParam: "purepieces", condition: (options) => options.cardType === "member" }],
	["memberPiecesCool", { urlParam: "coolpieces", condition: (options) => options.cardType === "member" }],
	["memberPiecesAll", { urlParam: "allpieces", condition: (options) => options.cardType === "member" }],
	["songLivePoints", { urlParam: "livepoints", condition: (options) => options.cardType === "song" }],
	[
		"songPiecesAll",
		{
			urlParam: "required",
			condition: (options) => options.cardType === "song" && options.songRequirementType === "anypiece",
		},
	],
	[
		"songPiecesSmile",
		{
			urlParam: "smilerequired",
			condition: (options) => options.cardType === "song" && options.songRequirementType === "attributepiece",
		},
	],
	[
		"songPiecesPure",
		{
			urlParam: "purerequired",
			condition: (options) => options.cardType === "song" && options.songRequirementType === "attributepiece",
		},
	],
	[
		"songPiecesCool",
		{
			urlParam: "coolrequired",
			condition: (options) => options.cardType === "song" && options.songRequirementType === "attributepiece",
		},
	],
]);
const mapNumberInputReverse: Map<string, keyof SearchUiOptions> = new Map(
	[...mapNumberInput.entries()].map(([name, { urlParam }]) => <[string, keyof SearchUiOptions]>[urlParam, name])
);

export function urlToUiOptions(url: string): SearchUiOptions {
	const options: { [key: string]: string } = {};
	const filterQueries = url.substring(1).split("/");

	for (const filterQuery of filterQueries) {
		const split = filterQuery.split("=").map((s) => decodeURIComponent(s));

		if (mapSelectInputReverse.has(filterQuery)) {
			options[mapSelectInputReverse.get(filterQuery)!] = filterQuery;
		} else if (mapTextInputReverse.has(split[0])) {
			options[mapTextInputReverse.get(split[0])!] = unescapeForSearch(split[1]);
		} else if (mapNumberInputReverse.has(split[0])) {
			options[mapNumberInputReverse.get(split[0])!] = parseInt(split[1]).toString();
			if (split[1].endsWith("+") || split[1].endsWith("-")) {
				options[mapNumberInputReverse.get(split[0])! + "Mod"] = split[1].at(-1)!;
			} else {
				options[mapNumberInputReverse.get(split[0])! + "Mod"] = "";
			}
		}
	}

	return options;
}

export function uiOptionsToUrl(options: SearchUiOptions): string {
	const filters = [];

	// Dropdowns => 0-parameter filter
	for (const [name, inputInfo] of [...mapSelectInput.entries()]) {
		if (inputInfo.condition && !inputInfo.condition(options)) continue;
		if (!uiOptionIsSet(options[name])) continue;
		filters.push(options[name]);
	}

	// Inputs => 1-parameter filter
	for (const [name, inputInfo] of [...mapTextInput.entries()]) {
		if (inputInfo.condition && !inputInfo.condition(options)) continue;
		const param = options[name];
		if (!uiOptionIsSet(param)) continue;
		filters.push(`${inputInfo.urlParam}=${escapeForSearch(param)}`);
	}

	// Number with Mod => 1-parameter filter
	for (const [name, inputInfo] of [...mapNumberInput.entries()]) {
		if (inputInfo.condition && !inputInfo.condition(options)) continue;
		const param = options[name];
		const paramMod = options[(name + "Mod") as keyof SearchUiOptions];
		if (!uiOptionIsSet(param)) continue;
		filters.push(`${inputInfo.urlParam}=${param}${uiOptionIsSet(paramMod) ? paramMod : ""}`);
	}

	return filters.join("/");
}

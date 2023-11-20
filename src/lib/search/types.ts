export const enum SearchNumberCond {
	EQUAL = "",
	LESS_OR_EQUAL = "-",
	GREATER_OR_EQUAL = "+",
}

export const keysTextOptions = {
	group: ["muse", "aqours", "printemps", "lilywhite", "bibi", "cyaron", "azalea", "guiltykiss", "saintsnow"],
	type: ["member", "song", "memory"],
	memberrarity: ["r", "sr", "hr", "special", "secret", "pr", "n", "ssr"],
	idolizable: ["idolizable", "notidolizable"],
	ability: ["noability", "rush", "live", "rushorlive"],
	bonus: ["bonus", "nobonus"],
	songrarity: ["m", "gr"],
	attribute: ["neutral", "smile", "pure", "cool", "orange"],
	requirementtype: ["anypiece", "attributepiece"],
} as const;
export type KeysTextOptions = keyof typeof keysTextOptions;
export type KeysTextOptionsParams<T extends KeysTextOptions> = (typeof keysTextOptions)[T][number];
export type KeysTextOptionsAllParams = (typeof keysTextOptions)[KeysTextOptions][number];

export const keysTextFree = new Set(["name", "set", "skill", "costume"] as const);
export type KeysTextFree = typeof keysTextFree extends Set<infer T> ? T : never;
export type KeysText = KeysTextOptions | KeysTextFree;
type KeysTextParam = string;

export const keysNumberFixed = new Set(["id", "year"] as const);
export type KeysNumberFixed = typeof keysNumberFixed extends Set<infer T> ? T : never;
type KeysNumberFixedParam = number;

export const keysNumberCond = new Set([
	"cost",
	"pieces",
	"allpieces",
	"smilepieces",
	"purepieces",
	"coolpieces",
	"livepoints",
	"required",
	"smilerequired",
	"purerequired",
	"coolrequired",
] as const);
export type KeysNumberCond = typeof keysNumberCond extends Set<infer T> ? T : never;
type KeysNumberCondParam = [number, SearchNumberCond];

// Pseudo filters are fixed number filters that can be specified in a URL, but are skipped when converting from a map.
// They will be read from the URL and can be consumed if they are relevant.
export const keysPseudo = new Set(["page", "pagesize"] as const);
export type KeysPseudo = typeof keysPseudo extends Set<infer T> ? T : never;

export type KeysReal = KeysText | KeysNumberFixed | KeysNumberCond;
export type KeysAll = KeysReal | KeysPseudo;
export type KeysURL = KeysTextOptionsAllParams | KeysTextFree | KeysNumberFixed | KeysNumberCond | KeysPseudo;

export type SearchQueryMap = { [K in KeysText]?: KeysTextParam } & {
	[K in KeysNumberFixed]?: KeysNumberFixedParam;
} & { [K in KeysNumberCond]?: KeysNumberCondParam } & { [K in KeysPseudo]?: KeysNumberFixedParam };
export type SearchParam<K> =
	K extends KeysText ? KeysTextParam
	: K extends KeysNumberFixed ? KeysNumberFixedParam
	: K extends KeysNumberCond ? KeysNumberCondParam
	: K extends KeysPseudo ? KeysNumberFixedParam
	: never;

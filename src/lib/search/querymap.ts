import SearchFilterError from "$lib/errors/searchFilterError.js";
import {
	type KeysAll,
	type KeysNumberCond,
	type KeysNumberFixed,
	type KeysPseudo,
	type KeysReal,
	type KeysTextFree,
	type KeysTextOptions,
	type KeysTextOptionsAllParams,
	type KeysURL,
	SearchNumberCond,
	type SearchQueryMap,
	keysNumberCond,
	keysNumberFixed,
	keysPseudo,
	keysTextFree,
	keysTextOptions,
} from "./types.js";

export const normalizeInput = <T>(s: T): T | undefined => {
	if (s === undefined || s === null) return undefined;
	if (typeof s === "string") {
		const trim = s.trim();
		return trim.length > 0 ? (trim as T) : undefined;
	} else return s;
};

const isKeyTextOptions = (s: string): s is KeysTextOptions => keysTextOptions[s as KeysTextOptions] !== undefined;

const isKeyTextOptionsParam = (s: string): s is KeysTextOptionsAllParams =>
	Object.values(keysTextOptions).some((opts) => (opts as readonly string[]).includes(s));
const isKeyTextFree = (s: string): s is KeysTextFree => keysTextFree.has(s as KeysTextFree);
const isKeyNumberFixed = (s: string): s is KeysNumberFixed => keysNumberFixed.has(s as KeysNumberFixed);
const isKeyNumberCond = (s: string): s is KeysNumberCond => keysNumberCond.has(s as KeysNumberCond);
const isKeyPseudo = (s: string): s is KeysPseudo => keysPseudo.has(s as KeysPseudo);
const isKeyReal = (s: string): s is KeysReal =>
	isKeyTextOptions(s) || isKeyTextFree(s) || isKeyNumberFixed(s) || isKeyNumberCond(s);
const isURLKey = (s: string): s is KeysURL =>
	isKeyTextOptionsParam(s) || isKeyTextFree(s) || isKeyNumberFixed(s) || isKeyNumberCond(s) || isKeyPseudo(s);

const filterOrder: string[] = [
	"id",
	"group",
	"type",
	"name",
	"set",
	"skill",
	"memberrarity",
	"year",
	"cost",
	"ability",
	"costume",
	"pieces",
	"allpieces",
	"smilepieces",
	"purepieces",
	"coolpieces",
	"bonus",
	"idolizable",
	"songrarity",
	"attribute",
	"livepoints",
	"requirementtype",
	"required",
	"smilerequired",
	"purerequired",
	"coolrequired",
];

export function queryMapSorter(a: KeysReal, b: KeysReal) {
	return filterOrder.indexOf(a) - filterOrder.indexOf(b);
}

export function removePseudoFilters(k: KeysAll) {
	return isKeyReal(k);
}

export function urlToQueryMap(url: string): SearchQueryMap {
	const query: SearchQueryMap = {};
	for (const filter of url.split("/")) {
		const trim = filter.trim();
		if (trim.length === 0) continue;
		const [key, ...rest] = trim.split("=");
		if (key.length === 0) throw new SearchFilterError("Missing filter name", trim);
		if (!isURLKey(key)) throw new SearchFilterError("Unknown filter key", trim);

		const param = decodeURIComponent(rest.join("=").trim());
		if (isKeyTextOptionsParam(key)) {
			if (param.length > 0) {
				throw new SearchFilterError("This filter does not take parameters", trim);
			}

			const optionKey = (Object.keys(keysTextOptions) as KeysTextOptions[]).find((k) =>
				(keysTextOptions[k] as readonly string[]).includes(key)
			)!;
			if (query[optionKey] !== undefined) {
				throw new SearchFilterError(
					`This filter conflicts with the previously specified filter ${query[optionKey]}`,
					trim
				);
			}
			query[optionKey] = key;
		} else {
			if (param.length === 0) {
				throw new SearchFilterError("Expected a parameter", trim);
			}

			if (isKeyTextFree(key)) {
				query[key] = param;
			} else {
				const paramAsNumber = parseInt(param);

				if (isNaN(paramAsNumber)) {
					throw new SearchFilterError("Parameter is not a number", trim);
				}

				if (isKeyNumberCond(key)) {
					const paramOp =
						param.endsWith(SearchNumberCond.LESS_OR_EQUAL) ? SearchNumberCond.LESS_OR_EQUAL
						: param.endsWith(SearchNumberCond.GREATER_OR_EQUAL) ? SearchNumberCond.GREATER_OR_EQUAL
						: SearchNumberCond.EQUAL;
					query[key] = [paramAsNumber, paramOp];
				} else {
					query[key] = paramAsNumber;
				}
			}
		}
	}

	return query;
}

export function queryMapToUrl(query: SearchQueryMap): string {
	return ((Object.keys(query) as KeysAll[]).filter(removePseudoFilters) as KeysReal[])
		.filter((k) => query[k] !== undefined)
		.sort(queryMapSorter)
		.map((key) => {
			if (isKeyTextOptions(key)) {
				return query[key]!;
			} else if (isKeyTextFree(key)) {
				return `${key}=${encodeURIComponent(query[key]!.trim())}`;
			} else if (isKeyNumberFixed(key)) {
				return `${key}=${query[key]!}`;
			} else {
				const param = query[key]!;
				return `${key}=${param[0]}${param[1]}`;
			}
		})
		.join("/");
}

import type SearchFilter from "$lib/search/filters.js";

export default class SearchFilterError extends Error {
	constructor(message: string, key: string) {
		super(`Filter "${key}": ${message}`);
	}
}

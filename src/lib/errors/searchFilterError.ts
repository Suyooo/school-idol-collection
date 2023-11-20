export default class SearchFilterError extends Error {
	constructor(message: string, key: string) {
		super(`Filter "${key}": ${message}`);
	}
}

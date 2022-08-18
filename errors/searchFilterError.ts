export default class SearchFilterError extends Error {
    constructor(message: string, filter: string) {
        super("Filter \"" + filter + "\": " + message);
    }
}
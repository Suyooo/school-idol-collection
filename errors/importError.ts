export default class ImportError extends Error {
    constructor(message: string, path: string) {
        super("Importing \"" + path + "\": " + message);
    }
}
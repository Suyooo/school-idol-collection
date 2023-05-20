export default class ImportError extends Error {
    constructor(message: string, cardNo: string) {
        super('Importing "' + cardNo + '": ' + message);
    }
}

export default class ErrorWithCause extends Error {
    constructor(message: string, cause?: any) {
        super(message);
        if (cause !== undefined) {
            this.stack += "\nCaused by: " + cause.message + "\n" + cause.stack;
        }
    }
}
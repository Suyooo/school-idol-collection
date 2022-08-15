export default class ErrorWithCause extends Error {
    constructor(message: string, cause?: Error) {
        super(message);
        if (cause) {
            this.stack += "\nCaused by: " + cause.stack;
        }
    }
}
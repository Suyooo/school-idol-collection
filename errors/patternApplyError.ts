import TranslateTablePattern from "../models/translatetables/pattern";
import ErrorWithCause from "./errorWithCause";

export default class PatternApplyError extends ErrorWithCause {
    constructor(cause: Error, pattern: TranslateTablePattern, skill: string) {
        super("Skill: " + skill + "\nRegex: " + pattern.regex + "\nTemplate: " + pattern.template, cause);
    }
}
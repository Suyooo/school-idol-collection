import TranslationPattern from "../models/translation/pattern";
import ErrorWithCause from "./errorWithCause";

export default class PatternApplyError extends ErrorWithCause {
    constructor(cause: Error, pattern: TranslationPattern, skill: string) {
        super("Skill: " + skill + "\nRegex: " + pattern.regex + "\nTemplate: " + pattern.template, cause);
    }
}
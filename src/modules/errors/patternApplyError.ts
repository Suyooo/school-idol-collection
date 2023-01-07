import type TranslationPattern from "$models/translation/pattern";
import ErrorWithCause from "$errors/errorWithCause";

export default class PatternApplyError extends ErrorWithCause {
    constructor(cause: any, pattern: TranslationPattern, skill: string) {
        super("Skill: " + skill + "\nRegex: " + pattern.regex + "\nTemplate: " + pattern.template, cause);
    }
}
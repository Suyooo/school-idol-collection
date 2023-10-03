import ErrorWithCause from "$l/errors/errorWithCause.js";
import type TranslationPattern from "$m/translation/pattern.js";

export default class PatternApplyError extends ErrorWithCause {
    constructor(cause: any, pattern: TranslationPattern, skill: string) {
        super("Skill: " + skill + "\nRegex: " + pattern.regex + "\nTemplate: " + pattern.template, cause);
    }
}

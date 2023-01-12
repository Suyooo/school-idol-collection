import type Trigger from "../translation/trigger.js";

export default class Language {
    readonly name: "jpn" | "eng";
    readonly leftRoundBracket: string;
    readonly rightRoundBracket: string;
    readonly leftSquareBracket: string;
    readonly rightSquareBracket: string;
    readonly times: string;

    triggerNameProperty: Exclude<keyof Trigger, "id">;

    private constructor(name: "jpn" | "eng", leftRoundBracket: string, rightRoundBracket: string,
                        leftSquareBracket: string, rightSquareBracket: string, times: string,
                        triggerNameProperty: Exclude<keyof Trigger, "id">) {
        this.name = name;
        this.leftRoundBracket = leftRoundBracket;
        this.rightRoundBracket = rightRoundBracket;
        this.leftSquareBracket = leftSquareBracket;
        this.rightSquareBracket = rightSquareBracket;
        this.times = times;

        this.triggerNameProperty = triggerNameProperty;
    }

    static readonly JPN = new Language("jpn", "（", "）", "【", "】", "×",
        "nameJpn");
    static readonly ENG = new Language("eng", "(", ")", "[", "]", " x",
        "nameEng");
}
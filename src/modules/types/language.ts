import type Trigger from "../translation/trigger.js";
import type Attribute from "$types/attribute.js";

export default class Language {
    readonly leftRoundBracket: string;
    readonly rightRoundBracket: string;
    readonly leftSquareBracket: string;
    readonly rightSquareBracket: string;
    readonly times: string;

    triggerNameProperty: Exclude<keyof Trigger, "id">;
    colorNameProperty: Exclude<keyof Attribute, "id">;
    songAttributeNameProperty: Exclude<keyof Attribute, "id">;
    pieceNameProperty: Exclude<keyof Attribute, "id">;

    private constructor(leftRoundBracket: string, rightRoundBracket: string,
                        leftSquareBracket: string, rightSquareBracket: string, times: string,
                        triggerNameProperty: Exclude<keyof Trigger, "id">,
                        colorNameProperty: Exclude<keyof Attribute, "id">,
                        songAttributeNameProperty: Exclude<keyof Attribute, "id">,
                        pieceNameProperty: Exclude<keyof Attribute, "id">) {
        this.leftRoundBracket = leftRoundBracket;
        this.rightRoundBracket = rightRoundBracket;
        this.leftSquareBracket = leftSquareBracket;
        this.rightSquareBracket = rightSquareBracket;
        this.times = times;

        this.triggerNameProperty = triggerNameProperty;
        this.colorNameProperty = colorNameProperty;
        this.songAttributeNameProperty = songAttributeNameProperty;
        this.pieceNameProperty = pieceNameProperty;
    }

    static readonly JPN = new Language("（", "）", "【", "】", "×",
        "nameJpn", "colorNameJpn", "songAttributeNameJpn", "pieceAttributeNameJpn");
    static readonly ENG = new Language("(", ")", "[", "]", " x",
        "nameEng", "colorNameEng", "songAttributeNameEng", "pieceAttributeNameEng");
}
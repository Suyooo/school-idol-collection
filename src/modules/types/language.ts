import type Trigger from "../translation/trigger";
import type Attribute from "$types/attribute";

export default class Language {
    readonly leftRoundBracket: string;
    readonly rightRoundBracket: string;
    readonly leftSquareBracket: string;
    readonly rightSquareBracket: string;
    readonly times: string;

    triggerNameProperty: keyof Trigger;
    colorNameProperty: keyof Attribute;
    songAttributeNameProperty: keyof Attribute;
    pieceNameProperty: keyof Attribute;

    private constructor(leftRoundBracket: string, rightRoundBracket: string,
                        leftSquareBracket: string, rightSquareBracket: string, times: string,
                        triggerNameProperty: keyof Trigger, colorNameProperty: keyof Attribute,
                        songAttributeNameProperty: keyof Attribute, pieceNameProperty: keyof Attribute) {
        this.leftRoundBracket = leftRoundBracket;
        this.rightRoundBracket = rightRoundBracket;
        this.leftSquareBracket = leftSquareBracket;
        this.rightSquareBracket = rightSquareBracket;
        this.times = times;

        this.triggerNameProperty = triggerNameProperty;
        this.colorNameProperty = pieceNameProperty;
        this.songAttributeNameProperty = pieceNameProperty;
        this.pieceNameProperty = pieceNameProperty;
    }

    static readonly JPN = new Language("（", "）", "【", "】", "×",
        "nameJpn", "colorNameJpn", "songAttributeNameJpn", "pieceAttributeNameJpn");
    static readonly ENG = new Language("(", ")", "[", "]", " x",
        "nameEng", "colorNameEng", "songAttributeNameEng", "pieceAttributeNameEng");
}
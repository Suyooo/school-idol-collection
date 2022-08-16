import PieceInfo from "../types/pieceInfo";
import Language from "../types/language";
import Attribute from "../types/attribute";

export function pieceFormat(pieces: PieceInfo, lang: Language): string {
    let s = "";
    let comma = "";
    if (pieces.all > 0) {
        s += "<span class='pieceno'><span class='piece all'>"
            + lang.leftSquareBracket
            + Attribute.get("ALL")[lang.pieceNameProperty]
            + lang.rightSquareBracket + lang.times
            +"</span><span>" + pieces.all + "</span></span>";
        comma = ", ";
    }
    if (pieces.smile > 0) {
        s += "<span class='pieceno'><span class='piece smile'>"
            + comma + lang.leftSquareBracket
            + Attribute.get("SMILE")[lang.pieceNameProperty]
            + lang.rightSquareBracket + lang.times
            + "</span><span>" + pieces.smile + "</span></span>";
        comma = ", ";
    }
    if (pieces.pure > 0) {
        s += "<span class='pieceno'><span class='piece pure'>"
            + comma + lang.leftSquareBracket
            + Attribute.get("PURE")[lang.pieceNameProperty]
            + lang.rightSquareBracket + lang.times
            + "</span><span>" + pieces.pure + "</span></span>";
        comma = ", ";
    }
    if (pieces.cool > 0) {
        s += "<span class='pieceno'><span class='piece cool'>"
            + comma + lang.leftSquareBracket
            + Attribute.get("COOL")[lang.pieceNameProperty]
            + lang.rightSquareBracket + lang.times
            + "</span><span>" + pieces.cool + "</span></span>";
    }
    return s;
}
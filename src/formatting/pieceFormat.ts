import PieceInfo from "../types/pieceInfo";
import Language from "../types/language";
import Attribute from "../types/attribute";

export default function pieceFormat(pieces: PieceInfo, lang: Language): string {
    let s = "";
    let comma = "";
    if (pieces.all > 0) {
        s += "<span class='pieceno'><span class='piece all' title='" + Attribute.get("ALL")[lang.pieceNameProperty] + "'>"
            + lang.leftSquareBracket
            + Attribute.get("ALL")[lang.pieceNameProperty]
            + lang.rightSquareBracket + lang.times
            +"</span><span>" + pieces.all + "</span></span>";
        comma = ", ";
    }
    if (pieces.smile > 0) {
        s += "<span class='pieceno'><span class='piece smile' title='" + Attribute.get("SMILE")[lang.pieceNameProperty] + "'>"
            + comma + lang.leftSquareBracket
            + Attribute.get("SMILE")[lang.pieceNameProperty]
            + lang.rightSquareBracket + lang.times
            + "</span><span>" + pieces.smile + "</span></span>";
        comma = ", ";
    }
    if (pieces.pure > 0) {
        s += "<span class='pieceno'><span class='piece pure' title='" + Attribute.get("PURE")[lang.pieceNameProperty] + "'>"
            + comma + lang.leftSquareBracket
            + Attribute.get("PURE")[lang.pieceNameProperty]
            + lang.rightSquareBracket + lang.times
            + "</span><span>" + pieces.pure + "</span></span>";
        comma = ", ";
    }
    if (pieces.cool > 0) {
        s += "<span class='pieceno'><span class='piece cool' title='" + Attribute.get("COOL")[lang.pieceNameProperty] + "'>"
            + comma + lang.leftSquareBracket
            + Attribute.get("COOL")[lang.pieceNameProperty]
            + lang.rightSquareBracket + lang.times
            + "</span><span>" + pieces.cool + "</span></span>";
    }
    return s;
}
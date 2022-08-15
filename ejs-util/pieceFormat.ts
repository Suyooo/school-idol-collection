import PieceInfo from "../cards/pieceInfo";

export function pieceFormat(pieces: PieceInfo): string {
    let s = "";
    let comma = "";
    if (pieces.all > 0) {
        s += "<span class='pieceno'><span class='piece all'>[ALL] x</span><span>" + pieces.all + "</span></span>";
        comma = ", ";
    }
    if (pieces.smile > 0) {
        s += "<span class='pieceno'><span class='piece smile'>" + comma + "[SMILE] x</span><span>" + pieces.smile + "</span></span>";
        comma = ", ";
    }
    if (pieces.pure > 0) {
        s += "<span class='pieceno'><span class='piece pure'>" + comma + "[PURE] x</span><span>" + pieces.pure + "</span></span>";
        comma = ", ";
    }
    if (pieces.cool > 0) {
        s += "<span class='pieceno'><span class='piece cool'>" + comma + "[COOL] x</span><span>" + pieces.cool + "</span></span>";
    }
    return s;
}
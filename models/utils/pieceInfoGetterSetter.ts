import PieceInfo from "../../cards/pieceInfo";

export function pieceInfoGetter(allKeyName?: string, smileKeyName?: string, pureKeyName?: string, coolKeyName?: string) {
    return new PieceInfo(
        allKeyName ? this.getDataValue(allKeyName) : 0,
        smileKeyName ? this.getDataValue(smileKeyName) : 0,
        pureKeyName ? this.getDataValue(pureKeyName) : 0,
        coolKeyName ? this.getDataValue(coolKeyName) : 0);
}

export function pieceInfoSetter(pieceInfo: PieceInfo, allKeyName?: string, smileKeyName?: string, pureKeyName?: string, coolKeyName?: string) {
    if (allKeyName) this.setDataValue(allKeyName, pieceInfo.all);
    if (smileKeyName) this.setDataValue(smileKeyName, pieceInfo.smile);
    if (pureKeyName) this.setDataValue(pureKeyName, pieceInfo.pure);
    if (coolKeyName) this.setDataValue(coolKeyName, pieceInfo.cool);
}
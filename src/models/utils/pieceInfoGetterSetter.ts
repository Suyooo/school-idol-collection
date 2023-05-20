import PieceInfo from "$lib/types/pieceInfo.js";

export function pieceInfoGetter(
    obj: any,
    allKeyName?: string,
    smileKeyName?: string,
    pureKeyName?: string,
    coolKeyName?: string
) {
    return new PieceInfo(
        allKeyName ? obj.getDataValue(allKeyName) : 0,
        smileKeyName ? obj.getDataValue(smileKeyName) : 0,
        pureKeyName ? obj.getDataValue(pureKeyName) : 0,
        coolKeyName ? obj.getDataValue(coolKeyName) : 0
    );
}

export function pieceInfoSetter(
    obj: any,
    pieceInfo: PieceInfo,
    allKeyName?: string,
    smileKeyName?: string,
    pureKeyName?: string,
    coolKeyName?: string
) {
    if (allKeyName) obj.setDataValue(allKeyName, pieceInfo.all);
    if (smileKeyName) obj.setDataValue(smileKeyName, pieceInfo.smile);
    if (pureKeyName) obj.setDataValue(pureKeyName, pieceInfo.pure);
    if (coolKeyName) obj.setDataValue(coolKeyName, pieceInfo.cool);
}

const allDigitsPattern = /^[０-９]*$/;
const piecesPattern = /【(オール|赤|緑|青)】/g;

function num(fw: string): number {
    return Number(fw.normalize('NFKC'));
}

export {
    allDigitsPattern, piecesPattern, num
}
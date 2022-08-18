const regexSpecialCharacters = /[-[\]{}()*+?.,\\^$|#]/g;

function toNumWithFullwidth(fw: string): number {
    return parseInt(fw.normalize('NFKC'));
}

function escapeForRegex(s: string): string {
    return s.replace(regexSpecialCharacters, "\\$&");
}

export {
    toNumWithFullwidth, escapeForRegex
}
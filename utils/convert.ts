const regexSpecialCharacters = /[-[\]{}()*+?.,\\^$|#]/g;

function toNumWithFullwidth(fw: string): number {
    return parseInt(fw.normalize('NFKC'));
}

function escapeForRegex(s: string): string {
    return s.replace(regexSpecialCharacters, "\\$&");
}

function escapeForUrl (s: string): string {
    return encodeURIComponent(s).replace(/'/g, "%27");
}

export {
    toNumWithFullwidth, escapeForRegex, escapeForUrl
}
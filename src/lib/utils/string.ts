export const regexSpecialCharacters = /[-[\]{}()*+?.,\\^$|#]/g;

export function toNumWithFullwidth(fw: string): number {
    return parseInt(fw.normalize('NFKC'));
}

export function escapeForRegex(s: string): string {
    return s.replace(regexSpecialCharacters, "\\$&");
}

export function escapeForUrl(s: string): string {
    return encodeURIComponent(s).replace(/'/g, "%27");
}

export function uppercaseFirst(s: string): string {
    return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
}
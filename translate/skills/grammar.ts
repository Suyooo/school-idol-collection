function aOrAn(s: string): string {
    if ("aeiou".indexOf(s.charAt(0).toLowerCase()) === -1) {
        return "a";
    } else {
        return "an";
    }
}

export {aOrAn};
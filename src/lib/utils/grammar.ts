export function aOrAn(s: string): string {
    if ("aeiou".indexOf(s.charAt(0).toLowerCase()) === -1) {
        return "a";
    } else {
        return "an";
    }
}

export function ordinal(n: number) {
    // https://stackoverflow.com/a/39466341/1381397
    return n + (["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th");
}

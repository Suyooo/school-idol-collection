export function shuffleArray(deck: string[]) {
    return deck
        .map((v) => ({ v, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map((e) => e.v);
}

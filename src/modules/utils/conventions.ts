import type Card from "$models/card/card";

export function cardTitle(card: Card): string {
    const nameWithQuot = card.nameEng === null
        ? card.nameJpn.split("／").map(s => '"' + s + '"').join("／")
        : card.nameEng.split(" / ").map(s => '"' + s + '"').join(" / ");
    return "<span class='card-id'>" + card.cardNo + "</span> " + nameWithQuot;
}
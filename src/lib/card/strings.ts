import type Card from "$models/card/card.js";
import type {CardMember, CardMemberWithGroup} from "$models/card/card.js";
import {cardIsMember, cardIsSong} from "$lib/card/types.js";
import {CardMemberRarity, CardSongRarity} from "$types/cardRarity.js";
import {ordinal} from "$utils/grammar.js";
import CardMemberGroupType from "$types/cardMemberGroupType.js";

export function cardTitle(card: Card, styled: boolean): string {
    const nameWithQuot = card.nameEng === null
        ? card.nameJpn.split("／").map(s => '"' + s + '"').join("／")
        : card.nameEng.split(" / ").map(s => '"' + s + '"').join(" / ");
    if (styled) return "<span class='card-id'>" + card.cardNo + "</span> " + nameWithQuot;
    else return card.cardNo + " " + nameWithQuot;
}

export function cardId(card: Card): string {
    const id = card.id.toString();
    return "0".repeat(4 - id.length) + id;
}

export function cardType(card: Card): string {
    if (cardIsMember(card)) return "Member";
    if (cardIsSong(card)) return "Song";
    return "Memory";
}

export function cardRarity(card: Card): string {
    if (cardIsMember(card)) {
        return CardMemberRarity[card.member.rarity];
    }
    if (cardIsSong(card)) {
        return CardSongRarity[card.song.rarity];
    }
    return "ME";
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function cardCost(card: CardMember): string {
    return "★".repeat(card.member.cost) + "・".repeat(3 - card.member.cost);
}

export function cardBirthday(card: CardMember): string {
    if (card.member.birthDay === null || card.member.birthMonth === null) return "—";
    return MONTH_NAMES[card.member.birthMonth - 1] + " " + ordinal(card.member.birthDay);
}

export function cardYear(card: CardMember): string {
    if (card.member.year === null) return "—";
    return ordinal(card.member.year) + " Year";
}

export function cardGroupType(card: CardMemberWithGroup): string {
    if (card.member.group.type === CardMemberGroupType.PAIR) return "Pair";
    return "Trio";
}
import { cardIsMember, cardIsSong } from "$l/card/types.js";
import CardMemberGroupType from "$l/enums/cardMemberGroupType.js";
import { CardMemberRarity, CardSongRarity } from "$l/enums/cardRarity.js";
import Language from "$l/enums/language.js";
import { ordinal } from "$l/utils/grammar.js";
import type Card from "$m/card/card.js";
import type { CardMember, CardMemberWithGroup } from "$m/card/card.js";

export function cardLink(card: Card, lang: Language = Language.ENG): string {
    return `<a href="/card/${card.cardNo}">${cardTitle(card, true, lang, true)}</a>`;
}

export function cardName(card: Card, styled: boolean, lang: Language = Language.ENG): string {
    const quot = styled ? "&quot;" : `"`;
    const pre = styled ? `<span class="lg:inline-block">${quot}` : `${quot}`;
    const post = `${quot}`;
    return card.nameEng === null || lang === Language.JPN
        ? card.nameJpn
              .split("／")
              .map((s) => `${pre}${s}${post}`)
              .join(styled ? "／</span>" : "／")
        : card.nameEng
              .split(" / ")
              .map((s) => `${pre}${s}${post}`)
              .join(styled ? "&nbsp;/</span> " : " / ");
}

export function cardTitle(
    card: Card,
    styled: boolean,
    lang: Language = Language.ENG,
    showRarity: boolean = false
): string {
    if (styled)
        return `<span class="card-id">${card.cardNo}</span>${
            showRarity ? ` <span class="rarity">${cardRarityShort(card)}</span>` : ""
        } ${cardName(card, styled, lang)}</span>`;
    else return `${card.cardNo}${showRarity ? ` ${cardRarityShort(card)}` : ""} ${cardName(card, false, lang)}`;
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

export function cardRarityShort(card: Card): string {
    if (cardIsMember(card)) {
        if (card.member.rarity === CardMemberRarity.Special) return "SP";
        if (card.member.rarity === CardMemberRarity.Secret) return "SEC";
    }
    return cardRarity(card);
}

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

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

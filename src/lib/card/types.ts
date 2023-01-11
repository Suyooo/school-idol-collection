import CardType from "$lib/types/cardType.js";
import CardMemberIdolizeType from "$lib/types/cardMemberIdolizeType.js";
import CardSongRequirementType from "$lib/types/cardSongRequirementType.js";
import type Card from "$models/card/card.js";
import type {
    CardSong,
    CardMember,
    CardMemberIdolizable,
    CardMemberWithBirthdayPieces,
    CardMemberWithGroup, CardMemberWithIdolizePieces,
    CardMemory, CardSongWithAnyReq, CardSongWithAttrReq
} from "$models/card/card.js";

export function cardIsMember(card: Card): card is CardMember {
    return card.type === CardType.MEMBER;
}

export function cardIsSong(card: Card): card is CardSong {
    return card.type === CardType.SONG;
}

export function cardIsMemory(card: Card): card is CardMemory {
    return card.type === CardType.MEMORY;
}

export function cardIsIdolizable(card: CardMember): card is CardMemberIdolizable {
    return card.member.idolizeType !== CardMemberIdolizeType.NONE;
}

export function cardHasBirthdayPieces(card: CardMember): card is CardMemberWithBirthdayPieces {
    return card.member.pieceBdayAttribute !== null;
}

export function cardHasGroup(card: CardMember): card is CardMemberWithGroup {
    return card.member.groupId !== null;
}

export function cardHasIdolizationPieces(card: CardMemberIdolizable): card is CardMemberWithIdolizePieces {
    return card.member.idolizeType === CardMemberIdolizeType.WITH_PIECES;
}

export function cardHasAnyPieceRequirement(card: CardSong): card is CardSongWithAnyReq {
    return card.song.requirementType == CardSongRequirementType.ANY_PIECE;
}

export function cardHasAttrPieceRequirement(card: CardSong): card is CardSongWithAttrReq {
    return card.song.requirementType == CardSongRequirementType.ATTR_PIECE;
}
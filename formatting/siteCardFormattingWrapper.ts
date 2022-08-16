import Card, {
    CardMember,
    CardMemberHasBirthdayPieces, CardMemberHasGroup, CardMemberHasIdolizePieces,
    CardMemberIdolizable,
    CardMemory,
    CardSong
} from "../models/card/card";
import {CardMemberRarity, CardSongRarity} from "../types/cardRarity";
import CardMemberGroupType from "../types/cardMemberGroupType";
import PieceInfo from "../types/pieceInfo";
import Language from "../types/language";
import SkillFormatter from "./skillFormatter";
import pieceFormat from "./pieceFormat";
import DB from "../models/db";
import CardMemberIdolizeType from "../types/cardMemberIdolizeType";
import CardSongAttrReqExtraInfo from "../models/card/songAttrReqExtraInfo";

export class SiteCardFormattingWrapper {
    readonly card: Card;

    constructor(card: Card) {
        this.card = card;
    }

    isMember(): this is SiteCardMemberFormattingWrapper {
        return this.card.isMember();
    }

    isSong(): this is { card: CardSong } {
        return this.card.isMember();
    }

    isMemory(): this is { card: CardMemory } {
        return this.card.isMember();
    }

    get cardNo(): string {
        return this.card.cardNo;
    }

    get set(): string {
        return this.card.cardNo.split("-")[0];
    }

    get id(): string {
        return this.card.id.toString();
    }

    get type(): string {
        if (this.card.isMember()) return "Member";
        else if (this.card.isSong()) return "Song";
        else /*if (this.card.isMemory())*/ return "Memory";
    }

    get nameEng(): string | null {
        return this.card.nameEng;
    }

    get nameJpn(): string {
        return this.card.name;
    }

    get name(): string {
        return this.nameEng || this.nameJpn;
    }

    get nameEngWithQuot(): string | null {
        if (this.card.nameEng === null) return null;
        return this.card.nameEng.split(" / ").map(s => '"' + s + '"').join(" / ");
    }

    get nameJpnWithQuot(): string {
        return this.card.name.split("／").map(s => '"' + s + '"').join("／");
    }

    get nameWithQuot(): string {
        return this.nameEngWithQuot || this.nameJpnWithQuot;
    }

    get title(): string {
        return "<span class='card-id'>" + this.cardNo + "</span> " + this.nameWithQuot;
    }

    get copyright(): string {
        return this.card.copyright;
    }

    get rarity(): string {
        if (this.card.isMember()) return CardMemberRarity[this.card.member.rarity];
        else if (this.card.isSong()) return CardSongRarity[this.card.song.rarity];
        else /*if (this.card.isMemory())*/ return "ME";
    }

    get faqs(): { link: string; label: string }[] {
        return this.card.faqs;
    }

    readonly readyPromise: Promise<void>;

    async prepareForDisplay() {
        const prevCard = await DB.Card.scope([{method: ["before", this.cardNo]}, "cardNoOnly"]).findOne();
        if (prevCard === null || this.set !== prevCard.cardNo.split("-")[0]) {
            this._prevCardNo = null;
        } else {
            this._prevCardNo = prevCard.cardNo;
        }

        const nextCard = await DB.Card.scope([{method: ["after", this.cardNo]}, "cardNoOnly"]).findOne();
        if (nextCard === null || this.set !== nextCard.cardNo.split("-")[0]) {
            this._nextCardNo = null;
        } else {
            this._nextCardNo = nextCard.cardNo;
        }

        this._skillEng = await SkillFormatter.ENG.format(this.card.skillLinesEng, true);
        this._skillJpn = await SkillFormatter.JPN.format(this.card.skillLines, true);

        if (this.isMember() && this.hasGroup()) {
            await this.prepareGroupForDisplay();
        }
    }

    private _prevCardNo!: string | null;
    get prevCardNo(): string | null {
        return this._prevCardNo;
    }

    private _nextCardNo!: string | null;
    get nextCardNo(): string | null {
        return this._nextCardNo;
    }

    private _skillEng!: string;
    get skillEng(): string {
        return this._skillEng;
    }

    private _skillJpn!: string;
    get skillJpn(): string {
        return this._skillJpn
    }
}

export class SiteCardMemberFormattingWrapper {
    readonly card: CardMember;

    get birthday(): string {
        if (this.card.member.birthMonth === null) {
            return "ー";
        }
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][this.card.member.birthMonth - 1] +
            " " + this.card.member.birthDay;
    }

    get cost(): string {
        return "<span>🟊</span>".repeat(this.card.member.cost) + "<span>・</span>".repeat(3 - this.card.member.cost);
    }

    get year(): string {
        if (this.card.member.year === null) {
            return "ー";
        }
        return ["1st", "2nd", "3rd"][this.card.member.year - 1] + " Year";
    }

    get ability(): string {
        return this.card.member.abilityRush
            ? "<span class='ability rush'>[RUSH]</span>" +
            (this.card.member.abilityLive ? "<span class='ability or'>/</span><span class='ability live'>[LIVE]</span>" : "")
            : (this.card.member.abilityLive ? "<span class='ability live'>[LIVE]</span>" : "ー");
    }

    get pieces(): string {
        return pieceFormat(this.card.member.pieces, Language.ENG);
    }

    hasBirthdayPieces(): this is SiteCardMemberHasBirthdayPiecesFormattingWrapper {
        return this.card.member.pieceBdayAttribute !== null;
    }

    hasIdolizePieces(): this is SiteCardMemberHasIdolizePiecesFormattingWrapper {
        return this.card.member.idolizeType === CardMemberIdolizeType.WITH_PIECES;
    }

    hasGroup(): this is SiteCardMemberHasGroupFormattingWrapper {
        return this.card.member.group !== null;
    }

    get costumeEng(): string {
        return this.card.member.costumeEng || "ー";
    }

    get costumeJpn(): string {
        return this.card.member.costume || "ー";
    }

    get costume(): string {
        return this.costumeEng || this.costumeJpn || "ー";
    }
}

export class SiteCardMemberHasBirthdayPiecesFormattingWrapper {
    readonly card: CardMemberHasBirthdayPieces;

    get piecesBirthday(): string {
        return "<b>+</b> "
            + pieceFormat(new PieceInfo(0, 0, 0, 0)
                .addPiece(this.card.member.pieceBdayAttribute), Language.ENG);
    }
}

export class SiteCardMemberHasIdolizePiecesFormattingWrapper {
    readonly card: CardMemberHasIdolizePieces;

    get piecesIdolized(): string {
        return "<b>+</b> " + pieceFormat(this.card.member.idolizeBonus.pieces, Language.ENG);
    }
}

export class SiteCardMemberHasGroupFormattingWrapper {
    readonly card: CardMemberHasGroup;

    get groupMembers(): string {
        const memberLinks = [];
        for (const member of this.card.member.group.members) {
            if (member.id === this.card.id) continue;
            memberLinks.push('<a href="/card/' + member.cardNo + '/">' + new SiteCardFormattingWrapper(member).title + '</a>');
        }
        return memberLinks.join(" ");
    }

    get groupType(): string {
        return this.card.member.group.type == CardMemberGroupType.PAIR ? "Pair" : "Type";
    }

    async prepareGroupForDisplay() {
        this._groupSkillEng = await SkillFormatter.ENG.format(this.card.member.group.skillLinesEng, true);
        this._groupSkillJpn = await SkillFormatter.JPN.format(this.card.member.group.skillLines, true);
    }

    private _groupSkillEng!: string;

    get groupSkillEng(): string {
        return this._groupSkillEng;
    }

    private _groupSkillJpn!: string;

    get groupSkillJpn(): string {
        return this._groupSkillJpn;
    }
}

export class SiteCardSongFormattingWrapper {
    readonly card: CardSong;

    get attribute(): string {
        return this.card.song.attribute.songAttributeNameEng;
    }

    get livePoints(): string {
        let lpBonus: string = "";
        if (this.card.song.lpBonus !== null) {
            if (this.card.song.lpBonus === "X") lpBonus = "+X";
            else if (this.card.song.lpBonus === "∞") lpBonus = "+∞";
            else if (this.card.song.lpBonus < 0) lpBonus = this.card.song.lpBonus.toString();
            else lpBonus = "+" + this.card.song.lpBonus.toString();
        }

        return this.card.song.lpBase + lpBonus;
    }

    get requirement(): string {
        if (this.card.hasAnyPieceRequirement()) {
            return pieceFormat(this.card.song.anyRequirement.pieces, Language.ENG);
        } else /*if (this.card.hasAttrPieceRequirement())*/ {
            return pieceFormat((<CardSongAttrReqExtraInfo>this.card.song.attrRequirement).pieces, Language.ENG);
        }
    }
}
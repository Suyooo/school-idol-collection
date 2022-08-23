import Card, {
    CardMember,
    CardMemberHasBirthdayPieces, CardMemberHasGroup, CardMemberHasIdolizePieces,
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
import Attribute from "../types/attribute";

function assertIsFormattingMember(obj: unknown): asserts obj is SiteCardMemberFormattingWrapper {
}

function assertIsFormattingSong(obj: unknown): asserts obj is SiteCardSongFormattingWrapper {
}

function assertIsFormattingMemberWithBirthdayPieces(obj: unknown): asserts obj is SiteCardMemberWithBirthdayPiecesFormattingWrapper {
}

function assertIsFormattingMemberWithIdolizePieces(obj: unknown): asserts obj is SiteCardMemberWithIdolizePiecesFormattingWrapper {
}

function assertIsFormattingMemberWithGroup(obj: unknown): asserts obj is SiteCardMemberWithGroupFormattingWrapper {
}

export default class SiteCardFormattingWrapper {
    readonly card: Card;

    constructor(card: Card, reducedAttributes: boolean = false) {
        this.card = card;
        this.cardNo = card.cardNo;
        this.set = card.cardNo.split("-")[0];
        this.id = card.id.toString();
        if (!reducedAttributes) {
            this.copyright = card.copyright;
            this.faqs = card.faqs;

            if (card.linkedBy !== undefined) {
                const backlinkSet: Set<string> = new Set();
                for (const annotation of card.linkedBy) {
                    for (const c of (annotation.skill.cardNo !== null ? [annotation.skill.card] : annotation.skill.group.members)) {
                        backlinkSet.add("<a href='/card/" + c.cardNo + "'>" + new SiteCardFormattingWrapper(c, true).title + "</a>");
                    }
                }
                this.backlinks = [...backlinkSet.values()];
            }
        }

        if (card.isMember()) {
            this.type = "Member";
            if (!reducedAttributes) this.rarity = CardMemberRarity[card.member.rarity];
        } else if (card.isSong()) {
            this.type = "Song";
            if (!reducedAttributes) this.rarity = CardSongRarity[card.song.rarity];
        } else if (card.isMemory()) {
            this.type = "Memory";
            if (!reducedAttributes) this.rarity = "ME";
        }

        this.nameJpn = card.nameJpn;
        this.nameEng = card.nameEng;
        this.name = this.nameEng || this.nameJpn;

        this.nameJpnWithQuot = card.nameJpn.split("／").map(s => '"' + s + '"').join("／");
        this.nameEngWithQuot = card.nameEng === null ? null
            : card.nameEng.split(" / ").map(s => '"' + s + '"').join(" / ");
        this.nameWithQuot = this.nameEngWithQuot || this.nameJpnWithQuot;
        this.title = "<span class='card-id'>" + this.cardNo + "</span> " + this.nameWithQuot;
    }

    readonly cardNo: string;
    readonly set: string;
    readonly id: string;
    readonly type: string;
    readonly copyright: string;
    readonly rarity: string;
    readonly faqs: { link: string; label: string }[];

    readonly nameJpn: string;
    readonly nameEng: string | null;
    readonly name: string;

    readonly nameEngWithQuot: string | null;
    readonly nameJpnWithQuot: string;
    readonly nameWithQuot: string;
    readonly title: string;

    readonly backlinks: string[];

    async prepareAsyncProperties() {
        const prevCard = await DB.Card.scope([{method: ["before", this.cardNo]}, "cardNoOnly"]).findOne();
        if (prevCard === null || this.set !== prevCard.cardNo.split("-")[0]) {
            this.prevCardNo = null;
        } else {
            this.prevCardNo = prevCard.cardNo;
        }

        const nextCard = await DB.Card.scope([{method: ["after", this.cardNo]}, "cardNoOnly"]).findOne();
        if (nextCard === null || this.set !== nextCard.cardNo.split("-")[0]) {
            this.nextCardNo = null;
        } else {
            this.nextCardNo = nextCard.cardNo;
        }

        this.skillJpn = await SkillFormatter.JPN.formatCardSkill(this.card.skills.map(s => s.jpn));
        this.skillEng = await SkillFormatter.ENG.formatCardSkill(this.card.skills.map(s => s.eng || "ー"));

        if (this.isMember() && this.hasGroup()) {
            await this.prepareGroupAsyncProperties();
        }
    }

    prevCardNo: string | null;
    nextCardNo: string | null;
    skillJpn: string;
    skillEng: string;

    isMember(): this is SiteCardMemberFormattingWrapper {
        if (!this.card.isMember()) return false;
        assertIsFormattingMember(this);
        if (this.birthday !== undefined) return true;

        this.birthday = (this.card.member.birthMonth === null) ? "ー"
            : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][this.card.member.birthMonth - 1] +
            " " + this.card.member.birthDay;
        this.cost = "<span>&starf;</span>".repeat(this.card.member.cost) + "<span>&#12539;</span>".repeat(3 - this.card.member.cost);
        this.year = (this.card.member.year === null) ? "ー"
            : ["1st", "2nd", "3rd"][this.card.member.year - 1] + " Year";
        this.ability = this.card.member.abilityRush
            ? "<span class='ability rush'>[RUSH]</span>" +
            (this.card.member.abilityLive ? "<span class='ability or'>/</span><span class='ability live'>[LIVE]</span>" : "")
            : (this.card.member.abilityLive ? "<span class='ability live'>[LIVE]</span>" : "ー");
        this.pieces = pieceFormat(this.card.member.pieces, Language.ENG);

        this.costumeEng = this.card.member.costumeEng === null ? "ー" : "<a href='/search/member/costume:"
            + encodeURIComponent(this.card.member.costumeEng).replace(/'/g, "%27") + "'>"
            + this.card.member.costumeEng + "</a>";
        this.costumeJpn = this.card.member.costumeJpn === null ? "ー" : "<a href='/search/member/costume:"
            + encodeURIComponent(this.card.member.costumeJpn).replace(/'/g, "%27") + "'>"
            + this.card.member.costumeJpn + "</a>";
        this.costume = this.costumeEng || this.costumeJpn;

        this.hasBirthdayPieces = (): this is SiteCardMemberWithBirthdayPiecesFormattingWrapper => {
            if (this.card.member!.pieceBdayAttribute === null) return false;
            assertIsFormattingMemberWithBirthdayPieces(this);
            if (this.piecesBirthday !== undefined) return true;

            this.piecesBirthday = "<b>+</b> "
                + pieceFormat(new PieceInfo(0, 0, 0, 0)
                    .addPiece(Attribute.get(this.card.member.pieceBdayAttribute)), Language.ENG);

            return true;
        }

        this.hasIdolizePieces = (): this is SiteCardMemberWithIdolizePiecesFormattingWrapper => {
            if (this.card.member!.idolizeType !== CardMemberIdolizeType.WITH_PIECES) return false;
            assertIsFormattingMemberWithIdolizePieces(this);
            if (this.piecesIdolized !== undefined) return true;

            this.piecesIdolized = "<b>+</b> " + pieceFormat(this.card.member.idolizeBonus.pieces, Language.ENG);

            return true;
        }

        this.hasGroup = (): this is SiteCardMemberWithGroupFormattingWrapper => {
            if (this.card.member!.group === null) return false;
            assertIsFormattingMemberWithGroup(this);
            if (this.groupMembers !== undefined) return true;

            const memberLinks = [];
            for (const member of this.card.member.group.members) {
                if (member.id === this.card.id) continue;
                memberLinks.push('<a href="/card/' + member.cardNo + '/">' + new SiteCardFormattingWrapper(member).title + '</a>');
            }
            this.groupMembers = memberLinks.join(" ");
            this.groupType = this.card.member.group.type == CardMemberGroupType.PAIR ? "Pair" : "Trio";

            this.prepareGroupAsyncProperties = async () => {
                assertIsFormattingMemberWithGroup(this);
                this.groupSkillJpn = await SkillFormatter.JPN.formatCardSkill(this.card.member.group.skills.map(s => s.jpn));
                this.groupSkillEng = await SkillFormatter.ENG.formatCardSkill(this.card.member.group.skills.map(s => s.eng || "ー"));
            }

            return true;
        }

        return true;
    }

    isSong(): this is SiteCardSongFormattingWrapper {
        if (!this.card.isSong()) return false;
        assertIsFormattingSong(this);
        if (this.attribute !== undefined) return true;

        this.attribute = Attribute.get(this.card.song.attribute).songAttributeNameEng;

        let lpBonus: string = "";
        if (this.card.song.lpBonus !== null) {
            if (this.card.song.lpBonus === "X") lpBonus = "+X";
            else if (this.card.song.lpBonus === "∞") lpBonus = "+∞";
            else if (this.card.song.lpBonus < 0) lpBonus = this.card.song.lpBonus.toString();
            else lpBonus = "+" + this.card.song.lpBonus.toString();
        }
        this.livePoints = this.card.song.lpBase + lpBonus;

        if (this.card.hasAnyPieceRequirement()) {
            this.requirement = pieceFormat(this.card.song.anyRequirement.pieces, Language.ENG);
        } else /*if (this.card.hasAttrPieceRequirement())*/ {
            this.requirement = pieceFormat((<CardSongAttrReqExtraInfo>this.card.song.attrRequirement).pieces, Language.ENG);
        }

        return true;
    }

    isMemory(): this is SiteCardMemoryFormattingWrapper {
        return this.card.isMemory();
    }
}

interface SiteCardMemberFormattingWrapper {
    readonly card: CardMember;

    birthday: string;
    cost: string;
    year: string;
    ability: string;
    pieces: string;
    costumeJpn: string;
    costumeEng: string;
    costume: string;

    hasBirthdayPieces: () => this is SiteCardMemberWithBirthdayPiecesFormattingWrapper;
    hasIdolizePieces: () => this is SiteCardMemberWithIdolizePiecesFormattingWrapper;
    hasGroup: () => this is SiteCardMemberWithGroupFormattingWrapper;
}

interface SiteCardMemberWithBirthdayPiecesFormattingWrapper extends SiteCardMemberFormattingWrapper {
    readonly card: CardMemberHasBirthdayPieces;

    piecesBirthday: string;
}

interface SiteCardMemberWithIdolizePiecesFormattingWrapper extends SiteCardMemberFormattingWrapper {
    readonly card: CardMemberHasIdolizePieces;

    piecesIdolized: string;
}

interface SiteCardMemberWithGroupFormattingWrapper extends SiteCardMemberFormattingWrapper {
    readonly card: CardMemberHasGroup;

    groupMembers: string;
    groupType: string;

    prepareGroupAsyncProperties: () => Promise<void>;

    groupSkillJpn: string;
    groupSkillEng: string;
}

interface SiteCardSongFormattingWrapper extends SiteCardFormattingWrapper {
    readonly card: CardSong;

    attribute: string;
    livePoints: string;
    requirement: string;
}

interface SiteCardMemoryFormattingWrapper extends SiteCardFormattingWrapper {
    readonly card: CardMemory;
}
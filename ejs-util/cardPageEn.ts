import {Card, CardMember, CardMemberIdolizable, CardSong} from "../models/card/card";
import {RarityMember, RaritySong} from "../cards/rarity";
import UnimplementedError from "../errors/unimplemented";
import WrongTypeError from "../errors/wrongType";
import {CardMemberGroupType} from "../cards/cardMemberGroup";
import {cardNoExists, loadFirstCardFromId} from "../cards/loader";
import DatabaseError from "../errors/database";
import PieceInfo, {PieceNameEng, PieceNameJpn} from "../cards/pieceInfo";
import Annotation from "../annotator/annotation";
import Trigger from "../consts/triggers";
import {num} from "../translate/skills/regex";
import Language from "../consts/language";
import Attribute from "../consts/attributes";
import {skillFormat} from "./skillFormat";
import {pieceFormat} from "./pieceFormat";


export default class EJSCardPage {
    readonly card: Card;

    constructor(card: Card) {
        this.card = card;
    }

    cardno(): string {
        return this.card.cardno;
    }

    set(): string {
        return this.card.cardno.split("-")[0];
    }

    cardnoInSet(): number {
        return Number(this.card.cardno.split("-")[1].substring(0, 3));
    }

    hasPrevCard(): boolean {
        return this.cardnoInSet() != 1;
    }

    prevCardno(): string | undefined {
        if (this.cardno() == "EX15-E01") return "EX15-054";
        if (this.cardno().startsWith("EX15-E")) return "EX15-E" + (Number(this.card.cardno.split("-")[1].substring(1, 3)) - 1).toString().padStart(2, "0");
        if (this.cardno() == "PR-070") return "PR-069B";
        if (this.cardno() == "PR-069B") return "PR-069A";
        return this.set() + "-" + (this.cardnoInSet() - 1).toString().padStart(3, "0");
    }

    hasNextCard(): this is { nextCardno: () => string } {
        if (this.cardno() == "EX15-054") return true;
        if (this.cardno() == "EX15-E18") return false;
        if (this.cardno().startsWith("EX15-E")) return true;
        if (this.cardno() == "PR-068") return true;
        return cardNoExists(this.set() + "-" + (this.cardnoInSet() + 1).toString().padStart(3, "0"));
    }

    nextCardno(): string | undefined {
        if (this.cardno() == "EX15-054") return "EX15-E01";
        if (this.cardno() == "EX15-E18") return undefined;
        if (this.cardno().startsWith("EX15-E")) return "EX15-E" + (Number(this.card.cardno.split("-")[1].substring(1, 3)) + 1).toString().padStart(2, "0");
        if (this.cardno() == "PR-068") return "PR-069A";
        if (this.cardno() == "PR-069A") return "PR-069B";
        return this.set() + "-" + (this.cardnoInSet() + 1).toString().padStart(3, "0");
    }

    id(): string {
        return this.card.id.toString();
    }

    type(): string {
        if (this.card.isMember()) return "Member";
        else if (this.card.isSong()) return "Song";
        else if (this.card.isMemory()) return "Memory";
        else throw new UnimplementedError("Unknown CardType " + this.card);
    }

    name(): string {
        return this.card.nameEn || this.card.name;
    }

    nameWithQuot(): string {
        if (this.card.nameEn != null) {
            return this.card.nameEn.split(" / ").map(s => '"' + s + '"').join(" / ");
        } else {
            return this.card.name.split("／").map(s => '"' + s + '"').join("／");
        }
    }

    title(): string {
        return "<span class='card-id'>" + this.cardno() + "</span> " + this.nameWithQuot();
    }

    skill(): string {
        return skillFormat(this.card.skill, Language.JPN, true);
    }

    skillEn(): string {
        return skillFormat(this.card.skillEn, Language.ENG, true);
    }

    copyright(): string {
        return this.card.copyright;
    }

    rarity(): string {
        if (this.card.isMember()) return RarityMember[this.card.rarity];
        else if (this.card.isSong()) return RaritySong[this.card.rarity];
        else if (this.card.isMemory()) return "ME";
        else throw new UnimplementedError("Unknown CardType " + this.card);
    }

    birthday(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        if (this.card.birthMonth == undefined) {
            return "ー";
        }
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][this.card.birthMonth - 1] +
            " " + this.card.birthDay;
    }

    cost(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        return "<span>🟊</span>".repeat(this.card.cost) + "<span>・</span>".repeat(3 - this.card.cost);
    }

    year(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        if (this.card.year == undefined) {
            return "ー";
        }
        return ["1st", "2nd", "3rd"][this.card.year - 1] + " Year";
    }

    ability(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        return this.card.abilityRush
            ? "<span class='ability rush'>[RUSH]</span>" +
            (this.card.abilityLive ? "<span class='ability or'>/</span><span class='ability live'>[LIVE]</span>" : "")
            : (this.card.abilityLive ? "<span class='ability live'>[LIVE]</span>" : "ー");
    }

    pieces(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        return pieceFormat(this.card.pieces);
    }

    piecesBirthday(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        if (!(this.card.piecesBdayType)) throw new WrongTypeError("Member doesn't have Birthday Piece Bonus");
        return "<b>+</b> " + pieceFormat(new PieceInfo(0, 0, 0, 0).addType(this.card.piecesBdayType));
    }

    piecesIdolized(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        if (!(this.card instanceof CardMemberIdolizable)) throw new WrongTypeError("Not a Idolized Member");
        if (!(this.card.piecesIdolized)) throw new WrongTypeError("Member doesn't have Idolized Piece Bonus");
        return "<b>+</b> " + pieceFormat(this.card.piecesIdolized);
    }

    costume(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        return this.card.costumeEn || this.card.costume || "ー";
    }

    groupMembers(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        if (!(this.card.group)) throw new WrongTypeError("Not a Groupable Member");
        const members = [];
        for (const memberId of this.card.group.memberIds) {
            if (memberId === this.card.id) continue;
            const otherMember = loadFirstCardFromId(memberId);
            if (!otherMember) throw new DatabaseError("Member #" + memberId + " supposed to be group member, doesn't exist");
            members.push('<a href="/card/' + otherMember.cardno + '/">' + new EJSCardPage(otherMember).title() + '</a>');
        }
        return members.join(" ");
    }

    groupType(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        if (!(this.card.group)) throw new WrongTypeError("Not a Groupable Member");
        return this.card.group.type == CardMemberGroupType.PAIR ? "Pair" : "Type";
    }

    groupSkill(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        if (!(this.card.group)) throw new WrongTypeError("Not a Groupable Member");
        return skillFormat(this.card.group.skill, Language.JPN, true);
    }

    groupSkillEn(): string {
        if (!(this.card instanceof CardMember)) throw new WrongTypeError("Not a Member");
        if (!(this.card.group)) throw new WrongTypeError("Not a Groupable Member");
        return skillFormat(this.card.group.skillEn, Language.ENG, true);
    }

    attribute(): string {
        if (!(this.card instanceof CardSong)) throw new WrongTypeError("Not a Song");
        return this.card.attribute.eng;
    }

    livePoints(): string {
        if (!(this.card instanceof CardSong)) throw new WrongTypeError("Not a Song");
        return this.card.lpBase + (this.card.lpBonus || "");
    }

    requirement(): string {
        if (!(this.card instanceof CardSong)) throw new WrongTypeError("Not a Song");
        if (this.card.hasAnyReq()) {
            return pieceFormat(new PieceInfo(this.card.pieces, 0, 0, 0));
        } else if (this.card.hasAttrReq()) {
            return pieceFormat(this.card.pieces);
        } else {
            throw new UnimplementedError("Unknown ReqType " + this.card.reqType)
        }
    }

    faqs(): { link: string; label: string }[] {
        return this.card.faqs;
    }
}
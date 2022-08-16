// noinspection JSNonASCIINames,NonAsciiCharacters

import * as fs from "fs";
import {Card, CardMember, CardMemberIdolizable, CardMemory, CardSongWithAnyReq, CardSongWithAttrReq} from "../models/card/card";
import UnimplementedError from "../errors/unimplemented";
import {RarityMember, RaritySong} from "../cards/rarity";
import PieceInfo, {PieceNameJpn} from "../cards/pieceInfo";
import Attribute, {AttributeJpnName} from "../consts/attributes";
import {ColourJpnName} from "../consts/colours";
import DB from "../utils/db";
import RawInfoError from "../errors/rawInfo";
import IdolizeType from "../cards/idolizeType";
import CardMemberGroup, {getGroupFor} from "../cards/cardMemberGroup";
import ImpossibleError from "../errors/impossible";
import WrongTypeError from "../errors/wrongType";

type Empty = "―" | "－" | "─" | "-";
type RawAttr = AttributeJpnName & Empty;

type RawDataMember = {
    "type": "メンバー", "レアリティ": keyof typeof RarityMember, "誕生日": string, "学年": string, "コスト": string,
    "ピース1": RawAttr, "ピース2": RawAttr, "ピース3": RawAttr, "ピース4": RawAttr, "ボーナス": RawAttr, "特技": string, "衣装": string
};

type RawDataSongOrMemory = {
    "枠属性": AttributeJpnName, "ライブP": string, "赤スコア": string, "緑スコア": string, "青スコア": string, "共通スコア": string, "カードの色": ColourJpnName
};

type RawDataSong = { "type": "楽曲" } & RawDataSongOrMemory;

type RawDataMemory = { "type": "メモリー" } & RawDataSongOrMemory;

type RawData = (RawDataMember | RawDataSong | RawDataMemory) &
    { "name": string, "カードNo.": string, "商品": string, "ID": string, "種別": string, "スキル": string, "コピーライト": string };

function isEmpty(x: string): x is Empty {
    return x == "―" || x == "－" || x == "─" || x == "-";
}

const birthdayPattern = /^(\d*)月(\d*)日$/;
const lpPattern = /^(\d*)([+-][\dX∞]*)?$/;
const idolizedPiecesPattern = /<覚醒>(【(?:オール|赤|緑|青)】(?:\/【(?:オール|赤|緑|青)】?)*)/;
const pairPattern = /[【「](\d*?) (.*?)[】」]とペアになる。/;
const pairSkillPattern = /\n?<ペアスキル>\n?/;
const trioPattern = /[【「](\d*?) (.*?)[】」][【「](\d*?) (.*?)[】」]とトリオになる。/;
const trioSkillPattern = /\n?<トリオスキル>\n?/;

export function loadCardFromRawInfo(path: string): Card {
    const rawdata: RawData = JSON.parse(fs.readFileSync(path).toString());

    const cardno = rawdata["カードNo."];
    const id = Number(rawdata["ID"]);
    const name = rawdata["name"];
    let skill = isEmpty(rawdata["スキル"]) ? undefined : rawdata["スキル"].replace(/\n\n/g, "\n");
    const copyright = rawdata["コピーライト"];

    if (rawdata["type"] == "メンバー") {
        const rarity = RarityMember[rawdata["レアリティ"]];
        const cost = isEmpty(rawdata["コスト"]) ? 0 : rawdata["コスト"].length as 1 | 2 | 3;
        let birthDay = undefined, birthMonth = undefined;
        if (rawdata["誕生日"] !== "？？？") {
            const bdMatch = birthdayPattern.exec(rawdata["誕生日"]);
            if (bdMatch === null) throw new RawInfoError(cardno + ": Invalid birthday scraped from website");
            birthDay = Number(bdMatch[2]);
            birthMonth = Number(bdMatch[1]);
        }
        const year = isEmpty(rawdata["学年"]) ? undefined : Number(rawdata["学年"].charAt(0)) as 1 | 2 | 3;
        const costume = isEmpty(rawdata["衣装"]) ? undefined : rawdata["衣装"];
        const abilityRush = rawdata["特技"].indexOf("RUSH") !== -1;
        const abilityLive = rawdata["特技"].indexOf("LIVE") !== -1;
        const idolizable = rawdata["スキル"].indexOf("【特別練習】") !== -1;
        const groupMatch = pairPattern.exec(rawdata["スキル"]) || trioPattern.exec(rawdata["スキル"]);

        let pieces = new PieceInfo(0, 0, 0, 0);
        if (!isEmpty(rawdata["ピース1"])) pieces = pieces.addType(Attribute.fromJpn(rawdata["ピース1"]));
        if (!isEmpty(rawdata["ピース2"])) pieces = pieces.addType(Attribute.fromJpn(rawdata["ピース2"]));
        if (!isEmpty(rawdata["ピース3"])) pieces = pieces.addType(Attribute.fromJpn(rawdata["ピース3"]));
        if (!isEmpty(rawdata["ピース4"])) pieces = pieces.addType(Attribute.fromJpn(rawdata["ピース4"]));
        const piecesBDayType = isEmpty(rawdata["ボーナス"]) ? undefined : Attribute.fromJpn(rawdata["ボーナス"]);

        let group = undefined;
        let groupSkill = undefined;
        if (rawdata["スキル"].indexOf("<トリオスキル>") !== -1) {
            [skill, groupSkill] = rawdata["スキル"].split(trioSkillPattern);
        } else if (rawdata["スキル"].indexOf("<ペアスキル>") !== -1) {
            [skill, groupSkill] = rawdata["スキル"].split(pairSkillPattern);
        }
        if (groupMatch != null) {
            let memberIds: number[];
            if (groupMatch[3]) {
                memberIds = [id, Number(groupMatch[1]), Number(groupMatch[3])];
            } else {
                memberIds = [id, Number(groupMatch[1])];
            }

            group = new CardMemberGroup(undefined, memberIds, groupSkill);
        }
        if (group == undefined) {
            group = getGroupFor(id);
        }

        if (!idolizable) {
            return new CardMember(cardno, id, name, skill, copyright, rarity, cost, birthDay, birthMonth, year, pieces,
                piecesBDayType, costume, abilityRush, abilityLive, IdolizeType.NONE, group);
        } else {
            if (skill == undefined) throw new ImpossibleError("There must be a Skill if the Member is Idolizable.");
            const idolizableWithPieces = skill.indexOf("<覚醒>") !== -1;
            let idolizationPieces = undefined;
            if (idolizableWithPieces) {
                const idolPieceMatch = idolizedPiecesPattern.exec(skill);
                if (idolPieceMatch === null) throw new RawInfoError(cardno + ": Can't read Idolized Pieces scraped from website");
                idolizationPieces = new PieceInfo(0, 0, 0, 0);
                for (const piece of idolPieceMatch[1].split("/")) {
                    idolizationPieces = idolizationPieces.addType(piece.substring(1, piece.length - 1) as PieceNameJpn);
                }
                skill = skill.substring(0, idolPieceMatch.index);
            }
            return new CardMemberIdolizable(cardno, id, name, skill, copyright, rarity, cost, birthDay, birthMonth, year, pieces,
                piecesBDayType, costume, abilityRush, abilityLive, idolizationPieces, group);
        }
    } else if (rawdata["type"] == "楽曲") {
        const attribute = Attribute.fromJpn(rawdata["枠属性"]);
        const lpMatch = lpPattern.exec(rawdata["ライブP"]);
        if (lpMatch === null) throw new RawInfoError(cardno + ": Invalid Live Points scraped from website");
        const lpBase = Number(lpMatch[1]), lpBonus = lpMatch[2];
        if (isEmpty(rawdata["共通スコア"])) {
            const pieces = new PieceInfo(0, Number(rawdata["赤スコア"]), Number(rawdata["緑スコア"]), Number(rawdata["青スコア"]));
            return new CardSongWithAttrReq(cardno, id, name, skill, copyright, RaritySong.M, attribute, lpBase, lpBonus, pieces);
        } else {
            const pieces = Number(rawdata["共通スコア"]);
            return new CardSongWithAnyReq(cardno, id, name, skill, copyright, RaritySong.M, attribute, lpBase, lpBonus, pieces);
        }
    } else if (rawdata["type"] == "メモリー") {
        return new CardMemory(cardno, id, name, skill, copyright);
    }

    throw new UnimplementedError("Unknown CardType " + rawdata["type"]);
}

const testStmt = DB.prepare("SELECT cardno FROM cards WHERE cardno = ?");
const insertCardsStmt = DB.prepare("INSERT INTO cards(cardno, id, type, name, skill, copyright) VALUES(?, ?, ?, ?, ?, ?)");
const insertCardsMembersStmt =
    DB.prepare("INSERT INTO cards_members(cards_m_cardno, rarity, cost, birth_day, birth_month, year, " +
        "pieces_all, pieces_smile, pieces_pure, pieces_cool, pieces_bday_type, costume, abilities, idolize_type, groups_m_id) " +
        "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
const insertCardsMembersIdolStmt =
    DB.prepare("INSERT INTO cards_members_idolizedpieces(members_m_cardno, pieces_all, pieces_smile, pieces_pure, pieces_cool) " +
        "VALUES(?, ?, ?, ?, ?)");
const insertCardsSongsStmt =
    DB.prepare("INSERT INTO cards_songs(cards_m_cardno, attribute, lp_base, lp_bonus, req_type) VALUES(?, ?, ?, ?, ?)");
const insertCardsSongsAnyReqStmt =
    DB.prepare("INSERT INTO cards_songs_anyreq(songs_m_cardno, pieces) VALUES(?, ?)");
const insertCardsSongsAttrReqStmt =
    DB.prepare("INSERT INTO cards_songs_attrreq(songs_m_cardno, pieces_smile, pieces_pure, pieces_cool) VALUES(?, ?, ?, ?)");

export function addCardToDB(path: string): void {
    const card: Card = loadCardFromRawInfo(path);
    if (testStmt.get(card.cardno) === undefined) {
        insertCardsStmt.run(card.cardno, card.id, card.type, card.name, card.skill, card.copyright);
        if (card.isMember()) {
            let abilityBitSet: 0 | 1 | 2 | 3 = 0;
            if (card.abilityRush) abilityBitSet += 1;
            if (card.abilityLive) abilityBitSet += 2;

            insertCardsMembersStmt.run(card.cardno, card.rarity, card.cost, card.birthDay, card.birthMonth, card.year,
                card.pieces.all, card.pieces.smile, card.pieces.pure, card.pieces.cool, card.piecesBdayType?.id,
                card.costume, abilityBitSet, card.idolizeType, card.group?.id);

            if (card.isIdolizable() && card.piecesIdolized != undefined) {
                insertCardsMembersIdolStmt.run(card.cardno, card.piecesIdolized.all, card.piecesIdolized.smile, card.piecesIdolized.pure, card.piecesIdolized.cool);
            }
        } else if (card.isSong()) {
            insertCardsSongsStmt.run(card.cardno, card.attribute.id, card.lpBase, card.lpBonus, card.reqType);
            if (card.hasAnyReq()) {
                insertCardsSongsAnyReqStmt.run(card.cardno, card.pieces);
            } else if (card.hasAttrReq()) {
                insertCardsSongsAttrReqStmt.run(card.cardno, card.pieces.smile, card.pieces.pure, card.pieces.cool);
            }
        }
    }
}

for (const pack of fs.readdirSync("/home/chris/gdrive/Projekte/school-idol-collection/raw_info/")) {
    if (pack != "__pycache__" && fs.lstatSync("/home/chris/gdrive/Projekte/school-idol-collection/raw_info/" + pack).isDirectory()) {
        for (const card of fs.readdirSync("/home/chris/gdrive/Projekte/school-idol-collection/raw_info/" + pack)) {
            if (card.endsWith(".json")) {
                addCardToDB("/home/chris/gdrive/Projekte/school-idol-collection/raw_info/" + pack + "/" + card);
            }
        }
    }
}
import {literal, Op} from "@sequelize/core";
import type {Includeable, Sequelize} from "@sequelize/core";
import {CardBase} from "$models/card/card.js";
import type CardSongRequirementType from "../enums/cardSongRequirementType.js";

export function addScopes(sequelize: Sequelize) {
    CardBase.addScope("searchMemberRarity", (rarity: number) => ({
        include: {
            model: sequelize.models.CardMemberExtraInfo,
            required: true,
            where: {"$member.rarity$": rarity}
        }
    }));
    CardBase.addScope("searchGroup", (names: string[]) => ({
        where: {"nameJpn": {[Op.in]: names}}
    }));
    CardBase.addScope("searchSongRarity", (rarity: number) => ({
        include: {
            model: sequelize.models.CardSongExtraInfo,
            required: true,
            where: {"$song.rarity$": rarity}
        }
    }));
    CardBase.addScope("searchIdolizable", () => ({
        include: {
            model: sequelize.models.CardMemberExtraInfo,
            required: true,
            where: {"$member.idolizeType$": {[Op.gt]: 0}}
        }
    }));
    CardBase.addScope("searchNotIdolizable", () => ({
        include: {
            model: sequelize.models.CardMemberExtraInfo,
            required: true,
            where: {"$member.idolizeType$": 0}
        }
    }));
    CardBase.addScope("searchAbility", (rush: boolean | null, live: boolean | null) => ({
        include: {
            model: sequelize.models.CardMemberExtraInfo,
            required: true,
            where: {
                ...(rush === null ? {} : {"$member.abilityRush$": rush}),
                ...(live === null ? {} : {"$member.abilityLive$": live})
            }
        }
    }));
    CardBase.addScope("searchYear", (year: 1 | 2 | 3) => ({
        include: {
            model: sequelize.models.CardMemberExtraInfo,
            required: true,
            where: {year}
        }
    }));
    CardBase.addScope("searchGenericMultiColumnLike", (term: string, columns: string[], include?: Includeable) => ({
        include,
        where: {
            [Op.or]: columns.map(col => ({[col]: {[Op.like]: "%" + term + "%"}}))
        }
    }));
    CardBase.addScope("searchGenericNumberWithMod", (term: string, columnName: string, include?: Includeable) => {
        const op = term.endsWith("+") ? Op.gte : (term.endsWith("-") ? Op.lte : Op.eq);
        const num = parseInt(term);
        return {include, where: {[columnName]: {[op]: num}}};
    });
    CardBase.addScope("columnPiecesTotal", () => ({
        attributes: [[literal("member.piecesSmile + member.piecesPure + member.piecesCool + member.piecesAll"), "piecesTotal"]],
        include: {
            model: sequelize.models.CardMemberExtraInfo,
            required: true,
            attributes: ["piecesAll", "piecesSmile", "piecesPure", "piecesCool"]
        }
    }));
    CardBase.addScope("searchBonus", () => ({
        include: {
            model: sequelize.models.CardMemberExtraInfo,
            required: true,
            where: {"$member.pieceBdayAttribute$": {[Op.not]: null}}
        }
    }));
    CardBase.addScope("searchNoBonus", () => ({
        include: {
            model: sequelize.models.CardMemberExtraInfo,
            required: true,
            where: {"$member.pieceBdayAttribute$": null}
        }
    }));
    CardBase.addScope("searchSongAttribute", (attribute: number) => ({
        include: {
            model: sequelize.models.CardSongExtraInfo,
            required: true,
            where: {"$song.attribute$": attribute}
        }
    }));
    CardBase.addScope("searchSongReqType", (reqType: CardSongRequirementType) => ({
        include: {
            model: sequelize.models.CardSongExtraInfo,
            required: true,
            where: {"$song.requirementType$": reqType}
        }
    }));
}
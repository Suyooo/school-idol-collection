import * as Grammar from "../utils/grammar";
import * as Regex from "../utils/regex";
import CardType from "./cardType";
import Attribute, {PieceAttributeJpnName} from "./attribute";
import DB from "../models/db";
import NotFoundError from "../errors/notFoundError";
import MissingTranslationError from "../errors/missingTranslationError";

const skilltextPattern = /{{skilltext:([^}]*?)}}/;

export type PatternGroupTypeID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default class PatternGroupType {
    readonly id: PatternGroupTypeID;
    readonly getReplacement: (match: string) => Promise<string>;
    readonly getExtraReplacements: (match: string, thisNum: number, allRepls: string[]) => Map<string, string>;

    private constructor(id: PatternGroupTypeID, getReplacement: (match: string) => Promise<string>,
                        getExtraReplacements: (match: string, thisNum: number, allRepls: string[]) => Map<string, string>) {
        this.id = id;
        this.getReplacement = getReplacement;
        this.getExtraReplacements = getExtraReplacements;
    }

    private static readonly map = (() => {
        const map: PatternGroupType[] = [];

        // Name or Group
        map.push(new PatternGroupType(0, async function (match: string): Promise<string> {
            const skilltext = skilltextPattern.exec(match)?.[1];
            const n = (await DB.TranslateTableName.findByPk(match))?.eng;
            if (n === undefined) throw new NotFoundError(match + " is not a known name");
            return skilltext ? "{{skilltext:" + n + "}}" : n;
        }, generateAOrAnReplacements));

        // Song Name
        map.push(new PatternGroupType(1, async function (match: string): Promise<string> {
            const n = (await DB.TranslateTableSong.findByPk(match))?.eng;
            if (n === undefined) throw new NotFoundError(match + " is not a known song");
            return n;
        }, generateAOrAnReplacements));

        // Costume Name
        map.push(new PatternGroupType(2, async function (match: string): Promise<string> {
            const n = (await DB.TranslateTableSong.findByPk(match))?.eng;
            if (n === undefined) throw new NotFoundError(match + " is not a known song");
            return n;
        }, generateAOrAnReplacements));

        // Mem Name
        map.push(new PatternGroupType(3, async function (match: string): Promise<string> {
            const n = (await DB.Card.scope(["memories", "forLink"]).findOne({
                where: {
                    name: match
                }
            }))?.nameEng;
            if (n === undefined) throw new NotFoundError(match + " is not a known memory");
            if (n === null) throw new MissingTranslationError(match + " has no English translation");
            return n;
        }, generateAOrAnReplacements));

        // Number
        map.push(new PatternGroupType(4, async function (match: string): Promise<string> {
            return Regex.toNumWithFullwidth(match).toFixed(0);
        }, generateNumberReplacements));

        // Number Text
        map.push(new PatternGroupType(5, async function (match: string): Promise<string> {
            const n = Regex.toNumWithFullwidth(match);
            if (n === 0) return "zero";
            if (n === 1) return "one";
            if (n === 2) return "two";
            if (n === 3) return "three";
            if (n === 4) return "four";
            if (n === 5) return "five";
            if (n === 6) return "six";
            if (n === 7) return "seven";
            if (n === 8) return "eight";
            if (n === 9) return "nine";
            if (n === 10) return "ten";
            if (n === 11) return "eleven";
            if (n === 12) return "twelve";
            return n.toFixed(0);
        }, generateNumberReplacements));

        // Ordinal
        map.push(new PatternGroupType(6, async function (match: string): Promise<string> {
            const n = Regex.toNumWithFullwidth(match);
            const nMod10 = n % 10;
            const nMod100 = n % 100;
            if (nMod10 === 1 && nMod100 !== 11) return n + "st";
            if (nMod10 === 2 && nMod100 !== 12) return n + "nd";
            if (nMod10 === 3 && nMod100 !== 13) return n + "rd";
            return n + "th";
        }, generateNoReplacements));

        // Pieces
        map.push(new PatternGroupType(7, async function (match: string): Promise<string> {
            let s = "";
            for (const jpnPieceName of match.substring(1, match.length - 1).split("】【")) {
                s += "[" + Attribute.get(jpnPieceName as PieceAttributeJpnName).pieceAttributeNameEng + "]";
            }
            return s;
        }, generateNoReplacements));

        return map;
    })();

    static get(key: PatternGroupTypeID): PatternGroupType {
        return PatternGroupType.map[key] as PatternGroupType;
    }
}

function generateAOrAnReplacements(match: string, thisNum: number, allReplacements: string[]): Map<string, string> {
    return new Map<string, string>([
        ["<" + thisNum + "a>", Grammar.aOrAn(allReplacements[thisNum - 1])]
    ]);
}

function generateNumberReplacements(match: string, thisNum: number, allReplacements: string[]): Map<string, string> {
    const n = Regex.toNumWithFullwidth(match);
    const isOne = (n === 1);
    return new Map<string, string>([
        ["<" + thisNum + "s>", isOne ? "" : "s"],
        ["<" + thisNum + "sr>", isOne ? "s" : ""],
        ["<" + thisNum + "x> ", isOne ? "" : allReplacements[thisNum - 1] + " "],
        ["<" + thisNum + "e>", isOne ? "each" : "every " + allReplacements[thisNum - 1]]
    ]);
}

function generateNoReplacements(): Map<string, string> {
    return new Map<string, string>([]);
}
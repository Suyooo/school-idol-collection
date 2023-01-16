import type {DBObject} from "$models/db.js";
import type {QueryOptions} from "@sequelize/core";
import * as Grammar from "$lib/utils/grammar.js";
import {toNumWithFullwidth} from "$lib/utils/string.js";
import AttributeEnum from "$lib/enums/attribute.js";
import NotFoundError from "$lib/errors/notFoundError.js";
import MissingTranslationError from "$lib/errors/missingTranslationError.js";

const skilltextPattern = /{{skilltext:([^}]*?)}}/;

export type PatternGroupTypeID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default class PatternGroupType {
    readonly id: PatternGroupTypeID;
    readonly name: string;
    readonly getReplacement: (DB: DBObject | null, match: string, options?: QueryOptions) => Promise<string>;
    readonly getExtraReplacements: (match: string, thisNum: number) => Map<string, string> | null;
    static all: PatternGroupType[] = [];

    private constructor(id: PatternGroupTypeID, name: string,
                        getReplacement: (DB: DBObject | null, match: string, options?: QueryOptions) => Promise<string>,
                        getExtraReplacements: ((match: string, thisNum: number) => Map<string, string>) | null) {
        this.id = id;
        this.name = name;
        this.getReplacement = getReplacement;
        this.getExtraReplacements = getExtraReplacements ?? (() => null);
        PatternGroupType.all.push(this);
    }

    private static readonly map = (() => {
        const map: PatternGroupType[] = [];

        map.push(new PatternGroupType(0, "Name or Group",
            async function (DB: DBObject | null, match: string, options?: QueryOptions) {
                if (DB === null) return "EXAMPLE NAME";
                const skilltext = skilltextPattern.exec(match)?.[1];
                const n = (await DB.TranslationName.findByPk(match, options))?.eng;
                if (n === undefined) throw new NotFoundError(match + " is not a known name");
                return skilltext ? "{{skilltext:" + n + "}}" : n;
            }, generateAOrAnReplacements));

        map.push(new PatternGroupType(1, "Song Name",
            async function (DB: DBObject | null, match: string, options?: QueryOptions) {
                if (DB === null) return "EXAMPLE SONG";
                const n = (await DB.TranslationSong.findByPk(match, options))?.eng;
                if (n === undefined) throw new NotFoundError(match + " is not a known song");
                return n;
            }, generateAOrAnReplacements));

        map.push(new PatternGroupType(2, "Costume Name",
            async function (DB: DBObject | null, match: string, options?: QueryOptions) {
                if (DB === null) return "EXAMPLE COSTUME";
                const n = (await DB.TranslationSong.findByPk(match, options))?.eng;
                if (n === undefined) throw new NotFoundError(match + " is not a known song");
                return n;
            }, generateAOrAnReplacements));

        map.push(new PatternGroupType(3, "Memory Name",
            async function (DB: DBObject | null, match: string, options?: QueryOptions) {
                if (DB === null) return "EXAMPLE MEMORY";
                const n = (await DB.Card.withScope(["memories", "forLink"]).findOne({
                    ...options,
                    where: {
                        nameJpn: match
                    }
                }))?.nameEng;
                if (n === undefined) throw new NotFoundError(match + " is not a known memory");
                if (n === null) throw new MissingTranslationError(match + " has no English translation");
                return n;
            }, generateAOrAnReplacements));

        map.push(new PatternGroupType(4, "Number (as digits)",
            async function (_DB: DBObject | null, match: string) {
                return toNumWithFullwidth(match).toFixed(0);
            }, generateNumberReplacements));

        map.push(new PatternGroupType(5, "Number (as text)",
            async function (_DB: DBObject | null, match: string) {
                const n = toNumWithFullwidth(match);
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

        map.push(new PatternGroupType(6, "Ordinal",
            async function (_DB: DBObject | null, match: string) {
                const n = toNumWithFullwidth(match);
                const nMod10 = n % 10;
                const nMod100 = n % 100;
                if (nMod10 === 1 && nMod100 !== 11) return n + "st";
                if (nMod10 === 2 && nMod100 !== 12) return n + "nd";
                if (nMod10 === 3 && nMod100 !== 13) return n + "rd";
                return n + "th";
            }, null));

        map.push(new PatternGroupType(7, "Pieces",
            async function (_DB: DBObject | null, match: string) {
                let s = "";
                for (const jpnPieceName of match.substring(1, match.length - 1).split("】【")) {
                    s += "[" + AttributeEnum.fromPieceAttributeName(jpnPieceName).toPieceAttributeName() + "]";
                }
                return s;
            }, null));

        return map;
    })();

    static get(key: PatternGroupTypeID): PatternGroupType {
        return PatternGroupType.map[key]!;
    }
}

function generateAOrAnReplacements(match: string, thisNum: number): Map<string, string> {
    return new Map<string, string>([
        ["<" + thisNum + "a>", Grammar.aOrAn(match)]
    ]);
}

function generateNumberReplacements(match: string, thisNum: number): Map<string, string> {
    const n = toNumWithFullwidth(match);
    const isOne = (n === 1);
    return new Map<string, string>([
        ["<" + thisNum + "s>", isOne ? "" : "s"],
        ["<" + thisNum + "sr>", isOne ? "s" : ""],
        ["<" + thisNum + "x> ", isOne ? "" : match + " "],
        ["<" + thisNum + "e>", isOne ? "each" : "every " + match]
    ]);
}
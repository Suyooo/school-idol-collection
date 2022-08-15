import * as Grammar from "./grammar";
import * as Regex from "./regex";
import PieceInfo, {PieceNameJpn} from "../../cards/pieceInfo";
import NotFoundError from "../../errors/notFound";
import CardType from "../../enums/cardType";
import TranslateTableName from "../../models/translatetables/name";
import TranslateTableSong from "../../models/translatetables/song";

const skilltextPattern = /{{skilltext:([^}]*?)}}/g;

export default class PatternGroupType {
    static [key: number]: PatternGroupType;
    readonly id: number;
    readonly name: string;
    readonly getReplacement: (match: string) => string;
    readonly getExtraReplacements: (match: string, thisNum: number, allRepls: string[]) => Map<string, string>;

    constructor(id: number, name: string, getReplacement: (match: string) => string,
                getExtraReplacements: (match: string, thisNum: number, allRepls: string[])
                    => Map<string, string>) {
        this.id = id;
        this.name = name;
        this.getReplacement = getReplacement;
        this.getExtraReplacements = getExtraReplacements;
    }

    static 0 = new PatternGroupType(0, "Name or Group", function (match: string): string {
        const skilltext = skilltextPattern.exec(match)?.[1];
        const n = ""; // TODO: TranslateTableName
        if (n == undefined) throw new NotFoundError(match + " is not a known name");
        return skilltext ? "{{skilltext:"+n+"}}" : n;
    }, generateAOrAnReplacements);
    static 1 = new PatternGroupType(1, "Song Name", function (match: string): string {
        const n = ""; // TODO: TranslateTableSong
        if (n == undefined) throw new NotFoundError(match + " is not a known song");
        return n;
    }, generateAOrAnReplacements);
    static 2 = new PatternGroupType(2, "Costume Name", function (match: string): string {
        const n = ""; // TODO: TranslateTableSong
        if (n == undefined) throw new NotFoundError(match + " is not a known song");
        return n;
    }, generateAOrAnReplacements);
    static 3 = new PatternGroupType(3, "Mem Name", function (match: string): string {
        return ""; // TODO: getName({"name": match, "type": CardType.MEMORY});
    }, generateAOrAnReplacements);
    static 4 = new PatternGroupType(4, "Number", function (match: string): string {
        return Regex.num(match).toFixed(0);
    }, generateNumberReplacements);
    static 5 = new PatternGroupType(5, "Number Text", function (match: string): string {
        const n = Regex.num(match);
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
    }, generateNumberReplacements);
    static 6 = new PatternGroupType(6, "Ordinal", function (match: string): string {
        const n = Regex.num(match);
        const nMod10 = n % 10;
        const nMod100 = n % 100;
        if (nMod10 === 1 && nMod100 !== 11) return n + "st";
        if (nMod10 === 2 && nMod100 !== 12) return n + "nd";
        if (nMod10 === 3 && nMod100 !== 13) return n + "rd";
        return n + "th";
    }, generateNoReplacements);
    static 7 = new PatternGroupType(7, "Pieces", function (match: string): string {
        let s = "";
        for (const pieceMatch of match.matchAll(Regex.piecesPattern)) {
            const ps = PieceInfo.pieceToAttributeJpn(pieceMatch[1] as PieceNameJpn).eng;
            s += "[" + (ps == "Neutral" ? "All" : ps).toUpperCase() + "]";
        }
        return s;
    }, generateNoReplacements);
}

function generateAOrAnReplacements(match: string, thisNum: number, allRepls: string[]): Map<string, string> {
    return new Map<string, string>([
        ["<" + thisNum + "a>", Grammar.aOrAn(allRepls[thisNum - 1])]
    ]);
}

function generateNumberReplacements(match: string, thisNum: number, allRepls: string[]): Map<string, string> {
    const n = Regex.num(match);
    const isOne = (n === 1);
    return new Map<string, string>([
        ["<" + thisNum + "s>", isOne ? "" : "s"],
        ["<" + thisNum + "sr>", isOne ? "s" : ""],
        ["<" + thisNum + "x> ", isOne ? "" : allRepls[thisNum - 1] + " "],
        ["<" + thisNum + "e>", isOne ? "each" : "every " + allRepls[thisNum - 1]]
    ]);
}

function generateNoReplacements(): Map<string, string> {
    return new Map<string, string>([]);
}
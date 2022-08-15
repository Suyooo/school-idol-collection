import Attribute from "./attributes";
import NotFoundError from "../errors/notFound";

export type ColourEngName = "Yellow" | "Red" | "Green" | "Blue" | "Orange";
export type ColourJpnName = "黄" | "赤" | "緑" | "青" | "オレンジ";

export default class Colour {
    static [key: number]: Colour;
    readonly id: number;
    readonly eng: ColourEngName;
    readonly jpn: ColourJpnName;
    static engMap = new Map<ColourEngName, Colour>();
    static jpnMap = new Map<ColourJpnName, Colour>();

    constructor(id: number, eng: ColourEngName, jpn: ColourJpnName) {
        this.id = id;
        this.eng = eng;
        this.jpn = jpn;
        Colour.engMap.set(eng, this);
        Colour.jpnMap.set(jpn, this);
    }

    static 0 = new Colour(0, "Yellow", "黄");
    static 1 = new Colour(1, "Red", "赤");
    static 2 = new Colour(2, "Green", "緑");
    static 3 = new Colour(3, "Blue", "青");
    static 4 = new Colour(4, "Orange", "オレンジ");

    asAttribute(): Attribute {
        return Attribute[this.id];
    }

    static fromEng(eng: ColourEngName): Colour {
        const ret = Colour.engMap.get(eng);
        if (ret === undefined) {
            throw new NotFoundError("Unknown Colour " + eng);
        }
        return ret;
    }

    static fromJpn(jpn: ColourJpnName): Colour {
        const ret = Colour.jpnMap.get(jpn);
        if (ret === undefined) {
            throw new NotFoundError("Unknown Colour " + jpn);
        }
        return ret;
    }
}
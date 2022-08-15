import Colour from "./colours";
import NotFoundError from "../errors/notFound";

export type AttributeEngName = "Neutral" | "Smile" | "Pure" | "Cool" | "Orange";
export type AttributeJpnName = "オール" | "スマイル" | "ピュア" | "クール" | "オレンジ";

export default class Attribute {
    static [key: number]: Attribute;
    readonly id: number;
    readonly eng: AttributeEngName;
    readonly jpn: AttributeJpnName;
    readonly className: string;
    static engMap = new Map<AttributeEngName, Attribute>();
    static jpnMap = new Map<AttributeJpnName, Attribute>();

    constructor(id: number, eng: AttributeEngName, jpn: AttributeJpnName, className: string) {
        this.id = id;
        this.eng = eng;
        this.jpn = jpn;
        this.className = className;
        Attribute.engMap.set(eng, this);
        Attribute.jpnMap.set(jpn, this);
    }

    static 0 = new Attribute(0, "Neutral", "オール", "all");
    static 1 = new Attribute(1, "Smile", "スマイル", "smile");
    static 2 = new Attribute(2, "Pure", "ピュア", "pure");
    static 3 = new Attribute(3, "Cool", "クール", "cool");
    static 4 = new Attribute(4, "Orange", "オレンジ", "orange");

    asColour(): Colour {
        return Colour[this.id];
    }

    static fromJpn(jpn: AttributeJpnName): Attribute {
        const ret = Attribute.jpnMap.get(jpn);
        if (ret === undefined) {
            throw new NotFoundError("Unknown Attribute " + jpn);
        }
        return ret;
    }

    static fromEng(eng: AttributeEngName): Attribute {
        const ret = Attribute.engMap.get(eng);
        if (ret === undefined) {
            throw new NotFoundError("Unknown Attribute " + eng);
        }
        return ret;
    }
}
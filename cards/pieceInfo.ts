import Attribute, {AttributeEngName} from "../consts/attributes";
import Colour, {ColourEngName, ColourJpnName} from "../consts/colours";

export type PieceNameJpn = "オール" | "赤" | "緑" | "青"
export type PieceNameEng = "ALL" | "SMILE" | "PURE" | "COOL";

export default class PieceInfo {
    readonly all: number;
    readonly smile: number;
    readonly pure: number;
    readonly cool: number;

    constructor(all: number, smile: number, pure: number, cool: number) {
        this.all = all;
        this.smile = smile;
        this.pure = pure;
        this.cool = cool;
    }

    sum(): number {
        return this.all + this.smile + this.pure + this.cool;
    }

    highest(): number {
        return Math.max(this.all, this.smile, this.pure, this.cool);
    }

    lowest(): number {
        return Math.min(this.all, this.smile, this.pure, this.cool);
    }

    static pieceToAttributeJpn(type: PieceNameJpn): Attribute {
        if (type == "オール") return Attribute[0];
        return Colour.fromJpn(type).asAttribute();
    }

    static pieceToAttributeEng(type: PieceNameEng): Attribute {
        if (type == "ALL") return Attribute[0];
        return Attribute.fromEng((type.charAt(0) + type.substring(1).toLowerCase()) as AttributeEngName);
    }

    addType(type: Attribute | PieceNameJpn): PieceInfo {
        if (!(type instanceof Attribute)) {
            type = PieceInfo.pieceToAttributeJpn(type);
        }
        return new PieceInfo(this.all + (type == Attribute[0] ? 1 : 0), this.smile + (type == Attribute[1] ? 1 : 0),
            this.pure + (type == Attribute[2] ? 1 : 0), this.cool + (type == Attribute[3] ? 1 : 0));
    }

    add(other: PieceInfo): PieceInfo {
        return new PieceInfo(this.all + other.all, this.smile + other.smile,
            this.pure + other.pure, this.cool + other.cool);
    }

    sub(other: PieceInfo): PieceInfo {
        return new PieceInfo(this.all - other.all, this.smile - other.smile,
            this.pure - other.pure, this.cool - other.cool);
    }
}
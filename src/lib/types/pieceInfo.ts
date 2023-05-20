import type AttributeEnum from "$lib/enums/attribute.js";

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

    addPiece(attr: AttributeEnum): PieceInfo {
        return new PieceInfo(
            this.all + (attr.id === 0 ? 1 : 0),
            this.smile + (attr.id === 1 ? 1 : 0),
            this.pure + (attr.id === 2 ? 1 : 0),
            this.cool + (attr.id === 3 ? 1 : 0)
        );
    }

    add(other: PieceInfo): PieceInfo {
        return new PieceInfo(
            this.all + other.all,
            this.smile + other.smile,
            this.pure + other.pure,
            this.cool + other.cool
        );
    }

    sub(other: PieceInfo): PieceInfo {
        return new PieceInfo(
            this.all - other.all,
            this.smile - other.smile,
            this.pure - other.pure,
            this.cool - other.cool
        );
    }
}

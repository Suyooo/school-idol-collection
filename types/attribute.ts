export type ColorNameJpn = "黄" | "赤" | "緑" | "青" | "オレンジ";
export type ColorNameEng = "Yellow" | "Red" | "Green" | "Blue" | "Orange";
export type SongAttributeNameJpn = "オール" | "スマイル" | "ピュア" | "クール" | "オレンジ";
export type SongAttributeNameEng = "Neutral" | "Smile" | "Pure" | "Cool" | "Orange";
export type PieceAttributeJpnName = "オール" | "赤" | "緑" | "青";
export type PieceAttributeEngName = "ALL" | "SMILE" | "PURE" | "COOL";
export type AttributeCssClassName = "all" | "smile" | "pure" | "cool" | "orange";
export type AttributeID = 0 | 1 | 2 | 3 | 4;
type MappedValue = AttributeID | ColorNameEng | ColorNameJpn | SongAttributeNameEng | SongAttributeNameJpn | PieceAttributeEngName | PieceAttributeJpnName;

export default class Attribute {
    readonly id: AttributeID;
    readonly colorNameJpn: ColorNameJpn;
    readonly colorNameEng: ColorNameEng;
    readonly songAttributeNameJpn: SongAttributeNameJpn;
    readonly songAttributeNameEng: SongAttributeNameEng;
    readonly pieceAttributeNameJpn: PieceAttributeJpnName | undefined;
    readonly pieceAttributeNameEng: PieceAttributeEngName | undefined;
    readonly cssClassName: AttributeCssClassName;

    private constructor(map: Map<MappedValue, Attribute>,
                        id: AttributeID, className: AttributeCssClassName,
                        colorNameEng: ColorNameEng, colorNameJpn: ColorNameJpn,
                        songAttributeNameEng: SongAttributeNameEng, songAttributeNameJpn: SongAttributeNameJpn,
                        pieceAttributeNameEng?: PieceAttributeEngName, pieceAttributeNameJpn?: PieceAttributeJpnName) {
        this.id = id;
        this.cssClassName = className;
        this.colorNameEng = colorNameEng;
        this.colorNameJpn = colorNameJpn;
        this.songAttributeNameEng = songAttributeNameEng;
        this.songAttributeNameJpn = songAttributeNameJpn;
        this.pieceAttributeNameEng = pieceAttributeNameEng;
        this.pieceAttributeNameJpn = pieceAttributeNameJpn;

        map.set(id, this);
        map.set(colorNameEng, this);
        map.set(colorNameJpn, this);
        map.set(songAttributeNameEng, this);
        map.set(songAttributeNameJpn, this);
        if (pieceAttributeNameEng) map.set(pieceAttributeNameEng, this);
        if (pieceAttributeNameJpn) map.set(pieceAttributeNameJpn, this);
    }

    private static readonly map = (() => {
        const map = new Map<MappedValue, Attribute>();

        new Attribute(map, 0, "all", "Yellow", "黄", "Neutral", "オール", "ALL", "オール");
        new Attribute(map, 1, "smile", "Red", "赤", "Smile", "スマイル", "SMILE", "赤");
        new Attribute(map, 2, "pure", "Green", "緑", "Pure", "ピュア", "PURE", "緑");
        new Attribute(map, 3, "cool", "Blue", "青", "Cool", "クール", "COOL", "青");
        new Attribute(map, 4, "orange", "Orange", "オレンジ", "Orange", "オレンジ");

        return map;
    })();

    static get(key: MappedValue): Attribute {
        return Attribute.map.get(key) as Attribute;
    }
}
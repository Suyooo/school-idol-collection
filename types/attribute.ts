export type ColorEngName = "Yellow" | "Red" | "Green" | "Blue" | "Orange";
export type ColorJpnName = "黄" | "赤" | "緑" | "青" | "オレンジ";
export type SongAttributeEngName = "Neutral" | "Smile" | "Pure" | "Cool" | "Orange";
export type SongAttributeJpnName = "オール" | "スマイル" | "ピュア" | "クール" | "オレンジ";
export type PieceAttributeEngName = "ALL" | "SMILE" | "PURE" | "COOL";
export type PieceAttributeJpnName = "オール" | "赤" | "緑" | "青";
export type AttributeCssClassName = "all" | "smile" | "pure" | "cool" | "orange";
export type AttributeID = 0 | 1 | 2 | 3 | 4;
type MappedValue = AttributeID | ColorEngName | ColorJpnName | SongAttributeEngName | SongAttributeJpnName | PieceAttributeEngName | PieceAttributeJpnName;

export default class Attribute {
    readonly id: number;
    readonly colorEng: ColorEngName;
    readonly colorJpn: ColorJpnName;
    readonly songAttributeEng: SongAttributeEngName;
    readonly songAttributeJpn: SongAttributeJpnName;
    readonly pieceAttributeEng: PieceAttributeEngName | undefined;
    readonly pieceAttributeJpn: PieceAttributeJpnName | undefined;
    readonly cssClassName: AttributeCssClassName;

    private constructor(map: Map<MappedValue, Attribute>,
                        id: AttributeID, className: AttributeCssClassName,
                        cen: ColorEngName, cjn: ColorJpnName,
                        saen: SongAttributeEngName, sajn: SongAttributeJpnName,
                        paen?: PieceAttributeEngName, pajn?: PieceAttributeJpnName) {
        this.id = id;
        this.cssClassName = className;
        this.colorEng = cen;
        this.colorJpn = cjn;
        this.songAttributeEng = saen;
        this.songAttributeJpn = sajn;
        this.pieceAttributeEng = paen;
        this.pieceAttributeJpn = pajn;

        map.set(id, this);
        map.set(cen, this);
        map.set(cjn, this);
        map.set(saen, this);
        map.set(sajn, this);
        if (paen) map.set(paen, this);
        if (pajn) map.set(pajn, this);
    }

    private static map = (() => {
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
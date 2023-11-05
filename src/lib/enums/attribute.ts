import Language from "$lib/enums/language.js";
import EnumError from "$lib/errors/enumError.js";

type ColorNameJpn = "黄" | "赤" | "緑" | "青" | "オレンジ";
type ColorNameEng = "Yellow" | "Red" | "Green" | "Blue" | "Orange";
type ColorName = ColorNameEng | ColorNameJpn;
type SongAttributeNameJpn = "オール" | "スマイル" | "ピュア" | "クール" | "オレンジ";
type SongAttributeNameEng = "Neutral" | "Smile" | "Pure" | "Cool" | "Orange";
type SongAttributeName = SongAttributeNameEng | SongAttributeNameJpn;
type PieceAttributeNameJpn = "オール" | "赤" | "緑" | "青";
type PieceAttributeNameEng = "ALL" | "SMILE" | "PURE" | "COOL";
type PieceAttributeName = PieceAttributeNameEng | PieceAttributeNameJpn;
type CssClassName = "all" | "smile" | "pure" | "cool" | "orange";
type PiecePropertyName = "piecesAll" | "piecesSmile" | "piecesPure" | "piecesCool";
export type AttributeID = 0 | 1 | 2 | 3 | 4;

export default class AttributeEnum {
	readonly id: number & AttributeID;
	private readonly colorNameJpn: string & ColorNameJpn;
	private readonly colorNameEng: string & ColorNameEng;
	private readonly songAttributeNameJpn: string & SongAttributeNameJpn;
	private readonly songAttributeNameEng: string & SongAttributeNameEng;
	private readonly pieceAttributeNameJpn: (string & PieceAttributeNameJpn) | undefined;
	private readonly pieceAttributeNameEng: (string & PieceAttributeNameEng) | undefined;
	private readonly cssClassName: string & CssClassName;
	private readonly piecePropertyName: (string & PiecePropertyName) | undefined;

	private static readonly idMap: Map<AttributeID, AttributeEnum> = new Map();
	private static readonly colorNameMap: Map<ColorName, AttributeEnum> = new Map();
	private static readonly songAttributeNameMap: Map<SongAttributeName, AttributeEnum> = new Map();
	private static readonly pieceAttributeNameMap: Map<PieceAttributeName, AttributeEnum> = new Map();
	static readonly all: AttributeEnum[] = [];
	static readonly allForPieces: AttributeEnum[] = [];

	private constructor(
		id: AttributeID,
		cssClassName: CssClassName,
		colorNameEng: ColorNameEng,
		colorNameJpn: ColorNameJpn,
		songAttributeNameEng: SongAttributeNameEng,
		songAttributeNameJpn: SongAttributeNameJpn,
		pieceAttributeNameEng?: PieceAttributeNameEng,
		pieceAttributeNameJpn?: PieceAttributeNameJpn,
		piecePropertyName?: PiecePropertyName
	) {
		this.id = id;
		this.cssClassName = cssClassName;
		this.colorNameEng = colorNameEng;
		this.colorNameJpn = colorNameJpn;
		this.songAttributeNameEng = songAttributeNameEng;
		this.songAttributeNameJpn = songAttributeNameJpn;
		this.pieceAttributeNameEng = pieceAttributeNameEng;
		this.pieceAttributeNameJpn = pieceAttributeNameJpn;
		this.piecePropertyName = piecePropertyName;

		AttributeEnum.all.push(this);
		AttributeEnum.idMap.set(this.id, this);
		AttributeEnum.colorNameMap.set(this.colorNameEng, this);
		AttributeEnum.colorNameMap.set(this.colorNameJpn, this);
		AttributeEnum.songAttributeNameMap.set(this.songAttributeNameEng, this);
		AttributeEnum.songAttributeNameMap.set(this.songAttributeNameJpn, this);
		if (this.pieceAttributeNameEng !== undefined && this.pieceAttributeNameJpn !== undefined) {
			AttributeEnum.allForPieces.push(this);
			AttributeEnum.pieceAttributeNameMap.set(this.pieceAttributeNameEng, this);
			AttributeEnum.pieceAttributeNameMap.set(this.pieceAttributeNameJpn, this);
		}
	}

	toCssClassName() {
		return this.cssClassName;
	}

	toColorName(lang: Language = Language.ENG) {
		if (lang === Language.ENG) return this.colorNameEng;
		else return this.colorNameJpn;
	}

	toSongAttributeName(lang: Language = Language.ENG) {
		if (lang === Language.ENG) return this.songAttributeNameEng;
		else return this.songAttributeNameJpn;
	}

	toPieceAttributeName(lang: Language = Language.ENG) {
		if (lang === Language.ENG) return this.pieceAttributeNameEng;
		else return this.pieceAttributeNameJpn;
	}

	toPiecePropertyName(): PiecePropertyName {
		if (this.piecePropertyName === undefined) throw new Error("This attribute doesn't have a property");
		return this.piecePropertyName;
	}

	static ALL: AttributeEnum = new AttributeEnum(
		0,
		"all",
		"Yellow",
		"黄",
		"Neutral",
		"オール",
		"ALL",
		"オール",
		"piecesAll"
	);
	static SMILE: AttributeEnum = new AttributeEnum(
		1,
		"smile",
		"Red",
		"赤",
		"Smile",
		"スマイル",
		"SMILE",
		"赤",
		"piecesSmile"
	);
	static PURE: AttributeEnum = new AttributeEnum(
		2,
		"pure",
		"Green",
		"緑",
		"Pure",
		"ピュア",
		"PURE",
		"緑",
		"piecesPure"
	);
	static COOL: AttributeEnum = new AttributeEnum(3, "cool", "Blue", "青", "Cool", "クール", "COOL", "青", "piecesCool");
	static ORANGE: AttributeEnum = new AttributeEnum(4, "orange", "Orange", "オレンジ", "Orange", "オレンジ");

	static fromId(n: number): AttributeEnum {
		const a = AttributeEnum.idMap.get(<AttributeID>n);
		if (a === undefined) throw new EnumError("Attribute", "ID", n);
		else return a;
	}

	static fromColorName(s: string): AttributeEnum {
		const a = AttributeEnum.colorNameMap.get(<ColorName>s);
		if (a === undefined) throw new EnumError("Attribute", "color name", s);
		else return a;
	}

	static fromSongAttributeName(s: string): AttributeEnum {
		const a = AttributeEnum.songAttributeNameMap.get(<SongAttributeName>s);
		if (a === undefined) throw new EnumError("Attribute", "song attribute name", s);
		else return a;
	}

	static fromPieceAttributeName(s: string): AttributeEnum {
		const a = AttributeEnum.pieceAttributeNameMap.get(<PieceAttributeName>s);
		if (a === undefined) throw new EnumError("Attribute", "piece attribute name", s);
		else return a;
	}
}

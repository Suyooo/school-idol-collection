import type { Includeable, ScopeOptions } from "@sequelize/core";
import CardSongRequirementType from "$lib/enums/cardSongRequirementType.js";
import GroupEnum from "$lib/enums/group.js";
import type { GroupID } from "$lib/enums/group.js";
import SearchFilterError from "$lib/errors/searchFilterError.js";
import AttributeEnum from "../enums/attribute.js";
import { CardMemberRarity, CardSongRarity } from "../enums/cardRarity.js";

export default abstract class SearchFilter {
	readonly key: string;

	protected constructor(key: string) {
		this.key = key;
	}

	abstract getExplainString(): string;

	abstract getUrlPart(): string;

	abstract getMapping(): Record<string, string>;

	abstract getScopeElements(): (string | ScopeOptions)[];
}

export abstract class SearchFilter0 extends SearchFilter {
	constructor(key: string) {
		super(key);
	}

	getUrlPart = () => `${this.key}`;
	getMapping = () => ({ [this.key]: "" });
}

export abstract class SearchFilter1 extends SearchFilter {
	param!: string;

	constructor(key: string, param: string) {
		super(key);
		if (param === "") {
			throw new SearchFilterError("Missing parameter", key);
		}
		this.param = param;
	}

	getUrlPart = () => `${this.key}=${encodeURIComponent(this.param)}`;
	getMapping = () => ({ [this.key]: this.param });
}

export abstract class SearchFilterNumber extends SearchFilter1 {
	paramAsNumber!: number;

	constructor(key: string, param: string) {
		super(key, param);
		this.paramAsNumber = parseInt(param);
		this.param = this.paramAsNumber.toString(); // make param have a canonical representation
		if (isNaN(this.paramAsNumber)) {
			throw new SearchFilterError(`Parameter "${this.param}" is not a number`, key);
		}
	}

	getUrlPart = () => `${this.key}=${this.param}`; // no escaping
}

export class SearchFilterMember extends SearchFilter0 {
	constructor() {
		super("member");
	}
	getExplainString = () => "Members";
	getScopeElements = () => ["filterMembers"];
}

export class SearchFilterSong extends SearchFilter0 {
	constructor() {
		super("song");
	}
	getExplainString = () => "Songs";
	getScopeElements = () => ["filterSongs"];
}

export class SearchFilterMemory extends SearchFilter0 {
	constructor() {
		super("memory");
	}
	getExplainString = () => "Memories";
	getScopeElements = () => ["filterMemories"];
}

export class SearchFilterSet extends SearchFilter1 {
	constructor(param: string) {
		super("set", param);
	}
	getExplainString = () => `In Set ${this.param}`;
	getScopeElements = () => [<ScopeOptions>{ method: ["filterSet", this.param] }];
}

export abstract class SearchFilterMemberRarity extends SearchFilter0 {
	readonly rarity: CardMemberRarity;
	constructor(key: string, rarity: CardMemberRarity) {
		super(key);
		this.rarity = rarity;
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["searchMemberRarity", this.rarity] }];
}

export class SearchFilterMemberRarityR extends SearchFilterMemberRarity {
	constructor() {
		super("r", CardMemberRarity.R);
	}
	getExplainString = () => "R Rarity";
}

export class SearchFilterMemberRaritySR extends SearchFilterMemberRarity {
	constructor() {
		super("sr", CardMemberRarity.SR);
	}
	getExplainString = () => "SR Rarity";
}

export class SearchFilterMemberRarityHR extends SearchFilterMemberRarity {
	constructor() {
		super("hr", CardMemberRarity.HR);
	}
	getExplainString = () => "HR Rarity";
}

export class SearchFilterMemberRaritySpecial extends SearchFilterMemberRarity {
	constructor() {
		super("special", CardMemberRarity.Special);
	}
	getExplainString = () => "Special Rarity";
}

export class SearchFilterMemberRaritySecret extends SearchFilterMemberRarity {
	constructor() {
		super("secret", CardMemberRarity.Secret);
	}
	getExplainString = () => "Secret Rarity";
}

export class SearchFilterMemberRarityPR extends SearchFilterMemberRarity {
	constructor() {
		super("pr", CardMemberRarity.PR);
	}
	getExplainString = () => "PR Rarity";
}

export class SearchFilterMemberRarityN extends SearchFilterMemberRarity {
	constructor() {
		super("n", CardMemberRarity.N);
	}
	getExplainString = () => "N Rarity";
}

export class SearchFilterMemberRaritySSR extends SearchFilterMemberRarity {
	constructor() {
		super("ssr", CardMemberRarity.SSR);
	}
	getExplainString = () => "SSR Rarity";
}

export abstract class SearchFilterMemberNames extends SearchFilter0 {
	readonly group: GroupID;
	constructor(key: string, group: GroupID) {
		super(key);
		this.group = group;
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["searchGroup", GroupEnum.getSubIdsFromId(this.group)] }];
}

export class SearchFilterMemberGroupMuse extends SearchFilterMemberNames {
	constructor() {
		super("muse", 2);
	}
	getExplainString = () => "µ's";
}

export class SearchFilterMemberGroupAqours extends SearchFilterMemberNames {
	constructor() {
		super("aqours", 3);
	}
	getExplainString = () => "Aqours";
}

export class SearchFilterMemberGroupPrintemps extends SearchFilterMemberNames {
	constructor() {
		super("printemps", 4);
	}
	getExplainString = () => "Printemps";
}

export class SearchFilterMemberGroupLilyWhite extends SearchFilterMemberNames {
	constructor() {
		super("lilywhite", 5);
	}
	getExplainString = () => "lily white";
}

export class SearchFilterMemberGroupBiBi extends SearchFilterMemberNames {
	constructor() {
		super("bibi", 6);
	}
	getExplainString = () => "BiBi";
}

export class SearchFilterMemberGroupCYaRon extends SearchFilterMemberNames {
	constructor() {
		super("cyaron", 7);
	}
	getExplainString = () => "CYaRon!";
}

export class SearchFilterMemberGroupAzalea extends SearchFilterMemberNames {
	constructor() {
		super("azalea", 8);
	}
	getExplainString = () => "AZALEA";
}

export class SearchFilterMemberGroupGuiltyKiss extends SearchFilterMemberNames {
	constructor() {
		super("guiltykiss", 9);
	}
	getExplainString = () => "Guilty Kiss";
}

export class SearchFilterMemberGroupSaintSnow extends SearchFilterMemberNames {
	constructor() {
		super("saintsnow", 10);
	}
	getExplainString = () => "Saint Snow";
}

export abstract class SearchFilterSongRarity extends SearchFilter0 {
	readonly rarity: CardSongRarity;
	constructor(key: string, rarity: CardSongRarity) {
		super(key);
		this.rarity = rarity;
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["searchSongRarity", this.rarity] }];
}

export class SearchFilterSongRarityM extends SearchFilterSongRarity {
	constructor() {
		super("m", CardSongRarity.M);
	}
	getExplainString = () => "M Rarity";
}

export class SearchFilterSongRarityGR extends SearchFilterSongRarity {
	constructor() {
		super("gr", CardSongRarity.GR);
	}
	getExplainString = () => "GR Rarity";
}

export class SearchFilterMemberIdolizableYes extends SearchFilter0 {
	constructor() {
		super("idolizable");
	}
	getScopeElements = () => ["searchIdolizable"];
	getExplainString = () => "Idolizable";
}

export class SearchFilterMemberIdolizableNo extends SearchFilter0 {
	constructor() {
		super("notidolizable");
	}
	getScopeElements = () => ["searchNotIdolizable"];
	getExplainString = () => "Not Idolizable";
}

export class SearchFilterMemberAbilityNone extends SearchFilter0 {
	constructor() {
		super("noability");
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["searchAbility", false, false] }];
	getExplainString = () => "No Ability";
}

export class SearchFilterMemberAbilityRush extends SearchFilter0 {
	constructor() {
		super("rush");
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["searchAbility", true, null] }];
	getExplainString = () => "[RUSH] Ability";
}

export class SearchFilterMemberAbilityLive extends SearchFilter0 {
	constructor() {
		super("live");
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["searchAbility", null, true] }];
	getExplainString = () => "[LIVE] Ability";
}

export class SearchFilterMemberAbilityRushOrLive extends SearchFilter0 {
	constructor() {
		super("rushorlive");
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["searchAbility", true, true] }];
	getExplainString = () => "[RUSH/LIVE] Ability";
}

export class SearchFilterCardID extends SearchFilterNumber {
	constructor(param: string) {
		super("id", param);
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["filterId", this.paramAsNumber] }];
	getExplainString = () => "Card ID " + this.param;
}

export class SearchFilterMemberYear extends SearchFilterNumber {
	constructor(param: string) {
		super("year", param);
		if (this.paramAsNumber < 1 || this.paramAsNumber > 3) {
			throw new SearchFilterError(`Invalid parameter "${this.param}" is out of range for this filter`, "year");
		}
	}

	getScopeElements = () => [<ScopeOptions>{ method: ["searchYear", this.paramAsNumber] }];
	getExplainString = () => {
		switch (this.param) {
			case "1":
				return "1st Year";
			case "2":
				return "2nd Year";
			default:
				return "3rd Year";
		}
	};
}

export abstract class SearchFilterTranslatableLike extends SearchFilter1 {
	readonly columnNames: string[];
	readonly explainName: string;
	readonly include: Includeable | undefined;

	constructor(key: string, param: string, columnNames: string[], explainName: string, include?: Includeable) {
		super(key, param);
		this.columnNames = columnNames;
		this.explainName = explainName;
		this.include = include;
	}

	getScopeElements = () => {
		if (this.include) {
			return [
				<ScopeOptions>{
					method: ["searchGenericMultiColumnLikeWithInclude", this.param, this.columnNames, this.include],
				},
			];
		}
		return [<ScopeOptions>{ method: ["searchGenericMultiColumnLike", this.param, this.columnNames] }];
	};
	getExplainString = () => `${this.explainName} contains "${this.param}"`;
}

export class SearchFilterName extends SearchFilterTranslatableLike {
	constructor(param: string) {
		super("name", param, ["nameJpn", "nameEng"], "Name");
	}
}

export class SearchFilterCostume extends SearchFilterTranslatableLike {
	constructor(param: string) {
		super("costume", param, ["$member.costumeJpn$", "$member.costumeEng$"], "Costume", {
			association: "member",
			required: true,
			attributes: ["costumeJpn", "costumeEng"],
		});
	}
}

export class SearchFilterSkill extends SearchFilterTranslatableLike {
	constructor(param: string) {
		super("skill", param, ["$skills.jpn$", "$skills.eng$"], "Skill", {
			association: "skills",
			separate: false,
			required: true,
			attributes: ["jpn", "eng"],
		});
	}
}

export enum SearchFilterNumberCond {
	EQUAL,
	LESS_OR_EQUAL,
	GREATER_OR_EQUAL,
}

export abstract class SearchFilterNumberWithMod extends SearchFilterNumber {
	readonly paramOp: SearchFilterNumberCond;
	readonly column: string;
	readonly columnLiteral: boolean;
	readonly explainName: string;
	readonly explainNameAfterNumber: boolean;
	readonly include: Includeable | undefined;

	constructor(
		key: string,
		param: string,
		column: string,
		columnLiteral: boolean,
		explainName: string,
		explainNameAfterNumber: boolean,
		include?: Includeable
	) {
		super(key, param);
		this.paramOp =
			param.endsWith("+") ? SearchFilterNumberCond.GREATER_OR_EQUAL
			: param.endsWith("-") ? SearchFilterNumberCond.LESS_OR_EQUAL
			: SearchFilterNumberCond.EQUAL;
		this.param = `${this.paramAsNumber}${this.paramOp === SearchFilterNumberCond.EQUAL ? "" : param.at(-1)}`;

		this.column = column;
		this.columnLiteral = columnLiteral;
		this.explainName = explainName;
		this.explainNameAfterNumber = explainNameAfterNumber;
		this.include = include;
	}

	getScopeElements = () => [
		<ScopeOptions>{
			method: [
				"searchGenericNumberWithMod",
				this.paramAsNumber,
				this.paramOp,
				this.column,
				this.columnLiteral,
				this.include,
			],
		},
	];
	getExplainString = () => {
		const mod =
			this.paramOp === SearchFilterNumberCond.GREATER_OR_EQUAL ? " or more"
			: this.paramOp === SearchFilterNumberCond.LESS_OR_EQUAL ? " or less"
			: "";
		if (this.explainNameAfterNumber) {
			return `${this.paramAsNumber}${mod} ${
				this.param === "1" ? this.explainName.substring(0, this.explainName.length - 1) : this.explainName
			}`;
		} else {
			return `${this.explainName} is ${this.paramAsNumber}${mod}`;
		}
	};
}

export class SearchFilterMemberCost extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("cost", param, "$member.cost$", false, "Cost", false, {
			association: "member",
			required: true,
			attributes: ["cost"],
		});
	}
}

export class SearchFilterMemberPieces extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super(
			"pieces",
			param,
			"member.piecesSmile + member.piecesPure + member.piecesCool + member.piecesAll",
			true,
			"Pieces",
			true,
			{
				association: "member",
				required: true,
				attributes: ["piecesSmile", "piecesPure", "piecesCool", "piecesAll"],
			}
		);
	}
}

export class SearchFilterMemberPiecesAll extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("allpieces", param, "$member.piecesAll$", false, "[ALL] Pieces", true, {
			association: "member",
			required: true,
			attributes: ["piecesAll"],
		});
	}
}

export class SearchFilterMemberPiecesSmile extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("smilepieces", param, "$member.piecesSmile$", false, "[SMILE] Pieces", true, {
			association: "member",
			required: true,
			attributes: ["piecesSmile"],
		});
	}
}

export class SearchFilterMemberPiecesPure extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("purepieces", param, "$member.piecesPure$", false, "[PURE] Pieces", true, {
			association: "member",
			required: true,
			attributes: ["piecesPure"],
		});
	}
}

export class SearchFilterMemberPiecesCool extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("coolpieces", param, "$member.piecesCool$", false, "[COOL] Pieces", true, {
			association: "member",
			required: true,
			attributes: ["piecesCool"],
		});
	}
}

export class SearchFilterMemberBonusYes extends SearchFilter0 {
	constructor() {
		super("bonus");
	}
	getScopeElements = () => ["searchBonus"];
	getExplainString = () => "With Birthday Bonus";
}

export class SearchFilterMemberBonusNo extends SearchFilter0 {
	constructor() {
		super("nobonus");
	}
	getScopeElements = () => ["searchNoBonus"];
	getExplainString = () => "No Birthday Bonus";
}

export abstract class SearchFilterSongAttribute extends SearchFilter0 {
	readonly attribute: AttributeEnum;
	constructor(key: string, attribute: AttributeEnum) {
		super(key);
		this.attribute = attribute;
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["searchSongAttribute", this.attribute.id] }];
	getExplainString = () => `Attribute is ${this.attribute.toSongAttributeName()}`;
}

export class SearchFilterSongAttributeNeutral extends SearchFilterSongAttribute {
	constructor() {
		super("neutral", AttributeEnum.ALL);
	}
}

export class SearchFilterSongAttributeSmile extends SearchFilterSongAttribute {
	constructor() {
		super("smile", AttributeEnum.SMILE);
	}
}

export class SearchFilterSongAttributePure extends SearchFilterSongAttribute {
	constructor() {
		super("pure", AttributeEnum.PURE);
	}
}

export class SearchFilterSongAttributeCool extends SearchFilterSongAttribute {
	constructor() {
		super("cool", AttributeEnum.COOL);
	}
}

export class SearchFilterSongAttributeOrange extends SearchFilterSongAttribute {
	constructor() {
		super("orange", AttributeEnum.ORANGE);
	}
}

export abstract class SearchFilterSongReqType extends SearchFilter0 {
	readonly reqType: CardSongRequirementType;
	constructor(key: string, reqType: CardSongRequirementType) {
		super(key);
		this.reqType = reqType;
	}
	getScopeElements = () => [<ScopeOptions>{ method: ["searchSongReqType", this.reqType] }];
}

export class SearchFilterSongReqTypeAny extends SearchFilterSongReqType {
	constructor() {
		super("anypiece", CardSongRequirementType.ANY_PIECE);
	}
	getExplainString = () => "With Any Piece Requirement";
}

export class SearchFilterSongReqTypeAttr extends SearchFilterSongReqType {
	constructor() {
		super("attributepiece", CardSongRequirementType.ATTR_PIECE);
	}
	getExplainString = () => "With Attribute Piece Requirement";
}

export class SearchFilterSongLivePoints extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("livepoints", param, "$song.lpBase$", false, "Base Live Points", true, {
			association: "song",
			required: true,
			attributes: ["lpBase"],
		});
	}
}

export class SearchFilterSongReqSmile extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("smilerequired", param, "$song.attrRequirement.piecesSmile$", false, "Required [SMILE] Pieces", true, {
			association: "song",
			required: true,
			include: [
				{
					association: "attrRequirement",
					required: true,
					attributes: ["piecesSmile"],
				},
			],
		});
	}
}

export class SearchFilterSongReqPure extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("purerequired", param, "$song.attrRequirement.piecesPure$", false, "Required [PURE] Pieces", true, {
			association: "song",
			required: true,
			include: [
				{
					association: "attrRequirement",
					required: true,
					attributes: ["piecesPure"],
				},
			],
		});
	}
}

export class SearchFilterSongReqCool extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("coolrequired", param, "$song.attrRequirement.piecesCool$", false, "Required [COOL] Pieces", true, {
			association: "song",
			required: true,
			include: [
				{
					association: "attrRequirement",
					required: true,
					attributes: ["piecesCool"],
				},
			],
		});
	}
}

export class SearchFilterSongReqAny extends SearchFilterNumberWithMod {
	constructor(param: string) {
		super("required", param, "$song.anyRequirement.piecesAll$", false, "Required Pieces", true, {
			association: "song",
			required: true,
			include: [
				{
					association: "anyRequirement",
					required: true,
					attributes: ["piecesAll"],
				},
			],
		});
	}
}

const map = new Map<string, new (param: string) => SearchFilter>([
	["member", SearchFilterMember],
	["song", SearchFilterSong],
	["memory", SearchFilterMemory],
	["r", SearchFilterMemberRarityR],
	["sr", SearchFilterMemberRaritySR],
	["hr", SearchFilterMemberRarityHR],
	["special", SearchFilterMemberRaritySpecial],
	["secret", SearchFilterMemberRaritySecret],
	["pr", SearchFilterMemberRarityPR],
	["n", SearchFilterMemberRarityN],
	["ssr", SearchFilterMemberRaritySSR],
	["muse", SearchFilterMemberGroupMuse],
	["aqours", SearchFilterMemberGroupAqours],
	["printemps", SearchFilterMemberGroupPrintemps],
	["lilywhite", SearchFilterMemberGroupLilyWhite],
	["bibi", SearchFilterMemberGroupBiBi],
	["cyaron", SearchFilterMemberGroupCYaRon],
	["azalea", SearchFilterMemberGroupAzalea],
	["guiltykiss", SearchFilterMemberGroupGuiltyKiss],
	["saintsnow", SearchFilterMemberGroupSaintSnow],
	["m", SearchFilterSongRarityM],
	["gr", SearchFilterSongRarityGR],
	["id", SearchFilterCardID],
	["year", SearchFilterMemberYear],
	["name", SearchFilterName],
	["set", SearchFilterSet],
	["costume", SearchFilterCostume],
	["skill", SearchFilterSkill],
	["cost", SearchFilterMemberCost],
	["idolizable", SearchFilterMemberIdolizableYes],
	["notidolizable", SearchFilterMemberIdolizableNo],
	["noability", SearchFilterMemberAbilityNone],
	["rush", SearchFilterMemberAbilityRush],
	["live", SearchFilterMemberAbilityLive],
	["rushorlive", SearchFilterMemberAbilityRushOrLive],
	["pieces", SearchFilterMemberPieces],
	["allpieces", SearchFilterMemberPiecesAll],
	["smilepieces", SearchFilterMemberPiecesSmile],
	["purepieces", SearchFilterMemberPiecesPure],
	["coolpieces", SearchFilterMemberPiecesCool],
	["bonus", SearchFilterMemberBonusYes],
	["nobonus", SearchFilterMemberBonusNo],
	["neutral", SearchFilterSongAttributeNeutral],
	["smile", SearchFilterSongAttributeSmile],
	["pure", SearchFilterSongAttributePure],
	["cool", SearchFilterSongAttributeCool],
	["orange", SearchFilterSongAttributeOrange],
	["livepoints", SearchFilterSongLivePoints],
	["anypiece", SearchFilterSongReqTypeAny],
	["attributepiece", SearchFilterSongReqTypeAttr],
	["required", SearchFilterSongReqAny],
	["smilerequired", SearchFilterSongReqSmile],
	["purerequired", SearchFilterSongReqPure],
	["coolrequired", SearchFilterSongReqCool],
]);

export function getSearchFilterConstructor(key: string): { new (param: string): SearchFilter } {
	if (map.has(key)) {
		return map.get(key)!;
	} else {
		throw new SearchFilterError("Unknown filter key", key);
	}
}

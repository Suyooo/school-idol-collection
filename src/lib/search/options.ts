import type {Includeable, ScopeOptions} from "@sequelize/core";
import SearchFilterError from "$lib/errors/searchFilterError.js";
import {escapeForUrl} from "$lib/utils/string.js";
import AttributeEnum from "../enums/attribute.js";
import {CardMemberRarity, CardSongRarity} from "../enums/cardRarity.js";
import CardSongRequirementType from "$lib/enums/cardSongRequirementType.js";

export default abstract class SearchFilter {
    abstract readonly key: string;

    protected constructor(_split?: string[]) {
    }

    abstract getExplainString(): string;

    abstract getFilterString(): string;

    abstract getScopeElements(): (string | ScopeOptions)[];
}

export abstract class SearchFilter0 extends SearchFilter {
    constructor(split?: string[]) {
        super(split);
    }

    getFilterString = () => this.key;
}

export abstract class SearchFilter1 extends SearchFilter {
    param!: string;

    constructor(split?: string[]) {
        super(split);
        if (split !== undefined) {
            this.param = split.slice(1).join(":");
            if (this.param.trim() === "") throw new SearchFilterError("Missing parameter", split.join(":"));
        }
    }

    getFilterString = () => this.key + ":" + escapeForUrl(this.param);
}

export class SearchFilterMember extends SearchFilter0 {
    readonly key = "member";
    getExplainString = () => "Members";
    getScopeElements = () => ["filterMembers"];
}

export class SearchFilterSong extends SearchFilter0 {
    readonly key = "song";
    getExplainString = () => "Songs";
    getScopeElements = () => ["filterSongs"];
}

export class SearchFilterMemory extends SearchFilter0 {
    readonly key = "memory";
    getExplainString = () => "Memories";
    getScopeElements = () => ["filterMemories"];
}

export class SearchFilterSet extends SearchFilter1 {
    readonly key = "set";
    getExplainString = () => `In Set ${this.param}`;
    getScopeElements = () => [<ScopeOptions>{method: ["filterSet", this.param]}];
}

export abstract class SearchFilterMemberRarity extends SearchFilter0 {
    abstract readonly rarity: CardMemberRarity;
    getScopeElements = () => [<ScopeOptions>{method: ["searchMemberRarity", this.rarity]}];
}

export class SearchFilterMemberRarityR extends SearchFilterMemberRarity {
    readonly key = "r";
    readonly rarity = CardMemberRarity.R;
    getExplainString = () => "R Rarity";
}

export class SearchFilterMemberRaritySR extends SearchFilterMemberRarity {
    readonly key = "sr";
    readonly rarity = CardMemberRarity.SR;
    getExplainString = () => "SR Rarity";
}

export class SearchFilterMemberRarityHR extends SearchFilterMemberRarity {
    readonly key = "hr";
    readonly rarity = CardMemberRarity.HR;
    getExplainString = () => "HR Rarity";
}

export class SearchFilterMemberRaritySpecial extends SearchFilterMemberRarity {
    readonly key = "special";
    readonly rarity = CardMemberRarity.Special;
    getExplainString = () => "Special Rarity";
}

export class SearchFilterMemberRaritySecret extends SearchFilterMemberRarity {
    readonly key = "special";
    readonly rarity = CardMemberRarity.Secret;
    getExplainString = () => "Special Rarity";
}

export class SearchFilterMemberRarityPR extends SearchFilterMemberRarity {
    readonly key = "pr";
    readonly rarity = CardMemberRarity.PR;
    getExplainString = () => "PR Rarity";
}

export class SearchFilterMemberRarityN extends SearchFilterMemberRarity {
    readonly key = "n";
    readonly rarity = CardMemberRarity.N;
    getExplainString = () => "N Rarity";
}

export class SearchFilterMemberRaritySSR extends SearchFilterMemberRarity {
    readonly key = "ssr";
    readonly rarity = CardMemberRarity.SSR;
    getExplainString = () => "SSR Rarity";
}

export abstract class SearchFilterMemberNames extends SearchFilter0 {
    abstract readonly members: string[];
    getScopeElements = () => [<ScopeOptions>{method: ["filterGroup", this.members]}];
}

export class SearchFilterMemberGroupMuse extends SearchFilterMemberNames {
    readonly key = "muse";
    readonly members = ["高坂 穂乃果", "絢瀬 絵里", "南 ことり", "園田 海未", "星空 凛", "西木野 真姫", "東條 希", "小泉 花陽", "矢澤 にこ"];
    getExplainString = () => "µ's";
}

export class SearchFilterMemberGroupAqours extends SearchFilterMemberNames {
    readonly key = "aqours";
    readonly members = ["高海 千歌", "桜内 梨子", "松浦 果南", "黒澤 ダイヤ", "渡辺 曜", "津島 善子", "国木田 花丸", "小原 鞠莉", "黒澤 ルビィ"];
    getExplainString = () => "Aqours";
}

export class SearchFilterMemberGroupPrintemps extends SearchFilterMemberNames {
    readonly key = "printemps";
    readonly members = ["高坂 穂乃果", "南 ことり", "小泉 花陽"];
    getExplainString = () => "Printemps";
}

export class SearchFilterMemberGroupLilyWhite extends SearchFilterMemberNames {
    readonly key = "lilywhite";
    readonly members = ["園田 海未", "星空 凛", "東條 希"];
    getExplainString = () => "lily white";
}

export class SearchFilterMemberGroupBiBi extends SearchFilterMemberNames {
    readonly key = "bibi";
    readonly members = ["絢瀬 絵里", "西木野 真姫", "矢澤 にこ"];
    getExplainString = () => "BiBi";
}

export class SearchFilterMemberGroupCYaRon extends SearchFilterMemberNames {
    readonly key = "cyaron";
    readonly members = ["高海 千歌", "渡辺 曜", "黒澤 ルビィ"];
    getExplainString = () => "CYaRon!";
}

export class SearchFilterMemberGroupAzalea extends SearchFilterMemberNames {
    readonly key = "azalea";
    readonly members = ["松浦 果南", "黒澤 ダイヤ", "国木田 花丸"];
    getExplainString = () => "AZALEA";
}

export class SearchFilterMemberGroupGuiltyKiss extends SearchFilterMemberNames {
    readonly key = "guiltykiss";
    readonly members = ["桜内 梨子", "津島 善子", "小原 鞠莉"];
    getExplainString = () => "Guilty Kiss";
}

export class SearchFilterMemberGroupSaintSnow extends SearchFilterMemberNames {
    readonly key = "saintsnow";
    readonly members = ["鹿角 聖良", "鹿角 理亞"];
    getExplainString = () => "Saint Snow";
}

export abstract class SearchFilterSongRarity extends SearchFilter0 {
    abstract readonly rarity: CardSongRarity;
    getScopeElements = () => [<ScopeOptions>{method: ["searchSongRarity", this.rarity]}];
}

export class SearchFilterSongRarityM extends SearchFilterSongRarity {
    readonly key = "m";
    readonly rarity = CardSongRarity.M;
    getExplainString = () => "M Rarity";
}

export class SearchFilterSongRarityGR extends SearchFilterSongRarity {
    readonly key = "gr";
    readonly rarity = CardSongRarity.GR;
    getExplainString = () => "GR Rarity";
}

export class SearchFilterMemberIdolizableYes extends SearchFilter0 {
    readonly key = "idolizable";
    getScopeElements = () => ["searchIdolizable"];
    getExplainString = () => "Idolizable";
}

export class SearchFilterMemberIdolizableNo extends SearchFilter0 {
    readonly key = "idolizable";
    getScopeElements = () => ["searchNotIdolizable"];
    getExplainString = () => "Not Idolizable";
}

export class SearchFilterMemberAbilityNone extends SearchFilter0 {
    readonly key = "noability";
    getScopeElements = () => [<ScopeOptions>{method: ["searchAbility", false, false]}];
    getExplainString = () => "No Ability";
}

export class SearchFilterMemberAbilityRush extends SearchFilter0 {
    readonly key = "rush";
    getScopeElements = () => [<ScopeOptions>{method: ["searchAbility", true, null]}];
    getExplainString = () => "[RUSH] Ability";
}

export class SearchFilterMemberAbilityLive extends SearchFilter0 {
    readonly key = "live";
    getScopeElements = () => [<ScopeOptions>{method: ["searchAbility", null, true]}];
    getExplainString = () => "[LIVE] Ability";
}

export class SearchFilterMemberAbilityRushOrLive extends SearchFilter0 {
    readonly key = "rushorlive";
    getScopeElements = () => [<ScopeOptions>{method: ["searchAbility", true, true]}];
    getExplainString = () => "[RUSH/LIVE] Ability";
}

export class SearchFilterCardID extends SearchFilter1 {
    readonly key = "id";
    getScopeElements = () => [<ScopeOptions>{method: ["filterId", parseInt(this.param)]}];
    getExplainString = () => "Card ID " + this.param;
}

export class SearchFilterMemberYear extends SearchFilter1 {
    readonly key = "year";

    constructor(split?: string[]) {
        super(split);
        if (this.param !== "1" && this.param !== "2" && this.param !== "3") {
            throw new SearchFilterError("Invalid parameter for School Year filter", this.param);
        }
    }

    getScopeElements = () => [<ScopeOptions>{method: ["searchYear", parseInt(this.param)]}];
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
    abstract readonly columnNames: string[];
    abstract readonly explainName: string;
    readonly include: Includeable | undefined = undefined;

    getScopeElements = () => [<ScopeOptions>{method: ["searchGenericMultiColumnLike", this.param, this.columnNames, this.include]}];
    getExplainString = () => `${this.explainName} contains "${this.param}"`;
}

export class SearchFilterName extends SearchFilterTranslatableLike {
    readonly key = "name";
    readonly columnNames = ["nameJpn", "nameEng"];
    readonly explainName = "Name";
}

export class SearchFilterCostume extends SearchFilterTranslatableLike {
    readonly key = "costume";
    readonly columnNames = ["$member.costumeJpn$", "$member.costumeEng$"];
    readonly explainName = "Costume";
    readonly include: Includeable = {
        association: "member",
        required: true,
        attributes: ["costumeJpn", "costumeEng"]
    };
}

export class SearchFilterSkill extends SearchFilterTranslatableLike {
    readonly key = "skill";
    readonly columnNames = ["$skills.jpn$", "$skills.eng$"];
    readonly explainName = "Skill";
    readonly include: Includeable = {
        association: "skills",
        required: true,
        attributes: ["jpn", "eng"]
    };
}

export abstract class SearchFilterNumberWithMod extends SearchFilter1 {
    abstract readonly columnName: string;
    abstract readonly explainName: string;
    readonly explainAfter: boolean = false;
    readonly include: Includeable | undefined = undefined;

    getScopeElements = () => [<ScopeOptions>{method: ["searchGenericNumberWithMod", this.param, this.columnName, this.include]}];
    getExplainString = () => {
        const mod = this.param.endsWith("+") ? " or more" : (this.param.endsWith("-") ? " or less" : "");
        if (this.explainAfter) {
            return `${parseInt(this.param)}${mod} ${this.explainName}`;
        } else {
            return `${this.explainName} is ${parseInt(this.param)}${mod}`;
        }
    };
}

export class SearchFilterMemberCost extends SearchFilterNumberWithMod {
    readonly key = "cost";
    readonly columnName = "$member.cost$";
    readonly explainName = "Cost";
    readonly include: Includeable = {
        association: "member",
        required: true,
        attributes: ["cost"]
    };
}

export class SearchFilterMemberPieces extends SearchFilterNumberWithMod {
    readonly key = "pieces";
    readonly columnName = "$member.piecesAll + member.piecesSmile + member.piecesPure + member.piecesCool$";
    readonly explainName = "Pieces";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "member",
        required: true,
        attributes: ["piecesAll", "piecesSmile", "piecesPure", "piecesCool"]
    };
}

export class SearchFilterMemberPiecesAll extends SearchFilterNumberWithMod {
    readonly key = "allpieces";
    readonly columnName = "$member.piecesAll$";
    readonly explainName = "[ALL] Pieces";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "member",
        required: true,
        attributes: ["piecesAll"]
    };
}

export class SearchFilterMemberPiecesSmile extends SearchFilterNumberWithMod {
    readonly key = "smilepieces";
    readonly columnName = "$member.piecesSmile$";
    readonly explainName = "[SMILE] Pieces";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "member",
        required: true,
        attributes: ["piecesSmile"]
    };
}

export class SearchFilterMemberPiecesPure extends SearchFilterNumberWithMod {
    readonly key = "purepieces";
    readonly columnName = "$member.piecesPure$";
    readonly explainName = "[PURE] Pieces";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "member",
        required: true,
        attributes: ["piecesPure"]
    };
}

export class SearchFilterMemberPiecesCool extends SearchFilterNumberWithMod {
    readonly key = "coolpieces";
    readonly columnName = "$member.piecesCool$";
    readonly explainName = "[COOL] Pieces";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "member",
        required: true,
        attributes: ["piecesCool"]
    };
}

export class SearchFilterMemberBonusYes extends SearchFilter0 {
    readonly key = "bonus";
    getScopeElements = () => ["searchBonus"];
    getExplainString = () => "With Birthday Bonus";
}

export class SearchFilterMemberBonusNo extends SearchFilter0 {
    readonly key = "nobonus";
    getScopeElements = () => ["searchNoBonus"];
    getExplainString = () => "No Birthday Bonus";
}

export abstract class SearchFilterSongAttribute extends SearchFilter0 {
    abstract readonly attribute: AttributeEnum;
    getScopeElements = () => [<ScopeOptions>{method: ["searchSongAttribute", this.attribute.id]}];
    getExplainString = () => `Attribute is ${this.attribute.toSongAttributeName()}`;
}

export class SearchFilterSongAttributeNeutral extends SearchFilterSongAttribute {
    readonly key = "neutral";
    readonly attribute = AttributeEnum.ALL;
}

export class SearchFilterSongAttributeSmile extends SearchFilterSongAttribute {
    readonly key = "smile";
    readonly attribute = AttributeEnum.SMILE;
}

export class SearchFilterSongAttributePure extends SearchFilterSongAttribute {
    readonly key = "pure";
    readonly attribute = AttributeEnum.PURE;
}

export class SearchFilterSongAttributeCool extends SearchFilterSongAttribute {
    readonly key = "cool";
    readonly attribute = AttributeEnum.COOL;
}

export class SearchFilterSongAttributeOrange extends SearchFilterSongAttribute {
    readonly key = "orange";
    readonly attribute = AttributeEnum.ORANGE;
}

export abstract class SearchFilterSongReqType extends SearchFilter0 {
    abstract readonly reqType: CardSongRequirementType;
    getScopeElements = () => [<ScopeOptions>{method: ["searchSongReqType", this.reqType]}];
}

export class SearchFilterSongReqTypeAny extends SearchFilterSongReqType {
    readonly key = "anypiece";
    readonly reqType = CardSongRequirementType.ANY_PIECE;
    getExplainString = () => "With Any Piece Requirement";
}

export class SearchFilterSongReqTypeAttr extends SearchFilterSongReqType {
    readonly key = "attributepiece";
    readonly reqType = CardSongRequirementType.ATTR_PIECE;
    getExplainString = () => "With Attribute Piece Requirement";
}

export class SearchFilterSongLivePoints extends SearchFilterNumberWithMod {
    readonly key = "livepoints";
    readonly columnName = "$song.lpBase$";
    readonly explainName = "Base Live Points";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "song",
        required: true,
        attributes: ["lpBase"]
    };
}

export class SearchFilterSongReqSmile extends SearchFilterNumberWithMod {
    readonly key = "smilerequired";
    readonly columnName = "$song.attrRequirement.piecesSmile$";
    readonly explainName = "Required [SMILE] Pieces";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "song",
        required: true,
        include: [{
            association: "attrRequirement",
            required: true,
            attributes: ["piecesSmile"]
        }]
    };
}

export class SearchFilterSongReqPure extends SearchFilterNumberWithMod {
    readonly key = "purerequired";
    readonly columnName = "$song.attrRequirement.piecesPure$";
    readonly explainName = "Required [PURE] Pieces";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "song",
        required: true,
        include: [{
            association: "attrRequirement",
            required: true,
            attributes: ["piecesPure"]
        }]
    };
}

export class SearchFilterSongReqCool extends SearchFilterNumberWithMod {
    readonly key = "coolrequired";
    readonly columnName = "$song.attrRequirement.piecesCool$";
    readonly explainName = "Required [COOL] Pieces";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "song",
        required: true,
        include: [{
            association: "attrRequirement",
            required: true,
            attributes: ["piecesCool"]
        }]
    };
}

export class SearchFilterSongReqAny extends SearchFilterNumberWithMod {
    readonly key = "required";
    readonly columnName = "$song.anyRequirement.piecesAll$";
    readonly explainName = "Required Pieces";
    readonly explainAfter = true;
    readonly include: Includeable = {
        association: "song",
        required: true,
        include: [{
            association: "anyRequirement",
            required: true,
            attributes: ["piecesAll"]
        }]
    };
}

const map = new Map<string, new (split?: string[]) => SearchFilter>([
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
    ["coolrequired", SearchFilterSongReqCool]
]);

export function getSearchFilter(key: string): { new(split: string[]): SearchFilter } {
    if (map.has(key)) {
        return map.get(key)!;
    } else {
        throw new SearchFilterError("Unknown filter key", key);
    }
}
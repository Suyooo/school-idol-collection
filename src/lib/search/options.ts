import type {DBObject} from "$models/db.js";
import type {Literal, Op, IncludeOptions, WhereOptions} from "@sequelize/core";
import CardType from "$lib/enums/cardType.js";
import SearchFilterError from "$lib/errors/searchFilterError.js";
import {escapeForUrl} from "$lib/utils/string.js";
import type {ProjectionAlias} from "@sequelize/core/_non-semver-use-at-your-own-risk_/model.js";
import {CardMemberRarity, CardSongRarity} from "../enums/cardRarity.js";

export default abstract class SearchFilter {
    abstract readonly key: string;

    protected constructor(_split?: string[]) {
    }

    abstract getWhereOptions(ops: typeof Op): WhereOptions;

    getAttributeOptions: (literal: (val: string) => Literal) => Array<string | ProjectionAlias> = () => [];

    abstract getIncludeOptions(db: DBObject, ops: typeof Op): IncludeOptions[];

    abstract getExplainString(): string;

    abstract getFilterString(): string;
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

export abstract class SearchFilterCardType extends SearchFilter0 {
    abstract readonly type: CardType;

    getWhereOptions = () => ({type: this.type});
    getIncludeOptions = () => <IncludeOptions[]>[];
}

export class SearchFilterMember extends SearchFilterCardType {
    readonly key = "member";
    readonly type = CardType.MEMBER;
    getExplainString = () => "Members";
}

export class SearchFilterSong extends SearchFilterCardType {
    readonly key = "song";
    readonly type = CardType.SONG;
    getExplainString = () => "Songs";
}

export class SearchFilterMemory extends SearchFilterCardType {
    readonly key = "memory";
    readonly type = CardType.MEMORY;
    getExplainString = () => "Memories";
}

export abstract class SearchFilterMemberRarity extends SearchFilter0 {
    abstract readonly rarity: CardMemberRarity;

    getWhereOptions = () => ({"$member.rarity$": this.rarity});
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["rarity"]
    }];
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

    getWhereOptions = () => ({"nameJpn": this.members});
    getIncludeOptions = () => <IncludeOptions[]>[];
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

    getWhereOptions = () => ({"$song.rarity$": this.rarity});
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        attributes: ["rarity"]
    }];
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
    getWhereOptions = () => ({});
    getIncludeOptions = (db: DBObject, ops: typeof Op) => [{
        model: db.Skill,
        required: true,
        attributes: ["jpn"],
        where: {jpn: {[ops.like]: "【特別練習】%"}}
    }];
    getExplainString = () => "Idolizable";
}

export class SearchFilterMemberIdolizableNo extends SearchFilter0 {
    readonly key = "idolizable";
    getWhereOptions = () => ({});
    getIncludeOptions = (db: DBObject, ops: typeof Op) => [{
        model: db.Skill,
        required: true,
        attributes: ["jpn"],
        where: {jpn: {[ops.notLike]: "【特別練習】%"}}
    }];
    getExplainString = () => "Not Idolizable";
}

export class SearchFilterMemberAbilityNone extends SearchFilter0 {
    readonly key = "noability";
    getWhereOptions = () => ({"$member.abilityRush$": false, "$member.abilityLive$": false});
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["abilityRush", "abilityLive"]
    }];
    getExplainString = () => "No Ability";
}

export class SearchFilterMemberAbilityRush extends SearchFilter0 {
    readonly key = "rush";
    getWhereOptions = () => ({"$member.abilityRush$": true});
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["abilityRush"]
    }];
    getExplainString = () => "[RUSH] Ability";
}

export class SearchFilterMemberAbilityLive extends SearchFilter0 {
    readonly key = "live";
    getWhereOptions = () => ({"$member.abilityLive$": true});
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["abilityLive"]
    }];
    getExplainString = () => "[LIVE] Ability";
}

export class SearchFilterMemberAbilityRushOrLive extends SearchFilter0 {
    readonly key = "rushorlive";
    getWhereOptions = () => ({"$member.abilityRush$": true, "$member.abilityLive$": true});
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["abilityRush", "abilityLive"]
    }];
    getExplainString = () => "[RUSH] or [LIVE] Ability";
}

export class SearchFilterCardID extends SearchFilter1 {
    readonly key = "id";

    getWhereOptions = () => ({id: parseInt(this.param)});
    getIncludeOptions = () => <IncludeOptions[]>[];
    getExplainString = () => "Card ID " + this.param;
}

export class SearchFilterMemberYear extends SearchFilter1 {
    readonly key = "year";

    getWhereOptions = () => ({"$member.year$": parseInt(this.param)});
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["year"]
    }];
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

    getWhereOptions = (ops: typeof Op) => ({
        [ops.or]: this.columnNames.map(col => ({[col]: {[ops.like]: "%" + this.param + "%"}}))
    });

    getIncludeOptions = (_db: DBObject) => <IncludeOptions[]>[];
    getExplainString = () => this.explainName + " contains " + this.param;
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

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["costumeJpn", "costumeEng"]
    }];
}

export class SearchFilterSkill extends SearchFilterTranslatableLike {
    readonly key = "skill";
    readonly columnNames = ["$skills.jpn$", "$skills.eng$"];
    readonly explainName = "Skill";

    getIncludeOptions = (db: DBObject) => [{model: db.Skill, required: true, attributes: ["jpn", "eng"]}];
}

export abstract class SearchFilterNumberWithMod extends SearchFilter1 {
    abstract readonly columnName: string;
    abstract readonly explainName: string;
    readonly explainAfter: boolean = false;

    getWhereOptions = (ops: typeof Op) => {
        const op = this.param.endsWith("+") ? ops.gte : (this.param.endsWith("-") ? ops.lte : ops.eq);
        const num = parseInt(this.param);
        return {[this.columnName]: {[op]: num}}
    };
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

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["cost"]
    }];
}

export class SearchFilterMemberPieces extends SearchFilterNumberWithMod {
    readonly key = "pieces";
    readonly columnName = "$piecesTotal$";
    readonly explainName = "Pieces";
    readonly explainAfter = true;

    getAttributeOptions = (literal: (val: string) => Literal) => [
        <ProjectionAlias>[literal("piecesAll + piecesSmile + piecesPure + piecesCool"), "piecesTotal"]
    ];
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["piecesAll", "piecesSmile", "piecesPure", "piecesCool"]
    }];
}

export class SearchFilterMemberPiecesAll extends SearchFilterNumberWithMod {
    readonly key = "allpieces";
    readonly columnName = "$member.piecesAll$";
    readonly explainName = "[ALL] Pieces";
    readonly explainAfter = true;

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["piecesAll"]
    }];
}

export class SearchFilterMemberPiecesSmile extends SearchFilterNumberWithMod {
    readonly key = "smilepieces";
    readonly columnName = "$member.piecesSmile$";
    readonly explainName = "[SMILE] Pieces";
    readonly explainAfter = true;

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["piecesSmile"]
    }];
}

export class SearchFilterMemberPiecesPure extends SearchFilterNumberWithMod {
    readonly key = "purepieces";
    readonly columnName = "$member.piecesPure$";
    readonly explainName = "[PURE] Pieces";
    readonly explainAfter = true;

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["piecesPure"]
    }];
}

export class SearchFilterMemberPiecesCool extends SearchFilterNumberWithMod {
    readonly key = "coolpieces";
    readonly columnName = "$member.piecesCool$";
    readonly explainName = "[COOL] Pieces";
    readonly explainAfter = true;

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["piecesCool"]
    }];
}

export class SearchFilterMemberBonusYes extends SearchFilter0 {
    readonly key = "bonus";

    getWhereOptions = (ops: typeof Op) => ({ "$member.pieceBdayAttribute$": { [ops.not]: null } });
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["pieceBdayAttribute"]
    }];
    getExplainString = () => "Has Birthday Bonus";
}

export class SearchFilterMemberBonusNo extends SearchFilter0 {
    readonly key = "nobonus";

    getWhereOptions = () => ({ "$member.pieceBdayAttribute$": null });
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardMemberExtraInfo,
        required: true,
        attributes: ["pieceBdayAttribute"]
    }];
    getExplainString = () => "Has No Birthday Bonus";
}

export class SearchFilterSongAttributeNeutral extends SearchFilter0 {
    readonly key = "neutral";

    getWhereOptions = () => ({ "$song.attribute$": 0 });
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        attributes: ["attribute"]
    }];
    getExplainString = () => "Attribute is Neutral";
}

export class SearchFilterSongAttributeSmile extends SearchFilter0 {
    readonly key = "smile";

    getWhereOptions = () => ({ "$song.attribute$": 1 });
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        attributes: ["attribute"]
    }];
    getExplainString = () => "Attribute is Smile";
}

export class SearchFilterSongAttributePure extends SearchFilter0 {
    readonly key = "pure";

    getWhereOptions = () => ({ "$song.attribute$": 2 });
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        attributes: ["attribute"]
    }];
    getExplainString = () => "Attribute is Pure";
}

export class SearchFilterSongAttributeCool extends SearchFilter0 {
    readonly key = "cool";

    getWhereOptions = () => ({ "$song.attribute$": 3 });
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        attributes: ["attribute"]
    }];
    getExplainString = () => "Attribute is Cool";
}

export class SearchFilterSongAttributeOrange extends SearchFilter0 {
    readonly key = "orange";

    getWhereOptions = () => ({ "$song.attribute$": 4 });
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        attributes: ["attribute"]
    }];
    getExplainString = () => "Attribute is Orange";
}

export class SearchFilterSongReqTypeAny extends SearchFilter0 {
    readonly key = "anypiece";

    getWhereOptions = () => ({"$song.requirementType$": 0});
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        attributes: ["requirementType"]
    }];
    getExplainString = () => "Has Any Piece Requirement";
}

export class SearchFilterSongReqTypeAttr extends SearchFilter0 {
    readonly key = "attributepiece";

    getWhereOptions = () => ({"$song.requirementType$": 1});
    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        attributes: ["requirementType"]
    }];
    getExplainString = () => "Has Attribute Piece Requirement";
}

export class SearchFilterSongLivePoints extends SearchFilterNumberWithMod {
    readonly key = "lp";
    readonly columnName = "$song.lpBase$";
    readonly explainName = "Base Live Points";
    readonly explainAfter = true;

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        attributes: ["lpBase"]
    }];
}

export class SearchFilterSongReqSmile extends SearchFilterNumberWithMod {
    readonly key = "smilerequired";
    readonly columnName = "$song.attrRequirement.piecesSmile$";
    readonly explainName = "Required [SMILE] Pieces";
    readonly explainAfter = true;

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        include: {
            model: db.CardSongAttrReqExtraInfo,
            required: true,
            attributes: ["piecesSmile"]
        }
    }];
}

export class SearchFilterSongReqPure extends SearchFilterNumberWithMod {
    readonly key = "purerequired";
    readonly columnName = "$song.attrRequirement.piecesPure$";
    readonly explainName = "Required [PURE] Pieces";
    readonly explainAfter = true;

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        include: {
            model: db.CardSongAttrReqExtraInfo,
            required: true,
            attributes: ["piecesPure"]
        }
    }];
}

export class SearchFilterSongReqCool extends SearchFilterNumberWithMod {
    readonly key = "coolrequired";
    readonly columnName = "$song.attrRequirement.piecesCool$";
    readonly explainName = "Required [COOL] Pieces";
    readonly explainAfter = true;

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        include: {
            model: db.CardSongAttrReqExtraInfo,
            required: true,
            attributes: ["piecesCool"]
        }
    }];
}

export class SearchFilterSongReqAny extends SearchFilterNumberWithMod {
    readonly key = "required";
    readonly columnName = "$song.anyRequirement.piecesAll$";
    readonly explainName = "Required Pieces";
    readonly explainAfter = true;

    getIncludeOptions = (db: DBObject) => [{
        model: db.CardSongExtraInfo,
        required: true,
        include: {
            model: db.CardSongAnyReqExtraInfo,
            required: true,
            attributes: ["piecesAll"]
        }
    }];
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
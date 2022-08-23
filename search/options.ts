import CardType from "../types/cardType";
import SearchFilterError from "../errors/searchFilterError";
import {IncludeOptions, Op, WhereOptions} from "sequelize";
import DB from "../models/db";

export default abstract class SearchFilter {
    protected constructor(split: string[]) {
    }

    abstract getWhereOptions(): WhereOptions;

    abstract getIncludeOptions(): IncludeOptions[];

    abstract getExplainString(): string;
}

export abstract class SearchFilter0 extends SearchFilter {
    constructor(split: string[]) {
        super(split);
    }
}

export abstract class SearchFilter1 extends SearchFilter {
    param: any;

    constructor(split: string[]) {
        super(split);
        this.param = split.slice(1).join(":");
        if (this.param.trim() === "") throw new SearchFilterError("Missing parameter", split.join(":"));
    }
}

export abstract class SearchFilterCardType extends SearchFilter0 {
    abstract readonly type: CardType;

    getWhereOptions = () => ({type: this.type});
    getIncludeOptions = () => <IncludeOptions[]>[];
}

export class SearchFilterMember extends SearchFilterCardType {
    readonly type = CardType.MEMBER;
    getExplainString = () => "Members";
}

export class SearchFilterSong extends SearchFilterCardType {
    readonly type = CardType.SONG;
    getExplainString = () => "Songs";
}

export class SearchFilterMemory extends SearchFilterCardType {
    readonly type = CardType.MEMORY;
    getExplainString = () => "Memories";
}

export abstract class SearchFilterTranslatableLike extends SearchFilter1 {
    abstract readonly columnNames: string[];
    abstract readonly explainName: string;

    getWhereOptions = () => ({
        [Op.or]: this.columnNames.map(col => ({[col]: {[Op.like]: "%" + this.param + "%"}}))
    });

    getIncludeOptions = () => <IncludeOptions[]>[];
    getExplainString = () => this.explainName + " contains " + this.param;
}

export class SearchFilterName extends SearchFilterTranslatableLike {
    readonly columnNames = ["nameJpn", "nameEng"];
    readonly explainName = "Name";
}

export class SearchFilterCostume extends SearchFilterTranslatableLike {
    readonly columnNames = ["$member.costumeJpn$", "$member.costumeEng$"];
    readonly explainName = "Costume";

    getIncludeOptions = () => [{
        model: DB.CardMemberExtraInfo,
        required: true,
        attributes: ["costumeJpn", "costumeEng"]
    }];
}

export class SearchFilterSkill extends SearchFilterTranslatableLike {
    readonly columnNames = ["$skills.jpn$", "$skills.eng$"];
    readonly explainName = "Skill";

    getIncludeOptions = () => [{model: DB.Skill, required: true, attributes: ["jpn", "eng"]}];
}

const map = new Map<string, new (split: string[]) => SearchFilter>([
    ["member", SearchFilterMember],
    ["song", SearchFilterSong],
    ["memory", SearchFilterMemory],
    ["name", SearchFilterName],
    ["costume", SearchFilterCostume],
    ["skill", SearchFilterSkill]
]);

export function getSearchFilter(key: string): { new(split: string[]): SearchFilter } {
    if (map.has(key)) {
        return map.get(key)!;
    } else {
        throw new SearchFilterError("Unknown filter key", key);
    }
}
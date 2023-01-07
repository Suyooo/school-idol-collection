import DB from "$models/db";
import {Op} from "sequelize";
import type {IncludeOptions, WhereOptions} from "sequelize";
import CardType from "$types/cardType";
import SearchFilterError from "$errors/searchFilterError";
import {escapeForUrl} from "$utils/convert";

export default abstract class SearchFilter {
    abstract readonly key: string;

    protected constructor(_split?: string[]) {
    }

    abstract getWhereOptions(): WhereOptions;

    abstract getIncludeOptions(): IncludeOptions[];

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

export class SearchFilterCardID extends SearchFilter1 {
    readonly key = "id";

    getWhereOptions = () => ({id: parseInt(this.param)});
    getIncludeOptions = () => <IncludeOptions[]>[];
    getExplainString = () => "Card ID " + this.param;
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
    readonly key = "name";
    readonly columnNames = ["nameJpn", "nameEng"];
    readonly explainName = "Name";
}

export class SearchFilterCostume extends SearchFilterTranslatableLike {
    readonly key = "costume";
    readonly columnNames = ["$member.costumeJpn$", "$member.costumeEng$"];
    readonly explainName = "Costume";

    getIncludeOptions = () => [{
        model: DB.CardMemberExtraInfo,
        required: true,
        attributes: ["costumeJpn", "costumeEng"]
    }];
}

export class SearchFilterSkill extends SearchFilterTranslatableLike {
    readonly key = "skill";
    readonly columnNames = ["$skills.jpn$", "$skills.eng$"];
    readonly explainName = "Skill";

    getIncludeOptions = () => [{model: DB.Skill, required: true, attributes: ["jpn", "eng"]}];
}

const map = new Map<string, new (split?: string[]) => SearchFilter>([
    ["member", SearchFilterMember],
    ["song", SearchFilterSong],
    ["memory", SearchFilterMemory],
    ["id", SearchFilterCardID],
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
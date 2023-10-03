import EnumError from "$l/errors/enumError.js";
import { mapGet } from "$l/utils/map.js";

type Name =
    | "???"
    | "—"
    | "µ's"
    | "Aqours"
    | "Printemps"
    | "lily white"
    | "BiBi"
    | "CYaRon!"
    | "AZALEA"
    | "Guilty Kiss"
    | "Saint Snow"
    | "Saint Aqours Snow";
export type GroupID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export default class GroupEnum {
    readonly id: number & GroupID;
    private readonly name: string & Name;
    private readonly superGroup: GroupEnum | null;

    private static readonly idMap: Map<GroupID, GroupEnum> = new Map();
    private static readonly idMapWithSubs: Map<GroupID, GroupEnum[]> = new Map();
    private static readonly nameMap: Map<Name, GroupEnum> = new Map();
    public static readonly all: GroupEnum[] = [];

    private constructor(id: GroupID, name: Name, superGroup: GroupEnum | null = null) {
        this.id = id;
        this.name = name;
        this.superGroup = superGroup;

        GroupEnum.all.push(this);
        GroupEnum.idMap.set(this.id, this);
        GroupEnum.idMapWithSubs.set(this.id, [this]);
        if (this.superGroup !== null) {
            mapGet(GroupEnum.idMapWithSubs, this.superGroup.id).push(this);
        }
        GroupEnum.nameMap.set(this.name, this);
    }

    toName() {
        return this.name;
    }

    toNameWithSuper(separator: string, superFirst: boolean = true): string {
        if (this.superGroup === null) return this.name;
        else if (superFirst) return this.superGroup.toNameWithSuper(separator) + separator + this.name;
        else return this.name + separator + this.superGroup.toNameWithSuper(separator);
    }

    toIdsWithSuper(): GroupID[] {
        if (this.superGroup === null) return [this.id];
        else return [this.id, ...this.superGroup.toIdsWithSuper()];
    }

    static UNKNOWN = new GroupEnum(0, "???");
    static NONE = new GroupEnum(1, "—");
    static MUSE = new GroupEnum(2, "µ's");
    static AQOURS = new GroupEnum(3, "Aqours");
    static PRINTEMPS = new GroupEnum(4, "Printemps", GroupEnum.MUSE);
    static LILY_WHITE = new GroupEnum(5, "lily white", GroupEnum.MUSE);
    static BIBI = new GroupEnum(6, "BiBi", GroupEnum.MUSE);
    static CYARON = new GroupEnum(7, "CYaRon!", GroupEnum.AQOURS);
    static AZALEA = new GroupEnum(8, "AZALEA", GroupEnum.AQOURS);
    static GUILTY_KISS = new GroupEnum(9, "Guilty Kiss", GroupEnum.AQOURS);
    static SAINT_SNOW = new GroupEnum(10, "Saint Snow");
    static SAINT_AQOURS_SNOW = new GroupEnum(11, "Saint Aqours Snow", GroupEnum.AQOURS);

    static getSubIdsFromId(n: number): GroupID[] {
        const a = GroupEnum.idMapWithSubs.get(<GroupID>n);
        if (a === undefined) throw new EnumError("Trigger", "ID (subgroups included)", n);
        else return a.map((g) => g.id);
    }

    static fromId(n: number): GroupEnum {
        const a = GroupEnum.idMap.get(<GroupID>n);
        if (a === undefined) throw new EnumError("Trigger", "ID", n);
        else return a;
    }

    static fromName(s: string): GroupEnum {
        const a = GroupEnum.nameMap.get(<Name>s);
        if (a === undefined) throw new EnumError("Trigger", "name", s);
        else return a;
    }
}

import EnumError from "$lib/errors/enumError.js";
import Language from "$lib/enums/language.js";

type NameJpn =
    "登場時" | "ライブ参加時" | "ライブ成功時" | "ライブ中" | "スタート時" | "オート" | "自動" | "待機中" | "特別練習";
type NameEng =
    "Entry" | "Live Join" | "Live Success" | "While Live" | "Starter" | "Auto" | "On Stand-By" | "Special Practice";
type Name = NameJpn | NameEng;
type CssClassName = "entry" | "join" | "success" | "live" | "start" | "auto" | "standby" | "sp";
export type TriggerID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default class TriggerEnum {
    readonly id: number & TriggerID;
    private readonly nameEng: string & NameEng;
    private readonly nameJpn: string & NameJpn;
    private readonly nameJpnMemory: string & NameJpn;
    private readonly cssClassName: string & CssClassName;

    private static readonly idMap: Map<TriggerID, TriggerEnum> = new Map();
    private static readonly nameMap: Map<Name, TriggerEnum> = new Map();
    public static readonly all: TriggerEnum[] = [];
    public static readonly allWithMemoryAlts: TriggerEnum[] = [];

    private constructor(id: TriggerID, className: CssClassName,
                        eng: NameEng, jpn: NameJpn, jpnMemoryAlt?: NameJpn) {
        this.id = id;
        this.cssClassName = className;
        this.nameEng = eng;
        this.nameJpn = jpn;
        this.nameJpnMemory = jpnMemoryAlt ? jpnMemoryAlt : jpn;

        TriggerEnum.all.push(this);
        TriggerEnum.idMap.set(this.id, this);
        TriggerEnum.nameMap.set(this.nameEng, this);
        TriggerEnum.nameMap.set(this.nameJpn, this);
        if (jpnMemoryAlt) {
            TriggerEnum.allWithMemoryAlts.push(this);
            TriggerEnum.nameMap.set(this.nameJpnMemory, this);
        }
    }

    toCssClassName() {
        return this.cssClassName;
    }

    toName(lang: Language = Language.ENG, isMemory: boolean = false) {
        if (lang === Language.ENG) return this.nameEng;
        else if (isMemory) return this.nameJpnMemory;
        else return this.nameJpn;
    }

    static ENTRY = new TriggerEnum(0, "entry", "Entry", "登場時");
    static JOIN = new TriggerEnum(1, "join", "Live Join", "ライブ参加時");
    static SUCCESS = new TriggerEnum(2, "success", "Live Success", "ライブ成功時");
    static LIVE = new TriggerEnum(3, "live", "While Live", "ライブ中");
    static START = new TriggerEnum(4, "start", "Starter", "スタート時");
    static AUTO = new TriggerEnum(5, "auto", "Auto", "オート", "自動");
    static STANDBY = new TriggerEnum(6, "standby", "On Stand-By", "待機中");
    static SP = new TriggerEnum(7, "sp", "Special Practice", "特別練習");

    static fromId(n: number): TriggerEnum {
        const a = TriggerEnum.idMap.get(<TriggerID>n);
        if (a === undefined) throw new EnumError("Trigger", "ID", n);
        else return a;
    }

    static fromName(s: string): TriggerEnum {
        const a = TriggerEnum.nameMap.get(<Name>s);
        if (a === undefined) throw new EnumError("Trigger", "name", s);
        else return a;
    }

    static triggersToBitmask(triggers: TriggerEnum[]): number {
        return triggers.map(t => 1 << t.id).reduce((acc, i) => acc + i, 0);
    }

    static bitmaskToTriggers(triggerBitmask: number): TriggerEnum[] {
        const triggers: TriggerEnum[] = [];
        let i: number = 0;
        while (triggerBitmask > 0 && i < 8) {
            if ((triggerBitmask & 1) == 1) triggers.push(TriggerEnum.fromId(i));
            i++;
            triggerBitmask = triggerBitmask >> 1;
        }
        return triggers;
    }
}
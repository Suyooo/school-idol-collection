import NotFoundError from "../errors/notFound";

export default class Trigger {
    static [key: number]: Trigger;

    readonly id: number;
    readonly eng: string;
    readonly jpn: string;
    readonly className: string;
    static engMap = new Map<string, Trigger>();
    static jpnMap = new Map<string, Trigger>();

    constructor(id: number, eng: string, jpn: string, className: string) {
        this.id = id;
        this.eng = eng;
        this.jpn = jpn;
        this.className = className;
        Trigger.engMap.set(eng, this);
        Trigger.jpnMap.set(jpn, this);
        if (jpn == "オート") {
            Trigger.jpnMap.set("自動", this);
        }
    }

    static 0 = new Trigger(0, "Entry", "登場時", "entry");
    static 1 = new Trigger(1, "Live Join", "ライブ参加時", "join");
    static 2 = new Trigger(2, "Live Success", "ライブ成功時", "success");
    static 3 = new Trigger(3, "While Live", "ライブ中", "live");
    static 4 = new Trigger(4, "Starter", "スタート時", "start");
    static 5 = new Trigger(5, "Auto", "オート", "auto");
    static 6 = new Trigger(6, "On Stand-By", "待機中", "wait");
    static 7 = new Trigger(7, "Special Practice", "特別練習", "sp");

    static fromJpn(jpn: string): Trigger {
        const ret = Trigger.jpnMap.get(jpn);
        if (ret === undefined) {
            throw new NotFoundError("Unknown Trigger " + jpn);
        }
        return ret;
    }

    static fromEng(eng: string): Trigger {
        const ret = Trigger.engMap.get(eng);
        if (ret === undefined) {
            throw new NotFoundError("Unknown Trigger " + eng);
        }
        return ret;
    }
}
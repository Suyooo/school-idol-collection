export type TriggerEngName =
    "Entry"
    | "Live Join"
    | "Live Success"
    | "While Live"
    | "Starter"
    | "Auto"
    | "On Stand-By"
    | "Special Practice";
export type TriggerJpnName = "登場時" | "ライブ参加時" | "ライブ成功時" | "ライブ中" | "スタート時" | "オート" | "自動" | "待機中" | "特別練習";
export type TriggerCssClassName = "entry" | "join" | "success" | "live" | "start" | "auto" | "standby" | "sp";
type TriggerID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type MappedValue = TriggerID | TriggerEngName | TriggerJpnName;

export default class Trigger {
    readonly id: number;
    readonly eng: TriggerEngName;
    readonly jpn: TriggerJpnName;
    readonly jpnMemory: TriggerJpnName;
    readonly cssClassName: TriggerCssClassName;

    private constructor(map: Map<MappedValue, Trigger>,
                        id: TriggerID, className: TriggerCssClassName,
                        eng: TriggerEngName, jpn: TriggerJpnName, jpnMemoryAlt?: TriggerJpnName) {
        this.id = id;
        this.cssClassName = className;
        this.eng = eng;
        this.jpn = jpn;
        this.jpnMemory = jpnMemoryAlt ? jpnMemoryAlt : jpn

        map.set(id, this);
        map.set(eng, this);
        map.set(jpn, this);
        if (jpnMemoryAlt) map.set(jpnMemoryAlt, this);
    }

    private static map = (() => {
        const map = new Map<MappedValue, Trigger>();

        new Trigger(map, 0, "entry", "Entry", "登場時");
        new Trigger(map, 1, "join", "Live Join", "ライブ参加時");
        new Trigger(map, 2, "success", "Live Success", "ライブ成功時");
        new Trigger(map, 3, "live", "While Live", "ライブ中");
        new Trigger(map, 4, "start", "Starter", "スタート時");
        new Trigger(map, 5, "auto", "Auto", "オート", "自動");
        new Trigger(map, 6, "standby", "On Stand-By", "待機中");
        new Trigger(map, 7, "sp", "Special Practice", "特別練習");

        return map;
    })();
}
import { browser } from "$app/environment";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY_PROFILE: string = "sic-profile";
const STORAGE_KEY_HOTKEYS: string = "sic-hotkeys";

export interface Profile {
    name: string;
    uuid: string;
    fieldColor: string;
    deckColor: string;
    setListColor: string;
}

export function loadProfileOrNew(): Profile {
    if (!browser) {
        // SSR - return empty strings and let client side load the actual data
        return {
            name: "",
            uuid: "",
            fieldColor: "",
            deckColor: "",
            setListColor: "",
        };
    }

    const stored: string | null = localStorage.getItem(STORAGE_KEY_PROFILE);
    const storedJson: any | null = stored === null ? null : JSON.parse(stored);

    const ret: Profile = {
        name: storedJson?.name ?? "Player",
        uuid: storedJson?.uuid ?? uuidv4(),
        fieldColor: storedJson?.fieldColor ?? "#ffffff",
        deckColor: storedJson?.deckColor ?? "#f5c3d1",
        setListColor: storedJson?.setListColor ?? "#9edcf3",
    };

    if (stored === null) {
        // to make sure UUID is persisted
        saveProfile(ret);
    }
    return ret;
}

export function saveProfile(profile: Profile) {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
}

export function textColorForBackground(colorAsHex: string) {
    if (
        parseInt(colorAsHex.substring(1, 3), 16) * 0.299 +
            parseInt(colorAsHex.substring(3, 5), 16) * 0.587 +
            parseInt(colorAsHex.substring(5), 16) * 0.114 >
        186
    ) {
        return "#000000";
    } else {
        return "#FFFFFF";
    }
}

export type HotkeyAction = "scout" | "enter" | "live" | "draw" | "song" | "flip";
export type Hotkeys = { [a in HotkeyAction]: string };

const HOTKEY_DEFAULTS: Hotkeys = {
    scout: "S",
    enter: "E",
    live: "A",
    draw: "D",
    song: "W",
    flip: "F",
};

export function loadHotkeysOrDefault(): { [a in HotkeyAction]: string } {
    if (!browser) {
        // SSR - return empty object and let client side load the actual data
        return {} as Hotkeys;
    }

    const stored: string | null = localStorage.getItem(STORAGE_KEY_HOTKEYS);
    if (stored === null) return HOTKEY_DEFAULTS;
    const storedJson: any = JSON.parse(stored);

    const ret: Partial<Hotkeys> = {};
    for (const action of Object.keys(HOTKEY_DEFAULTS) as HotkeyAction[]) {
        ret[action] = storedJson[action] ?? HOTKEY_DEFAULTS[action];
    }

    return ret as Hotkeys;
}

export function saveHotkeys(hotkeys: Partial<Hotkeys>) {
    localStorage.setItem(STORAGE_KEY_HOTKEYS, JSON.stringify(hotkeys));
}

export function keyEventToHotkeyName(e: KeyboardEvent): string | undefined {
    if (e.repeat || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return undefined;

    if (e.key === " ") return "Space";
    let k = e.key.length === 1 ? e.key.toUpperCase() : e.key;
    if (e.code.startsWith("Numpad")) k = "Num " + k;
    return k;
}

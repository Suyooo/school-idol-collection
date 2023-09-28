import { browser } from "$app/environment";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY: string = "sic-profile";

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

    const stored: string | null = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function textColorForBackground(colorAsHex: string) {
    if (
        parseInt(colorAsHex.substring(1, 3), 16) * 0.299 +
            parseInt(colorAsHex.substring(3, 5), 16) * 0.587 +
            parseInt(colorAsHex.substring(5), 16) * 0.114 >
        150
    ) {
        return "#000000";
    } else {
        return "#FFFFFF";
    }
}

export type HotkeyAction = "scout" | "enter" | "live" | "draw" | "flip";

export interface Hotkey {
    action: HotkeyAction;
    key: string;
}

import { type Readable, writable } from "svelte/store";

type LiveModeElement = number;

export type LiveModeStore = Readable<LiveModeElement[]> & {
    end: () => void;
    removeAllMembers: () => void;
    setSong: (e: LiveModeElement) => void;
    toggleSong: (e: LiveModeElement) => void;
    setMembers: (e: LiveModeElement[]) => void;
    removeMember: (e: LiveModeElement) => void;
    toggleMember: (e: LiveModeElement) => void;
};

export function createLiveModeStore(): LiveModeStore {
    const { subscribe, set, update } = writable<LiveModeElement[]>([]);

    return {
        subscribe,
        end: () => set([]),
        removeAllMembers: () => update((arr) => [arr[0]]),
        setSong: (e: LiveModeElement) => {
            update((arr) => {
                if (arr.length === 0) {
                    return [e];
                } else {
                    arr[0] = e;
                    return arr;
                }
            });
        },
        toggleSong: (e: LiveModeElement) => {
            update((arr) => {
                if (arr.length === 0) {
                    return [e];
                } else if (arr[0] === e) {
                    return [];
                } else {
                    arr[0] = e;
                    return arr;
                }
            });
        },
        setMembers: (es: LiveModeElement[]) => {
            update((arr) => {
                return [arr[0], ...es];
            });
        },
        removeMember: (e: LiveModeElement) => {
            update((arr) => {
                const idx = arr.indexOf(e);
                if (idx > 0) {
                    arr.splice(idx, 1);
                }
                return arr;
            });
        },
        toggleMember: (e: LiveModeElement) => {
            update((arr) => {
                const idx = arr.indexOf(e);
                if (idx <= 0) {
                    arr.push(e);
                } else {
                    arr.splice(idx, 1);
                }
                return arr;
            });
        },
    };
}

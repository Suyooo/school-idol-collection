<script lang="ts">
    import "../../app.css";
    import Field from "./Field.svelte";
    import { setContext } from "svelte";
    import PopupMenu from "./PopupMenu.svelte";
    import type { CardSchema } from "$lib/play/schema.js";
    import CardType from "$lib/enums/cardType.js";

    let menuX: number,
        menuY: number,
        menuHeader: string,
        menuEntries: { label: string; handler: () => void }[] | undefined =
            undefined;
    function openMenu(
        x: number,
        y: number,
        header: string,
        entries: { label: string; handler: () => void }[],
        cancelable: boolean
    ): void {
        menuX = x;
        menuY = y;
        menuHeader = header;
        menuEntries = entries.map((e) => ({
            label: e.label,
            handler: () => {
                menuEntries = undefined;
                e.handler();
            },
        }));
        if (cancelable) {
            menuEntries.push({
                label: "Cancel",
                handler: () => {
                    menuEntries = undefined;
                },
            });
        }
    }

    setContext("openMenu", openMenu);

    const p1Cards = new Map<number, CardSchema>();
    p1Cards.set(1, {
        cardNo: "LL01-001",
        cardType: CardType.MEMBER,
        x: 0,
        y: 0,
        z: 0,
    });
    p1Cards.set(2, {
        cardNo: "LL01-067",
        cardType: CardType.SONG,
        x: 0,
        y: 50,
        z: 0,
    });
    const p1MemberDeck = ["LL01-002", "LL01-003", "LL01-004"];
    const p1SongDeck = ["LL01-064", "LL01-065", "LL01-066"];
</script>

<Field
    cards={p1Cards}
    memberDeck={p1MemberDeck}
    songDeck={p1SongDeck}
/>

{#if menuEntries}
    <PopupMenu x={menuX} y={menuY} header={menuHeader} entries={menuEntries} />
{/if}

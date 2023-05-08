<script context="module" lang="ts">
    export type OpenMenuFunction = (
        x: number,
        y: number,
        header: string,
        entries: { label: string; handler: () => void; close?: boolean }[],
        cancelable: boolean
    ) => void;
</script>

<script lang="ts">
    import "../../app.css";
    import FieldObject from "./FieldObject.svelte";
    import { setContext } from "svelte";
    import PopupMenu from "./PopupMenu.svelte";
    import { LocalClientGameLogic } from "$lib/play/logic/local.js";

    let menuX: number,
        menuY: number,
        menuHeader: string,
        menuEntries:
            | { label: string; handler: () => void; close?: boolean }[]
            | undefined = undefined;

    const openMenu: OpenMenuFunction = (x, y, header, entries, cancelable) => {
        menuX = x;
        menuY = y;
        menuHeader = header;
        menuEntries = entries.map((e) => ({
            label: e.label,
            handler: () => {
                if (e.close ?? true) menuEntries = undefined;
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
    };
    setContext("openMenu", openMenu);

    const logic = new LocalClientGameLogic("me :)");
</script>

<svelte:body on:mousedown={() => (menuEntries = undefined)} />

<FieldObject {logic} playerId={0} />

{#if menuEntries}
    <PopupMenu x={menuX} y={menuY} header={menuHeader} entries={menuEntries} />
{/if}

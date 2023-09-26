<script context="module" lang="ts">
    import { getContext } from "svelte";
    import type { Readable, Writable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import type { SnapFunction } from "@interactjs/types/index";
    import type { ClientFieldCardSchema, ClientGameLogic } from "$lib/play/schema.js";
    import type { FieldPositionFunction, OpenMenuFunction } from "./+page.svelte";
    import FieldCardObject from "./FieldCardObject.svelte";
</script>

<script lang="ts">
    export let id: number;
    export let cards: Map<number, ClientFieldCardSchema>;
    export let position: Readable<{ x: number; y: number }>;
    const logic: ClientGameLogic = getContext("logic");
    const openMenu: OpenMenuFunction = getContext("openMenu");
    const fieldZoom: Writable<number> = getContext("fieldZoom");
    const snapFunction: () => SnapFunction = getContext("snapFunction");
    const fieldPositionFunction: FieldPositionFunction = getContext("fieldPositionFunction");

    let displayPosition: { x: number; y: number };
    $: displayPosition = { x: $position.x * $fieldZoom, y: $position.y * $fieldZoom };
    let wasMoved = true;
    function action(node: HTMLElement) {
        const interactable = interact(node)
            .styleCursor(false)
            .draggable({
                listeners: {
                    start() {
                        node.classList.add("dragging");
                        const pos = fieldPositionFunction(0, 0);
                        displayPosition.x -= pos.x * $fieldZoom;
                        displayPosition.y -= pos.y * $fieldZoom;
                    },
                    move(event) {
                        if (Math.abs(event.dx) > 2 || Math.abs(event.dy) > 2) {
                            wasMoved = true;
                        }
                        displayPosition.x += event.dx;
                        displayPosition.y += event.dy;
                    },
                    end() {
                        const pos = fieldPositionFunction(node.getBoundingClientRect());
                        node.classList.remove("dragging");
                        logic.requestGroupMove(id, pos.x, pos.y);
                    },
                },
                modifiers: [
                    interact.modifiers.snap({
                        targets: [snapFunction()],
                        relativePoints: [{ x: 0, y: 0 }],
                    }),
                    interact.modifiers.restrictRect({
                        restriction: "parent",
                        endOnly: true,
                    }),
                ],
            });

        return {
            destroy: () => interactable.unset(),
        };
    }

    const memberCardsWidth: number = 65 + 10 * (cards.size - 2);

    function onClick(event: MouseEvent) {
        if (event.button === 0 && !wasMoved) {
            openMenu(
                undefined,
                event.pageX,
                event.pageY,
                `Group (${cards.size} card${cards.size === 1 ? "" : "s"})`,
                [
                    {
                        label: "Ungroup",
                        handler: () => logic.requestGroupDestroy(id),
                    },
                ],
                true
            );
        }
        wasMoved = true;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
    class="objgroup"
    style:--zoom={$fieldZoom}
    style:left={`${displayPosition.x}px`}
    style:top={`${displayPosition.y}px`}
    on:mousedown={() => (wasMoved = false)}
    on:mouseup={onClick}
    use:action
    role="listitem"
>
    <div
        class="hoveroutline"
        style:width={`${Math.max(memberCardsWidth, 91) * $fieldZoom}px`}
        style:margin-left={`-${Math.max(0, ((91 - memberCardsWidth) / 2) * $fieldZoom)}px`}
    >
        &nbsp;
    </div>
    {#each [...cards.entries()] as [id, card] (id)}
        <FieldCardObject {id} {...card} flippedColor={"white"} grouped />
    {/each}
</div>

<style lang="postcss">
    .objgroup {
        @apply absolute z-play-card;

        &:hover .hoveroutline {
            @apply rounded-md outline outline-primary-100;
            height: calc(91px * var(--zoom));
            outline-offset: calc(2px * var(--zoom));
            outline-width: calc(4px * var(--zoom));
        }

        &:global(.dragging) {
            @apply fixed !z-play-card-dragging cursor-grabbing;
        }
    }
</style>

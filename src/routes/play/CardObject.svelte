<script context="module" lang="ts">
    import { getContext, onMount } from "svelte";
    import { CardOrientation } from "$lib/enums/cardOrientation.js";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import CardType from "$lib/enums/cardType.js";
    import type { Readable, Writable } from "svelte/store";
    import { loadCardInfo, type CardWithImageData } from "$lib/play/cardInfo.js";
    import interact from "@interactjs/interact/index";
    import "@interactjs/auto-start";
    import "@interactjs/actions/drag";
    import "@interactjs/modifiers";
    import { StackSide, type ClientGameLogic } from "$lib/play/schema.js";
    import type { OpenMenuFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let id: number;
    export let cardNo: string;
    export let cardType: CardType;
    export let position: Readable<{ x: number; y: number; z: number }>;
    const logic: ClientGameLogic = getContext("logic");
    const openMenu: OpenMenuFunction = getContext("openMenu");

    let loadPromise: Promise<CardWithImageData> = new Promise(() => null);

    onMount(() => {
        loadPromise = loadCardInfo(cardNo);
    });

    let displayPosition: { x: number; y: number };
    $: displayPosition = { x: $position.x, y: $position.y };
    function action(node: HTMLElement) {
        const interactable = interact(node)
            .styleCursor(false)
            .draggable({
                listeners: {
                    start() {
                        node.classList.add("dragging");
                    },
                    move(event) {
                        displayPosition.x += event.dx;
                        displayPosition.y += event.dy;
                    },
                    end(event) {
                        node.classList.remove("dragging");
                        if (event.relatedTarget?.classList.contains("objhand")) {
                            logic.requestFieldToHand(id);
                        } else {
                            logic.requestMove(id, displayPosition.x, displayPosition.y);
                            if (
                                event.relatedTarget?.classList.contains(
                                    cardType === CardType.MEMBER ? "objstackdeck" : "objstacksetlist"
                                )
                            ) {
                                openMenu(
                                    event.page.x,
                                    event.page.y,
                                    `${cardNo} &rarr; ${cardType === CardType.MEMBER ? "Deck" : "Set List"}`,
                                    [
                                        {
                                            label: "Put on Top",
                                            handler: () => logic.requestFieldToStack(id, StackSide.TOP),
                                        },
                                        {
                                            label: "Put on Bottom",
                                            handler: () => logic.requestFieldToStack(id, StackSide.BOTTOM),
                                            condition: !event.relatedTarget.classList.contains("empty")
                                        },
                                    ],
                                    true
                                );
                            }
                        }
                    },
                },
                modifiers: [
                    interact.modifiers.snap({
                        targets: [
                            interact.snappers.grid({
                                x: 10,
                                y: 10,
                            }),
                        ],
                        relativePoints: [{ x: 0, y: 0 }],
                        offset: "parent",
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

    let sidebarCardNo: Writable<string | undefined> = getContext("sidebarCardNo");
    function updateSidebar() {
        $sidebarCardNo = cardNo;
    }
</script>

{#key $position}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="objcardfield"
        class:objcardfieldmember={cardType === CardType.MEMBER}
        class:objcardfieldsong={cardType === CardType.SONG}
        class:objcardfieldmemory={cardType === CardType.MEMORY}
        style:left={`${displayPosition.x}px`}
        style:top={`${displayPosition.y}px`}
        style:z-index={$position.z}
        on:contextmenu|preventDefault={updateSidebar}
        use:action
    >
        {#await loadPromise}
            <div class="card" class:card-v={cardType === CardType.MEMBER} class:card-h={cardType !== CardType.MEMBER}>
                <Spinner />
            </div>
        {:then card}
            <div
                class="card"
                class:card-v={card.frontOrientation === CardOrientation.PORTRAIT}
                class:card-h={card.frontOrientation === CardOrientation.LANDSCAPE}
            >
                <img src={card.imageDataUrl} alt={cardNo} />
            </div>
        {/await}
    </div>
{/key}

<style lang="postcss">
    .objcardfield {
        @apply absolute w-min select-none touch-none z-play-card cursor-grab;

        & .card {
            @apply flex items-center justify-center bg-primary-200 overflow-hidden shadow-sm shadow-black;

            &.card-v {
                @apply rounded-card-v;
                width: 65px;
                height: 91px;
            }

            &.card-h {
                @apply rounded-card-h;
                width: 91px;
                height: 65px;
            }

            & img {
                @apply w-full;
            }
        }

        &:hover {
            @apply brightness-110;
        }

        &:global(.dragging) {
            @apply !z-play-card-dragging cursor-grabbing;
        }
    }
</style>

<script context="module" lang="ts">
    import { getContext, onMount } from "svelte";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import { loadCardInfo, type CardWithImageData } from "$lib/play/cardInfo.js";
    import type { Writable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/auto-start";
    import "@interactjs/actions/drag";
    import "@interactjs/modifiers";
    import type { ClientGameLogic } from "$lib/play/schema.js";
</script>

<script lang="ts">
    export let idx: number;
    export let cardNo: string;
    const logic: ClientGameLogic = getContext("logic");

    let loadPromise: Promise<CardWithImageData> = new Promise(() => null);
    onMount(() => {
        loadPromise = loadCardInfo(cardNo);
    });

    let displayPosition: { x: number; y: number } = { x: 0, y: 0 };
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
                        if (event.relatedTarget?.classList.contains("objfield")) {
                            const box = node.getBoundingClientRect();
                            logic.requestHandToField(idx, box.left - 1, box.top - 1);
                        } else {
                            displayPosition.x = displayPosition.y = 0;
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
                        offset: { x: 0, y: 0 },
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

<div class="handspace">
    <div
        class="objcardhand"
        style:left={`${displayPosition.x}px`}
        style:top={`${displayPosition.y}px`}
        on:contextmenu|preventDefault={updateSidebar}
        use:action
    >
        {#await loadPromise}
            <div class="card">
                <Spinner />
            </div>
        {:then card}
            <div class="card">
                <img src={card.imageDataUrl} alt={cardNo} />
            </div>
        {/await}
    </div>
</div>

<style lang="postcss">
    .handspace {
        @apply relative;
        width: 65px;

        &:last-child {
            width: 130px;
        }

        & .objcardhand {
            @apply absolute w-min cursor-grab select-none;
            width: 65px;
            height: 91px;

            & .card {
                @apply flex pt-4 items-start justify-center text-black bg-primary-200 overflow-hidden rounded-card-h shadow-md shadow-black;
                width: 130px;
                height: 182px;
                transition: margin-top 0.3s, width 0.3s, height 0.3s, shadow-blur 0.3s;
                transform-origin: 0 0;

                & img {
                    @apply -mt-4 w-full;
                }
            }

            &.dragging .card {
                @apply shadow-sm;
                width: 65px;
                height: 91px;
            }

            &:hover, &:global(.dragging) {
                @apply brightness-110;
            }

            &:not(.dragging):hover .card {
                margin-top: -50%;
            }
        }
    }
</style>

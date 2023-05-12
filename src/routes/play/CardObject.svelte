<script context="module" lang="ts">
    import { createEventDispatcher, getContext, onMount } from "svelte";
    import { draggable } from "svelte-agnostic-draggable";
    import { CardOrientation } from "$lib/enums/cardOrientation.js";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import CardType from "$lib/enums/cardType.js";
    import type { Readable, Writable } from "svelte/store";
    import {
        loadCardInfo,
        type CardWithImageData,
    } from "$lib/play/cardInfo.js";
</script>

<script lang="ts">
    export let id: number;
    export let cardNo: string;
    export let cardType: CardType;
    export let position: Readable<{ x: number; y: number; z: number }>;

    const dispatch = createEventDispatcher();
    let element: HTMLDivElement,
        loadPromise: Promise<CardWithImageData> = new Promise(() => null);
    $: if (element) element.dataset.id = id.toString();
    $: if (element) element.dataset.cardNo = cardNo;

    onMount(() => {
        loadPromise = loadCardInfo(cardNo);
    });

    function moveCard(e: Event & DraggableEvent) {
        console.log("handler");
        if (
            e.detail.droppable?.element.classList.contains("hand") ||
            outOfBounds(e.detail.helper)
        )
            return;

        dispatch("cardmove", {
            id: parseInt(e.detail.helper.dataset.id!),
            x: parseInt(e.detail.helper.style.left),
            y: parseInt(e.detail.helper.style.top),
        });
    }

    let sidebarCardNo: Writable<string | undefined> =
        getContext("sidebarCardNo");
    function updateSidebar() {
        $sidebarCardNo = cardNo;
    }

    function outOfBounds(draggable: HTMLElement) {
        const fieldPos = draggable.parentElement!.getBoundingClientRect();
        const dragPos = draggable.getBoundingClientRect();
        return (
            fieldPos.top > dragPos.top ||
            fieldPos.left > dragPos.left ||
            fieldPos.bottom < dragPos.bottom ||
            fieldPos.right < dragPos.right
        );
    }
</script>

{#key $position}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="cardcontainer"
        style:left={`${$position.x}px`}
        style:top={`${$position.y}px`}
        style:z-index={$position.z}
        bind:this={element}
        use:draggable={{
            cursor: "grabbing",
            zIndex: 2099999999,
            scope: cardType.toString(),
            scroll: false,
            revert: outOfBounds,
        }}
        on:drag:stop={moveCard}
        on:contextmenu|preventDefault={updateSidebar}
    >
        {#await loadPromise}
            <div
                class="card"
                class:card-v={cardType === CardType.MEMBER}
                class:card-h={cardType !== CardType.MEMBER}
            >
                <Spinner />
            </div>
        {:then card}
            <div
                class="card"
                class:card-v={card.frontOrientation ===
                    CardOrientation.PORTRAIT}
                class:card-h={card.frontOrientation ===
                    CardOrientation.LANDSCAPE}
            >
                <img src={card.imageDataUrl} alt={cardNo} />
            </div>
        {/await}
    </div>
{/key}

<style lang="postcss">
    .cardcontainer {
        @apply absolute w-min cursor-grab select-none z-play-card;

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
    }
</style>

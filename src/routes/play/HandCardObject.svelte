<script context="module" lang="ts">
    import { getContext, onMount } from "svelte";
    import { draggable } from "svelte-agnostic-draggable";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import {
        loadCardInfo,
        type CardWithImageData,
    } from "$lib/play/cardInfo.js";
    import type { Writable } from "svelte/store";
</script>

<script lang="ts">
    export let idx: number;
    export let cardNo: string;

    let element: HTMLDivElement,
        loadPromise: Promise<CardWithImageData> = new Promise(() => null);
    $: if (element) element.dataset.idx = idx.toString();
    $: if (element) element.dataset.cardNo = cardNo;

    onMount(() => {
        loadPromise = loadCardInfo(cardNo);
    });

    let sidebarCardNo: Writable<string | undefined> =
        getContext("sidebarCardNo");
    function updateSidebar() {
        $sidebarCardNo = cardNo;
    }
</script>

<div class="handspace">
    <div
        class="handcardcontainer"
        bind:this={element}
        use:draggable={{
            cursor: "grabbing",
            zIndex: 2100000000,
            scope: "0",
            scroll: false,
            revert: true,
        }}
        on:contextmenu|preventDefault={updateSidebar}
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

        & .handcardcontainer {
            @apply absolute w-min cursor-grab select-none;
            width: 65px;
            height: 91px;

            & .card {
                @apply flex pt-4 items-start justify-center text-black bg-primary-200 overflow-hidden rounded-card-h shadow-md shadow-black;
                width: 130px;
                height: 182px;
                transition: margin-top 0.3s, width 0.3s, height 0.3s,
                    shadow-blur 0.3s;
                transform-origin: 0 0;

                & img {
                    @apply -mt-4 w-full;
                }
            }

            &.ui-draggable-helper .card {
                @apply shadow-sm;
                width: 65px;
                height: 91px;
            }

            &:not(.ui-draggable-helper):hover .card {
                margin-top: -50%;
            }
        }
    }
</style>

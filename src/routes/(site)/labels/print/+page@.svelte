<script lang="ts">
    import {CardOrientation} from "$lib/enums/cardOrientation.js";
    import {onMount} from "svelte";
    import type {PageData} from "./$types.js";
    import Label from "./Label.svelte";
    import "../../../../app.css";
    import Shelving from "./shelf.js";

    export let data: PageData;
    let shelfCardNos: string[][], shelfElements: HTMLDivElement[] = [], sheets: HTMLDivElement,
        sizeTester: HTMLDivElement, done: boolean;

    $: {
        data.cardNos;
        const shelfHorz = new Shelving<string>(210 - 9 * 2);
        for (const cardNo of data.cardNos) {
            shelfHorz.add(cardNo, data.byCardNo[cardNo].frontOrientation === CardOrientation.PORTRAIT ? 63.5 : 88);
        }
        shelfCardNos = shelfHorz.get();
    }

    onMount(() => {
        document.getElementsByTagName("body")[0].classList.add("A4"); // TODO: probably ditch paper-css
        const shelfVert = new Shelving<HTMLDivElement>(297 - 9 * 2);
        const pxPerMeter = sizeTester.clientHeight;
        for (const shelf of shelfElements) {
            shelfVert.add(shelf, Math.ceil(shelf.clientHeight * 1000 / pxPerMeter));
        }

        for (const sheet of shelfVert.get()) {
            const sheetDiv = document.createElement("div");
            sheetDiv.classList.add("sheet");
            sheetDiv.style.padding = "9mm";
            sheets.appendChild(sheetDiv);

            for (const shelf of sheet) {
                sheetDiv.appendChild(shelf);
            }
        }
        setTimeout(() => done = true, 1);
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/vendor/paper-css/paper.min.css">
    <title>Sleeve Labels</title>
</svelte:head>

<div class="opacity-0 print:hidden">
    {#each shelfCardNos as shelf, i}
        <div class="shelf" bind:this={shelfElements[i]}>
            {#each shelf as cardNo}
                <Label {cardNo} byCardNo={data.byCardNo} byCardId={data.byCardId}/>
            {/each}
        </div>
    {/each}
</div>

{#if !done}
    <div class="absolute l-[1000vw] w-[100cm] h-[100cm]" bind:this={sizeTester}></div>
{/if}

<div class="sheets" bind:this={sheets}></div>

<style lang="postcss">
    @font-face {
        font-family: "Open Sans";
        src: url("/vendor/OpenSans-VariableFont_wdth,wght.ttf") format("truetype");
    }

    @page {
        size: A4;
    }

    :global(body) {
        @apply text-black;
    }

    :global(.skill-icon) {
        margin-top: -0.06rem;
        margin-bottom: -0.19rem;
    }

    :global(.text-highlight-red) {
        color: red;
    }

    :global(.text-highlight-blue) {
        color: blue;
    }

    :global(a) {
        color: red !important;
        text-decoration-line: none;
    }

    .shelf {
        @apply w-full flex items-end;
    }
</style>
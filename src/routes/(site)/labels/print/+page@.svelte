<script lang="ts">
    import {CardOrientation} from "$lib/enums/cardOrientation.js";
    import {onMount} from "svelte";
    import type {PageData} from "./$types.js";
    import Label from "./Label.svelte";
    import "../../../../app.css";
    import Shelving from "./shelf.js";

    export let data: PageData;
    let width: number = 210;
    let height: number = 297;
    let padding: number = 9;
    let contentWidth: number, contentHeight: number, shelfCardNos: string[][],
        shelfElements: HTMLTableCellElement[] = [], pageStyle: HTMLStyleElement;

    $: contentWidth = width - padding * 2;
    $: contentHeight = height - padding * 2;

    $: {
        data.cardNos;
        const shelfHorz = new Shelving<string>(contentWidth);
        for (const cardNo of data.cardNos) {
            shelfHorz.add(cardNo, data.byCardNo[cardNo].frontOrientation === CardOrientation.PORTRAIT ? 63.5 : 88);
        }
        shelfCardNos = shelfHorz.get();
    }

    onMount(() => {
        // reorder shelves to fill pages better
        const shelfVert = new Shelving<string[]>(contentHeight);
        for (const i in shelfCardNos) {
            // reorder labels in a shelf in height order (to reduce extra cuts needed on the left side due to holes)
            const sortedCardNos = shelfCardNos[i]
                .map((cardNo, ii) => ({cardNo, height: shelfElements[i].children[ii].clientHeight}))
                .sort((a, b) => b.height - a.height).map(({cardNo}) => cardNo);
            shelfVert.add(sortedCardNos, shelfElements[i].clientHeight);
        }
        shelfCardNos = shelfVert.get().flat();
        pageStyle.innerHTML = `@page { margin: ${padding}mm 0; size: ${width}mm ${height}mm`
        requestAnimationFrame(print);
    });
</script>

<svelte:head>
    <style bind:this={pageStyle}></style>
    <title>Sleeve Labels</title>
</svelte:head>

<table class="sheets" style:margin={"0 "+padding+"mm"}>
    {#each shelfCardNos as shelf, i}
        <tr class="shelf">
            <td bind:this={shelfElements[i]} style:width={contentWidth+"mm"}>
                {#each shelf as cardNo}
                    <Label {cardNo} byCardNo={data.byCardNo} byCardId={data.byCardId}/>
                {/each}
            </td>
        </tr>
    {/each}
</table>

<style lang="postcss">
    @font-face {
        font-family: "Open Sans";
        src: url("/vendor/OpenSans-VariableFont_wdth,wght.ttf") format("truetype");
    }

    :global(body) {
        @apply m-0 text-black bg-white;
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
        & > td {
            @apply flex;
            margin-bottom: -0.5mm;
        }

        &:nth-child(odd) > td {
            @apply items-end;
        }

        &:nth-child(even) > td {
            @apply items-start;
        }
    }
</style>
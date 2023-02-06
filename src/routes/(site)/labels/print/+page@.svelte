<script lang="ts">
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
        shelfElements: HTMLTableCellElement[] = [], pageSize: HTMLDivElement, pageStyle: HTMLStyleElement;

    $: contentWidth = width - padding * 2;
    $: contentHeight = height - padding * 2;

    onMount(() => {
        // Sort all the labels into horizontal shelves
        const shelfHorz = new Shelving<string>(pageSize.clientWidth);
        for (const i in data.cardNos) {
            shelfHorz.add(data.cardNos[i], shelfElements[i].children[0].clientWidth, shelfElements[i].children[0].clientHeight);
        }
        shelfCardNos = shelfHorz.get();

        requestAnimationFrame(() => {
            // Sort those shelves into vertical shelves
            const shelfVert = new Shelving<string[]>(pageSize.clientHeight);
            for (const i in shelfCardNos) {
                // Reorder labels within shelf in height order (to reduce extra cuts needed on the left side due to holes)
                const sortedCardNos = shelfCardNos[i]
                    .map((cardNo, ii) => ({cardNo, height: shelfElements[i].children[ii].clientHeight}))
                    .sort((a, b) => b.height - a.height).map(({cardNo}) => cardNo);
                shelfVert.add(sortedCardNos, 1, shelfElements[i].clientHeight);
            }
            shelfCardNos = shelfVert.get().flat();
            pageStyle.innerHTML = `@page { margin: ${padding}mm 0; size: ${width}mm ${height}mm`
            requestAnimationFrame(print);
        });
    });
</script>

<svelte:head>
    <style bind:this={pageStyle}></style>
    <title>Sleeve Labels</title>
</svelte:head>

{#if data.cardNos.length === 0}
    You have added no cards to print labels for (or, none of them have any Skills/Live Costumes to put on the labels).
{:else}
    <div bind:this={pageSize} class="absolute l-[1000vw]"
         style:width={contentWidth+"mm"} style:height={contentHeight+"mm"}></div>
    <table class="sheets" style:margin={"0 "+padding+"mm"}>
        {#each (shelfCardNos ?? data.cardNos.map(c => [c])) as shelf, i}
            <tr class="shelf">
                <td style:width={contentWidth+"mm"} bind:this={shelfElements[i]}>
                    {#each shelf as cardNo, i}
                        <Label {cardNo} byCardNo={data.byCardNo} byCardId={data.byCardId}/>
                    {/each}
                </td>
            </tr>
        {/each}
    </table>
{/if}

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
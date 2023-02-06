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
        if (data.cardNos.length === 0) return;

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
    <title>Labels → Print &bull; SIC</title>
</svelte:head>

{#if data.cardNos.length + data.invalidCardNos.length + data.filteredCardNos.length === 0}
    You have added no cards to print labels for. <a href="/labels" class="underline">Go back</a>
{:else}
    <div class="info">
        {#if data.invalidCardNos.length > 0}
            <div class="error">
                <b>The following card numbers are invalid and were removed:</b>
                {data.invalidCardNos.join(", ")}
            </div>
        {/if}
        {#if data.filteredCardNos.length > 0}
            <div class="error">
                <b>The following cards had no Skills or Live Costumes and were removed:</b>
                {data.filteredCardNos.join(", ")}
            </div>
        {/if}
        <div>
            {#if data.cardNos.length === 0}
                No cards were left to be labeled. Close the tab and change the card number list!
            {:else}
                {data.cardNos.length} label{data.cardNos.length === 1 ? "" : "s"} ready to print!
            {/if}
        </div>
    </div>
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
        @apply flex flex-col items-center;
    }

    .info {
        @apply m-4;

        & .error b {
            @apply text-highlight-red;
        }
    }

    @media print {
        :global(body) {
            @apply block m-0 text-black bg-white;
        }

        .info {
            @apply hidden;
        }
    }

    .sheets {
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
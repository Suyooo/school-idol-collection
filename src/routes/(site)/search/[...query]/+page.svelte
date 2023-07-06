<script lang="ts">
    import { goto } from "$app/navigation";
    import type Card from "$models/card/card.js";
    import type { ParseNodePrepared } from "$lib/format/format.js";
    import type { SearchUiOptions } from "$lib/search/ui.js";
    import { urlToUiOptions } from "$lib/search/ui.js";
    import Skill from "$lib/format/Skill.svelte";
    import Button from "$lib/style/Button.svelte";
    import GridPanel from "$lib/style/GridPanel.svelte";
    import Collapse from "$lib/style/icons/Collapse.svelte";
    import Expand from "$lib/style/icons/Expand.svelte";
    import type { PageData } from "./$types.js";
    import CardGridElement from "../../set/[set]/CardGridElement.svelte";
    import SearchOptions from "../SearchOptions.svelte";

    export let data: PageData;
    let cards: Card[],
        queryUrl: string,
        options: SearchUiOptions,
        showOptions: boolean = false,
        queryExplain: ParseNodePrepared[][],
        pagination: { page: number; totalResults: number; pageSize: number };
    $: {
        cards = data.cards;
        showOptions = false;
    }
    $: queryUrl = data.queryUrl;
    $: options = urlToUiOptions(queryUrl);
    $: queryExplain = data.queryExplain;
    $: pagination = data.pagination;
</script>

<svelte:head>
    <title>Search Results &bull; SIC</title>
</svelte:head>

<h5>
    Search Results:
    {#each queryExplain as q, i}
        {#if i > 0},{/if}
        <Skill skill={q} />
    {/each}
</h5>

<div class="content">
    <div class="flex items-center">
        <Button
            accent
            classes="w-6 h-6 !px-0 !rounded-full flex items-center justify-center"
            on:click={() => (showOptions = !showOptions)}
            label={showOptions ? "Collapse Search Options" : "Expand Search Options"}
        >
            {#if showOptions}
                <Collapse />
            {:else}
                <Expand />
            {/if}
        </Button>
        <span class="ml-4">Change Search Query</span>
    </div>
    <div class="panel mt-4" class:hidden={!showOptions}>
        <div class="panel-inner">
            {#key queryUrl}
                <SearchOptions {options} />
            {/key}
        </div>
    </div>
</div>

<div class="content mt-4">
    {#if cards.length === 0}
        There are no results for this query.
    {:else}
        <GridPanel items={cards} key="cardNo" let:item={card}>
            <CardGridElement {card} />
        </GridPanel>

        {#if pagination.totalResults > pagination.pageSize}
            <div class="mt-2 flex flex-col gap-y-2 items-center">
                <div>
                    Cards {(pagination.page - 1) * pagination.pageSize + 1}
                    - {Math.min(pagination.page * pagination.pageSize, pagination.totalResults)}
                    of {pagination.totalResults}
                </div>
                <div class="max-w-md flex flex-wrap gap-2 justify-center">
                    {#each { length: Math.ceil(pagination.totalResults / pagination.pageSize) } as _, i}
                        <Button
                            classes="w-12 px-0"
                            accent={i + 1 === pagination.page}
                            label={`Page ${i + 1}`}
                            on:click={() => goto(`/search/${queryUrl}/page:${i + 1}`)}>{i + 1}</Button
                        >
                    {/each}
                </div>
            </div>
        {/if}
    {/if}
</div>

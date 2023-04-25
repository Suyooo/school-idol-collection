<script lang="ts">
    import {goto} from "$app/navigation";
    import Skill from "$lib/format/Skill.svelte";
    import Button from "$lib/style/Button.svelte";
    import GridPanel from "$lib/style/GridPanel.svelte";
    import type {PageData} from './$types.js';
    import CardGridElement from "../../set/[set]/CardGridElement.svelte";

    export let data: PageData;
    $: cards = data.cards;
    $: queryUrl = data.queryUrl;
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
        <Skill skill={q}/>
    {/each}
</h5>
<div class="content">
    {#if cards.length === 0}
        There are no results for this query.
    {:else}
        <GridPanel items={cards} key="cardNo" let:item={card}>
            <CardGridElement {card}/>
        </GridPanel>

        {#if pagination.totalResults > pagination.pageSize}
            <div class="mt-2 flex flex-col gap-y-2 items-center">
                <div>
                    Cards {(pagination.page - 1) * pagination.pageSize + 1}
                    - {Math.min(pagination.page * pagination.pageSize, pagination.totalResults)} of {pagination.totalResults}
                </div>
                <div class="max-w-md flex flex-wrap gap-2 justify-center">
                    {#each {length: Math.ceil(pagination.totalResults / pagination.pageSize)} as _, i}
                        <Button classes="w-12 px-0" accent={i+1 === pagination.page}
                                on:click={() => goto(`/search/${queryUrl}/page:${i+1}`)}>{i + 1}</Button>
                    {/each}
                </div>
            </div>
        {/if}
    {/if}
</div>

<div class="mt-4 w-full flex justify-end">
    <Button accent on:click={() => goto(`/search`, {state: {prefillQueryUrl: queryUrl}})}>
        Back To Search
    </Button>
</div>
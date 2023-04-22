<script lang="ts">
    import Skill from "$lib/format/Skill.svelte";
    import Button from "$lib/style/Button.svelte";
    import GridPanel from "$lib/style/GridPanel.svelte";
    import type {PageData} from './$types.js';
    import type Card from "$models/card/card.js";
    import CardGridElement from "../../set/[set]/CardGridElement.svelte";

    export let data: PageData;
    let cards: Card[];
    $: cards = data.cards;
    $: queries = data.queries;
</script>

<svelte:head>
    <title>Search Results &bull; SIC</title>
</svelte:head>

<h5>
    Search Results for
    {#each queries as q, i}
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
    {/if}
</div>

<div class="my-4 mr-4 float-right">
    <Button accent href="/list">View Full Card List</Button>
</div>
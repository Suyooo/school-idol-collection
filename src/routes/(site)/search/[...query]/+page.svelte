<script lang="ts">
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

<h5>{queries.join(", ")}</h5>
<div class="content">
    <GridPanel items={cards} key="cardNo" let:item={card}>
        <CardGridElement {card}/>
    </GridPanel>
</div>

<div class="my-4 mr-4 float-right">
    <Button accent href="/list">View Full Card List</Button>
</div>
<script lang="ts">
    import Button from "$lib/style/Button.svelte";
    import GridPanel from "$lib/style/GridPanel.svelte";
    import type {PageData} from './$types.js';
    import type Card from "$models/card/card.js";
    import {page} from "$app/stores";
    import CardGridElement from "./CardGridElement.svelte";

    export let data: PageData;
    let cards: Card[];
    $: cards = data.cards;
</script>

<svelte:head>
    <title>{$page.params.set} Card List &bull; SIC</title>
</svelte:head>

<h5>{$page.params.set}</h5>
<div class="content">
    <GridPanel items={cards} key="cardNo" let:item={card}>
        <CardGridElement {card}/>
    </GridPanel>
</div>

<div class="mt-4 px-4 w-full flex justify-end">
    <Button label="View Full Card List" accent href="/list">View Full Card List</Button>
</div>
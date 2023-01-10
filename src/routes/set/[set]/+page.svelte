<script lang="ts">
    import GridPanel from "$lib/grid/GridPanel.svelte";
    import type {PageData} from './$types.js';
    import type Card from "$models/card/card.js";
    import {page} from "$app/stores";
    import CardGridElement from "./CardGridElement.svelte";
    import "$style/grid.css";

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

<a class="button button-primary my-4 float-right" href="/list">View Full Card List</a>
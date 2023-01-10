<script lang="ts">
    import {page} from "$app/stores";
    import type {PageData} from './$types.js';
    import "$style/grid.css";
    import CardGridElement from "./CardGridElement.svelte";

    export let data: PageData;
</script>

<svelte:head>
    <title>{$page.params.set} Card List &bull; SIC</title>
</svelte:head>

<h5>{$page.params.set}</h5>
<div class="content">
    <div class="panel grid-container">
        {#each data.cards as card (card.cardNo)}
            <CardGridElement {card}/>
        {/each}
    </div>
</div>

<a class="button button-primary my-4 float-right" href="/list">View Full Card List</a>
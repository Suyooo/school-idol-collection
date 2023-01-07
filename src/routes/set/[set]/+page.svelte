<script lang="ts">
    import {page} from "$app/stores";
    import type {PageData} from './$types';
    import "$style/grid.css";

    export let data: PageData;
</script>

<svelte:head>
    <title>{$page.params.set} Card List &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="panel grid-container">
        {#each data.cards as card}
            {card.cardNo}
        {/each}
    </div>
</div>
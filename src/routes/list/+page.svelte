<script lang="ts">
    import type {PageData} from './$types';
    import SetGridElement from "./SetGridElement.svelte";
    import "$style/grid.css";

    export let data: PageData;
</script>

<svelte:head>
    <title>Card List &bull; SIC</title>
</svelte:head>

{#each data.categories as cat}
    <h5>{cat.eng}</h5>
    <div class="content">
        <div class="panel grid-container">
            {#each cat.sets as set}
                <SetGridElement {set} />
            {/each}
        </div>
    </div>
{/each}
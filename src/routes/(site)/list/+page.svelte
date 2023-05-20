<script lang="ts">
    import type SetCategory from "$models/set/category.js";
    import GridPanel from "$lib/style/GridPanel.svelte";
    import type { PageData } from "./$types.js";
    import SetGridElement from "./SetGridElement.svelte";

    export let data: PageData;
    let categories: SetCategory[];
    $: categories = data.categories;
</script>

<svelte:head>
    <title>Card List &bull; SIC</title>
</svelte:head>

{#each categories as cat (cat.id)}
    <h5>{cat.eng}</h5>
    <div class="content">
        <GridPanel items={cat.sets} key="id" let:item={set}>
            <SetGridElement {set} />
        </GridPanel>
    </div>
{/each}

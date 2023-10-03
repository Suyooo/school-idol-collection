<script lang="ts">
    import { page } from "$app/stores";
    import Button from "$l/style/Button.svelte";
    import GridPanel from "$l/style/GridPanel.svelte";
    import type { PageData } from "./$types.js";
    import CardGridElement from "./CardGridElement.svelte";

    export let data: PageData;
</script>

<svelte:head>
    <title>{$page.params.set} Card List &bull; SIC</title>
</svelte:head>

<div class="content">
    <h3>{data.set.eng}</h3>
    <GridPanel items={data.cards} key="cardNo" let:item={card}>
        <CardGridElement {card} />
    </GridPanel>
</div>

<div class="mt-4 px-4 w-full flex justify-end">
    <Button label="View Full Card List" accent href="/list">View Full Card List</Button>
</div>

<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/style/Button.svelte";
	import CardListGrid from "$lib/style/CardListGrid.svelte";
	import PageHeader from "$lib/style/PageHeader.svelte";
	import type { PageData } from "./$types.js";
	import CardGridElement from "./CardGridElement.svelte";

	export let data: PageData;
</script>

<svelte:head>
	<title>{$page.params.set} Card List &bull; SIC</title>
</svelte:head>

<PageHeader breadcrumbs={[["/list", "Card List"]]}>
	{$page.params.set} ({data.set.eng.replace(` (${$page.params.set})`, "")})
</PageHeader>
<div class="panel">
	<div class="panel-inner">
		<CardListGrid items={data.cards} key="cardNo" let:item={card}>
			<CardGridElement {card} />
		</CardListGrid>
	</div>
</div>

<div class="mt-4 flex w-full justify-end px-4">
	<Button label="View Full Card List" accent href="/list">View Full Card List</Button>
</div>

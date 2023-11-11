<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/style/Button.svelte";
	import CardListGrid from "$lib/style/CardListGrid.svelte";
	import Go from "$lib/style/icons/Go.svelte";
	import type { PageData } from "./$types.js";
	import CardGridElement from "./CardGridElement.svelte";

	export let data: PageData;
</script>

<svelte:head>
	<title>{$page.params.set} Card List &bull; SIC</title>
</svelte:head>

<h1>
	<div>
		<a class="button" href="/list">Card List</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
	</div>
	{$page.params.set} ({data.set.eng.replace(` (${$page.params.set})`, "")})
</h1>
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

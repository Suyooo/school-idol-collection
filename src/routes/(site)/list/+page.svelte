<script lang="ts">
	import type SetCategory from "$models/set/category.js";
	import CardListGrid from "$lib/style/CardListGrid.svelte";
	import type { PageData } from "./$types.js";
	import SetGridElement from "./SetGridElement.svelte";

	export let data: PageData;
	let categories: SetCategory[];
	$: categories = data.categories;
</script>

<svelte:head>
	<title>Card List &bull; SIC</title>
</svelte:head>

<h1>Card List</h1>
{#each categories as cat (cat.id)}
	<div class="panel">
		<div class="panel-inner">
			<h2>{cat.eng}</h2>
			<CardListGrid items={cat.sets} key="id" let:item={set}>
				<SetGridElement {set} />
			</CardListGrid>
		</div>
	</div>
{/each}

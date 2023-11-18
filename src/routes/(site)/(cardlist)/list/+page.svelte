<script lang="ts">
	import type SetCategory from "$models/set/category.js";
	import CardListGrid from "$lib/style/Grid.svelte";
	import type { PageData } from "./$types.js";
	import SetGridElement from "$lib/style/SetGridElement.svelte";
	import PageHeader from "$lib/style/PageHeader.svelte";

	export let data: PageData;
	let categories: SetCategory[];
	$: categories = data.categories;
</script>

<svelte:head>
	<title>Card List &bull; SIC</title>
</svelte:head>

<PageHeader>Card List</PageHeader>
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

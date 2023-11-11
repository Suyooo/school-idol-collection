<script lang="ts">
	type T = $$Generic;
	export let items: T[];
	export let key: keyof T | null = null;
</script>

<div class="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 p-0">
	{#each items as item, i (key ? item[key] : i)}
		<slot {item} />
	{/each}
</div>

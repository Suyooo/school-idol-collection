<script lang="ts">
	import { uiOptionIsSet } from "$lib/search/ui.js";

	export let value: string | undefined;
	export let valueMod: string | undefined;
	export let max: number | undefined = undefined;

	$: {
		if (value !== undefined && !uiOptionIsSet(value)) value = undefined;
	}
	$: {
		if (valueMod !== "" && !uiOptionIsSet(valueMod)) valueMod = "";
	}
</script>

<b class="whitespace-nowrap"><slot /></b>
<div class="flex gap-1">
	<input type="number" min="0" {max} bind:value placeholder="—" />
	<select class="flex-grow" bind:value={valueMod} disabled={value === undefined}>
		<option value="" selected>exactly</option>
		<option value="-" selected>or less</option>
		<option value="+" selected>or more</option>
	</select>
</div>

<style lang="postcss">
	input[type="number"] {
		@apply w-20;
	}
</style>

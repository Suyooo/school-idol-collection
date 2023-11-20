<script lang="ts">
	import { normalizeInput } from "$lib/search/querymap.js";
	import { SearchNumberCond } from "$lib/search/types.js";

	export let max: number | undefined = undefined;
	export let value: [number, SearchNumberCond] | undefined;
	let input: string = value?.[0].toString() ?? "";
	let valueNumber: number;
	let valueCond: SearchNumberCond = value?.[1] ?? SearchNumberCond.EQUAL;
	$: valueNumber = normalizeInput(input) !== undefined ? parseInt(input) : NaN;
	$: {
		if (isNaN(valueNumber)) {
			value = undefined;
		} else {
			value = [valueNumber, valueCond];
		}
	}
</script>

<b class="whitespace-nowrap"><slot /></b>
<div class="flex gap-1">
	<input type="number" min="0" {max} bind:value={input} placeholder="—" />
	<select class="flex-grow" bind:value={valueCond} disabled={isNaN(valueNumber)}>
		<option value={SearchNumberCond.EQUAL} selected>exactly</option>
		<option value={SearchNumberCond.LESS_OR_EQUAL}>or less</option>
		<option value={SearchNumberCond.GREATER_OR_EQUAL}>or more</option>
	</select>
</div>

<style lang="postcss">
	input[type="number"] {
		@apply w-20;
	}
</style>

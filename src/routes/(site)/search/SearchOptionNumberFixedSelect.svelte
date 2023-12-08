<script lang="ts">
	import type { KeysNumberFixed } from "$lib/search/types.js";

	export let key: KeysNumberFixed;
	export let options: { [k: number]: string };
	export let value: number | undefined;
	let input: string = value?.toString() ?? "";

	$: {
		value = input === "" ? undefined : parseInt(input);
	}
</script>

<b class="whitespace-nowrap"><slot /></b>
<select bind:value={input} class:text-input-placeholder={input === ""} name={key}>
	<option value="" selected={value === undefined}>—</option>
	{#each Object.entries(options) as [option, label]}
		<option value={option} selected={value?.toString() === option}>{label}</option>
	{/each}
</select>

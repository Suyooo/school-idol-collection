<script lang="ts">
	import type { KeysTextOptions, KeysTextOptionsParams } from "$lib/search/types.js";

	type T = $$Generic<KeysTextOptions>;
	export let key: T;
	key;
	export let options: { [k in KeysTextOptionsParams<T>]: string };

	export let value: string | undefined;
	let input: KeysTextOptionsParams<T> | "" = (value as KeysTextOptionsParams<T>) ?? "";

	$: {
		value = input === "" ? undefined : input;
	}
</script>

<b class="whitespace-nowrap"><slot /></b>
<select bind:value={input} class:text-input-placeholder={input === ""}>
	<option value="" selected>—</option>
	{#each Object.entries(options) as [option, label]}
		<option value={option}>{label}</option>
	{/each}
</select>

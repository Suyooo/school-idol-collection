<script lang="ts">
	import { browser } from "$app/environment";
	import type { KeysTextOptions, KeysTextOptionsParams } from "$lib/search/types.js";

	type T = $$Generic<KeysTextOptions>;
	export let key: T;
	export let options: { [k in KeysTextOptionsParams<T>]: string };
	export let value: string | undefined;
	let extraClasses: string | undefined = undefined;
	export { extraClasses as class };

	let input: KeysTextOptionsParams<T> | "" = (value as KeysTextOptionsParams<T>) ?? "";
	$: {
		value = input === "" ? undefined : input;
	}
</script>

<b class="whitespace-nowrap"><slot /></b>
<select bind:value={input} class:text-input-placeholder={browser && input === ""} name={key} class={extraClasses}>
	<option value="" selected={value === "" || value === undefined}>—</option>
	{#each Object.entries(options) as [option, label]}
		<option value={option} selected={value === option}>{label}</option>
	{/each}
</select>

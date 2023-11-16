<script lang="ts">
	import Go from "$lib/style/icons/Go.svelte";
	export let href: string;
	export let target: string | undefined = undefined;
	let extraClasses = "";
	export { extraClasses as class };
</script>

<a {href} {target} class="button {extraClasses}">
	<div><slot name="icon" /></div>
	{#if $$slots.primary}
		<div>
			<div class="-mt-1"><slot name="primary" /></div>
			<div class="leading -mb-2 -mt-1 text-xs"><slot name="secondary" /></div>
		</div>
	{:else}
		<div><slot /></div>
	{/if}
	<div><Go /></div>
</a>

<style lang="postcss">
	.button {
		@apply flex h-16 items-center gap-4 rounded bg-link px-6 py-4 text-left text-xl font-bold !text-text-contrast first:mt-0 hover:bg-link-hover focus:bg-link-hover active:bg-button-accent-background;

		& * {
			@apply flex-grow leading-5;

			&:first-child,
			&:last-child {
				@apply flex-shrink-0 flex-grow-0;
			}
		}
	}
</style>

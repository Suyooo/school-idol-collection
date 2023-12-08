<script lang="ts">
	import Go from "$lib/style/icons/Go.svelte";

	export let href: string;
	export let title: string;
	export let extraInfoLeft: string | null = null;
	export let extraInfoRight: string | null = null;
	export let squareCorners: boolean = false;
</script>

<a {href} class="grid-item" class:rounded={!squareCorners}>
	<div class="imgcont">
		<slot />
	</div>
	<div class="namecont">
		<span><Go /></span><span>{@html title}</span>
	</div>
	{#if extraInfoLeft !== null}
		<div class="linecont">
			<span>{extraInfoLeft}</span><span>{extraInfoRight}</span>
		</div>
	{/if}
</a>

<style lang="postcss">
	.grid-item {
		@apply flex flex-col bg-background-accent p-1 text-left no-underline;

		& > * {
			@apply flex-shrink-0 flex-grow-0 basis-0;
		}

		& > .imgcont {
			@apply mb-1 flex w-full basis-36 items-center justify-center gap-2 overflow-hidden rounded-sm px-2;

			& > :global(img) {
				@apply max-h-[8rem] max-w-[8rem] basis-0 object-contain;
			}
		}

		& > .namecont {
			@apply my-1 flex-grow leading-[1.1rem];
		}

		& > .namecont,
		& > .linecont {
			@apply flex pr-2 font-bold no-underline;
		}

		& > .namecont > span,
		& > .linecont > span {
			@apply flex-shrink-0 flex-grow-0 basis-0 pl-2;
		}

		& > .namecont > span:last-child {
			@apply underline;
		}

		& > .namecont > span:first-child {
			@apply text-text-cardid no-underline;
		}

		& > .linecont > span {
			@apply text-center text-xs uppercase tracking-widest text-text no-underline;
		}

		& > .namecont > span:last-child,
		& > .linecont > span {
			@apply flex-grow;
		}
	}
</style>

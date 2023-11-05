<script lang="ts">
	import type Set from "$models/set/set.js";

	export let set: Set;
</script>

<a href="/set/{set.id}" class="grid-item">
	<div class="imgcont">
		<img src="/images/cards/{set.id}/set.jpg" alt={set.id} />
	</div>
	<div class="namecont">
		<span>⏵</span><span>{set.eng}</span>
	</div>
</a>

<style lang="postcss">
	.grid-item {
		@apply flex flex-col rounded-2xl bg-background-grid p-1 no-underline;

		& > * {
			@apply flex-shrink-0 flex-grow-0 basis-0;
		}

		& > .imgcont {
			@apply mb-1 flex w-full basis-36 content-center items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-2;

			& > :global(img) {
				@apply max-h-32 max-w-full basis-0 object-contain;
			}
		}

		& > .namecont {
			@apply my-1 flex-grow leading-[1.1rem];
		}

		& > .namecont {
			@apply flex pr-2 font-bold no-underline;
		}

		& > .namecont > span {
			@apply flex-shrink-0 flex-grow-0 basis-0 pl-2;
		}

		& > .namecont > span:last-child {
			@apply underline;
		}

		& > .namecont > span:first-child {
			@apply text-text-subtle no-underline;
		}

		& > .namecont > span:last-child {
			@apply flex-grow;
		}
	}
</style>

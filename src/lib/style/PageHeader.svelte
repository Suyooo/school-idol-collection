<script lang="ts">
	import Go from "$lib/style/icons/Go.svelte";

	export let breadcrumbs: [string, string][] | undefined = undefined;
</script>

<nav aria-label="Breadcrumbs" class="header1">
	<ol>
		{#if breadcrumbs}
			{#each breadcrumbs as [href, label]}
				<li>
					<a {href}>{label}</a>
					<span aria-label="subpage:"><Go /></span>
				</li>
			{/each}
		{/if}
		<li class="h-0 basis-full lg:basis-0"></li>
		<li><slot /></li>
	</ol>
</nav>
<h1 class="sr-only"><slot /></h1>

<style lang="postcss">
	.header1 > ol {
		@apply flex flex-row flex-wrap items-center;

		& > li:not(:last-child) {
			@apply flex items-center text-text-header-breadcrumb;

			& > a {
				@apply hover:text-text-header text-base tracking-wide text-text-header-breadcrumb no-underline hover:underline;
			}

			& > span {
				@apply mt-0.5 text-text-header-breadcrumb;
			}
		}
	}
</style>

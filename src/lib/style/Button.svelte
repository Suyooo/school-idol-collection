<script lang="ts">
	export let accent: boolean = false;
	export let header: boolean = false;
	export let disabled: boolean = false;
	export let small: boolean = false;
	export let href: string | undefined = undefined;
	export let style: string = "";
	let classes: string = "";
	export { classes as class };
	export let target: string | undefined = undefined;
	export let label: string;
</script>

{#if disabled}
	<button disabled class:small class:accent class={`disabled ${classes}`} {style} title={label} aria-label={label}>
		<slot />
	</button>
{:else if href}
	<a
		{href}
		class:small
		class:accent
		class:header
		class={`button ${classes}`}
		class:pointer-events-none={disabled}
		{style}
		title={label}
		aria-label={label}
		{target}
		on:click
	>
		<slot />
	</a>
{:else}
	<button class:small class:accent class:header class={classes} {style} title={label} aria-label={label} on:click>
		<slot />
	</button>
{/if}

<style lang="postcss">
	a,
	button {
		@apply flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded bg-button-background px-4 py-2 text-sm font-bold uppercase tracking-wide text-button-text no-underline;

		&.small {
			@apply px-2 py-0.5 text-xs;
		}

		&:hover,
		&:focus {
			@apply bg-button-hover-background text-button-hover-text;
		}

		&:active {
			@apply bg-button-pressed;
		}

		&.disabled {
			@apply bg-button-disabled-background text-button-disabled-text;
		}

		&.accent {
			@apply bg-button-accent-background text-button-accent-text;

			&:hover,
			&:focus {
				@apply bg-button-accent-hover-background text-button-accent-hover-text;
			}

			&:active {
				@apply bg-button-accent-pressed;
			}

			&.disabled {
				@apply bg-button-accent-disabled-background text-button-accent-disabled-text;
			}
		}

		&.header {
			@apply bg-button-header-background text-button-header-text;

			&:hover,
			&:focus {
				@apply bg-button-header-hover-background text-button-hover-text;
			}

			&:active {
				@apply bg-button-pressed;
			}
		}
	}
</style>

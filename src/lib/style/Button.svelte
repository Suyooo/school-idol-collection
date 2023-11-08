<script lang="ts">
	export let accent: boolean = false;
	export let onpanel: boolean = false;
	export let disabled: boolean = false;
	export let href: string | undefined = undefined;
	export let style: string = "";
	let classes: string = "";
	export { classes as class };
	export let target: string | undefined = undefined;
	export let label: string;
</script>

{#if disabled}
	<button disabled class:accent class={`disabled ${classes}`} {style} title={label} aria-label={label}>
		<slot />
	</button>
{:else if href}
	<a {href} class:accent class:onpanel class={`button ${classes}`} {style} title={label} aria-label={label} {target}>
		<slot />
	</a>
{:else}
	<button class:accent class:onpanel class={classes} {style} title={label} aria-label={label} on:click>
		<slot />
	</button>
{/if}

<style lang="postcss">
	a,
	button {
		@apply flex cursor-pointer select-none items-center justify-center rounded-full bg-button-background px-4 py-2 text-sm font-bold uppercase tracking-wide text-button-text no-underline;

		&:hover {
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

			&:hover {
				@apply bg-button-accent-hover-background text-button-accent-hover-text;
			}

			&:active {
				@apply bg-button-accent-pressed;
			}

			&.disabled {
				@apply bg-button-accent-disabled-background text-button-accent-disabled-text;
			}
		}

		&.onpanel {
			@apply bg-button-onpanel-background text-button-onpanel-text;

			&:hover {
				@apply bg-button-onpanel-hover-background text-button-hover-text;
			}

			&:active {
				@apply bg-button-pressed;
			}

			&.disabled {
				@apply bg-button-disabled-background text-button-disabled-text;
			}
		}
	}
</style>

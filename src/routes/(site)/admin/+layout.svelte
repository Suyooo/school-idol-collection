{#if import.meta.env.DEV}
	<slot />
{:else}
	Admin pages are only available when running in dev mode!
{/if}

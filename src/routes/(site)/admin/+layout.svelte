{#if import.meta.env.DEV}
    <slot />
{:else}
    Admin is only available when running in dev mode
{/if}

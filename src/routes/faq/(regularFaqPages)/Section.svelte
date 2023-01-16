<script lang="ts">
    import {cardLink} from "$lib/card/strings.js";
    import type Card from "$models/card/card.js";

    export let subjects: (Card | { from: Card, to: Card })[];
</script>

{#each subjects as subject}
    <h5>
        {#if subject.hasOwnProperty("from")}
            {@html cardLink(subject.from)} to {@html cardLink(subject.to)}
        {:else}
            {@html cardLink(subject)}
        {/if}
    </h5>
{/each}
<slot></slot>

<style lang="postcss">
    h5 + h5 {
        @apply -mt-3;
    }
</style>
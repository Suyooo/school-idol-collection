<script lang="ts">
    import {cardLink} from "$lib/card/strings.js";
    import type Card from "$models/card/card.js";

    export let subjects: (Card | { from: Card, to: Card })[];

    function isMultipleSubjects(s: Card | { from: Card, to: Card }): s is { from: Card, to: Card } {
        return s.hasOwnProperty("from");
    }
</script>

{#each subjects as subject}
    <h5>
        {#if isMultipleSubjects(subject)}
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
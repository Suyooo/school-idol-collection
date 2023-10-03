<script lang="ts">
    import type Card from "$m/card/card.js";
    import { cardLink } from "$l/card/strings.js";

    export let subjects: (Card | { from: Card; to: Card })[];

    function isMultipleSubjects(s: Card | { from: Card; to: Card }): s is { from: Card; to: Card } {
        return "from" in s;
    }
</script>

{#each subjects as subject}
    {#if isMultipleSubjects(subject)}
        <h5 id={subject.from.cardNo}>
            {@html cardLink(subject.from)} to {@html cardLink(subject.to)}
        </h5>
    {:else}
        <h5 id={subject.cardNo}>
            {@html cardLink(subject)}
        </h5>
    {/if}
{/each}
<slot />

<style lang="postcss">
    h5 + h5 {
        @apply -mt-3;
    }
</style>

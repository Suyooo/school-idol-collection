<script lang="ts">
    import {cardLink} from "$lib/card/strings.js";
    import type Card from "$models/card/card.js";

    export let card: Card;
    export let rangeEndCard: Card | undefined = undefined;
</script>

<h5>
    {@html cardLink(card)}
    {#if rangeEndCard !== undefined}
        to {@html cardLink(rangeEndCard)}
    {/if}
</h5>
<slot></slot>
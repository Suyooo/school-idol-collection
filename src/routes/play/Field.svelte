<script lang="ts">
    import CardType from "$lib/enums/cardType.js";
    import type { CardSchema } from "$lib/play/schema.js";
    import CardObject from "./CardObject.svelte";
    import Deck from "./Deck.svelte";

    export let cards: Map<number, CardSchema>;
    export let memberDeck: string[];
    export let songDeck: string[];
</script>

<div class="field">
    {#each [...cards.entries()] as [id, card] (id)}
        <CardObject {id} {...card} />
    {/each}
    <Deck cardNos={memberDeck} cardType={CardType.MEMBER} x={450} y={50} />
    <Deck cardNos={songDeck} cardType={CardType.SONG} x={350} y={50} />
</div>

<style lang="postcss">
    .field {
        @apply absolute left-0 top-0 box-content border border-solid border-accent-500 -z-50;
        width: 720px;
        height: 360px;
    }
</style>

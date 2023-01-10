<script lang="ts">
    import {cardRarity} from "$lib/card/strings";
    import CardImage from "$lib/format/CardImage.svelte";
    import type Card from "$models/card/card.js";
    import {cardRarityShort, cardType} from "$lib/card/strings.js";
    import {cardIsMember, cardIsMemory} from "$lib/card/types.js";

    export let card: Card;
    let cardSet: string;
    $: cardSet = card.cardNo.split("-")[0];
</script>

<a href="/card/{card.cardNo}" class="grid-item">
    <div class="imgcont">
        <CardImage cardNo={card.cardNo} {cardSet} front/>
        <CardImage cardNo={card.cardNo} {cardSet}/>
    </div>
    <div class="namecont">
        <span>⏵</span>
        <span>
            {#if cardIsMember(card)}
                <span class="rarity">{cardRarityShort(card)}</span>
            {/if}
            {card.nameEng || card.nameJpn}
        </span>
    </div>
    <div class="linecont">
        <span>{card.cardNo}</span><span>{cardType(card)}</span>
    </div>
</a>
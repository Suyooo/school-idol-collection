<script lang="ts">
    import type CardType from "$lib/enums/cardType.js";
    import Piece from "$lib/format/Piece.svelte";
    import AttributeEnum from "$lib/enums/attribute.js";
    import Language from "$lib/enums/language.js";
    import {uppercaseFirst} from "$lib/utils/string.js";

    export let pieces: { piecesAll?: number, piecesSmile?: number, piecesPure?: number, piecesCool?: number };
    export let showZero: boolean = false;
    export let isSongReq: boolean = false;

    export let lang: Language = Language.ENG;
    export let cardType: CardType | undefined = undefined; cardType;

    const attrs = AttributeEnum.allForPieces;
    let display: [number | null, number | null, number | null, number | null];
    $: {
        display = <[number | null, number | null, number | null, number | null]>attrs.map(attr => {
            const piecesKey = <keyof typeof pieces>("pieces" + uppercaseFirst(attr.toCssClassName()));
            const pieceCount: number | undefined = pieces[piecesKey];
            return (pieceCount === undefined || (pieceCount === 0 && !showZero)) ? null : pieces[piecesKey];
        });
    }
</script>

<!-- I wish there was an easier way to avoid whitespace -->
{#each attrs as attr, i}{#if display[i] !== null}<span
            class="pieceno {attr.toCssClassName()}" class:reduced-gap={isSongReq}><Piece
            {lang} {attr} noText={isSongReq}/>{#if !isSongReq}<span
            class="text-none">{lang.times}&nbsp;</span>{/if}<span>{display[i]}</span>{#if !isSongReq}<span
            class="text-none">&nbsp;</span>{/if}</span>{/if}{/each}

<style lang="postcss">
    span.pieceno {
        @apply font-bold whitespace-nowrap;

        & + span.pieceno {
            @apply ml-4;
        }

        &.reduced-gap + span.pieceno {
            @apply ml-2;
        }

        & span {
            @apply ml-1;
        }

        &.all span {
            @apply text-attribute-all;
        }

        &.smile span {
            @apply text-attribute-smile;
        }

        &.pure span {
            @apply text-attribute-pure;
        }

        &.cool span {
            @apply text-attribute-cool;
        }
    }
</style>
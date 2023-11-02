<script lang="ts">
    import AttributeEnum from "$lib/enums/attribute.js";
    import type CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";
    import { uppercaseFirst } from "$lib/utils/string.js";
    import Piece from "$lib/format/Piece.svelte";

    export let pieces: { piecesAll?: number; piecesSmile?: number; piecesPure?: number; piecesCool?: number };
    export let showZero: boolean = false;
    export let isSongReq: boolean = false;

    export let lang: Language = Language.ENG;
    export let cardType: CardType | undefined = undefined;
    cardType;

    const attrs = AttributeEnum.allForPieces;
    let display: [number | null, number | null, number | null, number | null];
    let totalPieces = 0;
    $: {
        totalPieces = 0;
        display = <[number | null, number | null, number | null, number | null]>attrs.map((attr) => {
            const piecesKey = attr.toPiecePropertyName();
            const pieceCount: number | undefined = pieces[piecesKey];
            totalPieces += pieceCount ?? 0;
            return pieceCount === undefined || (pieceCount === 0 && !showZero) ? null : pieces[piecesKey];
        });
    }
</script>

{#if totalPieces > 0 || showZero}
    <!-- I wish there was an easier way to avoid whitespace -->
    {#each attrs as attr, i}{#if display[i] !== null}<span
                class="pieceno {attr.toCssClassName()}"
                class:reduced-gap={isSongReq}
                ><Piece {lang} {attr} noText={isSongReq} />{#if !isSongReq}<span class="text-none"
                        >{lang.times}&nbsp;</span
                    >{/if}<span>{display[i]}</span>{#if !isSongReq}<span class="text-none">&nbsp;</span>{/if}</span
            >{/if}{/each}
{:else}
    —
{/if}

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

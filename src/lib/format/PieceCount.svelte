<script lang="ts">
    import Piece from "$lib/format/Piece.svelte";
    import Attribute from "$lib/types/attribute.js";
    import Language from "$lib/types/language.js";
    import {uppercaseFirst} from "$lib/utils/string.js";

    export let lang: Language = Language.ENG;
    export let pieces: { piecesAll?: number, piecesSmile?: number, piecesPure?: number, piecesCool?: number };
    export let showZero: boolean = false;
    export let reducedGap: boolean = false;

    const attrs = Attribute.all.filter(a => a.pieceAttributeNameEng !== undefined);
    let display: [number | null, number | null, number | null, number | null];
    $: {
        display = <[number | null, number | null, number | null, number | null]>attrs.map(attr => {
            const piecesKey = <keyof typeof pieces>("pieces" + uppercaseFirst(attr.cssClassName));
            const pieceCount: number | undefined = pieces[piecesKey];
            return (pieceCount === undefined || (pieceCount === 0 && !showZero)) ? null : pieces[piecesKey];
        });
    }
</script>

{#each attrs as attr, i}
    {#if display[i] !== null}
        <span class="pieceno {attr.cssClassName}" class:reduced-gap={reducedGap}>
            <Piece {lang} {attr}/>
            <span class="text-none">{lang.times}</span>
            <span>{display[i]}</span>
        </span>
    {/if}
{/each}

<style lang="postcss">
    span.pieceno {
        @apply font-bold whitespace-nowrap;

        &:not(:last-child) {
            @apply mr-4;
        }

        &.reduced-gap:not(:last-child) {
            @apply mr-1;
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
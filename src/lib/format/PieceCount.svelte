<script lang="ts">
    import Piece from "$lib/format/Piece.svelte";
    import Attribute from "$types/attribute.js";
    import Language from "$types/language.js";

    export let lang: Language = Language.ENG;
    export let pieces: { piecesAll?: number, piecesSmile?: number, piecesPure?: number, piecesCool?: number };
    export let showZero: boolean = false;

    const attrKeys = ["All", "Smile", "Pure", "Cool"];
    let display: [number | null, number | null, number | null, number | null], lastSetIdx: number = -1;
    $: {
        lastSetIdx = -1;
        display = <[number | null, number | null, number | null, number | null]>attrKeys.map((attrKey, i) => {
            const piecesKey = <keyof typeof pieces>("pieces" + attrKey);
            const pieceCount: number | undefined = pieces[piecesKey];
            const hide = (pieceCount === undefined || (pieceCount === 0 && !showZero));
            if (!hide) {
                lastSetIdx = i;
            }
            return hide ? null : pieces[piecesKey];
        });
    }
</script>

{#each attrKeys as attrKey, i}
    {#if display[i] !== null}
        {@const attr = Attribute.get(attrKey.toUpperCase())}
        <span class="pieceno {attr.cssClassName}">
            <Piece {lang} {attr}/>
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

    .attrreq span.pieceno:not(:last-child) {
        @apply mr-1;
    }
</style>
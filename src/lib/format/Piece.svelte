<script lang="ts">
    import Attribute from "$types/attribute.js";
    import Language from "$types/language.js";

    export let lang: Language = Language.ENG;
    export let attr: Attribute;
</script>

<span class="piece {attr.cssClassName}" title={attr[lang.pieceNameProperty]}>
    {lang.leftSquareBracket}{attr[lang.pieceNameProperty]}{lang.rightSquareBracket}{lang.times}
</span>

<style lang="postcss">
    span.piece {
        @apply w-4 h-4 mt-0.5 bg-cover inline-block indent-out overflow-hidden align-top;

        &.all {
            background-image: url("/images/card/piece_all.png");
        }

        &.smile {
            background-image: url("/images/card/piece_smile.png");
        }

        &.pure {
            background-image: url("/images/card/piece_pure.png");
        }

        &.cool {
            background-image: url("/images/card/piece_cool.png");
        }
    }
</style>
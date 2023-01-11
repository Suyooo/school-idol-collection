<script lang="ts">
    import type Attribute from "$lib/types/attribute.js";
    import Language from "$lib/types/language.js";

    export let lang: Language = Language.ENG;
    export let attr: Attribute;
</script>

<span class="{attr.cssClassName}"
      title={lang.leftSquareBracket + attr[lang.pieceNameProperty] + lang.rightSquareBracket}>
    {lang.leftSquareBracket}{attr[lang.pieceNameProperty]}{lang.rightSquareBracket}
</span>

<style lang="postcss">
    span {
        @apply w-4 h-4 mt-0.5 bg-contain bg-no-repeat inline-block overflow-hidden align-top text-center text-none;

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
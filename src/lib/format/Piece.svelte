<script lang="ts">
    import AttributeEnum from "$lib/enums/attribute.js";
    import Language from "$lib/types/language.js";

    export let lang: Language = Language.ENG;
    export let attr: AttributeEnum;
    export let attrName: string | undefined = undefined;
    export let noText: boolean = false;

    $: {
        if (attrName !== undefined) attr = AttributeEnum.fromPieceAttributeName(attrName);
    }
</script>

<span class="{attr.toCssClassName()}"
      title={lang.leftSquareBracket + attr.toPieceAttributeName(lang) + lang.rightSquareBracket}>
    {#if !noText}{lang.leftSquareBracket}{attr.toPieceAttributeName(lang)}{lang.rightSquareBracket}{/if}
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
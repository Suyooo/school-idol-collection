<script lang="ts">
    import AttributeEnum from "$lib/enums/attribute.js";
    import type {AttributeID} from "$lib/enums/attribute.js";
    import type CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";

    export let attr: AttributeEnum;
    export let attrId: AttributeID | undefined = undefined;
    export let noText: boolean = false;

    export let lang: Language = Language.ENG;
    export let cardType: CardType | undefined = undefined; cardType;

    $: {
        if (attrId !== undefined) attr = AttributeEnum.fromId(attrId);
    }
</script>

<span class="skill-icon {attr.toCssClassName()}"
      title={lang.leftSquareBracket + attr.toPieceAttributeName(lang) + lang.rightSquareBracket}>
    {#if !noText}{lang.leftSquareBracket}{attr.toPieceAttributeName(lang)}{lang.rightSquareBracket}{/if}
</span>

<style lang="postcss">
    .skill-icon {
        @apply w-[1em] h-[1em] mt-[.166em];

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
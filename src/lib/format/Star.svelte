<script lang="ts">
    import type CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";

    export let repl: string;
    export let lang: Language = Language.ENG; lang;
    export let cardType: CardType | undefined = undefined; cardType;
</script>

<span class="skill-icon" title={repl}>{repl}</span>

<style lang="postcss">
    .skill-icon {
        @apply w-[1.25em];
        background-image: url("/images/icons/star.png");
    }
</style>
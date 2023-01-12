<script lang="ts">
    import type AnnotationType from "$lib/types/annotationType.js";
    import Language from "$lib/types/language.js";
    import type Card from "$models/card/card.js";

    export let type: AnnotationType;
    export let parameter: string;
    export let cards: Card[];
    export let lang: Language = Language.ENG;
</script>

<a href="{type.getLinkTarget(parameter, cards)}">{@html type.getLinkLabel(parameter, cards, lang)}</a>
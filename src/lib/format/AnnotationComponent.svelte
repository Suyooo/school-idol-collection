<script lang="ts">
    import type CardType from "$lib/enums/cardType.js";
    import AnnotationType from "$lib/types/annotationType.js";
    import type {AnnotationTypeID} from "$lib/types/annotationType.js";
    import Language from "$lib/enums/language.js";
    import type Card from "$models/card/card.js";

    export let typeId: AnnotationTypeID;
    let type: AnnotationType
    $: type = AnnotationType.get(typeId);
    export let parameter: string;
    export let cards: Card[];

    export let lang: Language = Language.ENG;
    export let cardType: CardType | undefined = undefined; cardType;
</script>

<a href="{type.getLinkTarget(parameter, cards)}">{@html type.getLinkLabel(parameter, cards, lang)}</a>
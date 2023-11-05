<script lang="ts">
	import type Card from "$models/card/card.js";
	import AnnotationEnum from "$lib/enums/annotation.js";
	import type { AnnotationID } from "$lib/enums/annotation.js";
	import type CardType from "$lib/enums/cardType.js";
	import Language from "$lib/enums/language.js";

	export let type: AnnotationEnum;
	export let typeId: AnnotationID | undefined = undefined;
	export let parameter: string;
	export let cards: Card[];

	export let lang: Language = Language.ENG;
	export let cardType: CardType | undefined = undefined;
	cardType;

	$: {
		if (typeId !== undefined) type = AnnotationEnum.fromId(typeId);
	}
</script>

<a href={type.getLinkTarget(parameter, cards)}>{@html type.getLinkLabel(parameter, cards, lang)}</a>

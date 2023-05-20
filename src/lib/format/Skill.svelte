<script lang="ts">
    import type Skill from "$models/skill/skill.js";
    import type CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";
    import { makeNodesRenderable, parseSkillToNodes } from "$lib/format/format.js";
    import type { ParseNodePrepared, ParseNodeRenderable } from "$lib/format/format.js";
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";

    export let skill: string | ParseNodePrepared[] | Skill | null;
    export let lang: Language = Language.ENG;
    export let parseAsHelpText: boolean = false;
    export let cardType: CardType | undefined = undefined;

    let nodes: ParseNodeRenderable[];
    $: {
        if (Array.isArray(skill)) {
            nodes = makeNodesRenderable(skill);
        } else if (typeof skill === "string" || skill === null || !skill[<keyof Skill>(lang.name + "Preparsed")]) {
            nodes = makeNodesRenderable(parseSkillToNodes(skill, lang, parseAsHelpText, cardType));
        } else {
            nodes = makeNodesRenderable(skill[<keyof Skill>(lang.name + "Preparsed")]);
        }
    }
</script>

{#key nodes}
    <SkillNodeRenderer {nodes} {lang} {cardType} />
{/key}

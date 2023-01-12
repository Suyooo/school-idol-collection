<script lang="ts">
    import {makeNodesRenderable, parseSkillToNodes} from "$lib/format/format.js";
    import type {ParseNodeRenderable} from "$lib/format/format.js";
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";
    import CardType from "$lib/types/cardType.js";
    import Language from "$lib/types/language.js";
    import type Skill from "$models/skill/skill.js";

    export let skill: string | Skill | null;
    export let lang: Language = Language.ENG;
    export let parseAsHelpText: boolean = false;
    export let cardType: CardType | undefined;

    let nodes: ParseNodeRenderable[];
    $: {
        if (typeof skill === "string" || skill === null || !skill[lang.name + "Preparsed"]) {
            nodes = makeNodesRenderable(parseSkillToNodes(skill, lang, parseAsHelpText, cardType));
        } else {
            nodes = makeNodesRenderable(skill[lang.name + "Preparsed"]);
        }
    }
</script>

{#key nodes}
    <SkillNodeRenderer {nodes} {lang} {cardType}/>
{/key}
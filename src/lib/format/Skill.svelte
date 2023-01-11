<script lang="ts">
    import {makeNodesRenderable, parseSkillToNodes} from "$lib/format/format.js";
    import type {ParseNodePrepared, ParseNodeRenderable} from "$lib/format/format.js";
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";
    import Language from "$lib/types/language.js";

    export let skill: string | ParseNodePrepared[] | null;
    export let lang: Language = Language.ENG;
    export let parseAsHelpText: boolean = false;

    let nodes: ParseNodeRenderable[];
    $: {
        if (typeof skill === "string" || skill === null) {
            nodes = makeNodesRenderable(parseSkillToNodes(skill, lang, parseAsHelpText));
        } else {
            nodes = makeNodesRenderable(skill);
        }
    }
</script>

{#key nodes}
    <SkillNodeRenderer {nodes} {lang}/>
{/key}
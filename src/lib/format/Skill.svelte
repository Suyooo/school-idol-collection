<script lang="ts">
    import {makeRenderable, parseSkillToRenderNodes} from "$lib/format/format.js";
    import type {RenderNodePrepared, RenderNodeRenderable} from "$lib/format/format.js";
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";
    import Language from "$lib/types/language.js";

    export let skill: string | RenderNodePrepared[];
    export let lang: Language = Language.ENG;
    export let parseAsHelpText: boolean = false;

    let renderNodes: RenderNodeRenderable[];
    $: {
        if (typeof skill === "string") {
            renderNodes = makeRenderable(parseSkillToRenderNodes(skill, lang, parseAsHelpText));
        } else {
            renderNodes = makeRenderable(skill);
        }
    }
</script>

{#key renderNodes}
    <SkillNodeRenderer {renderNodes} {lang}/>
{/key}
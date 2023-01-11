<script lang="ts">
    import Language from "$types/language.js";
    import type {RenderNode} from "./Skill.svelte";
    import {isTextNode, isElementNode} from "./Skill.svelte";

    export let renderNodes: RenderNode[];
    export let lang: Language = Language.ENG;
</script>

{#each renderNodes as node}
    {#if isTextNode(node)}
        {node.text}
    {:else if isElementNode(node)}
        <svelte:element this={node.element} class={node.class}><svelte:self renderNodes={node.nodes} {lang}/></svelte:element>
    {:else}
        <svelte:component this={node.component} {...node.props} {lang}/>
    {/if}
{/each}
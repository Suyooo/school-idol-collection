<script lang="ts">
    import Language from "$lib/types/language.js";
    import type {RenderNodeRenderable} from "$lib/format/format.js";
    import {isTextNode, isElementNode} from "$lib/format/format.js";

    export let renderNodes: RenderNodeRenderable[];
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
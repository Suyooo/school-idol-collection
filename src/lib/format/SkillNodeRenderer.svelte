<script lang="ts">
    import Language from "$lib/types/language.js";
    import type {ParseNodeRenderable} from "$lib/format/format.js";
    import {isTextNode, isElementNode} from "$lib/format/format.js";

    export let nodes: ParseNodeRenderable[];
    export let lang: Language = Language.ENG;
</script>

{#each nodes as node}
    {#if isTextNode(node)}
        {node.text}
    {:else if isElementNode(node)}
        <svelte:element this={node.element} class={node.class}><svelte:self nodes={node.nodes} {lang}/></svelte:element>
    {:else}
        <svelte:component this={node.component} {...node.props} {lang}/>
    {/if}
{/each}
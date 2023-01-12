<script lang="ts">
    import CardType from "$lib/types/cardType.js";
    import Language from "$lib/types/language.js";
    import type {ParseNodeRenderable} from "$lib/format/format.js";
    import {isTextNode, isElementNode} from "$lib/format/format.js";

    export let nodes: ParseNodeRenderable[];
    export let lang: Language = Language.ENG;
    export let cardType: CardType | undefined;
</script>

{#each nodes as node}
    {#if isTextNode(node)}
        {node.text}
    {:else if isElementNode(node)}
        <svelte:element this={node.element} class={node.class}><svelte:self nodes={node.nodes} {lang} {cardType}/></svelte:element>
    {:else}
        <svelte:component this={node.component} {...node.props} {lang} {cardType}/>
    {/if}
{/each}
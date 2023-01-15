<script lang="ts">
    import {makeNodesRenderable} from "$lib/format/format";
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";
    import Section from "./Section.svelte";
    import {page} from "$app/stores";
    import type Card from "$models/card/card.js";
    import type {FaqSectionPrepared} from "./prepareFaq.js";

    let cards: { [key: string]: Card }, sections: FaqSectionPrepared[];
    $: ({cards, sections} = $page.data);
</script>

<div class="content">
    <div class="panel">
        <div class="panel-inner">
            <h4>
                <slot></slot>
            </h4>
            {#each sections as section}
                <Section card={cards[section.cardNo]}
                         rangeEndCard={section.rangeEndCardNo ? cards[section.rangeEndCardNo] : undefined}>
                    {#if section.seeAlso}
                        {#each section.seeAlso as seeAlso}
                            {seeAlso.link}{seeAlso.label}
                        {/each}
                    {/if}
                    {#if section.qa}
                        {#each section.qa as qa}
                            <div><SkillNodeRenderer nodes={makeNodesRenderable(qa.question)}/></div>
                            <div><SkillNodeRenderer nodes={makeNodesRenderable(qa.answer)}/></div>
                        {/each}
                    {/if}
                </Section>
            {/each}
        </div>
    </div>
</div>
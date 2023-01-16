<script lang="ts">
    import Note from "./Note.svelte";
    import Question from "./Question.svelte";
    import Section from "./Section.svelte";
    import {page} from "$app/stores";
    import type Card from "$models/card/card.js";
    import type {FaqSectionPrepared} from "./prepareFaq.js";
    import SeeAlso from "./SeeAlso.svelte";

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
                <Section subjects={section.subjects.map(subject => {
                    if (typeof subject === "string") return cards[subject];
                    else return {from: cards[subject.from], to: cards[subject.to]};
                })}>
                    {#if section.notes}
                        {#each section.notes as note}
                            <Note {note}/>
                        {/each}
                    {/if}
                    {#if section.seeAlso}
                        {#each section.seeAlso as seeAlso}
                            <SeeAlso {...seeAlso}/>
                        {/each}
                    {/if}
                    {#if section.qa}
                        {#each section.qa as qa}
                            <Question {...qa}/>
                        {/each}
                    {/if}
                </Section>
            {/each}
        </div>
    </div>
</div>
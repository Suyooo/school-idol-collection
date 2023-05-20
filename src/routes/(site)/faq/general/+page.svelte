<script lang="ts">
    import TriggerEnum from "$lib/enums/trigger.js";
    import Ability from "$lib/format/Ability.svelte";
    import TriggerComponent from "$lib/format/TriggerComponent.svelte";
    import type { PageData } from "./$types.js";
    import Note from "../Note.svelte";
    import Question from "../Question.svelte";
    import SeeAlso from "../SeeAlso.svelte";

    export let data: PageData;
</script>

<svelte:head><title>How To Play → General FAQ &bull; SIC</title></svelte:head>
<div class="content">
    <h3>Frequently Asked Questions</h3>
    <div class="panel">
        <div class="panel-inner">
            <h4>Cards</h4>
            <h5>Is it okay to put two Song cards with the same name, but different Attributes into my Deck?</h5>
            <Question {...data.sections[0].qa[0]} />
            <Question {...data.sections[0].qa[1]} />
            <h5>What is the "On Stand-By" state?</h5>
            <Question {...data.sections[0].qa[2]} />
            <Question {...data.sections[0].qa[3]} />
            <h5>What does "Members on Stage" mean?</h5>
            <Question {...data.sections[0].qa[4]} />
            <h5>How do I count Members?</h5>
            <Question {...data.sections[0].qa[5]} />
            <h5>What happens if my Deck runs out during a match?</h5>
            <Question {...data.sections[0].qa[6]} />
            <div class="anchor" id="collection" />
            <h5>What does "Collection" mean?</h5>
            <SeeAlso
                link="/faq/rules#official_collection"
                label={[{ text: "Rules → Official Event Rules → Collection" }]}
            />
            <Question {...data.sections[0].qa[7]} />
            <Question {...data.sections[0].qa[8]} />
            <div class="anchor" id="group" />
            <h5>What does "Pair" (or "Trio") mean?</h5>
            <Note note={data.sections[0].notes[0]} />
            <Question {...data.sections[0].qa[9]} />
            <Question {...data.sections[0].qa[10]} />
            <Question {...data.sections[0].qa[11]} />
            <Question {...data.sections[0].qa[12]} />
            <Question {...data.sections[0].qa[13]} />
            <div class="anchor" id="sp_practice" />
            <h5>What does "Special Practice" mean?</h5>
            <Question {...data.sections[0].qa[14]} />
            <Question {...data.sections[0].qa[15]} />
            <Question {...data.sections[0].qa[16]} />
            <h5>What does "Idolized" mean?</h5>
            <Question {...data.sections[0].qa[17]} />
            <Question {...data.sections[0].qa[18]} />
            <Question {...data.sections[0].qa[19]} />
            <Question {...data.sections[0].qa[20]} />
            <h5>What happens to a face-down Member card?</h5>
            <Question {...data.sections[0].qa[21]} />
        </div>
    </div>
    <div class="panel">
        <div class="panel-inner">
            <h4>Skills</h4>
            <h5>Can I use my Starting Members' <TriggerComponent trigger={TriggerEnum.ENTRY} /> Skill?</h5>
            <Question {...data.sections[0].qa[22]} />
            <h5>If a Skill's condition says "more/less than", does it also count if you have the same amount?</h5>
            <Question {...data.sections[0].qa[23]} />
            <h5>What happens if I am unable to do something a Skill tells me to do?</h5>
            <Question {...data.sections[0].qa[24]} />
            <h5>What happens if I do <Ability rush />→<Ability rush /> or <Ability rush />→<Ability live />?</h5>
            <Question {...data.sections[0].qa[25]} />
            <h5>What should I do if I have to turn the top card of my Deck face-up?</h5>
            <Question {...data.sections[0].qa[26]} />
            <h5>Does the order of actions in a Skill matter?</h5>
            <Question {...data.sections[0].qa[27]} />
            <h5>What if a card has two or more Skills?</h5>
            <Question {...data.sections[0].qa[28]} />
            <h5>What does it mean if a Member card has two Skill fields?</h5>
            <SeeAlso link="#group" label={[{ text: 'What does "Pair" (or "Trio") mean?' }]} />
            <Question {...data.sections[0].qa[29]} />
            <h5>What should I do if a Skill says "Do either: ① ~ ② ~"?</h5>
            <Question {...data.sections[0].qa[30]} />
            <Question {...data.sections[0].qa[31]} />
        </div>
    </div>
    <div class="panel">
        <div class="panel-inner">
            <h4>Lives</h4>
            <h5>Can I perform a <b>⟪LIVE⟫</b> with more Pieces than the requirement?</h5>
            <Question {...data.sections[0].qa[32]} />
            <h5>
                What happens to Pieces that were gained/changed using a <TriggerComponent trigger={TriggerEnum.JOIN} /> Skill?
            </h5>
            <Question {...data.sections[0].qa[33]} />
            <h5>
                What is the order for <TriggerComponent trigger={TriggerEnum.JOIN} /> / <TriggerComponent
                    trigger={TriggerEnum.SUCCESS}
                /> Skills?
            </h5>
            <Question {...data.sections[0].qa[34]} />
            <h5>
                Between flipping over a new Song card from the Set List and the <TriggerComponent
                    trigger={TriggerEnum.SUCCESS}
                /> Skills, which one should go first?
            </h5>
            <Question {...data.sections[0].qa[35]} />
            <h5>What happens if there's additional face-up cards in the Set List?</h5>
            <Question {...data.sections[0].qa[36]} />
            <h5>What should I do if I have to flip a Song card in my Set List face-down?</h5>
            <Question {...data.sections[0].qa[37]} />
            <Question {...data.sections[0].qa[38]} />
        </div>
    </div>
</div>

<style lang="postcss">
    div.anchor {
        @apply -mb-4;
    }

    div.anchor:target + h5 {
        animation: highlight-faq 0.25s ease-in-out 2;
    }
</style>

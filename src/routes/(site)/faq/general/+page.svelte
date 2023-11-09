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
<h1>Frequently Asked Questions</h1>
<div class="panel">
	<div class="panel-inner">
		<h2>Cards</h2>
		<h3>Is it okay to put two Song cards with the same name, but different Attributes into my Deck?</h3>
		<Question {...data.sections[0].qa[0]} />
		<Question {...data.sections[0].qa[1]} />
		<h3>What is the "On Stand-By" state?</h3>
		<Question {...data.sections[0].qa[2]} />
		<Question {...data.sections[0].qa[3]} />
		<h3>What does "Members on Stage" mean?</h3>
		<Question {...data.sections[0].qa[4]} />
		<h3>How do I count Members?</h3>
		<Question {...data.sections[0].qa[5]} />
		<h3>What happens if my Deck runs out during a match?</h3>
		<Question {...data.sections[0].qa[6]} />
		<div class="anchor" id="collection" />
		<h3>What does "Collection" mean?</h3>
		<SeeAlso
			link="/faq/rules-extra#official_collection"
			label={[{ text: "Rules → Official Event Rules → Collection" }]}
		/>
		<Question {...data.sections[0].qa[7]} />
		<Question {...data.sections[0].qa[8]} />
		<div class="anchor" id="group" />
		<h3>What does "Pair" (or "Trio") mean?</h3>
		<Note note={data.sections[0].notes[0]} />
		<Question {...data.sections[0].qa[9]} />
		<Question {...data.sections[0].qa[10]} />
		<Question {...data.sections[0].qa[11]} />
		<Question {...data.sections[0].qa[12]} />
		<Question {...data.sections[0].qa[13]} />
		<div class="anchor" id="idolization" />
		<h3>What does "Special Practice" mean?</h3>
		<Question {...data.sections[0].qa[14]} />
		<Question {...data.sections[0].qa[15]} />
		<Question {...data.sections[0].qa[16]} />
		<h3>What does "Idolized" mean?</h3>
		<Question {...data.sections[0].qa[17]} />
		<Question {...data.sections[0].qa[18]} />
		<Question {...data.sections[0].qa[19]} />
		<Question {...data.sections[0].qa[20]} />
		<h3>What happens to a face-down Member card?</h3>
		<Question {...data.sections[0].qa[21]} />
	</div>
</div>
<div class="panel">
	<div class="panel-inner">
		<h2>Skills</h2>
		<h3>Can I use my Starting Members' <TriggerComponent trigger={TriggerEnum.ENTRY} /> Skill?</h3>
		<Question {...data.sections[0].qa[22]} />
		<h3>If a Skill's condition says "more/less than", does it also count if you have the same amount?</h3>
		<Question {...data.sections[0].qa[23]} />
		<h3>What happens if I am unable to do something a Skill tells me to do?</h3>
		<Question {...data.sections[0].qa[24]} />
		<h3>What happens if I do <Ability rush />→<Ability rush /> or <Ability rush />→<Ability live />?</h3>
		<Question {...data.sections[0].qa[25]} />
		<h3>What should I do if I have to turn the top card of my Deck face-up?</h3>
		<Question {...data.sections[0].qa[26]} />
		<h3>Does the order of actions in a Skill matter?</h3>
		<Question {...data.sections[0].qa[27]} />
		<h3>What if a card has two or more Skills?</h3>
		<Question {...data.sections[0].qa[28]} />
		<h3>What does it mean if a Member card has two Skill fields?</h3>
		<SeeAlso link="#group" label={[{ text: 'What does "Pair" (or "Trio") mean?' }]} />
		<Question {...data.sections[0].qa[29]} />
		<h3>What should I do if a Skill says "Do either: ① ~ ② ~"?</h3>
		<Question {...data.sections[0].qa[30]} />
		<Question {...data.sections[0].qa[31]} />
	</div>
</div>
<div class="panel">
	<div class="panel-inner">
		<h2>Lives</h2>
		<h3>Can I perform a <b>⟪LIVE⟫</b> with more Pieces than the requirement?</h3>
		<Question {...data.sections[0].qa[32]} />
		<h3>
			What happens to Pieces that were gained/changed using a <TriggerComponent trigger={TriggerEnum.JOIN} /> Skill?
		</h3>
		<Question {...data.sections[0].qa[33]} />
		<h3>
			What is the order for <TriggerComponent trigger={TriggerEnum.JOIN} /> / <TriggerComponent
				trigger={TriggerEnum.SUCCESS}
			/> Skills?
		</h3>
		<Question {...data.sections[0].qa[34]} />
		<h3>
			Between flipping over a new Song card from the Set List and the <TriggerComponent trigger={TriggerEnum.SUCCESS} />
			Skills, which one should go first?
		</h3>
		<Question {...data.sections[0].qa[35]} />
		<h3>What happens if there's additional face-up cards in the Set List?</h3>
		<Question {...data.sections[0].qa[36]} />
		<h3>What should I do if I have to flip a Song card in my Set List face-down?</h3>
		<Question {...data.sections[0].qa[37]} />
		<Question {...data.sections[0].qa[38]} />
	</div>
</div>

<style lang="postcss">
	div.anchor {
		@apply -mb-4;
	}

	div.anchor:target + h3 {
		animation: highlight-faq 0.25s ease-in-out 2;
	}
</style>

<script lang="ts">
	import HowToPlay from "$lib/style/icons/home/HowToPlay.svelte";
	import Go from "$lib/style/icons/Go.svelte";
</script>

<svelte:head><title>How To Play &bull; SIC</title></svelte:head>

<h1>How To Play</h1>
<div class="panel">
	<div class="panel-inner">
		These pages are (mostly) straight translations of the How To Play and FAQ on the official site, including details
		and clarifications for various rules and Skills, with some reorganisation and a few extra notes. If you are confused
		about a certain aspect of the game or you run into a situation where it is unclear how exactly a Skill should be
		resolved, maybe your question is already answered here!<br /><br />
		While official events will be played as described here, the official help pages state that you don't have to exactly
		follow what it says in casual play. The content of these pages describe how the game's designers interpret the rules,
		but as long as you talk it out with the other players and everyone agrees, they encourage you to experiment with slight
		changes, and see whether you can make some new discoveries that'll help you enjoy SIC even more ♪
	</div>
</div>
<div class="my-4 lg:grid lg:grid-cols-3 lg:justify-items-stretch lg:gap-4">
	<a class="button group" href="https://llsic-en.carrd.co/" target="_blank">
		<div class="panel h-full">
			<div class="panel-inner text-justify">
				<div class="big-link mb-2">
					<HowToPlay />
					<div>
						<div class="-mt-1.5">Game Rules</div>
						<div class="leading -mb-1.5 -mt-1 text-xs">(External Link)</div>
					</div>
					<Go />
				</div>
				Your Sinclair made a great translation with typesetting of the original rule sheet, explaining the basic rules of
				SIC. This is all you need to know if you want to try out the game!
			</div>
		</div>
	</a>
	<a class="button group" href="http://localhost:5173/faq/rules-extra">
		<div class="panel h-full">
			<div class="panel-inner text-justify">
				<div class="big-link mb-2">
					<HowToPlay />
					<div>Extra Rules Info</div>
					<Go />
				</div>
				Details on Idolization, Pairs/Trios and Memories &ndash; new game mechanics, which were introduced in later card
				sets. Also, some optional rules and official event rules!
			</div>
		</div>
	</a>
	<a class="button group" href="http://localhost:5173/faq/general">
		<div class="panel h-full">
			<div class="panel-inner text-justify">
				<div class="big-link mb-2">
					<HowToPlay />
					<div>FAQ</div>
					<Go />
				</div>
				Frequently asked questions and answers about the general game rules. If you have questions about specific cards,
				make sure to also check the Per-Set FAQ below!
			</div>
		</div>
	</a>
</div>
<div class="panel">
	<div class="panel-inner">
		<h2>Per-Set FAQ</h2>
		<ul>
			<li><a href="/faq/LL01">LL01 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL02">LL02 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL03">LL03 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL04">LL04 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL05">LL05 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL06">LL06 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL07">LL07 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL08">LL08 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL09">LL09 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL10">LL10 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL11">LL11 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL12">LL12 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL13">LL13 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL14">LL14 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL15">LL15 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL16">LL16 Frequently Asked Questions</a></li>
			<li><a href="/faq/LL17">LL17 Frequently Asked Questions</a></li>
			<li class="mt-4">
				<a href="/faq/EX05">EX05 (SIF Fes 2017 µ's Special Pack) Frequently Asked Questions</a>
			</li>
			<li><a href="/faq/EX10">EX10 (Acrylic Keyholder Set) Frequently Asked Questions</a></li>
			<li><a href="/faq/EX11">EX11 (SIF Fes 2018 µ's Special Pack) Frequently Asked Questions</a></li>
			<li><a href="/faq/EX12">EX12 (SIF Honor Student Scouting Box) Frequently Asked Questions</a></li>
			<li class="mt-4">
				<a href="/faq/other">Other Sets Frequently Asked Questions (EX01, EX04, Promo Cards)</a>
			</li>
		</ul>
	</div>
</div>

<script lang="ts">
	import { CardOrientation } from "$lib/enums/cardOrientation.js";
	import TriggerEnum from "$lib/enums/trigger.js";
	import CardImage from "$lib/format/CardImage.svelte";
	import Idolized from "$lib/format/Idolized.svelte";
	import Star from "$lib/format/Star.svelte";
	import TriggerComponent from "$lib/format/TriggerComponent.svelte";
</script>

<svelte:head><title>How To Play → Extra Rules Info &bull; SIC</title></svelte:head>

<h1>Extra Rules Info</h1>

<div class="panel">
	<div class="panel-inner">
		<h2>Additional Mechanics</h2>
		These mechanics are additional rules for cards introduced in later Aqours sets.

		<h3>Pairs and Trios</h3>
		<div>
			<div class="mb-2 flex w-full justify-center lg:float-right lg:ml-4 lg:w-[unset]">
				<a href="/card/LL14-059"><CardImage cardNo="LL14-059" orientation={CardOrientation.PORTRAIT} /></a>
				<a href="/card/LL14-060"><CardImage cardNo="LL14-060" orientation={CardOrientation.PORTRAIT} /></a>
			</div>
			Certain cards can be linked into Pairs or Trios. Their illustrations will combine into one larger image if you do so.<br
			/>
			<br />
			The <span class="text-highlight-red">"Pair Up"</span> or
			<span class="text-highlight-red">"Form A Trio"</span> Skill that allows you to form such a group is available as
			an <TriggerComponent trigger={TriggerEnum.ENTRY} /> Skill on one or more cards of the Pair/Trio, and lists the IDs
			of the cards it can link up with. Once all the other cards of the Pair/Trio are on your Stage, you can combine them
			into the Pair or Trio by <b>⟪ENTER⟫</b>ing a card with that Skill last.<br />
			<br />
			As a Pair or Trio, the cards will join <b>⟪LIVE⟫</b>s together and activate additional Pair/Trio Skills. For more
			information, check out <a href="/faq/general#group">the FAQ about Pairs and Trios</a>.
		</div>

		<h3 class="clear-both">Memories</h3>
		<div>
			<div class="mb-2 flex w-full justify-center lg:float-right lg:ml-4 lg:w-[unset]">
				<a href="/card/LL11-073"><CardImage cardNo="LL11-073" orientation={CardOrientation.LANDSCAPE} /></a>
			</div>
			Memory cards are a third type of cards, in addition to the Member and Song cards you already know. They are not part
			of either your Deck or Set List. Instead, you bring them onto your Stage from your
			<span class="text-highlight-red">Collection</span> - which refers to all the cards you own, but are not already
			used in your Deck or Set List.<br />In tournament games, to avoid having to deal with your entire Collection all
			the time, it is treated more like an extra deck in other TCGs - which you prepare with all the cards you might
			want to use during a game, before the match.
			<a href="/faq/general#collection">The FAQ about Collections</a>
			have more information about how the Collection is defined and how it works in deckbuilding.<br />
			<br />
			Memories are comparable to field effects in other TCGs, usually activating passive Skills affecting the cards on your
			Stage and <b>⟪LIVE⟫</b>s you perform. You can only bring them into play by using the Skills of Member or Song
			cards refering to that specific Memory. You can check the "See Also" links on the page of a Memory card to find
			out how to bring it onto your Stage.
		</div>

		<h3 class="clear-both">Idolization</h3>
		<div>
			<div class="mb-2 flex w-full justify-center lg:float-right lg:ml-4 lg:w-[unset]">
				<a href="/card/LL15-028"><CardImage cardNo="LL15-028" orientation={CardOrientation.PORTRAIT} /></a>
			</div>
			Certain cards are able to be Idolized. This works a little like Idolization in the original LLSIF: by combining multiple
			cards, you can get a powered-up version of the Idolizable card.<br />
			<br />
			Cards that have a <TriggerComponent trigger={TriggerEnum.SP} /> Skill are Idolizable. You can Idolize these cards by
			stacking them on top of another card already on your Stage, which must meet the requirements mentioned by the
			<TriggerComponent trigger={TriggerEnum.SP} /> Skill, such as being a certain member or having a certain Cost.<br
			/>
			<br />
			Once Idolized, cards can gain additional Pieces listed as <Idolized repl="[Idolized] Pieces" /> (the smaller Pieces
			below the regular ones, right above the Member's birthday), or use more powerful Skills. You can learn more from the
			<a href="/faq/general#idolization">FAQ about Idolization and Special Practice</a>.
		</div>
	</div>
</div>
<div class="panel">
	<div class="panel-inner">
		<h2>Rule Modifications</h2>
		Here, some of the rules that you can easily change up when play SIC are highlighted. While the recommended rule for each
		modification is listed, you can decide yourself whether you want to use these defaults or not. When playing casually
		with others, you should talk about these to make sure everyone is on the same page, while they're usually already decided
		by the organizers at events or tournaments.

		<h3 id="option_cost">Star Rule</h3>
		<p>
			All Member cards have a Cost, from 0 <Star repl="Stars" /> to 3 <Star repl="Stars" />, depending on their rarity.<br
			/>
			You can set an upper limit on the total Cost of a Deck, so everyone can build more balanced Decks. The recommended
			Cost limit is 20 <Star repl="Stars" />.<br />
			<br />
			If you want a simpler game, you can reduce the limit to something like 10 <Star repl="Stars" />. Of course, you
			can use any number you want as the limit, or even remove it and play with no Cost limit.
		</p>

		<h3 id="option_birthday">Birthday Bonus</h3>
		<p>
			Some Member cards have Birthday Bonus Pieces in their profile.<br />
			If the game is taking place in the same month as that Member's birthday, you can add these Bonus Pieces to the card's
			base Pieces. (For example, if the Member's birthday is August 3rd, the Bonus Pieces can be used in all games being
			played in August.)<br />
			<br />
			"Same month" is the recommended condition, but you can change this rule to only apply on the same day, or leave Birthday
			Bonuses out completely. These are of course not the only possibilities, feel free to get creative - for example, at
			the start of a match, every player could choose one Member to get the Birthday Bonus for that match.
		</p>

		<h3 id="option_goal">Live Points Goal</h3>
		<p>
			This game is balanced around a goal of 9 Live Points, which is the recommended target.<br />
			However, if you want to play longer games, you can also increase the Live Points Goal, or, if you want to play multiple
			shorter games, lower it.<br />
			<br />
			If you are setting a very high Live Points Target, please be careful and make sure that every player's Set List actually
			has enough Base Live Points to reach the target.<br />
			<br />
			You can also try completely different rules - such as setting a turn limit instead of a point goal, and seeing who
			has the most Live Points at the end.
		</p>

		<h3 id="option_multi">Three or More Players</h3>
		<p>
			You can not only play the game one on one, but also with three or more players.<br />
			It is recommended to play in clockwise order, and deciding the starting player with a game of Rock-Paper-Scissors.<br
			/>
			If a player reaches the Live Points Goal, they will go out of the game as a winner. The players in first place, second
			place, third place and so on are decided by the order in which they win and go out.
		</p>

		<h3 id="option_sleeving">Sleeving</h3>
		<p>
			Since the cards have illustrations on their back, it is recommended to use card sleeves when playing to hide the
			back, so other players can't see what cards you have on your hand, and you can't see what you will draw next.
			That's why when you buy SIC cards, they will always come with sleeves to put them in. Of course, you can use any
			card sleeve you like!<br />
			It is recommended to use one unified sleeve for the cards in the Deck and another unified sleeve for the cards in the
			Set List. This will make the game easier to play.<br />
			<br />
			If you bought a Trial Deck, the cards in it come without an illustration on the back, but with a unified design instead.
			As long as you only use Trial Deck cards and they all have the same design, these will not need sleeving.<br />
			Cards you bring into play from your Collection do not need sleeving, unless they could be turned face-down at any point.
			In that case, sleeving is required. If you plan to bring Member or Song cards from your Collection into play, make
			sure they have the same sleeving as your other cards of the same type.
		</p>
	</div>
</div>
<div class="panel">
	<div class="panel-inner">
		<h2>Official Event Rules</h2>
		These are the recommended Deck Construction Restrictions and Rule Options from the SIC site, used for official events.
		These are simply guidelines, something to start off with - if all the players agree (or you're hosting an event and you're
		the one making the rules), you can do things differently.

		<h3 id="official_options">Rule Options</h3>
		<ul>
			<li>Live Points Goal: 9</li>
			<li>Birthday Bonus: Yes, same month</li>
			<li>Turn Order: Clockwise, first player decided by Rock-Paper-Scissors</li>
			<li>Sleeving: Required, unified sleeve for Deck and Set List each (can be the same sleeve for both)</li>
		</ul>

		<h3 id="official_deck">Deck / Member Cards</h3>
		<ul>
			<li>Your Deck must have at least 20 Member cards. (There is no maximum.)</li>
			<li>You must not have more than four Member cards with the same ID in your Deck.</li>
			<li>
				The total Cost of all cards must not exceed 20 <Star repl="Stars" />. (It doesn't have to be exactly 20 <Star
					repl="Stars"
				/>.)
			</li>
		</ul>

		<h3 id="official_setlist">Set List / Song Cards</h3>
		<ul>
			<li>Your Set List must have at least 6 Song cards. (Again, no maximum.)</li>
			<li>Every Song card in your Set List must have an unique ID.</li>
		</ul>

		<h3 id="official_collection">Collection</h3>
		<p>
			Cards from your Collection you might look for during the game must be prepared and placed on the table you're
			playing on. While it is not your actual Collection, this prepared set is what should be used as your "Collection"
			during official events.
		</p>

		<h3 id="official_banlist">Card Bans</h3>
		<div class="ml-4">
			If you have a card from Set A in your Deck, Set List or Collection, you must not have any cards from Set B in your
			Deck, Set List or Collection.
			<div class="row ml-4 mt-1">
				<div class="col-half">
					<b>Set A</b>
					<ul>
						<li><a href="/card/LL12-047/">LL12-047 "Riko Sakurauchi"</a></li>
					</ul>
				</div>
				<div class="col-half">
					<b>Set B</b>
					<ul>
						<li><a href="/card/LL13-064/">LL13-064 "µ's Holiday Stories Honoka Kousaka"</a></li>
						<li><a href="/card/LL13-069/">LL13-069 "µ's Holiday Stories Maki Nishikino"</a></li>
						<li><a href="/card/LL13-070/">LL13-070 "µ's Holiday Stories Nozomi Tojo"</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	p,
	ul {
		@apply ml-4;
	}
</style>

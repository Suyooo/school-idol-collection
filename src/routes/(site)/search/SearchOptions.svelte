<script lang="ts">
	import { goto } from "$app/navigation";
	import type { SearchUiOptions } from "$lib/search/ui.js";
	import { uiOptionIsSet, uiOptionsToUrl } from "$lib/search/ui.js";
	import { uppercaseFirst } from "$lib/utils/string.js";
	import Button from "$lib/style/Button.svelte";

	export let options: SearchUiOptions = {};

	function query() {
		const url = uiOptionsToUrl(options);
		if (url.length > 0) {
			goto("/search?" + url);
		}
	}
</script>

<div class="flex items-start max-lg:flex-col">
	<div class="grid flex-grow basis-0 grid-cols-[1fr,3fr] items-center gap-2 lg:pr-4">
		<b>{uppercaseFirst(options.cardType || "Card")} Name </b>
		<input bind:value={options.cardName} placeholder="—" />

		<b>Group</b>
		<select bind:value={options.group} class:text-input-placeholder={!uiOptionIsSet(options.group)}>
			<option value="" selected>—</option>
			<option value="muse">µ's</option>
			<option value="aqours">Aqours</option>
			<option value="printemps">Printemps</option>
			<option value="lilywhite">lily white</option>
			<option value="bibi">BiBi</option>
			<option value="cyaron">CYaRon!</option>
			<option value="azalea">AZALEA</option>
			<option value="guiltykiss">Guilty Kiss</option>
			<option value="saintsnow">Saint Snow</option>
		</select>

		<b>Card Type</b>
		<select bind:value={options.cardType} class:text-input-placeholder={!uiOptionIsSet(options.cardType)}>
			<option value="" selected>—</option>
			<option value="member">Member</option>
			<option value="song">Song</option>
			<option value="memory">Memory</option>
		</select>

		<b>Card Set</b>
		<input bind:value={options.cardSet} placeholder="—" />

		<b>Skill Text</b>
		<input bind:value={options.skillText} placeholder="—" />
	</div>
	<div class="mt-4 grid flex-grow basis-0 grid-cols-[1fr,3fr] items-center gap-2 lg:mt-0 lg:pl-4">
		{#if options.cardType === "member"}
			<b>Rarity</b>
			<select bind:value={options.memberRarity} class:text-input-placeholder={!uiOptionIsSet(options.memberRarity)}>
				<option value="" selected>—</option>
				<option value="r">R</option>
				<option value="sr">SR</option>
				<option value="hr">HR</option>
				<option value="special">Special</option>
				<option value="secret">Secret</option>
				<option value="pr">PR</option>
				<option value="n">N</option>
				<option value="ssr">SSR</option>
			</select>

			<b>School Year</b>
			<select bind:value={options.memberYear} class:text-input-placeholder={!uiOptionIsSet(options.memberYear)}>
				<option value="" selected>—</option>
				<option value="year:1">1st Year</option>
				<option value="year:2">2nd Year</option>
				<option value="year:3">3nd Year</option>
			</select>

			<b>Cost</b>
			<div class="flex gap-1">
				<select
					class="number"
					bind:value={options.memberCost}
					class:text-input-placeholder={!uiOptionIsSet(options.memberCost)}
				>
					<option value="" selected>—</option>
					<option value="0">0★</option>
					<option value="1">1★</option>
					<option value="2">2★</option>
					<option value="3">3★</option>
				</select>
				<select class="flex-grow" bind:value={options.memberCostMod} disabled={!uiOptionIsSet(options.memberCost)}>
					<option value="" selected>exactly</option>
					<option value="-">or less</option>
					<option value="+">or more</option>
				</select>
			</div>

			<b>Ability</b>
			<select bind:value={options.memberAbility} class:text-input-placeholder={!uiOptionIsSet(options.memberAbility)}>
				<option value="" selected>—</option>
				<option value="noability">None</option>
				<option value="rush">[RUSH]</option>
				<option value="live">[LIVE]</option>
				<option value="rushorlive">[RUSH/LIVE]</option>
			</select>

			<b>Costume</b>
			<input bind:value={options.memberCostume} placeholder="—" />

			<b>Total Pieces</b>
			<div class="flex gap-1">
				<input type="number" min="0" max="4" bind:value={options.memberPieces} placeholder="—" />
				<select class="flex-grow" bind:value={options.memberPiecesMod} disabled={!uiOptionIsSet(options.memberPieces)}>
					<option value="" selected>exactly</option>
					<option value="-">or less</option>
					<option value="+">or more</option>
				</select>
			</div>

			<b class="whitespace-nowrap">
				<img class="skill-icon" src="/images/icons/piece_smile.png" alt="Smile" /> Pieces
			</b>
			<div class="flex gap-1">
				<input type="number" min="0" max="4" bind:value={options.memberPiecesSmile} placeholder="—" />
				<select
					class="flex-grow"
					bind:value={options.memberPiecesSmileMod}
					disabled={!uiOptionIsSet(options.memberPiecesSmile)}
				>
					<option value="" selected>exactly</option>
					<option value="-">or less</option>
					<option value="+">or more</option>
				</select>
			</div>

			<b class="whitespace-nowrap">
				<img class="skill-icon" src="/images/icons/piece_pure.png" alt="Pure" /> Pieces
			</b>
			<div class="flex gap-1">
				<input type="number" min="0" max="4" bind:value={options.memberPiecesPure} placeholder="—" />
				<select
					class="flex-grow"
					bind:value={options.memberPiecesPureMod}
					disabled={!uiOptionIsSet(options.memberPiecesPure)}
				>
					<option value="" selected>exactly</option>
					<option value="-">or less</option>
					<option value="+">or more</option>
				</select>
			</div>

			<b class="whitespace-nowrap">
				<img class="skill-icon" src="/images/icons/piece_cool.png" alt="Cool" /> Pieces
			</b>
			<div class="flex gap-1">
				<input type="number" min="0" max="4" bind:value={options.memberPiecesCool} placeholder="—" />
				<select
					class="flex-grow"
					bind:value={options.memberPiecesCoolMod}
					disabled={!uiOptionIsSet(options.memberPiecesCool)}
				>
					<option value="" selected>exactly</option>
					<option value="-">or less</option>
					<option value="+">or more</option>
				</select>
			</div>

			<b class="whitespace-nowrap">
				<img class="skill-icon" src="/images/icons/piece_all.png" alt="All" /> Pieces
			</b>
			<div class="flex gap-1">
				<input type="number" min="0" max="4" bind:value={options.memberPiecesAll} placeholder="—" />
				<select
					class="flex-grow"
					bind:value={options.memberPiecesAllMod}
					disabled={!uiOptionIsSet(options.memberPiecesAll)}
				>
					<option value="" selected>exactly</option>
					<option value="-">or less</option>
					<option value="+">or more</option>
				</select>
			</div>

			<b>Birthday Bonus</b>
			<select
				bind:value={options.memberPieceBonus}
				class:text-input-placeholder={!uiOptionIsSet(options.memberPieceBonus)}
			>
				<option value="" selected>—</option>
				<option value="nobonus">No</option>
				<option value="bonus">Yes</option>
			</select>

			<b>Idolizable</b>
			<select
				bind:value={options.memberIdolizable}
				class:text-input-placeholder={!uiOptionIsSet(options.memberIdolizable)}
			>
				<option value="" selected>—</option>
				<option value="notidolizable">No</option>
				<option value="idolizable">Yes</option>
			</select>
		{:else if options.cardType === "song"}
			<b>Rarity</b>
			<select bind:value={options.songRarity} class:text-input-placeholder={!uiOptionIsSet(options.songRarity)}>
				<option value="" selected>—</option>
				<option value="m">M</option>
				<option value="gr">GR</option>
			</select>

			<b>Attribute</b>
			<select bind:value={options.songAttribute} class:text-input-placeholder={!uiOptionIsSet(options.songAttribute)}>
				<option value="" selected>—</option>
				<option value="neutral">Neutral</option>
				<option value="smile">Smile</option>
				<option value="pure">Pure</option>
				<option value="cool">Cool</option>
				<option value="orange">Orange</option>
			</select>

			<b>Base Live Points</b>
			<div class="flex gap-1">
				<input type="number" min="0" bind:value={options.songLivePoints} placeholder="—" />
				<select
					class="flex-grow"
					bind:value={options.songLivePointsMod}
					disabled={!uiOptionIsSet(options.songLivePoints)}
				>
					<option value="" selected>exactly</option>
					<option value="-">or less</option>
					<option value="+">or more</option>
				</select>
			</div>

			<b>Requirement</b>
			<select
				bind:value={options.songRequirementType}
				class:text-input-placeholder={!uiOptionIsSet(options.songRequirementType)}
			>
				<option value="" selected>—</option>
				<option value="anypiece">Any Piece Requirement</option>
				<option value="attributepiece">Attribute Piece Requirement</option>
			</select>

			{#if options.songRequirementType === "anypiece"}
				<b>Required Pieces</b>
				<div class="flex gap-1">
					<input type="number" min="0" bind:value={options.songPiecesAll} placeholder="—" />
					<select
						class="flex-grow"
						bind:value={options.songPiecesAllMod}
						disabled={!uiOptionIsSet(options.songPiecesAll)}
					>
						<option value="" selected>exactly</option>
						<option value="-">or less</option>
						<option value="+">or more</option>
					</select>
				</div>
			{:else if options.songRequirementType === "attributepiece"}
				<b class="whitespace-nowrap">
					<img class="skill-icon" src="/images/icons/piece_smile.png" alt="Smile" />
					Requirement
				</b>
				<div class="flex gap-1">
					<input type="number" min="0" bind:value={options.songPiecesSmile} placeholder="—" />
					<select
						class="flex-grow"
						bind:value={options.songPiecesSmileMod}
						disabled={!uiOptionIsSet(options.songPiecesSmile)}
					>
						<option value="" selected>exactly</option>
						<option value="-">or less</option>
						<option value="+">or more</option>
					</select>
				</div>

				<b class="whitespace-nowrap">
					<img class="skill-icon" src="/images/icons/piece_pure.png" alt="Pure" /> Requirement
				</b>
				<div class="flex gap-1">
					<input type="number" min="0" bind:value={options.songPiecesPure} placeholder="—" />
					<select
						class="flex-grow"
						bind:value={options.songPiecesPureMod}
						disabled={!uiOptionIsSet(options.songPiecesPure)}
					>
						<option value="" selected>exactly</option>
						<option value="-">or less</option>
						<option value="+">or more</option>
					</select>
				</div>

				<b class="whitespace-nowrap">
					<img class="skill-icon" src="/images/icons/piece_cool.png" alt="Cool" />
					Requirement
				</b>
				<div class="flex gap-1">
					<input type="number" min="0" bind:value={options.songPiecesCool} placeholder="—" />
					<select
						class="flex-grow"
						bind:value={options.songPiecesCoolMod}
						disabled={!uiOptionIsSet(options.songPiecesCool)}
					>
						<option value="" selected>exactly</option>
						<option value="-">or less</option>
						<option value="+">or more</option>
					</select>
				</div>
			{:else}
				<div class="col-span-full mt-2.5 self-start">Select a Requirement Type to show additional search options.</div>
			{/if}
		{:else if options.cardType === "memory"}
			<div class="col-span-full mt-2.5 self-start">Memory cards have no additional search options.</div>
		{:else}
			<div class="col-span-full mt-2.5 self-start">Select a Card Type to show additional search options.</div>
		{/if}
	</div>
</div>
<div class="mt-2 flex w-full items-center justify-end">
	<Button label="Search" accent on:click={query}>Search</Button>
</div>

<style lang="postcss">
	input[type="number"],
	.number {
		@apply w-20;
	}
</style>

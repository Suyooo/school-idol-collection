<script lang="ts">
	import { goto } from "$app/navigation";
	import type { SearchUiOptions } from "$lib/search/ui.js";
	import { uiOptionIsSet, uiOptionsToUrl } from "$lib/search/ui.js";
	import { uppercaseFirst } from "$lib/utils/string.js";
	import Button from "$lib/style/Button.svelte";
	import SearchOptionSelect from "./SearchOptionSelect.svelte";
	import SearchOptionNumberMod from "./SearchOptionNumberMod.svelte";
	import Piece from "$lib/format/Piece.svelte";
	import AttributeEnum from "$lib/enums/attribute.js";
	import SearchOptionText from "./SearchOptionText.svelte";

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
		<SearchOptionText bind:value={options.cardName}>{uppercaseFirst(options.cardType || "Card")} Name</SearchOptionText>

		<SearchOptionSelect
			bind:value={options.group}
			options={[
				["muse", "µ's"],
				["aqours", "Aqours"],
				["printemps", "Printemps"],
				["lilywhite", "lily white"],
				["bibi", "BiBi"],
				["cyaron", "CYaRon!"],
				["azalea", "AZALEA"],
				["guiltykiss", "Guilty Kiss"],
				["saintsnow", "Saint Snow"],
			]}
		>
			Group
		</SearchOptionSelect>

		<SearchOptionSelect
			bind:value={options.cardType}
			options={[
				["member", "Member"],
				["song", "Song"],
				["memory", "Memory"],
			]}
		>
			Card Type
		</SearchOptionSelect>

		<SearchOptionText bind:value={options.cardSet}>Card Set</SearchOptionText>

		<SearchOptionText bind:value={options.skillText}>Skill Text</SearchOptionText>
	</div>
	<div class="mt-4 grid flex-grow basis-0 grid-cols-[1fr,3fr] items-center gap-2 lg:mt-0 lg:pl-4">
		{#if options.cardType === "member"}
			<SearchOptionSelect
				bind:value={options.memberRarity}
				options={[
					["r", "R"],
					["sr", "SR"],
					["hr", "HR"],
					["special", "Special"],
					["secret", "Secret"],
					["pr", "PR"],
					["n", "N"],
					["ssr", "SSR"],
				]}
			>
				Rarity
			</SearchOptionSelect>

			<SearchOptionSelect
				bind:value={options.memberYear}
				options={[
					["year=1", "1st Year"],
					["year=2", "2nd Year"],
					["year=3", "3nd Year"],
				]}
			>
				School Year
			</SearchOptionSelect>

			<SearchOptionNumberMod bind:value={options.memberCost} bind:valueMod={options.memberCostMod} max={3}>
				Cost
			</SearchOptionNumberMod>

			<SearchOptionSelect
				bind:value={options.memberAbility}
				options={[
					["noability", "None"],
					["rush", "[RUSH]"],
					["live", "[LIVE]"],
					["rushorlive", "[RUSH/LIVE]"],
				]}
			>
				Ability
			</SearchOptionSelect>

			<SearchOptionText bind:value={options.memberCostume}>Costume</SearchOptionText>

			<SearchOptionNumberMod bind:value={options.memberPieces} bind:valueMod={options.memberPiecesMod} max={4}>
				Total Pieces
			</SearchOptionNumberMod>

			<SearchOptionNumberMod
				bind:value={options.memberPiecesSmile}
				bind:valueMod={options.memberPiecesSmileMod}
				max={4}
			>
				<Piece attr={AttributeEnum.SMILE} /> Pieces
			</SearchOptionNumberMod>

			<SearchOptionNumberMod bind:value={options.memberPiecesPure} bind:valueMod={options.memberPiecesPureMod} max={4}>
				<Piece attr={AttributeEnum.PURE} /> Pieces
			</SearchOptionNumberMod>

			<SearchOptionNumberMod bind:value={options.memberPiecesCool} bind:valueMod={options.memberPiecesCoolMod} max={4}>
				<Piece attr={AttributeEnum.COOL} /> Pieces
			</SearchOptionNumberMod>

			<SearchOptionNumberMod bind:value={options.memberPiecesAll} bind:valueMod={options.memberPiecesAllMod} max={4}>
				<Piece attr={AttributeEnum.ALL} /> Pieces
			</SearchOptionNumberMod>

			<SearchOptionSelect
				bind:value={options.memberPieceBonus}
				options={[
					["nobonus", "No"],
					["bonus", "Yes"],
				]}
			>
				Birthday Bonus
			</SearchOptionSelect>

			<SearchOptionSelect
				bind:value={options.memberIdolizable}
				options={[
					["notidolizable", "No"],
					["idolizable", "Yes"],
				]}
			>
				Idolizable
			</SearchOptionSelect>
		{:else if options.cardType === "song"}
			<SearchOptionSelect
				bind:value={options.songRarity}
				options={[
					["m", "M"],
					["gr", "GR"],
				]}
			>
				Rarity
			</SearchOptionSelect>

			<SearchOptionSelect
				bind:value={options.songAttribute}
				options={[
					["neutral", "Neutral"],
					["smile", "Smile"],
					["pure", "Pure"],
					["cool", "Cool"],
					["orange", "Orange"],
				]}
			>
				Attribute
			</SearchOptionSelect>

			<SearchOptionNumberMod bind:value={options.songLivePoints} bind:valueMod={options.songLivePointsMod}>
				Base Live Points
			</SearchOptionNumberMod>

			<SearchOptionSelect
				bind:value={options.songRequirementType}
				options={[
					["anypiece", "Any Piece Requirement"],
					["attributepiece", "Attribute Piece Requirement"],
				]}
			>
				Requirement
			</SearchOptionSelect>

			{#if options.songRequirementType === "anypiece"}
				<SearchOptionNumberMod bind:value={options.songPiecesAll} bind:valueMod={options.songPiecesAllMod}>
					Required Pieces
				</SearchOptionNumberMod>
			{:else if options.songRequirementType === "attributepiece"}
				<SearchOptionNumberMod bind:value={options.songPiecesSmile} bind:valueMod={options.songPiecesSmileMod}>
					Required <Piece attr={AttributeEnum.SMILE} /> Pieces
				</SearchOptionNumberMod>

				<SearchOptionNumberMod bind:value={options.songPiecesPure} bind:valueMod={options.songPiecesPureMod}>
					Required <Piece attr={AttributeEnum.PURE} /> Pieces
				</SearchOptionNumberMod>

				<SearchOptionNumberMod bind:value={options.songPiecesCool} bind:valueMod={options.songPiecesCoolMod}>
					Required <Piece attr={AttributeEnum.COOL} /> Pieces
				</SearchOptionNumberMod>
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

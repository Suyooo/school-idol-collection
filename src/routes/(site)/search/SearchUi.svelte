<script lang="ts">
	import { goto } from "$app/navigation";
	import { queryMapToUrl } from "$lib/search/querymap.js";
	import type { SearchQueryMap } from "$lib/search/types.js";
	import Button from "$lib/style/Button.svelte";
	import SearchOptionNumberFixedSelect from "./SearchOptionNumberFixedSelect.svelte";
	import SearchOptionTextOptions from "./SearchOptionTextOptions.svelte";
	import SearchOptionNumberCond from "./SearchOptionNumberCond.svelte";
	import Piece from "$lib/format/Piece.svelte";
	import AttributeEnum from "$lib/enums/attribute.js";
	import SearchOptionTextFree from "./SearchOptionTextFree.svelte";

	export let query: SearchQueryMap;

	function submit() {
		const url = queryMapToUrl(query);
		if (url.length > 0) {
			goto("/search/" + url);
		}
	}
</script>

<form on:submit|preventDefault={submit} action="/redirect/search" method="POST">
	<div class="flex items-start gap-x-8 max-lg:flex-col">
		<div class="grid w-full flex-grow basis-0 grid-cols-[1fr,3fr] items-center gap-2">
			<SearchOptionTextFree key="name" bind:value={query.name}>Card Name</SearchOptionTextFree>

			<SearchOptionTextOptions
				key="group"
				bind:value={query.group}
				options={{
					muse: "µ's",
					aqours: "Aqours",
					printemps: "Printemps",
					lilywhite: "lily white",
					bibi: "BiBi",
					cyaron: "CYaRon!",
					azalea: "AZALEA",
					guiltykiss: "Guilty Kiss",
					saintsnow: "Saint Snow",
				}}
			>
				Group
			</SearchOptionTextOptions>

			<SearchOptionTextOptions
				key="type"
				bind:value={query.type}
				options={{
					member: "Member",
					song: "Song",
					memory: "Memory",
				}}
			>
				Card Type
			</SearchOptionTextOptions>

			<SearchOptionTextFree key="set" bind:value={query.set}>Card Set</SearchOptionTextFree>

			<SearchOptionTextFree key="skill" bind:value={query.skill}>Skill Text</SearchOptionTextFree>
		</div>
		<div class="grid w-full flex-grow basis-0 grid-cols-[1fr,3fr] items-center gap-2 max-lg:mt-12">
			{#if query["type"] === "member"}
				<SearchOptionTextOptions
					key="memberrarity"
					bind:value={query.memberrarity}
					options={{
						r: "R",
						sr: "SR",
						hr: "HR",
						special: "Special",
						secret: "Secret",
						pr: "PR",
						n: "N",
						ssr: "SSR",
					}}
				>
					Rarity
				</SearchOptionTextOptions>

				<SearchOptionNumberFixedSelect
					key="year"
					bind:value={query.year}
					options={{
						1: "1st Year",
						2: "2nd Year",
						3: "3rd Year",
					}}
				>
					School Year
				</SearchOptionNumberFixedSelect>

				<SearchOptionNumberCond key="cost" bind:value={query.cost} max={3}>Cost</SearchOptionNumberCond>

				<SearchOptionTextOptions
					key="ability"
					bind:value={query.ability}
					options={{
						noability: "None",
						rush: "[RUSH]",
						live: "[LIVE]",
						rushorlive: "[RUSH/LIVE]",
					}}
				>
					Ability
				</SearchOptionTextOptions>

				<SearchOptionTextFree key="costume" bind:value={query.costume}>Costume</SearchOptionTextFree>

				<SearchOptionNumberCond key="pieces" bind:value={query.pieces} max={4}>Total Pieces</SearchOptionNumberCond>

				<SearchOptionNumberCond key="smilepieces" bind:value={query.smilepieces} max={4}>
					<Piece attr={AttributeEnum.SMILE} /> Pieces
				</SearchOptionNumberCond>

				<SearchOptionNumberCond key="purepieces" bind:value={query.purepieces} max={4}>
					<Piece attr={AttributeEnum.PURE} /> Pieces
				</SearchOptionNumberCond>

				<SearchOptionNumberCond key="coolpieces" bind:value={query.coolpieces} max={4}>
					<Piece attr={AttributeEnum.COOL} /> Pieces
				</SearchOptionNumberCond>

				<SearchOptionNumberCond key="allpieces" bind:value={query.allpieces} max={4}>
					<Piece attr={AttributeEnum.ALL} /> Pieces
				</SearchOptionNumberCond>

				<SearchOptionTextOptions
					key="bonus"
					bind:value={query.bonus}
					options={{
						bonus: "Yes",
						nobonus: "No",
					}}
				>
					Birthday Bonus
				</SearchOptionTextOptions>

				<SearchOptionTextOptions
					key="idolizable"
					bind:value={query.idolizable}
					options={{
						idolizable: "Yes",
						notidolizable: "No",
					}}
				>
					Idolizable
				</SearchOptionTextOptions>
			{:else if query["type"] === "song"}
				<SearchOptionTextOptions
					key="songrarity"
					bind:value={query.songrarity}
					options={{
						m: "M",
						gr: "GR",
					}}
				>
					Rarity
				</SearchOptionTextOptions>

				<SearchOptionTextOptions
					key="attribute"
					bind:value={query.attribute}
					options={{
						neutral: "Neutral",
						smile: "Smile",
						pure: "Pure",
						cool: "Cool",
						orange: "Orange",
					}}
				>
					Attribute
				</SearchOptionTextOptions>

				<SearchOptionNumberCond key="livepoints" bind:value={query.livepoints}>Base Live Points</SearchOptionNumberCond>

				<SearchOptionTextOptions
					key="requirementtype"
					bind:value={query.requirementtype}
					options={{
						anypiece: "Any Piece Requirement",
						attributepiece: "Attribute Piece Requirement",
					}}
				>
					Requirement
				</SearchOptionTextOptions>

				{#if query.requirementtype === "anypiece"}
					<SearchOptionNumberCond key="required" bind:value={query.required}>Required Pieces</SearchOptionNumberCond>
				{:else if query.requirementtype === "attributepiece"}
					<SearchOptionNumberCond key="smilerequired" bind:value={query.smilerequired}>
						Required <Piece attr={AttributeEnum.SMILE} /> Pieces
					</SearchOptionNumberCond>

					<SearchOptionNumberCond key="purerequired" bind:value={query.purerequired}>
						Required <Piece attr={AttributeEnum.PURE} /> Pieces
					</SearchOptionNumberCond>

					<SearchOptionNumberCond key="coolrequired" bind:value={query.coolrequired}>
						Required <Piece attr={AttributeEnum.COOL} /> Pieces
					</SearchOptionNumberCond>
				{:else}
					<div class="col-span-full mt-2.5 self-start">
						Select a Requirement Type to show additional search options.
					</div>
				{/if}
			{:else if query["type"] === "memory"}
				<div class="col-span-full self-start lg:mt-2.5">Memory cards have no additional search options.</div>
			{:else}
				<div class="col-span-full self-start lg:mt-2.5">Select a Card Type to show additional search options.</div>
			{/if}
		</div>
	</div>
	<div class="mt-2 flex w-full items-center justify-end">
		<Button label="Search" accent>Search</Button>
	</div>
</form>

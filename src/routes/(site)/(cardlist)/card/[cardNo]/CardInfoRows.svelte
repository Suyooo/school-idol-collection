<script lang="ts">
	import { slide } from "svelte-reduced-motion/transition";
	import type Card from "$models/card/card.js";
	import {
		cardBirthday,
		cardCost,
		cardGroupType,
		cardId,
		cardLink,
		cardRarityShort,
		cardTitle,
		cardType,
		cardYear,
	} from "$lib/card/strings.js";
	import {
		cardHasAttrPieceRequirement,
		cardHasBirthdayPieces,
		cardHasGroup,
		cardHasIdolizationPieces,
		cardIsIdolizable,
		cardIsMember,
		cardIsSong,
	} from "$lib/card/types.js";
	import AttributeEnum from "$lib/enums/attribute.js";
	import GroupEnum from "$lib/enums/group.js";
	import Language from "$lib/enums/language.js";
	import type CardPageExtraInfo from "$lib/types/cardPageExtraInfo.js";
	import Ability from "$lib/format/Ability.svelte";
	import PieceCount from "$lib/format/PieceCount.svelte";
	import Skill from "$lib/format/Skill.svelte";
	import Collapse from "$lib/style/icons/Collapse.svelte";
	import Expand from "$lib/style/icons/Expand.svelte";

	export let card: Card;
	export let hideSharedId: boolean = false;
	export let hideBacklinks: boolean = false;
	export let hideFaq: boolean = false;
	let cardWithSharedIdCards: Card & CardPageExtraInfo<true, boolean>;
	$: if (!hideSharedId) cardWithSharedIdCards = card as Card & CardPageExtraInfo<true, boolean>;

	let showJpnSkill: boolean = card.skills.some((s) => s.eng === null),
		showJpnGroupSkill: boolean = card.member?.group?.skills.some((s) => s.eng === null) ?? false;
</script>

<div class="grid" class:!grid-cols-[1fr_2fr_auto]={$$slots.default}>
	{#if $$slots.default}
		<div class="col-start-3 self-center" style:grid-row="1 / 20">
			<slot />
		</div>
	{/if}

	<div class="header">
		Card ID
		{#if !hideSharedId && cardWithSharedIdCards.sameId.length > 0}
			<br /><span class="subheader">Shared With</span>
		{/if}
	</div>
	<div class="value">
		<span class="card-id">{cardId(card)}</span>
		{#if !hideSharedId}
			{#each cardWithSharedIdCards.sameId as sameIdCard (sameIdCard.cardNo)}
				<br />
				<a href="/card/{sameIdCard.cardNo}">
					<span class="card-id">{sameIdCard.cardNo}</span>
					<span class="rarity">{cardRarityShort(sameIdCard)}</span>
				</a>
			{/each}
		{/if}
	</div>

	<div class="header">Type</div>
	<div class="value">{cardType(card)}</div>

	<div class="header">Group</div>
	<div class="value">{GroupEnum.fromId(card.group).toNameWithSuper(", ")}</div>

	{#if cardIsMember(card)}
		<div class="header">Cost</div>
		<div class="value cost">
			{#each cardCost(card) as c}
				<span>{c}</span>
			{/each}
		</div>

		<div class="header">Birthday</div>
		<div class="value">{cardBirthday(card)}</div>

		<div class="header">Year</div>
		<div class="value">{cardYear(card)}</div>

		<div class="header">Ability</div>
		<div class="value">
			<Ability rush={card.member.abilityRush} live={card.member.abilityLive} />
		</div>

		<div class="header">
			Pieces
			{#if cardIsIdolizable(card) && cardHasIdolizationPieces(card)}
				<br /><span class="subheader">Idolized</span>
			{/if}
			{#if cardHasBirthdayPieces(card)}
				<br /><span class="subheader">Birthday</span>
			{/if}
		</div>
		<div class="value">
			<PieceCount pieces={card.member} />
			{#if cardIsIdolizable(card) && cardHasIdolizationPieces(card)}
				<br />
				<PieceCount pieces={card.member.idolizeBonus} />
			{/if}
			{#if cardHasBirthdayPieces(card)}
				<br />
				<PieceCount
					pieces={{
						piecesAll: card.member.pieceBdayAttribute === AttributeEnum.ALL.id ? 1 : 0,
						piecesSmile: card.member.pieceBdayAttribute === AttributeEnum.SMILE.id ? 1 : 0,
						piecesPure: card.member.pieceBdayAttribute === AttributeEnum.PURE.id ? 1 : 0,
						piecesCool: card.member.pieceBdayAttribute === AttributeEnum.COOL.id ? 1 : 0,
					}}
				/>
			{/if}
		</div>

		<div class="header">Costume</div>
		<div class="value">
			{#if card.member.costumeJpn !== null}
				<a href="/search/costume={encodeURIComponent(card.member.costumeEng ?? card.member.costumeJpn)}">
					{card.member.costumeEng ?? card.member.costumeJpn + " (no translation)"}
				</a>
			{:else}
				—
			{/if}
		</div>
	{:else if cardIsSong(card)}
		{@const songAttr = AttributeEnum.fromId(card.song.attribute)}

		<div class="header">Attribute</div>
		<div class="value song-attr {songAttr.toCssClassName()}">
			{songAttr.toSongAttributeName()}
		</div>

		<div class="header">Live Points</div>
		<div class="value">
			{card.song.lpBase}
			{#if card.song.lpBonus}
				({#if card.song.lpBonus.toString().charAt(0) !== "-"}+{/if}{card.song.lpBonus})
			{/if}
		</div>

		<div class="header">Requirement</div>
		<div class="value">
			{#if cardHasAttrPieceRequirement(card)}
				<PieceCount
					pieces={{
						piecesSmile: card.song.attrRequirement.piecesSmile,
						piecesPure: card.song.attrRequirement.piecesPure,
						piecesCool: card.song.attrRequirement.piecesCool,
					}}
					showZero
				/>
			{:else}
				<PieceCount
					pieces={{
						piecesAll: card.song.anyRequirement.piecesAll,
					}}
				/>
			{/if}
		</div>
	{/if}

	<div class="gap" />

	{#if card.skills.length === 0}
		<div class="header wide">Skill</div>
		<div class="value wide">—</div>
	{:else}
		<button class="header wide group relative flex items-start" on:click={() => (showJpnSkill = !showJpnSkill)}>
			Skill
			<div class="absolute bottom-2.5 right-0 h-4 group-hover:text-link-hover">
				{#if showJpnSkill}
					<Collapse />
				{:else}
					<Expand />
				{/if}
			</div>
		</button>
		<div class="value wide">
			{#each card.skills as skill (skill.id)}
				<div>
					<Skill {skill} cardType={card.type} />
				</div>
			{/each}
		</div>

		{#if showJpnSkill}
			<div class="header wide" transition:slide={{}}>
				<span class="subheader">Japanese</span>
				{#if import.meta.env.DEV}
					{#each card.skills as skill (skill.id)}
						<span><a href="/admin/pattern/edit/{skill.patternId ?? 'new'}/{skill.id}">🖉</a></span><br />
					{/each}
				{/if}
			</div>
			<div class="value wide" transition:slide={{}}>
				{#each card.skills as skill (skill.id)}
					<div>
						<Skill {skill} lang={Language.JPN} cardType={card.type} />
					</div>
				{/each}
			</div>
		{/if}
	{/if}

	{#if cardIsMember(card) && cardHasGroup(card)}
		<div class="gap" />

		<div class="header wide">{cardGroupType(card)} With</div>
		<div class="value wide">
			{#each card.member.group.memberExtraInfos as member (member.cardNo)}
				{#if member.cardNo !== card.cardNo}
					<div>
						<a href="/card/{member.cardNo}">{@html cardTitle(member.card, true)}</a>
					</div>
				{/if}
			{/each}
		</div>

		<button
			class="header wide group relative flex items-start"
			on:click={() => (showJpnGroupSkill = !showJpnGroupSkill)}
		>
			{cardGroupType(card)} Skill
			<div class="absolute bottom-2.5 right-0 h-4 group-hover:text-link-hover">
				{#if showJpnGroupSkill}
					<Collapse />
				{:else}
					<Expand />
				{/if}
			</div>
		</button>
		<div class="value wide">
			{#each card.member.group.skills as skill (skill.id)}
				<div>
					<Skill {skill} />
				</div>
			{/each}
		</div>

		{#if showJpnGroupSkill}
			<div class="header wide" transition:slide={{}}>
				<span class="subheader">Japanese</span>
				{#if import.meta.env.DEV}
					{#each card.member.group.skills as skill (skill.id)}
						<span><a href="/admin/pattern/edit/{skill.patternId ?? 'new'}/{skill.id}">🖉</a></span><br />
					{/each}
				{/if}
			</div>
			<div class="value wide" transition:slide={{}}>
				{#each card.member.group.skills as skill (skill.id)}
					<div>
						<Skill {skill} lang={Language.JPN} />
					</div>
				{/each}
			</div>
		{/if}
	{/if}

	{#if card.linkedBy.length > 0 && !hideBacklinks}
		<div class="gap" />

		<div class="header wide">See Also</div>
		<div class="value wide">
			{#each card.linkedBy as link (link.id)}
				{#if link.skill.card !== null}
					<div>
						{@html cardLink(link.skill.card)}
					</div>
				{:else}
					{#each link.skill.group.memberExtraInfos as member}
						<div>
							{@html cardLink(member.card)}
						</div>
					{/each}
				{/if}
			{/each}
		</div>
	{/if}

	{#if card.faqs.length > 0 && !hideFaq}
		{#if card.linkedBy.length === 0 || hideBacklinks}
			<div class="gap" />
		{/if}

		<div class="header wide">Related FAQ</div>
		<div class="value wide faqs">
			{#each card.faqs as faq (faq.cardId + "_" + faq.displayOrder)}
				<a href={faq.link}>
					<Skill skill={faq.labelPreparsed ?? faq.label} parseAsHelpText />
					{#if faq.shortAnswer}
						<span class="!text-text-cardid">({faq.shortAnswer})</span>
					{/if}
				</a>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.grid {
		@apply box-content grid-cols-[1fr_2fr] align-top leading-5 lg:grid-cols-[1fr_2fr_1fr_2fr];

		& .header,
		& .value {
			@apply mt-[-1px] border-y border-background-accent px-2 py-1;
		}
		& .header {
			@apply rounded-l bg-background-accent text-xs font-bold uppercase leading-5 tracking-widest lg:ml-4;

			& > span.subheader {
				@apply float-right font-normal;
			}

			&.wide {
				@apply col-start-1;
			}
		}

		& .value {
			&.wide {
				@apply col-start-2 col-end-[-1];
			}
		}

		& .gap {
			@apply col-span-full h-4 lg:ml-4;
		}
	}

	.cost > span {
		@apply inline-block w-4 text-center text-attribute-all;
	}

	.song-attr {
		@apply font-bold;

		&.all {
			@apply text-attribute-all;
		}

		&.smile {
			@apply text-attribute-smile;
		}

		&.pure {
			@apply text-attribute-pure;
		}

		&.cool {
			@apply text-attribute-cool;
		}
	}

	.faqs > a {
		@apply relative block pl-4;

		&:before {
			@apply absolute left-0 top-0 font-bold text-text-subtle;
			content: "⏵";
		}
	}
</style>

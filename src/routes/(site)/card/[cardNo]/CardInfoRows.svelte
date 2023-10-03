<script lang="ts">
    import type Card from "$m/card/card.js";
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
    } from "$l/card/strings.js";
    import {
        cardHasAttrPieceRequirement,
        cardHasBirthdayPieces,
        cardHasGroup,
        cardHasIdolizationPieces,
        cardIsIdolizable,
        cardIsMember,
        cardIsSong,
    } from "$l/card/types.js";
    import AttributeEnum from "$l/enums/attribute.js";
    import GroupEnum from "$l/enums/group.js";
    import Language from "$l/enums/language.js";
    import type CardPageExtraInfo from "$l/types/cardPageExtraInfo.js";
    import { escapeForUrl } from "$l/utils/string.js";
    import Ability from "$l/format/Ability.svelte";
    import PieceCount from "$l/format/PieceCount.svelte";
    import Skill from "$l/format/Skill.svelte";

    export let card: Card;
    export let hideSharedId: boolean = false;
    export let hideBacklinks: boolean = false;
    export let hideFaq: boolean = false;
    export let forceSingleColumn: boolean = false;
    let cardWithSharedIdCards: Card & CardPageExtraInfo<true, boolean>;
    $: if (!hideSharedId) cardWithSharedIdCards = card as Card & CardPageExtraInfo<true, boolean>;
</script>

<div class="row gap">
    <div class="inforow" class:col-half={!forceSingleColumn}>
        <div>
            Card ID
            {#if !hideSharedId && cardWithSharedIdCards.sameId.length > 0}
                <br /><span>Shared With</span>
            {/if}
        </div>
        <div>
            {cardId(card)}
            {#if !hideSharedId}
                {#each cardWithSharedIdCards.sameId as sameIdCard (sameIdCard.cardNo)}
                    <br />
                    <a href="/card/{sameIdCard.cardNo}">
                        {sameIdCard.cardNo}
                        <span class="rarity">{cardRarityShort(sameIdCard)}</span>
                    </a>
                {/each}
            {/if}
        </div>
    </div>
    <div class="inforow" class:col-half={!forceSingleColumn}>
        <div>Type</div>
        <div>{cardType(card)}</div>
    </div>
</div>
{#if cardIsMember(card)}
    <div class="row">
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>Group</div>
            <div>{GroupEnum.fromId(card.group).toNameWithSuper(", ")}</div>
        </div>
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>Cost</div>
            <div class="cost">
                {#each cardCost(card) as c}
                    <span>{c}</span>
                {/each}
            </div>
        </div>
    </div>
    <div class="row">
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>Birthday</div>
            <div>{cardBirthday(card)}</div>
        </div>
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>Year</div>
            <div>{cardYear(card)}</div>
        </div>
    </div>
    <div class="row">
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>Ability</div>
            <div>
                <Ability rush={card.member.abilityRush} live={card.member.abilityLive} />
            </div>
        </div>
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>
                Pieces
                {#if cardIsIdolizable(card) && cardHasIdolizationPieces(card)}
                    <br /><span>Idolized</span>
                {/if}
                {#if cardHasBirthdayPieces(card)}
                    <br /><span>Birthday</span>
                {/if}
            </div>
            <div>
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
        </div>
    </div>
    <div class="row inforow" class:multicol={!forceSingleColumn}>
        <div>Costume</div>
        <div>
            {#if card.member.costumeJpn !== null}
                <a href="/search/costume:{escapeForUrl(card.member.costumeEng ?? card.member.costumeJpn)}">
                    {card.member.costumeEng ?? card.member.costumeJpn}
                </a>
            {:else}
                —
            {/if}
        </div>
    </div>
{:else if cardIsSong(card)}
    {@const songAttr = AttributeEnum.fromId(card.song.attribute)}
    <div class="row">
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>Group</div>
            <div>{GroupEnum.fromId(card.group).toNameWithSuper(", ", false)}</div>
        </div>
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>Attribute</div>
            <div class="song-attr {songAttr.toCssClassName()}">
                {songAttr.toSongAttributeName()}
            </div>
        </div>
    </div>
    <div class="row">
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>Live Points</div>
            <div>
                {card.song.lpBase}
                {#if card.song.lpBonus}
                    ({#if card.song.lpBonus.toString().charAt(0) !== "-"}+{/if}{card.song.lpBonus})
                {/if}
            </div>
        </div>
        <div class="inforow" class:col-half={!forceSingleColumn}>
            <div>Requirement</div>
            <div>
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
        </div>
    </div>
{:else}
    <div class="row inforow" class:multicol={!forceSingleColumn}>
        <div>Group</div>
        <div>{GroupEnum.fromId(card.group).toNameWithSuper(", ")}</div>
    </div>
{/if}
{#if card.skills.length === 0}
    <div class="row inforow gap" class:multicol={!forceSingleColumn}>
        <div>Skill</div>
        <div>—</div>
    </div>
{:else}
    <div class="row inforow gap" class:multicol={!forceSingleColumn}>
        <div>Skill</div>
        <div>
            {#each card.skills as skill (skill.id)}
                <div>
                    <Skill {skill} lang={Language.JPN} cardType={card.type} />
                </div>
            {/each}
        </div>
    </div>
    <div class="row inforow" class:multicol={!forceSingleColumn}>
        <div>
            {#if import.meta.env.DEV}
                {#each card.skills as skill (skill.id)}
                    <span><a href="/admin/pattern/edit/{skill.patternId ?? 'new'}/{skill.id}">🖉</a></span><br />
                {/each}
            {/if}
        </div>
        <div>
            {#each card.skills as skill (skill.id)}
                <div>
                    <Skill {skill} cardType={card.type} />
                </div>
            {/each}
        </div>
    </div>
{/if}

{#if cardIsMember(card) && cardHasGroup(card)}
    <div class="row inforow gap" class:multicol={!forceSingleColumn}>
        <div>{cardGroupType(card)} With</div>
        <div>
            {#each card.member.group.memberExtraInfos as member (member.cardNo)}
                {#if member.cardNo !== card.cardNo}
                    <div>
                        <a href="/card/{member.cardNo}">{@html cardTitle(member.card, true)}</a>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
    <div class="row inforow" class:multicol={!forceSingleColumn}>
        <div>{cardGroupType(card)} Skill</div>
        <div>
            {#each card.member.group.skills as skill (skill.id)}
                <div>
                    <Skill {skill} lang={Language.JPN} />
                </div>
            {/each}
        </div>
    </div>
    <div class="row inforow" class:multicol={!forceSingleColumn}>
        <div>
            {#if import.meta.env.DEV}
                {#each card.member.group.skills as skill (skill.id)}
                    <span><a href="/admin/pattern/edit/{skill.patternId ?? 'new'}/{skill.id}">🖉</a></span><br />
                {/each}
            {/if}
        </div>
        <div>
            {#each card.member.group.skills as skill (skill.id)}
                <div>
                    <Skill {skill} />
                </div>
            {/each}
        </div>
    </div>
{/if}

{#if card.linkedBy.length > 0 && !hideBacklinks}
    <div class="row inforow gap" class:multicol={!forceSingleColumn}>
        <div>See Also</div>
        <div>
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
    </div>
{/if}

{#if !hideFaq && card.faqs.length > 0}
    <div class="row inforow" class:multicol={!forceSingleColumn} class:gap={card.linkedBy.length === 0}>
        <div>Related FAQ</div>
        <div class="faqs">
            {#each card.faqs as faq (faq.cardId + "_" + faq.displayOrder)}
                <a href={faq.link}>
                    <Skill skill={faq.labelPreparsed ?? faq.label} parseAsHelpText />
                    {#if faq.shortAnswer}
                        <span class="text-primary-100">({faq.shortAnswer})</span>
                    {/if}
                </a>
            {/each}
        </div>
    </div>
{/if}

<style lang="postcss">
    .inforow {
        @apply flex;

        & div {
            @apply border-t border-primary-700;
        }

        & > div {
            @apply px-2 py-1;

            &:first-child {
                @apply bg-primary-500 font-bold text-xs uppercase tracking-widest leading-5 basis-[30%] flex-grow-0 flex-shrink-0;

                & > span {
                    @apply float-right font-normal;
                }
            }

            &:last-child {
                @apply flex-grow flex-shrink basis-[70%];
            }
        }
    }

    .gap {
        @apply mt-4;
    }

    .row.inforow.multicol > div:first-child {
        @apply lg:basis-[15%];
    }

    .row.inforow.multicol > div:last-child {
        @apply lg:basis-[85%];
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
        @apply relative pl-4 block;

        &:before {
            @apply absolute top-0 left-0 text-primary-300 font-bold;
            content: "⏵";
        }
    }
</style>

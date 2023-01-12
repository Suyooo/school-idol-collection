<script lang="ts">
    import Ability from "$lib/format/Ability.svelte";
    import CardImage from "$lib/format/CardImage.svelte";
    import PieceCount from "$lib/format/PieceCount.svelte";
    import Skill from "$lib/format/Skill.svelte";
    import Attribute from "$lib/types/attribute.js";
    import Language from "$lib/types/language.js";
    import {escapeForUrl} from "$lib/utils/string";
    import type {PageData} from './$types.js';
    import {
        cardBirthday,
        cardCost,
        cardGroupType,
        cardId,
        cardRarity,
        cardTitle,
        cardType,
        cardYear
    } from "$lib/card/strings.js";
    import type Card from "$models/card/card.js";
    import {
        cardHasAttrPieceRequirement,
        cardHasBirthdayPieces, cardHasGroup,
        cardHasIdolizationPieces,
        cardIsIdolizable,
        cardIsMember,
        cardIsSong
    } from "$lib/card/types.js";
    import type CardPageExtraInfo from "$lib/types/cardPageExtraInfo.js";
    import CardPageButtons from "./CardPageButtons.svelte";

    export let data: PageData;
    let card: Card & CardPageExtraInfo;
    $: card = data.card;
</script>

<svelte:head>
    <title>{cardTitle(card, false)} &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="row lg:flex">
        <div class="col-quarter imgcont">
            <div>
                <CardImage cardNo={card.cardNo} cardSet={card.cardSet} front/>
            </div>
            <div>
                <CardImage cardNo={card.cardNo} cardSet={card.cardSet}/>
            </div>
        </div>
        <div class="col-threequarters">
            <div class="mb-4">
                <CardPageButtons prevCardNo={card.prevCardNo} nextCardNo={card.nextCardNo} cardSet={card.cardSet}
                                 listLinksOnLargeOnly/>
            </div>

            <div class="panel">
                <div class="panel-inner">
                    <div class="row">
                        <h5>{@html cardTitle(card, true)}</h5>
                    </div>
                    <div class="row gap">
                        <div class="col-half inforow">
                            <div>
                                Card ID
                                {#if card.sameId.length > 0}
                                    <br><span>Shared With</span>
                                {/if}
                            </div>
                            <div>
                                {cardId(card)}
                                {#each card.sameId as sameIdCard (sameIdCard.cardNo)}
                                    <br>
                                    <a href="/card/{sameIdCard.cardNo}">{sameIdCard.cardNo}
                                        ({cardRarity(sameIdCard)})</a>
                                {/each}
                            </div>
                        </div>
                        <div class="col-half inforow">
                            <div>Type</div>
                            <div>{cardType(card)}</div>
                        </div>
                    </div>
                    {#if cardIsMember(card)}
                        <div class="row">
                            <div class="col-half inforow">
                                <div>Rarity</div>
                                <div>{cardRarity(card)}</div>
                            </div>
                            <div class="col-half inforow">
                                <div>Cost</div>
                                <div class="cost">
                                    {#each cardCost(card) as c}
                                        <span>{c}</span>
                                    {/each}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-half inforow">
                                <div>Birthday</div>
                                <div>{cardBirthday(card)}</div>
                            </div>
                            <div class="col-half inforow">
                                <div>Year</div>
                                <div>{cardYear(card)}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-half inforow">
                                <div>Ability</div>
                                <div>
                                    <Ability rush={card.member.abilityRush} live={card.member.abilityLive}/>
                                </div>
                            </div>
                            <div class="col-half inforow">
                                <div>
                                    Pieces
                                    {#if cardIsIdolizable(card) && cardHasIdolizationPieces(card)}
                                        <br><span>Idolized</span>
                                    {/if}
                                    {#if cardHasBirthdayPieces(card)}
                                        <br><span>Birthday</span>
                                    {/if}
                                </div>
                                <div>
                                    <PieceCount pieces={card.member}/>
                                    {#if cardIsIdolizable(card) && cardHasIdolizationPieces(card)}
                                        <br>
                                        <PieceCount pieces={card.member.idolizeBonus}/>
                                    {/if}
                                    {#if cardHasBirthdayPieces(card)}
                                        <br>
                                        <PieceCount pieces={{
                                            piecesAll: card.member.pieceBdayAttribute === Attribute.ID_ALL ? 1 : 0,
                                            piecesSmile: card.member.pieceBdayAttribute === Attribute.ID_SMILE ? 1 : 0,
                                            piecesPure: card.member.pieceBdayAttribute === Attribute.ID_PURE ? 1 : 0,
                                            piecesCool: card.member.pieceBdayAttribute === Attribute.ID_COOL ? 1 : 0
                                        }}/>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <div class="row inforow">
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
                        {@const songAttr = Attribute.get(card.song.attribute)}
                        <div class="row">
                            <div class="col-half inforow">
                                <div>Rarity</div>
                                <div>{cardRarity(card)}</div>
                            </div>
                            <div class="col-half inforow">
                                <div>Attribute</div>
                                <div class="song-attr {songAttr.cssClassName}">{songAttr.songAttributeNameEng}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-half inforow">
                                <div>Live Points</div>
                                <div>
                                    {card.song.lpBase}
                                    {#if card.song.lpBonus}
                                        (
                                        {#if card.song.lpBonus.toString().charAt(0) !== "-"}+{/if}{card.song.lpBonus})
                                    {/if}
                                </div>
                            </div>
                            <div class="col-half inforow">
                                <div>Requirement</div>
                                <div>
                                    {#if cardHasAttrPieceRequirement(card)}
                                        <PieceCount pieces={{
                                            piecesSmile: card.song.attrRequirement.piecesSmile,
                                            piecesPure: card.song.attrRequirement.piecesPure,
                                            piecesCool: card.song.attrRequirement.piecesCool,
                                        }} showZero/>
                                    {:else}
                                        <PieceCount pieces={{
                                            piecesAll: card.song.anyRequirement.piecesAll
                                        }}/>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/if}
                    {#if card.skills.length === 0}
                        <div class="row inforow gap">
                            <div>Skill</div>
                            <div>—</div>
                        </div>
                    {:else}
                        <div class="row inforow gap">
                            <div>
                                Skill
                                {#if import.meta.env.DEV}
                                    {#each card.skills as skill (skill.id)}
                                        <br>
                                        <a href="/annotate/edit/{skill.id}">🖉</a>
                                    {/each}
                                {/if}
                            </div>
                            <div>
                                {#each card.skills as skill (skill.id)}
                                    <div>
                                        <Skill skill={skill} lang={Language.JPN} isSongCard={cardIsSong(card)}/>
                                    </div>
                                {/each}
                            </div>
                        </div>
                        <div class="row inforow">
                            <div>
                                &nbsp;
                                {#if import.meta.env.DEV}
                                    {#each card.skills as skill (skill.id)}
                                        <br>
                                        <a href="/pattern/apply/{skill.patternId}">🖉</a>
                                    {/each}
                                {/if}
                            </div>
                            <div>
                                {#each card.skills as skill (skill.id)}
                                    <div>
                                        <Skill skill={skill} isSongCard={cardIsSong(card)}/>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    {#if cardIsMember(card) && cardHasGroup(card)}
                        <div class="row inforow gap">
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
                        <div class="row inforow">
                            <div>{cardGroupType(card)} Skill</div>
                            <div>
                                {#each card.member.group.skills as skill (skill.id)}
                                    <div>
                                        <Skill skill={skill} lang={Language.JPN}/>
                                    </div>
                                {/each}
                            </div>
                        </div>
                        <div class="row inforow">
                            <div>&nbsp;</div>
                            <div>
                                {#each card.member.group.skills as skill (skill.id)}
                                    <div>
                                        <Skill skill={skill}/>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    {#if card.linkedBy.length > 0}
                        <div class="row inforow gap">
                            <div>See Also</div>
                            <div>
                                {#each card.linkedBy as link (link.id)}
                                    {#if link.skill.card !== null}
                                        <div>
                                            <a href="/card/{link.skill.card.cardNo}">
                                                {@html cardTitle(link.skill.card, true)}
                                            </a>
                                        </div>
                                    {/if}<!-- TODO: link to groups? -->
                                {/each}
                            </div>
                        </div>
                    {/if}

                    {#if card.faqs.length > 0}
                        <div class="row inforow" class:gap={card.linkedBy.length === 0}>
                            <div>Related FAQ</div>
                            <div class="faqs">
                                {#each card.faqs as faq (faq.cardId + "_" + faq.displayOrder)}
                                    <a href={faq.link}>{faq.label}</a>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="cardcopyright">{card.copyright}</div>
            <div class="mt-4">
                <CardPageButtons prevCardNo={card.prevCardNo} nextCardNo={card.nextCardNo} cardSet={card.cardSet}/>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .imgcont {
        @apply flex gap-2 justify-center items-center lg:flex-col lg:justify-start mb-4 lg:mt-14 lg:mb-0;

        & > div {
            @apply mx-4;

            & > :global(img) {
                @apply max-w-full;
            }
        }
    }

    .row > h5 {
        @apply text-center w-full font-bold bg-primary-500 m-0 px-4 tracking-normal normal-case;
    }

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
                @apply flex-grow flex-shrink;
            }
        }
    }

    .gap {
        @apply mt-4;
    }

    .row.inforow > div:first-child {
        @apply lg:basis-[15%]
    }

    .cost > span {
        @apply inline-block w-4 text-center text-accent-300;
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
            @apply absolute top-0 left-0 text-primary-500 font-bold;
            content: "⏵";
        }
    }

    .cardcopyright {
        @apply text-right text-xs text-primary-500 mt-2 mb-1;
    }
</style>
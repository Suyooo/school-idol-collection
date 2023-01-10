<script lang="ts">
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
        cardHasBirthdayPieces, cardHasGroup,
        cardHasIdolizationPieces,
        cardIsIdolizable,
        cardIsMember, cardIsMemory,
        cardIsSong
    } from "$lib/card/types.js";
    import type CardPageExtraInfo from "$types/cardPageExtraInfo.js";

    export let data: PageData;
    let card: Card & CardPageExtraInfo, set: string;
    $: card = data.card;
    $: set = card.cardNo.split("-")[0];
</script>

<svelte:head>
    <title>{cardTitle(card, false)} &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="row lg:flex">
        <div class="col-quarter imgcont">
            <div>
                <img src="/images/{set}/{card.cardNo}-front.jpg" alt="{card.cardNo} Front Illustration"
                     class="rounded-card" class:card-h={!cardIsMember(card)}>
            </div>
            <div>
                <img src="/images/{set}/{card.cardNo}-back.jpg" alt="{card.cardNo} Back Illustration"
                     class="rounded-card" class:card-h={cardIsMemory(card)}>
            </div>
        </div>
        <div class="col-threequarters">
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
                                    {#if card.member.abilityRush}
                                        <span class='ability rush'>[RUSH]</span>
                                        {#if card.member.abilityLive}
                                            <span class='ability or'>/</span><span class='ability live'>[LIVE]</span>
                                        {/if}
                                    {:else if card.member.abilityLive}
                                        <span class='ability live'>[LIVE]</span>
                                    {:else}
                                        —
                                    {/if}
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
                                    {card.member.piecesSmile}/{card.member.piecesPure}/{card.member.piecesCool}
                                    /{card.member.piecesAll}
                                    {#if cardIsIdolizable(card) && cardHasIdolizationPieces(card)}
                                        <br>{card.member.idolizeBonus.piecesSmile}/{card.member.idolizeBonus.piecesPure}
                                        /{card.member.idolizeBonus.piecesCool}/{card.member.idolizeBonus.piecesAll}
                                    {/if}
                                    {#if cardHasBirthdayPieces(card)}
                                        <br>{card.member.pieceBdayAttribute}
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <div class="row inforow">
                            <div>Costume</div>
                            <div>{card.member.costumeJpn ? card.member.costumeJpn || card.member.costumeEng : "—"}</div>
                        </div>
                    {:else if cardIsSong(card)}
                        <div class="row">
                            <div class="col-half inforow">
                                <div>Rarity</div>
                                <div>{cardRarity(card)}</div>
                            </div>
                            <div class="col-half inforow">
                                <div>Attribute</div>
                                <div>{card.song.attribute}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-half inforow">
                                <div>Live Points</div>
                                <div>{card.song.lpBase} {card.song.lpBonus ? card.song.lpBonus : ""}</div>
                            </div>
                            <div class="col-half inforow">
                                <div>Requirement</div>
                                <div>{card.song.requirementType}</div>
                            </div>
                        </div>
                    {/if}
                    {#if card.skills === null}
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
                                    {skill.jpn}
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
                                    {skill.eng}
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
                                        <a href="/card/{member.cardNo}">{@html cardTitle(member.card, true)}</a>
                                    {/if}
                                {/each}
                            </div>
                        </div>
                        <div class="row inforow">
                            <div>{cardGroupType(card)} Skill</div>
                            <div>
                                {#each card.member.group.skills as skill (skill.id)}
                                    {skill.jpn}
                                {/each}
                            </div>
                        </div>
                        <div class="row inforow">
                            <div>&nbsp;</div>
                            <div>
                                {#each card.member.group.skills as skill (skill.id)}
                                    {skill.eng}
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
                                        <a href="/card/{link.skill.card.cardNo}">
                                            {@html cardTitle(link.skill.card, true)}
                                        </a>
                                    {/if}
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
            <!--<div class="buttons">
                <div class="buttonrow">
                    <% if (f.prevCardNo !== null) { %>
                    <a class="button button-primary" href="/card/<%= f.prevCardNo %>">&#129152;</a>
                    <% } %>
                    <% if (f.nextCardNo !== null) { %>
                    <a class="button button-primary" href="/card/<%= f.nextCardNo %>">&#129154;</a>
                    <% } %>
                </div>
                <div class="buttonrow">
                    <a class="button" href="/set/<%= f.set %>">View Set</a>
                </div>
                <div class="buttonrow">
                    <a class="button" href="/">View Full Card List</a>
                </div>
            </div>-->
        </div>
    </div>
</div>

<style lang="postcss">
    .imgcont {
        @apply flex gap-2 justify-center items-center lg:flex-col lg:justify-start mt-2;
    }

    .imgcont > div {
        @apply mx-4;
    }

    .imgcont > div > img {
        @apply max-w-full object-contain;
    }

    .row > h5 {
        @apply text-center w-full font-bold bg-primary-500 m-0;
    }

    .inforow {
        display: flex;
    }

    .inforow div {
        @apply border-t border-primary-700;
    }

    .inforow > div {
        @apply px-2 py-1;
    }

    .inforow > div:first-child {
        @apply bg-primary-500 font-bold text-xs uppercase tracking-widest leading-6 basis-[30%] flex-grow-0 flex-shrink-0;
    }

    .row.inforow > div:first-child {
        @apply lg:basis-[15%]
    }

    .inforow > div:last-child {
        @apply flex-grow flex-shrink;
    }

    .cost > span {
        @apply inline-block w-4 text-center text-accent-300;
    }

    .gap {
        @apply mt-4;
    }

    .inforow > div:first-child > span {
        @apply float-right font-normal;
    }

    .buttons {
        width: 100%;
        text-align: center;
    }

    .buttons .buttonrow {
        padding-top: 1em;
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .buttons .buttonrow .button {
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 0;
        margin: 0 0.5em;
    }

    .buttons .buttonrow:first-child .button {
        flex-grow: 0;
    }

    .cardcopyright {
        @apply text-right text-xs text-primary-500 mt-2 mb-1;
    }

    .faqs > a {
        @apply relative pl-4 block;
    }

    .faqs > a:before {
        @apply absolute top-0 left-0 text-primary-500 font-bold;
        content: "⏵";
    }

    @media (min-width: 950px) {
        .buttons .buttonrow {
            display: inline-block;
            width: unset;
        }
    }
</style>
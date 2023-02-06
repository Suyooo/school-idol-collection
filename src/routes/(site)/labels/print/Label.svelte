<script lang="ts">
    import {cardHasGroup} from "$lib/card/types";
    import {cardIsMember, cardIsSong} from "$lib/card/types.js";
    import CardMemberGroupType from "$lib/enums/cardMemberGroupType.js";
    import {CardOrientation} from "$lib/enums/cardOrientation.js";
    import {CardMemberRarity, CardSongRarity} from "$lib/enums/cardRarity.js";
    import Skill from "$lib/format/Skill.svelte";
    import type Card from "$models/card/card.js";

    export let cardNo: string;
    export let byCardNo: { [cardNo: string]: Card };
    export let byCardId: { [cardId: number]: Card };
    let card: Card, showGroupSkills: boolean, isLandscape: boolean | undefined = undefined;

    $: {
        card = byCardNo[cardNo];
        showGroupSkills = cardIsMember(card) && cardHasGroup(card) && card.member.group.skills.length > 0;
        isLandscape = card.frontOrientation === CardOrientation.LANDSCAPE;
    }
</script>

<div class="label" class:narrow={!isLandscape} class:wide={isLandscape}>
    <div class="skillsallcards">
        {#each (showGroupSkills ? card.member.group.expectedMemberIds.split("|").filter(c => c !== "").map(c => byCardId[c]) : [card]) as c}
            <div class="skillscard" class:othergroupmember={c.cardNo !== cardNo}>
                {#if c.skills.length > 0}
                    <div class="skills">
                        {#each c.skills as skill (skill.id)}
                            <div>
                                <Skill skill={skill} cardType={c.type}/>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    {#if showGroupSkills}
        <div class="skillsgroup" class:pair={card.member.group.type === CardMemberGroupType.PAIR}
             class:trio={card.member.group.type === CardMemberGroupType.TRIO}
             style:--group-pos={card.member.group.expectedMemberIds.split("|").indexOf(card.id.toString()) - 1}>
            {#each card.member.group.skills as skill (skill.id)}
                <div>
                    <Skill skill={skill} cardType={card.type}/>
                </div>
            {/each}
        </div>
    {/if}
    {#if cardIsMember(card) && card.member.costumeEng}
        <div class="costume">
            <span><span>⏵</span><span>{card.member.costumeEng}</span></span>
        </div>
    {/if}
    <hr>
    <div class="ids">
        <div>
            {card.cardNo}
            {cardIsMember(card) ? CardMemberRarity[card.member.rarity] : cardIsSong(card) ? CardSongRarity[card.song.rarity] : "ME"}
        </div>
        <div>ID: {card.id}</div>
    </div>
    <hr>
    <div class="fold"></div>
</div>

<style lang="postcss">
    .label {
        --group-skill-margin: 1mm;
        --group-skill-overlap: 0.5mm;

        @apply flex-none w-0 flex flex-col text-justify box-border overflow-hidden;
        font-family: "Open Sans", Arial, sans-serif;
        font-size: 3mm;
        line-height: 3mm;
        letter-spacing: -0.1mm;
        outline: 1mm solid rgb(230, 230, 230);
        outline-offset: -0.5mm;

        &.narrow {
            width: 63.5mm;
        }

        &.wide {
            width: 88mm;
        }

        & > div {
            @apply w-full;
            z-index: 1;

            &.skillsallcards {
                padding: 1mm 2mm;
                font-stretch: semi-condensed;
                display: flex;

                & > .skillscard {
                    width: 100%;
                    flex-grow: 0;
                    flex-shrink: 0;
                    flex-wrap: nowrap;

                    &.othergroupmember {
                        opacity: 0;
                        margin-right: -100%;
                    }
                }
            }

            &.skillsgroup {
                --group-pos: 0;
                padding: 1mm .5mm;
                font-stretch: semi-condensed;
                border: 0.25mm solid black;
                margin-left: calc((-100% + var(--group-skill-overlap) * 2) * var(--group-pos) + var(--group-skill-margin));
                margin-bottom: 1mm;

                &.pair {
                    width: calc(200% - var(--group-skill-margin) * 2 - var(--group-skill-overlap) * 2);
                }

                &.trio {
                    width: calc(300% - var(--group-skill-margin) * 2 - var(--group-skill-overlap) * 4);
                }
            }

            &.costume {
                margin: 0 .5mm .5mm;

                & > span {
                    @apply rounded-full inline-flex items-center;
                    padding: .5mm 2.5mm .5mm 2mm;
                    border: 2px solid hotpink;
                    color: hotpink;

                    & > span:first-child {
                        display: inline-block;
                        border: 2px solid hotpink;
                        @apply rounded-full text-center;
                        width: 3mm;
                        height: 3mm;
                        line-height: 1.5mm;
                        margin-right: 2mm;
                    }

                    & > span:last-child {
                        font-weight: bold;
                        font-stretch: semi-condensed;
                        margin-top: -.25mm;
                    }
                }
            }

            &.ids {
                @apply flex justify-between;
                padding: 0 1mm;
                height: 3mm;
                font-size: 2mm;
                line-height: 3mm;
            }

            &.fold {
                height: 10mm;
            }
        }

        & > hr {
            z-index: 1;
            border-top: 0.25mm solid black;
        }
    }
</style>
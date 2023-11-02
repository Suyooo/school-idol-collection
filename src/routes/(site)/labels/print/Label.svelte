<script lang="ts">
    import type Card from "$models/card/card.js";
    import { cardHasGroup } from "$lib/card/types.js";
    import { cardIsMember, cardIsSong } from "$lib/card/types.js";
    import CardMemberGroupType from "$lib/enums/cardMemberGroupType.js";
    import { CardOrientation } from "$lib/enums/cardOrientation.js";
    import { CardMemberRarity, CardSongRarity } from "$lib/enums/cardRarity.js";
    import Skill from "$lib/format/Skill.svelte";

    export let cardNo: string;
    export let byCardNo: { [cardNo: string]: Card };
    export let byCardId: { [cardId: number]: Card };
    let card: Card,
        showGroupSkills: boolean,
        isLandscape: boolean | undefined = undefined;

    $: {
        card = byCardNo[cardNo];
        showGroupSkills = cardIsMember(card) && cardHasGroup(card) && (card.member?.group?.skills.length ?? 0) > 0;
        isLandscape = card.frontOrientation === CardOrientation.LANDSCAPE;
    }
</script>

<div class="label" class:narrow={!isLandscape} class:wide={isLandscape}>
    <div class="skillsallcards">
        {#each card.member && card.member.group && showGroupSkills ? card.member.group.expectedMemberIds
                  .split("|")
                  .filter((c) => c !== "")
                  .map((c) => byCardNo[byCardId[parseInt(c)].cardNo]) : [card] as c}
            {#if c.skills.length > 0}
                <div class="skillscard" class:othergroupmember={c.cardNo !== cardNo}>
                    {#each c.skills as skill (skill.id)}
                        <div>
                            <Skill {skill} cardType={c.type} />
                        </div>
                    {/each}
                </div>
            {/if}
        {/each}
    </div>
    {#if card.member && card.member.group && showGroupSkills}
        <div
            class="skillsgroup"
            class:pair={card.member.group.type === CardMemberGroupType.PAIR}
            class:trio={card.member.group.type === CardMemberGroupType.TRIO}
            style:--group-pos={card.member.group.expectedMemberIds.split("|").indexOf(card.id.toString()) - 1}
        >
            {#each card.member.group.skills as skill (skill.id)}
                <div>
                    <Skill {skill} cardType={card.type} />
                </div>
            {/each}
        </div>
    {/if}
    {#if cardIsMember(card) && card.member.costumeJpn}
        <div class="costume">
            <span><span><span>⏵</span></span><span>{card.member.costumeEng ?? card.member.costumeJpn}</span></span>
        </div>
    {/if}
    <hr />
    <div class="ids">
        <div>
            {card.cardNo}
            {cardIsMember(card)
                ? CardMemberRarity[card.member.rarity]
                : cardIsSong(card)
                ? CardSongRarity[card.song.rarity]
                : "ME"}
        </div>
        <div>ID: {card.id.toString().padStart(4, "0")}</div>
    </div>
    <hr />
    <div class="fold" />
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
        outline: 0.25mm solid rgb(230, 230, 230);
        outline-offset: -0.125mm;

        &.narrow {
            width: 63.5mm;
        }

        &.wide {
            width: 88mm;
        }

        & > div {
            @apply w-full;
            z-index: 1;
            margin-top: 1mm;

            &:not(.ids) + hr {
                margin-top: 1mm;
            }

            &.skillsallcards {
                @apply flex items-start;
                padding: 0 1mm;
                font-stretch: semi-condensed;

                & > .skillscard {
                    border: 0.25mm solid black;
                    padding: 0.5mm 0.75mm 0.5mm 0.5mm;
                    text-indent: -0.25mm;
                    flex: 0 0 100%;
                    flex-wrap: nowrap;

                    &.othergroupmember {
                        opacity: 0;
                        margin-right: -100%;
                    }
                }

                &:empty {
                    display: none;
                }
            }

            &.skillsgroup {
                --group-pos: 0;
                padding: 0.5mm 0.75mm 0.5mm 0.5mm;
                text-indent: -0.25mm;
                font-stretch: semi-condensed;
                border: 0.25mm solid black;
                margin-left: calc(
                    (-100% + var(--group-skill-overlap) * 2) * var(--group-pos) + var(--group-skill-margin)
                );

                &.pair {
                    width: calc(200% - var(--group-skill-margin) * 2 - var(--group-skill-overlap) * 2);
                }

                &.trio {
                    width: calc(300% - var(--group-skill-margin) * 2 - var(--group-skill-overlap) * 4);
                }
            }

            &.costume {
                margin-left: 0.5mm;
                margin-right: 0.5mm;

                & > span {
                    @apply rounded-full inline-flex items-center;
                    padding: 0 2.5mm 0 2mm;
                    border: 0.5mm solid hotpink;
                    color: hotpink;
                    font-size: 2mm;

                    & > span:first-child {
                        @apply rounded-full box-content flex items-center justify-center;
                        border: 0.5mm solid hotpink;
                        width: 1.5mm;
                        height: 1.5mm;
                        margin-right: 2mm;

                        & > span {
                            margin-top: -0.3mm;
                            margin-left: 0.15mm;
                        }
                    }

                    & > span:last-child {
                        font-weight: bold;
                        font-stretch: semi-condensed;
                        margin-top: -0.25mm;
                    }
                }
            }

            &.ids {
                @apply flex justify-between;
                margin: 0;
                padding: 0 1mm;
                height: 3mm;
                font-size: 2mm;
                line-height: 3mm;
            }

            &.fold {
                margin: 0;
                height: 10mm;
            }
        }

        & > hr {
            z-index: 1;
            border-top: 0.25mm solid black;
        }
    }
</style>

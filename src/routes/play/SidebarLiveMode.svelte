<script context="module" lang="ts">
    import { getContext } from "svelte";
    import { slide } from "svelte-reduced-motion/transition";
    import { type Readable, type Writable, get as storeGet } from "svelte/store";
    import { tooltip } from "svooltip";
    import type { CardMember, CardSong } from "$models/card/card.js";
    import { cardTitle } from "$lib/card/strings.js";
    import { cardHasAnyPieceRequirement, cardHasIdolizationPieces, cardIsIdolizable } from "$lib/card/types.js";
    import AttributeEnum from "$lib/enums/attribute.js";
    import CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";
    import { type CardImageData, loadCardInfo } from "$lib/play/cardInfo.js";
    import type { LiveModeStore } from "$lib/play/livemode.js";
    import type {
        ClientFieldCardSchema,
        ClientGameLogic,
        ClientGameSchema,
        ClientPlayerSchema,
    } from "$lib/play/schema.js";
    import { mapGet } from "$lib/utils/map.js";
    import Piece from "$lib/format/Piece.svelte";
    import Button from "$lib/style/Button.svelte";
    import PlusMinusButtons from "./PlusMinusButtons.svelte";
    import SidebarLiveModeReqRow from "./SidebarLiveModeReqRow.svelte";
</script>

<script lang="ts">
    const logic: ClientGameLogic = getContext("logic");
    const liveModeCards: LiveModeStore = getContext("liveModeCards");
    const [sidebarCardNo, setSidebarCard] =
        getContext<[Readable<string | undefined>, (c: string | undefined) => void]>("sidebarCardNo");

    let game: Readable<ClientGameSchema>,
        players: Readable<ClientPlayerSchema[]>,
        player: ClientPlayerSchema,
        field: Readable<Map<number, ClientFieldCardSchema>>;
    $: game = logic.game;
    $: players = $game.players;
    $: player = $players[logic.clientPlayerId];
    $: field = player.field;

    let cardSong:
            | undefined
            | {
                  id: number;
                  fieldInfo: ClientFieldCardSchema;
                  cardInfo: CardSong & CardImageData;
                  lpExtra: number;
                  pieces: {
                      base: [number, number, number, number];
                      extra: [number, number, number, number];
                  };
              },
        cardMembers: Map<
            number,
            {
                id: number;
                fieldInfo: ClientFieldCardSchema;
                cardInfo: CardMember & CardImageData;
                pieces: {
                    base: [number, number, number, number];
                    idolized: [number, number, number, number];
                    extra: [number, number, number, number];
                };
                unsubscribe: () => void;
            }
        > = new Map(),
        flippedCards: Set<number> = new Set();
    $: {
        $liveModeCards;
        updateCards();
    }
    function updateCards() {
        if ($liveModeCards.length > 0) {
            if ($liveModeCards[0] !== cardSong?.id) {
                const fieldInfo = mapGet($field, $liveModeCards[0]);
                (loadCardInfo(fieldInfo.cardNo) as Promise<CardSong & CardImageData>).then((cardInfo) => {
                    cardSong = {
                        id: $liveModeCards[0],
                        fieldInfo,
                        cardInfo,
                        lpExtra: 0,
                        pieces: {
                            base: cardHasAnyPieceRequirement(cardInfo)
                                ? [cardInfo.song.anyRequirement.piecesAll, 0, 0, 0]
                                : [
                                      0,
                                      cardInfo.song.attrRequirement.piecesSmile,
                                      cardInfo.song.attrRequirement.piecesPure,
                                      cardInfo.song.attrRequirement.piecesCool,
                                  ],
                            extra: [0, 0, 0, 0],
                        },
                    };
                });
            }

            const previousCardMembers = new Set(cardMembers.keys());
            for (const card of $liveModeCards.slice(1)) {
                if (!cardMembers.has(card)) {
                    const fieldInfo = mapGet($field, card);
                    (loadCardInfo(fieldInfo.cardNo) as Promise<CardMember & CardImageData>).then((cardInfo) => {
                        const isIdolized =
                            fieldInfo.idolizedBaseCardNo !== undefined &&
                            cardIsIdolizable(cardInfo) &&
                            cardHasIdolizationPieces(cardInfo);
                        cardMembers = cardMembers.set(card, {
                            id: card,
                            fieldInfo,
                            cardInfo: cardInfo,
                            pieces: {
                                base: [
                                    cardInfo.member.piecesAll,
                                    cardInfo.member.piecesSmile,
                                    cardInfo.member.piecesPure,
                                    cardInfo.member.piecesCool,
                                ],
                                idolized: isIdolized
                                    ? [
                                          cardInfo.member.idolizeBonus.piecesAll,
                                          cardInfo.member.idolizeBonus.piecesSmile,
                                          cardInfo.member.idolizeBonus.piecesPure,
                                          cardInfo.member.idolizeBonus.piecesCool,
                                      ]
                                    : [0, 0, 0, 0],
                                extra: [0, 0, 0, 0],
                            },
                            unsubscribe: fieldInfo.flipped.subscribe((b) => {
                                if (b) {
                                    flippedCards.add(card);
                                } else {
                                    flippedCards.delete(card);
                                }
                                flippedCards = flippedCards;
                            }),
                        });
                    });
                } else {
                    previousCardMembers.delete(card);
                }
            }
            if (previousCardMembers.size > 0) {
                for (const removedCard of previousCardMembers) {
                    cardMembers.get(removedCard)?.unsubscribe();
                    cardMembers.delete(removedCard);
                }
                cardMembers = cardMembers;
            }
        } else {
            cardSong = undefined;
            for (const v of cardMembers.values()) {
                v.unsubscribe();
            }
            cardMembers.clear();
            flippedCards.clear();
            totalPieces.fill(0);
        }
    }

    const totalPieces: [number, number, number, number] = [0, 0, 0, 0];
    $: {
        cardMembers;
        updateTotalPieces();
    }
    function updateTotalPieces() {
        totalPieces.fill(0);
        for (const {
            pieces: { base, idolized, extra },
        } of cardMembers.values()) {
            for (let i = 0; i < 4; i++) {
                totalPieces[i] += base[i];
                totalPieces[i] += idolized[i];
                totalPieces[i] += extra[i];
            }
        }
    }

    function createLiveGroup() {
        if ($liveModeCards.length <= 1) return;

        const cards = $liveModeCards.map((card, i) => {
            if (i === 0) {
                // x == (65 + ($liveModeCards.length - 2) * 10) / 2 - 91 / 2
                return {
                    id: card,
                    x: ($liveModeCards.length - 2) * 5 - 13,
                    y: 13,
                    z: $liveModeCards.length,
                };
            } else {
                return {
                    id: card,
                    x: (i - 1) * 10,
                    y: 0,
                    z: i - 1,
                };
            }
        });

        const songCardPosition = storeGet(mapGet($field, $liveModeCards[0]).position);
        logic.requestGroupCreate(songCardPosition.x - cards[0].x, songCardPosition.y - cards[0].y, cards);
        if (cardSong?.cardInfo) logic.requestLPUpdate(cardSong.cardInfo.song.lpBase + cardSong.lpExtra);
        endLiveMode();
    }

    function endLiveMode() {
        liveModeCards.end();
    }

    let blockedByEmpty: boolean, blockedByFlip: boolean, canLive: boolean;
    $: blockedByEmpty = cardMembers.size === 0;
    $: blockedByFlip = flippedCards.size > 0;
    $: canLive = !(blockedByEmpty || blockedByFlip);
</script>

{#if cardSong !== undefined}
    <div transition:slide={{}} on:contextmenu|preventDefault={() => null} role="presentation">
        <div class="panel">
            <div class="buttons">
                <Button label="Cancel" on:click={endLiveMode}>Cancel</Button>
                <div
                    use:tooltip={{
                        content: blockedByEmpty
                            ? "No Member cards have been selected."
                            : "All cards must be flipped face-up.",
                        placement: "bottom",
                        offset: -5,
                        visibility: !canLive,
                    }}
                >
                    <Button accent classes="w-full" label="Live" on:click={createLiveGroup} disabled={!canLive}>
                        ⟪LIVE⟫
                    </Button>
                </div>
            </div>
            <div
                class="livemodeitem"
                on:contextmenu|preventDefault={() => cardSong !== undefined && setSidebarCard(cardSong.cardInfo.cardNo)}
                role="presentation"
            >
                {#key cardSong.id}
                    <div class="panel-inner" transition:slide={{}}>
                        <div class="flex items-center w-full p-2 gap-x-2 song">
                            <div class="image flex flex-col items-center">
                                <img
                                    src={cardSong.cardInfo.imageDataUrl}
                                    alt={cardSong.cardInfo.cardNo}
                                    class:outline={cardSong.cardInfo.cardNo === $sidebarCardNo}
                                />
                                <div class="livepoints" class:!text-[1.75rem]={cardSong.lpExtra === 0}>
                                    {cardSong.cardInfo.song.lpBase}
                                    {#if cardSong.lpExtra > 0}
                                        + {cardSong.lpExtra}
                                    {:else if cardSong.lpExtra < 0}
                                        - {-cardSong.lpExtra}
                                    {/if}
                                    <div class="livepointsbuttons">
                                        <PlusMinusButtons
                                            value={cardSong.cardInfo.song.lpBase + cardSong.lpExtra}
                                            update={(d) => {
                                                if (cardSong !== undefined) cardSong.lpExtra += d;
                                            }}
                                            limit={99}
                                            accent
                                            size="0.875rem"
                                            labelPlus="Increase LP"
                                            labelMinus="Decrease LP"
                                        />
                                    </div>
                                </div>
                                <div class="livepointslabel">Live Points</div>
                            </div>
                            <div class="panel-inner flex-grow">
                                <h4>{@html cardTitle(cardSong.cardInfo, true, Language.ENG)}</h4>
                                <div class="p-2 flex flex-col gap-y-1">
                                    {#if cardHasAnyPieceRequirement(cardSong.cardInfo)}
                                        <SidebarLiveModeReqRow
                                            requirement={{
                                                base: cardSong.pieces.base[0],
                                                extra: cardSong.pieces.extra[0],
                                            }}
                                            {totalPieces}
                                            countedPieces={[true, true, true, true]}
                                            attr={"none"}
                                            canCheck
                                            updateExtraFunc={(d) => {
                                                if (cardSong !== undefined) cardSong.pieces.extra[0] += d;
                                            }}
                                        />
                                    {:else}
                                        <SidebarLiveModeReqRow
                                            requirement={{
                                                base: cardSong.pieces.base[1],
                                                extra: cardSong.pieces.extra[1],
                                            }}
                                            {totalPieces}
                                            countedPieces={[false, true, false, false]}
                                            attr={AttributeEnum.SMILE}
                                            updateExtraFunc={(d) => {
                                                if (cardSong !== undefined) cardSong.pieces.extra[1] += d;
                                            }}
                                        />
                                        <SidebarLiveModeReqRow
                                            requirement={{
                                                base: cardSong.pieces.base[2],
                                                extra: cardSong.pieces.extra[2],
                                            }}
                                            {totalPieces}
                                            countedPieces={[false, false, true, false]}
                                            attr={AttributeEnum.PURE}
                                            updateExtraFunc={(d) => {
                                                if (cardSong !== undefined) cardSong.pieces.extra[2] += d;
                                            }}
                                        />
                                        <SidebarLiveModeReqRow
                                            requirement={{
                                                base: cardSong.pieces.base[3],
                                                extra: cardSong.pieces.extra[3],
                                            }}
                                            {totalPieces}
                                            countedPieces={[false, false, false, true]}
                                            attr={AttributeEnum.COOL}
                                            updateExtraFunc={(d) => {
                                                if (cardSong !== undefined) cardSong.pieces.extra[3] += d;
                                            }}
                                        />
                                        <hr />
                                        <SidebarLiveModeReqRow
                                            requirement={{
                                                base: Math.max(
                                                    0,
                                                    Math.max(
                                                        0,
                                                        cardSong.pieces.base[1] +
                                                            cardSong.pieces.extra[1] -
                                                            totalPieces[1]
                                                    ) +
                                                        Math.max(
                                                            0,
                                                            cardSong.pieces.base[2] +
                                                                cardSong.pieces.extra[2] -
                                                                totalPieces[2]
                                                        ) +
                                                        Math.max(
                                                            0,
                                                            cardSong.pieces.base[3] +
                                                                cardSong.pieces.extra[3] -
                                                                totalPieces[3]
                                                        )
                                                ),
                                                extra: 0,
                                            }}
                                            {totalPieces}
                                            countedPieces={[true, false, false, false]}
                                            attr={AttributeEnum.ALL}
                                            isAllAltRow
                                            canCheck
                                        />
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                {/key}
            </div>
            {#each cardMembers.entries() as [id, card] (id)}
                <div
                    class="livemodeitem"
                    transition:slide={{}}
                    on:contextmenu|preventDefault={() => setSidebarCard(card.cardInfo.cardNo)}
                    role="presentation"
                >
                    <div class="panel-inner h-12">
                        <div class="h-12 flex items-center w-full p-2 gap-x-2">
                            <div class="image">
                                <img
                                    src={card.cardInfo.imageDataUrl}
                                    alt={card.cardInfo.cardNo}
                                    class:outline={card.cardInfo.cardNo === $sidebarCardNo}
                                />
                            </div>
                            <b class="basis-20">{card.cardInfo.cardNo}</b>
                            {#each AttributeEnum.allForPieces as attr, i}
                                {@const nonExtraSum = card.pieces.base[i] + card.pieces.idolized[i]}
                                {@const totalSum = nonExtraSum + card.pieces.extra[i]}
                                {@const lowlight = totalSum === 0}
                                <div class="memberattr">
                                    <div>
                                        <Piece {attr} />
                                        <span class="count {attr.toCssClassName()}" class:!text-primary-300={lowlight}>
                                            {#if card.pieces.idolized[i] > 0}
                                                <img
                                                    class="idolize-icon"
                                                    src="/images/icons/idolized.png"
                                                    alt="Idolized"
                                                />
                                            {/if}
                                            {nonExtraSum}
                                            {#if card.pieces.extra[i] > 0}
                                                + {card.pieces.extra[i]}
                                            {/if}
                                        </span>
                                    </div>
                                    <PlusMinusButtons
                                        value={card.pieces.extra[i]}
                                        update={(d) => (card.pieces.extra[i] += d)}
                                    />
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
            <div class="livemodeitem flex justify-between">
                <Button
                    label="Select All Cards"
                    classes="!py-1"
                    on:click={() =>
                        ($liveModeCards = [
                            $liveModeCards[0],
                            ...[...$field.entries()]
                                .filter(([id, card]) => card.cardType === CardType.MEMBER)
                                .map(([id]) => id),
                        ])}
                >
                    Select All
                </Button>
                <Button
                    label="Remove All Cards"
                    classes="!py-1"
                    disabled={cardMembers.size === 0}
                    on:click={() => ($liveModeCards = [$liveModeCards[0]])}
                >
                    Remove All
                </Button>
            </div>
        </div>
    </div>
{/if}

<style lang="postcss">
    .panel {
        @apply select-none rounded-none bg-primary-600 flex flex-col;

        & :global(.skill-icon) {
            @apply cursor-default;
        }
    }

    .buttons {
        @apply w-full flex flex-row gap-x-2 items-center;
        & > :global(*) {
            @apply flex-grow basis-0;
        }
    }

    .livemodeitem {
        @apply pt-2;
    }

    .panel-inner {
        @apply p-0 bg-primary-500;
    }

    .song {
        @apply bg-primary-400;

        & .image {
            @apply basis-20;
            & img {
                @apply rounded-card-h;
            }
        }
    }

    h4 {
        @apply bg-primary-600 text-base tracking-normal mb-0;
    }

    .image {
        @apply basis-6;
        & img {
            @apply rounded-card-v outline-4 outline-accent-500;
        }
    }

    .memberattr {
        @apply basis-1 flex-grow flex items-center justify-center;

        & .idolize-icon {
            @apply absolute w-3 -left-3.5 top-0;
        }

        & .count {
            @apply relative font-bold ml-1 mr-2;

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
    }

    .livepoints {
        @apply mt-2 relative w-full pr-4 text-xl font-bold text-center !leading-[1.75rem];

        & .livepointsbuttons {
            @apply absolute top-0 right-0;
        }
    }
    .livepointslabel {
        @apply mt-1 w-full text-xs text-center uppercase tracking-tighter leading-none;
    }
</style>

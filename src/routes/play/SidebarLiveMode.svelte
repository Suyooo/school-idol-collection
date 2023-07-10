<script context="module" lang="ts">
    import { getContext } from "svelte";
    import { slide } from "svelte-reduced-motion/transition";
    import { type Readable, type Writable, get as storeGet } from "svelte/store";
    import type { CardMember, CardSong } from "$models/card/card.js";
    import { cardTitle } from "$lib/card/strings.js";
    import { cardHasAnyPieceRequirement, cardHasIdolizationPieces, cardIsIdolizable } from "$lib/card/types.js";
    import AttributeEnum from "$lib/enums/attribute.js";
    import CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";
    import { type CardImageData, loadCardInfo } from "$lib/play/cardInfo.js";
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
    const liveModeCards: Writable<number[]> = getContext("liveModeCards");
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

    let cardSong: {
            id: number;
            fieldInfo: ClientFieldCardSchema;
            cardInfo: CardSong & CardImageData;
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
            }
        > = new Map();
    $: {
        $liveModeCards;
        updateCards();
    }
    function updateCards() {
        if ($liveModeCards.length > 0) {
            if ($liveModeCards[0] !== cardSong?.id) {
                const fieldInfo = mapGet($field, $liveModeCards[0]);
                (loadCardInfo(mapGet($field, $liveModeCards[0]).cardNo) as Promise<CardSong & CardImageData>).then(
                    (cardInfo) => {
                        cardSong = {
                            id: $liveModeCards[0],
                            fieldInfo,
                            cardInfo,
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
                    }
                );
            }

            const previousCardMembers = new Set(cardMembers.keys());
            for (const card of $liveModeCards.slice(1)) {
                if (!cardMembers.has(card)) {
                    const fieldInfo = mapGet($field, card);
                    (loadCardInfo(mapGet($field, card).cardNo) as Promise<CardMember & CardImageData>).then(
                        (cardInfo) => {
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
                            });
                        }
                    );
                } else {
                    previousCardMembers.delete(card);
                }
            }
            if (previousCardMembers.size > 0) {
                for (const removedCard of previousCardMembers) {
                    cardMembers.delete(removedCard);
                }
                cardMembers = cardMembers;
            }
        }
    }

    const totalPieces: [number, number, number, number] = [0, 0, 0, 0];
    $: {
        cardMembers;
        updateTotalPieces();
    }
    function updateTotalPieces() {
        for (let i = 0; i < 4; i++) {
            totalPieces[i] = 0;
        }

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
        if (cardSong?.cardInfo) logic.requestLPUpdate(cardSong.cardInfo.song.lpBase);
        endLiveMode();
    }

    function endLiveMode() {
        $liveModeCards = [];
    }
</script>

{#if cardSong !== undefined}
    <div class="panel" transition:slide={{}} on:contextmenu|preventDefault={() => null} role="presentation">
        <div class="buttons">
            <Button classes="mt-1 w-full" label="Cancel" on:click={endLiveMode}>Cancel</Button>
            <Button accent classes="mt-1 w-full" label="Live" on:click={createLiveGroup}>⟪LIVE⟫</Button>
        </div>
        <div
            class="livemodeitem"
            on:contextmenu|preventDefault={() => setSidebarCard(cardSong.cardInfo.cardNo)}
            role="presentation"
        >
            {#key cardSong.id}
                <div class="panel-inner" transition:slide={{}}>
                    <div class="flex items-center w-full p-2 gap-x-2 song">
                        <div class="image">
                            <img
                                src={cardSong.cardInfo.imageDataUrl}
                                alt={cardSong.cardInfo.cardNo}
                                class:outline={cardSong.cardInfo.cardNo === $sidebarCardNo}
                            />
                        </div>
                        <div class="panel-inner flex-grow">
                            <h4>{@html cardTitle(cardSong.cardInfo, true, Language.ENG)}</h4>
                            <div class="p-2 flex flex-col gap-y-1">
                                {#if cardHasAnyPieceRequirement(cardSong.cardInfo)}
                                    <SidebarLiveModeReqRow
                                        requirement={{ base: cardSong.pieces.base[0], extra: cardSong.pieces.extra[0] }}
                                        {totalPieces}
                                        countedPieces={[true, true, true, true]}
                                        attr={"none"}
                                        canCheck
                                        updateExtraFunc={(d) => (cardSong.pieces.extra[0] += d)}
                                    />
                                {:else}
                                    <SidebarLiveModeReqRow
                                        requirement={{ base: cardSong.pieces.base[1], extra: cardSong.pieces.extra[1] }}
                                        {totalPieces}
                                        countedPieces={[false, true, false, false]}
                                        attr={AttributeEnum.SMILE}
                                        updateExtraFunc={(d) => (cardSong.pieces.extra[1] += d)}
                                    />
                                    <SidebarLiveModeReqRow
                                        requirement={{ base: cardSong.pieces.base[2], extra: cardSong.pieces.extra[2] }}
                                        {totalPieces}
                                        countedPieces={[false, false, true, false]}
                                        attr={AttributeEnum.PURE}
                                        updateExtraFunc={(d) => (cardSong.pieces.extra[2] += d)}
                                    />
                                    <SidebarLiveModeReqRow
                                        requirement={{ base: cardSong.pieces.base[3], extra: cardSong.pieces.extra[3] }}
                                        {totalPieces}
                                        countedPieces={[false, false, false, true]}
                                        attr={AttributeEnum.COOL}
                                        updateExtraFunc={(d) => (cardSong.pieces.extra[3] += d)}
                                    />
                                    <hr />
                                    <SidebarLiveModeReqRow
                                        requirement={{
                                            base: Math.max(
                                                0,
                                                Math.max(
                                                    0,
                                                    cardSong.pieces.base[1] + cardSong.pieces.extra[1] - totalPieces[1]
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
                                <div class:grayscale={lowlight}>
                                    <Piece {attr} />
                                    <span class="count {attr.toCssClassName()}" class:!text-primary-300={lowlight}>
                                        {#if card.pieces.idolized[i] > 0}
                                            <img class="idolize-icon" src="/images/icons/idolized.png" alt="Idolized" />
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
{/if}

<style lang="postcss">
    .panel {
        @apply select-none rounded-none bg-primary-600 flex flex-col;

        & :global(.skill-icon) {
            @apply cursor-default;
        }
    }

    .buttons {
        @apply flex flex-row gap-x-2 items-center justify-between;
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
</style>

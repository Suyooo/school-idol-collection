<script lang="ts">
    import Button from "$lib/style/Button.svelte";
    import type {Snapshot} from './$types';

    type NumberQueryMod = "exact" | "less" | "more";

    let cardName: string, cardSet: string, skillText: string, cardType: "member" | "song" | "memory",
        memberRarity: string, memberGroup: string, memberYear: number,
        memberCost: number, memberCostMod: NumberQueryMod,
        memberIdolizable: boolean, memberAbility: "noability" | "live" | "rush" | "rushorlive", memberCostume: string,
        memberPieces: number, memberPiecesMod: NumberQueryMod,
        memberPiecesSmile: number, memberPiecesSmileMod: NumberQueryMod,
        memberPiecesPure: number, memberPiecesPureMod: NumberQueryMod,
        memberPiecesCool: number, memberPiecesCoolMod: NumberQueryMod,
        memberPiecesAll: number, memberPiecesAllMod: NumberQueryMod, memberPieceBonus: boolean,
        songRarity: string, songAttribute: string, songRequirementType: "anypiece" | "attributepiece",
        songLivePoints: number, songLivePointsMod: NumberQueryMod,
        songPiecesSmile: number, songPiecesSmileMod: NumberQueryMod,
        songPiecesPure: number, songPiecesPureMod: NumberQueryMod,
        songPiecesCool: number, songPiecesCoolMod: NumberQueryMod,
        songPiecesAll: number, songPiecesAllMod: NumberQueryMod;

    export const snapshot: Snapshot = {
        capture: () => ({
            cardName,
            cardSet,
            skillText,
            cardType,
            memberRarity,
            memberGroup,
            memberYear,
            memberCost,
            memberCostMod,
            memberIdolizable,
            memberAbility,
            memberCostume,
            memberPieces,
            memberPiecesMod,
            memberPiecesSmile,
            memberPiecesSmileMod,
            memberPiecesPure,
            memberPiecesPureMod,
            memberPiecesCool,
            memberPiecesCoolMod,
            memberPiecesAll,
            memberPiecesAllMod,
            memberPieceBonus,
            songRarity,
            songAttribute,
            songRequirementType,
            songLivePoints,
            songLivePointsMod,
            songPiecesSmile,
            songPiecesSmileMod,
            songPiecesPure,
            songPiecesPureMod,
            songPiecesCool,
            songPiecesCoolMod,
            songPiecesAll,
            songPiecesAllMod
        }),
        restore: value => ({
            cardName,
            cardSet,
            skillText,
            cardType,
            memberRarity,
            memberGroup,
            memberYear,
            memberCost,
            memberCostMod,
            memberIdolizable,
            memberAbility,
            memberCostume,
            memberPieces,
            memberPiecesMod,
            memberPiecesSmile,
            memberPiecesSmileMod,
            memberPiecesPure,
            memberPiecesPureMod,
            memberPiecesCool,
            memberPiecesCoolMod,
            memberPiecesAll,
            memberPiecesAllMod,
            memberPieceBonus,
            songRarity,
            songAttribute,
            songRequirementType,
            songLivePoints,
            songLivePointsMod,
            songPiecesSmile,
            songPiecesSmileMod,
            songPiecesPure,
            songPiecesPureMod,
            songPiecesCool,
            songPiecesCoolMod,
            songPiecesAll,
            songPiecesAllMod
        } = value)
    };
</script>

<svelte:head>
    <title>Search &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="panel">
        <div class="panel-inner">
            <div class="row">
                <div class="col-half lg:pr-4">
                    <div>
                        <b>Name:</b>
                        <input bind:value={cardName} placeholder="—">
                    </div>
                    <div>
                        <b>Card Type:</b>
                        <select bind:value={cardType}>
                            <option value="" selected>—</option>
                            <option value="member">Member</option>
                            <option value="song">Song</option>
                            <option value="memory">Memory</option>
                        </select>
                    </div>
                    <div>
                        <b>Card Set:</b>
                        <input bind:value={cardSet} placeholder="—">
                    </div>
                    <div>
                        <b>Skill Text:</b>
                        <input bind:value={skillText} placeholder="—">
                    </div>
                </div>
                <div class="col-half mt-4 lg:mt-0 lg:pl-4">
                    {#if cardType === "member"}
                        <div>
                            <b>Rarity:</b>
                            <select bind:value={memberRarity}>
                                <option value="" selected>—</option>
                                <option value="r">R</option>
                                <option value="sr">SR</option>
                                <option value="hr">HR</option>
                                <option value="special">Special</option>
                                <option value="secret">Secret</option>
                                <option value="pr">PR</option>
                                <option value="n">N</option>
                                <option value="ssr">SSR</option>
                            </select>
                        </div>
                        <div>
                            <b>Group:</b>
                            <select bind:value={memberGroup}>
                                <option value="" selected>—</option>
                                <option value="muse">µ's</option>
                                <option value="aqours">Aqours</option>
                                <option value="printemps">Printemps</option>
                                <option value="lilywhite">lily white</option>
                                <option value="bibi">BiBi</option>
                                <option value="cyaron">CYaRon!</option>
                                <option value="azalea">AZALEA</option>
                                <option value="guiltykiss">Guilty Kiss</option>
                                <option value="saintsnow">Saint Snow</option>
                            </select>
                        </div>
                        <div>
                            <b>School Year:</b>
                            <select bind:value={memberYear}>
                                <option value="" selected>—</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3nd Year</option>
                            </select>
                        </div>
                        <div>
                            <b>Cost:</b>
                            <select bind:value={memberCost}>
                                <option value="" selected>—</option>
                                <option value="0">0★</option>
                                <option value="1">1★</option>
                                <option value="2">2★</option>
                                <option value="3">3★</option>
                            </select>
                            {#if memberCost}
                                <select bind:value={memberCostMod}>
                                    <option value="exactly" selected>exactly</option>
                                    <option value="less">or less</option>
                                    <option value="more">or more</option>
                                </select>
                            {/if}
                        </div>
                        <div>
                            <b>Ability:</b>
                            <select bind:value={memberAbility}>
                                <option value="" selected>—</option>
                                <option value="noability">None</option>
                                <option value="rush">[RUSH]</option>
                                <option value="live">[LIVE]</option>
                                <option value="rushorlive">[RUSH/LIVE]</option>
                            </select>
                        </div>
                        <div>
                            <b>Costume:</b>
                            <input bind:value={memberCostume} placeholder="—">
                        </div>
                        <div class="!mt-4">
                            <b>Pieces:</b>
                            <select bind:value={memberPieces}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if memberPieces}
                                <select bind:value={memberPiecesMod}>
                                    <option value="exactly" selected>exactly</option>
                                    <option value="less">or less</option>
                                    <option value="more">or more</option>
                                </select>
                            {/if}
                        </div>
                        <div class="pl-8">
                            <b class="whitespace-nowrap">
                                <img class="skill-icon" src="/images/icons/piece_smile.png" alt="Smile"> Pieces:
                            </b>
                            <select bind:value={memberPiecesSmile}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if memberPiecesSmile}
                                <select bind:value={memberPiecesSmileMod}>
                                    <option value="exactly" selected>exactly</option>
                                    <option value="less">or less</option>
                                    <option value="more">or more</option>
                                </select>
                            {/if}
                        </div>
                        <div class="pl-8">
                            <b class="whitespace-nowrap">
                                <img class="skill-icon" src="/images/icons/piece_pure.png" alt="Pure"> Pieces:
                            </b>
                            <select bind:value={memberPiecesPure}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if memberPiecesPure}
                                <select bind:value={memberPiecesPureMod}>
                                    <option value="exactly" selected>exactly</option>
                                    <option value="less">or less</option>
                                    <option value="more">or more</option>
                                </select>
                            {/if}
                        </div>
                        <div class="pl-8">
                            <b class="whitespace-nowrap">
                                <img class="skill-icon" src="/images/icons/piece_cool.png" alt="Cool"> Pieces:
                            </b>
                            <select bind:value={memberPiecesCool}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if memberPiecesCool}
                                <select bind:value={memberPiecesCoolMod}>
                                    <option value="exactly" selected>exactly</option>
                                    <option value="less">or less</option>
                                    <option value="more">or more</option>
                                </select>
                            {/if}
                        </div>
                        <div class="pl-8">
                            <b class="whitespace-nowrap">
                                <img class="skill-icon" src="/images/icons/piece_all.png" alt="All"> Pieces:
                            </b>
                            <select bind:value={memberPiecesAll}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if memberPiecesAll}
                                <select bind:value={memberPiecesAllMod}>
                                    <option value="exactly" selected>exactly</option>
                                    <option value="less">or less</option>
                                    <option value="more">or more</option>
                                </select>
                            {/if}
                        </div>
                        <div>
                            <b>Birthday Bonus:</b>
                            <select bind:value={memberPieceBonus}>
                                <option value="" selected>—</option>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div>
                            <b>Idolizable:</b>
                            <select bind:value={memberIdolizable}>
                                <option value="" selected>—</option>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                    {:else if cardType === "song"}
                        <div>
                            <b>Rarity:</b>
                            <select bind:value={songRarity}>
                                <option value="" selected>—</option>
                                <option value="m">M</option>
                                <option value="gr">GR</option>
                            </select>
                        </div>
                        <div>
                            <b>Attribute:</b>
                            <select bind:value={songAttribute}>
                                <option value="" selected>—</option>
                                <option value="neutral">Neutral</option>
                                <option value="smile">Smile</option>
                                <option value="pure">Pure</option>
                                <option value="cool">Cool</option>
                                <option value="orange">Orange</option>
                            </select>
                        </div>
                        <div>
                            <b>Base Live Points:</b>
                            <select bind:value={songLivePoints}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if songLivePoints}
                                <select bind:value={songLivePointsMod}>
                                    <option value="exactly" selected>exactly</option>
                                    <option value="less">or less</option>
                                    <option value="more">or more</option>
                                </select>
                            {/if}
                        </div>
                        <div>
                            <b>Requirement Type:</b>
                            <select bind:value={songRequirementType}>
                                <option value="" selected>—</option>
                                <option value="anypiece">Any Piece Requirement</option>
                                <option value="attributepiece">Attribute Piece Requirement</option>
                            </select>
                        </div>
                        {#if songRequirementType === "any"}
                            <div>
                                <b>Required Pieces</b>
                                <select bind:value={songPiecesAll}>
                                    <option value="" selected>—</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                {#if songPiecesAll}
                                    <select bind:value={songPiecesAllMod}>
                                        <option value="exactly" selected>exactly</option>
                                        <option value="less">or less</option>
                                        <option value="more">or more</option>
                                    </select>
                                {/if}
                            </div>
                        {:else if songRequirementType === "attr"}
                            <div>
                                <b class="whitespace-nowrap">
                                    <img class="skill-icon" src="/images/icons/piece_smile.png" alt="Smile">
                                    Requirement:
                                </b>
                                <select bind:value={songPiecesSmile}>
                                    <option value="" selected>—</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                {#if songPiecesSmile}
                                    <select bind:value={songPiecesSmileMod}>
                                        <option value="exactly" selected>exactly</option>
                                        <option value="less">or less</option>
                                        <option value="more">or more</option>
                                    </select>
                                {/if}
                            </div>
                            <div>
                                <b class="whitespace-nowrap">
                                    <img class="skill-icon" src="/images/icons/piece_pure.png" alt="Pure"> Requirement:
                                </b>
                                <select bind:value={songPiecesPure}>
                                    <option value="" selected>—</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                {#if songPiecesPure}
                                    <select bind:value={songPiecesPureMod}>
                                        <option value="exactly" selected>exactly</option>
                                        <option value="less">or less</option>
                                        <option value="more">or more</option>
                                    </select>
                                {/if}
                            </div>
                            <div>
                                <b class="whitespace-nowrap">
                                    <img class="skill-icon" src="/images/icons/piece_cool.png" alt="Cool">
                                    Requirement:
                                </b>
                                <select bind:value={songPiecesCool}>
                                    <option value="" selected>—</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                {#if songPiecesCool}
                                    <select bind:value={songPiecesCoolMod}>
                                        <option value="exactly" selected>exactly</option>
                                        <option value="less">or less</option>
                                        <option value="more">or more</option>
                                    </select>
                                {/if}
                            </div>
                        {:else}
                            <div class="mt-2">Select a Requirement Type to show additional search options.</div>
                        {/if}
                    {:else if cardType === "memory"}
                        <div class="mt-2">Memory cards have no additional search options.</div>
                    {:else}
                        <div class="mt-2">Select a Card Type to show additional search options.</div>
                    {/if}
                </div>
            </div>
            <div class="mt-2 flex items-center justify-end w-full">
                <Button accent on:click={() => {}}>Search</Button>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    input[type="number"] {
        @apply w-20;
    }

    .col-half {
        & > * {
            @apply flex items-center gap-x-2;

            & > *:last-child {
                @apply flex-grow;
            }

            & + * {
                @apply mt-1;
            }
        }
    }
</style>
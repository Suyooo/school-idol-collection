<script lang="ts">
    import {goto} from "$app/navigation";
    import Button from "$lib/style/Button.svelte";
    import type {SearchUiOptions} from "$lib/search/ui.js";
    import {uiOptionIsSet, uiOptionsToUrl} from "$lib/search/ui.js";

    export let options: SearchUiOptions = {};

    function query() {
        const url = uiOptionsToUrl(options);
        if (url.length > 0) {
            goto("/search/" + url);
        }
    }
</script>

<div class="row">
    <div class="col-half lg:pr-4">
        <div>
            <b>Name:</b>
            <input bind:value={options.cardName} placeholder="—">
        </div>
        <div>
            <b>Group:</b>
            <select bind:value={options.group}>
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
            <b>Card Type:</b>
            <select bind:value={options.cardType}>
                <option value="" selected>—</option>
                <option value="member">Member</option>
                <option value="song">Song</option>
                <option value="memory">Memory</option>
            </select>
        </div>
        <div>
            <b>Card Set:</b>
            <input bind:value={options.cardSet} placeholder="—">
        </div>
        <div>
            <b>Skill Text:</b>
            <input bind:value={options.skillText} placeholder="—">
        </div>
    </div>
    <div class="col-half mt-4 lg:mt-0 lg:pl-4">
        {#if options.cardType === "member"}
            <div>
                <b>Rarity:</b>
                <select bind:value={options.memberRarity}>
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
                <b>School Year:</b>
                <select bind:value={options.memberYear}>
                    <option value="" selected>—</option>
                    <option value="year:1">1st Year</option>
                    <option value="year:2">2nd Year</option>
                    <option value="year:3">3nd Year</option>
                </select>
            </div>
            <div>
                <b>Cost:</b>
                <select bind:value={options.memberCost}>
                    <option value="" selected>—</option>
                    <option value="0">0★</option>
                    <option value="1">1★</option>
                    <option value="2">2★</option>
                    <option value="3">3★</option>
                </select>
                {#if uiOptionIsSet(options.memberCost)}
                    <select bind:value={options.memberCostMod}>
                        <option value="" selected>exactly</option>
                        <option value="-">or less</option>
                        <option value="+">or more</option>
                    </select>
                {/if}
            </div>
            <div>
                <b>Ability:</b>
                <select bind:value={options.memberAbility}>
                    <option value="" selected>—</option>
                    <option value="noability">None</option>
                    <option value="rush">[RUSH]</option>
                    <option value="live">[LIVE]</option>
                    <option value="rushorlive">[RUSH/LIVE]</option>
                </select>
            </div>
            <div>
                <b>Costume:</b>
                <input bind:value={options.memberCostume} placeholder="—">
            </div>
            <div class="!mt-4">
                <b>Pieces:</b>
                <select bind:value={options.memberPieces}>
                    <option value="" selected>—</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                {#if uiOptionIsSet(options.memberPieces)}
                    <select bind:value={options.memberPiecesMod}>
                        <option value="" selected>exactly</option>
                        <option value="-">or less</option>
                        <option value="+">or more</option>
                    </select>
                {/if}
            </div>
            <div class="pl-8">
                <b class="whitespace-nowrap">
                    <img class="skill-icon" src="/images/icons/piece_smile.png" alt="Smile"> Pieces:
                </b>
                <select bind:value={options.memberPiecesSmile}>
                    <option value="" selected>—</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                {#if uiOptionIsSet(options.memberPiecesSmile)}
                    <select bind:value={options.memberPiecesSmileMod}>
                        <option value="" selected>exactly</option>
                        <option value="-">or less</option>
                        <option value="+">or more</option>
                    </select>
                {/if}
            </div>
            <div class="pl-8">
                <b class="whitespace-nowrap">
                    <img class="skill-icon" src="/images/icons/piece_pure.png" alt="Pure"> Pieces:
                </b>
                <select bind:value={options.memberPiecesPure}>
                    <option value="" selected>—</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                {#if uiOptionIsSet(options.memberPiecesPure)}
                    <select bind:value={options.memberPiecesPureMod}>
                        <option value="" selected>exactly</option>
                        <option value="-">or less</option>
                        <option value="+">or more</option>
                    </select>
                {/if}
            </div>
            <div class="pl-8">
                <b class="whitespace-nowrap">
                    <img class="skill-icon" src="/images/icons/piece_cool.png" alt="Cool"> Pieces:
                </b>
                <select bind:value={options.memberPiecesCool}>
                    <option value="" selected>—</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                {#if uiOptionIsSet(options.memberPiecesCool)}
                    <select bind:value={options.memberPiecesCoolMod}>
                        <option value="" selected>exactly</option>
                        <option value="-">or less</option>
                        <option value="+">or more</option>
                    </select>
                {/if}
            </div>
            <div class="pl-8">
                <b class="whitespace-nowrap">
                    <img class="skill-icon" src="/images/icons/piece_all.png" alt="All"> Pieces:
                </b>
                <select bind:value={options.memberPiecesAll}>
                    <option value="" selected>—</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                {#if uiOptionIsSet(options.memberPiecesAll)}
                    <select bind:value={options.memberPiecesAllMod}>
                        <option value="" selected>exactly</option>
                        <option value="-">or less</option>
                        <option value="+">or more</option>
                    </select>
                {/if}
            </div>
            <div>
                <b>Birthday Bonus:</b>
                <select bind:value={options.memberPieceBonus}>
                    <option value="" selected>—</option>
                    <option value="nobonus">No</option>
                    <option value="bonus">Yes</option>
                </select>
            </div>
            <div>
                <b>Idolizable:</b>
                <select bind:value={options.memberIdolizable}>
                    <option value="" selected>—</option>
                    <option value="notidolizable">No</option>
                    <option value="idolizable">Yes</option>
                </select>
            </div>
        {:else if options.cardType === "song"}
            <div>
                <b>Rarity:</b>
                <select bind:value={options.songRarity}>
                    <option value="" selected>—</option>
                    <option value="m">M</option>
                    <option value="gr">GR</option>
                </select>
            </div>
            <div>
                <b>Attribute:</b>
                <select bind:value={options.songAttribute}>
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
                <input type="number" min="0" bind:value={options.songLivePoints} placeholder="—">
                {#if uiOptionIsSet(options.songLivePoints)}
                    <select bind:value={options.songLivePointsMod}>
                        <option value="" selected>exactly</option>
                        <option value="-">or less</option>
                        <option value="+">or more</option>
                    </select>
                {/if}
            </div>
            <div>
                <b>Requirement Type:</b>
                <select bind:value={options.songRequirementType}>
                    <option value="" selected>—</option>
                    <option value="anypiece">Any Piece Requirement</option>
                    <option value="attributepiece">Attribute Piece Requirement</option>
                </select>
            </div>
            {#if options.songRequirementType === "anypiece"}
                <div>
                    <b>Required Pieces</b>
                    <select bind:value={options.songPiecesAll}>
                        <option value="" selected>—</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    {#if uiOptionIsSet(options.songPiecesAll)}
                        <select bind:value={options.songPiecesAllMod}>
                            <option value="" selected>exactly</option>
                            <option value="-">or less</option>
                            <option value="+">or more</option>
                        </select>
                    {/if}
                </div>
            {:else if options.songRequirementType === "attributepiece"}
                <div>
                    <b class="whitespace-nowrap">
                        <img class="skill-icon" src="/images/icons/piece_smile.png" alt="Smile">
                        Requirement:
                    </b>
                    <select bind:value={options.songPiecesSmile}>
                        <option value="" selected>—</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    {#if uiOptionIsSet(options.songPiecesSmile)}
                        <select bind:value={options.songPiecesSmileMod}>
                            <option value="" selected>exactly</option>
                            <option value="-">or less</option>
                            <option value="+">or more</option>
                        </select>
                    {/if}
                </div>
                <div>
                    <b class="whitespace-nowrap">
                        <img class="skill-icon" src="/images/icons/piece_pure.png" alt="Pure"> Requirement:
                    </b>
                    <select bind:value={options.songPiecesPure}>
                        <option value="" selected>—</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    {#if uiOptionIsSet(options.songPiecesPure)}
                        <select bind:value={options.songPiecesPureMod}>
                            <option value="" selected>exactly</option>
                            <option value="-">or less</option>
                            <option value="+">or more</option>
                        </select>
                    {/if}
                </div>
                <div>
                    <b class="whitespace-nowrap">
                        <img class="skill-icon" src="/images/icons/piece_cool.png" alt="Cool">
                        Requirement:
                    </b>
                    <select bind:value={options.songPiecesCool}>
                        <option value="" selected>—</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    {#if uiOptionIsSet(options.songPiecesCool)}
                        <select bind:value={options.songPiecesCoolMod}>
                            <option value="" selected>exactly</option>
                            <option value="-">or less</option>
                            <option value="+">or more</option>
                        </select>
                    {/if}
                </div>
            {:else}
                <div class="mt-2">Select a Requirement Type to show additional search options.</div>
            {/if}
        {:else if options.cardType === "memory"}
            <div class="mt-2">Memory cards have no additional search options.</div>
        {:else}
            <div class="mt-2">Select a Card Type to show additional search options.</div>
        {/if}
    </div>
</div>
<div class="mt-2 flex items-center justify-end w-full">
    <Button label="Search" accent on:click={query}>Search</Button>
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
<script lang="ts">
    import {goto} from "$app/navigation";
    import Button from "$lib/style/Button.svelte";
    import {onMount} from "svelte";
    import type {Snapshot} from "./$types.js";

    type NumberQueryMod = "" | "-" | "+";

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

    function isSet(value: any) {
        return value !== undefined && value !== null && value !== "";
    }

    const mapSelectInput: { [name: string]: { urlParamOptions: string[], condition?: () => boolean } } = {
        "cardType": {urlParamOptions: ["member", "song", "memory"]},
        "memberRarity": {
            urlParamOptions: ["r", "sr", "hr", "special", "secret", "pr", "n", "ssr"],
            condition: () => cardType === "member"
        },
        "memberGroup": {
            urlParamOptions: ["muse", "aqours", "printemps", "lilywhite", "bibi", "cyaron", "azalea", "guiltykiss", "saintsnow"],
            condition: () => cardType === "member"
        },
        "memberYear": {urlParamOptions: ["year:1", "year:2", "year:3"], condition: () => cardType === "member"},
        "memberAbility": {
            urlParamOptions: ["noability", "rush", "live", "rushorlive"],
            condition: () => cardType === "member"
        },
        "memberPieceBonus": {urlParamOptions: ["nobonus", "bonus"], condition: () => cardType === "member"},
        "memberIdolizable": {urlParamOptions: ["notidolizable", "idolizable"], condition: () => cardType === "member"},
        "songRarity": {urlParamOptions: ["m", "gr"], condition: () => cardType === "song"},
        "songAttribute": {
            urlParamOptions: ["neutral", "smile", "pure", "cool", "orange"],
            condition: () => cardType === "song"
        },
        "songRequirementType": {urlParamOptions: ["anypiece", "attributepiece"], condition: () => cardType === "song"}
    }
    const mapSelectInputReverse = Object.keys(mapSelectInput)
        .map(name => mapSelectInput[name].urlParamOptions.map(param => ({[param]: name}))).flat()
        .reduce((obj, param) => ({...obj, ...param}), {});

    const mapTextInput: { [name: string]: { urlParam: string, condition?: () => boolean } } = {
        "cardName": {urlParam: "name"},
        "cardSet": {urlParam: "set"},
        "skillText": {urlParam: "skill"},
        "memberCostume": {urlParam: "costume", condition: () => cardType === "member"}
    }
    const mapTextInputReverse = Object.keys(mapTextInput)
        .map(name => ({[mapTextInput[name].urlParam]: name})).reduce((obj, param) => ({...obj, ...param}), {});

    const mapNumberInput: { [name: string]: { urlParam: string, condition?: () => boolean } } = {
        "memberCost": {urlParam: "cost", condition: () => cardType === "member"},
        "memberPieces": {urlParam: "pieces", condition: () => cardType === "member"},
        "memberPiecesSmile": {urlParam: "smilepieces", condition: () => cardType === "member"},
        "memberPiecesPure": {urlParam: "purepieces", condition: () => cardType === "member"},
        "memberPiecesCool": {urlParam: "coolpieces", condition: () => cardType === "member"},
        "memberPiecesAll": {urlParam: "allpieces", condition: () => cardType === "member"},
        "songLivePoints": {urlParam: "livepoints", condition: () => cardType === "song"},
        "songPiecesAll": {
            urlParam: "required",
            condition: () => cardType === "song" && songRequirementType === "anypiece"
        },
        "songPiecesSmile": {
            urlParam: "smilerequired",
            condition: () => cardType === "song" && songRequirementType === "attributepiece"
        },
        "songPiecesPure": {
            urlParam: "purerequired",
            condition: () => cardType === "song" && songRequirementType === "attributepiece"
        },
        "songPiecesCool": {
            urlParam: "coolrequired",
            condition: () => cardType === "song" && songRequirementType === "attributepiece"
        }
    }
    const mapNumberInputReverse = Object.keys(mapNumberInput)
        .map(name => ({[mapNumberInput[name].urlParam]: name})).reduce((obj, param) => ({...obj, ...param}), {});

    function query() {
        const filters = [];
        const form = snapshot.capture();

        // Dropdowns => 0-parameter filter
        for (const name of Object.keys(mapSelectInput)) {
            if (mapSelectInput[name].condition && mapSelectInput[name].condition() === false) continue;
            if (!isSet(form[name])) continue;
            filters.push(form[name]);
        }

        // Inputs => 1-parameter filter
        for (const name of Object.keys(mapTextInput)) {
            if (mapTextInput[name].condition && mapTextInput[name].condition() === false) continue;
            if (!isSet(form[name])) continue;
            filters.push(`${mapTextInput[name].urlParam}:${encodeURIComponent(form[name].replace(/\//g, "//"))}`);
        }

        // Number with Mod => 1-parameter filter
        for (const name of Object.keys(mapNumberInput)) {
            if (mapNumberInput[name].condition && mapNumberInput[name].condition() === false) continue;
            if (!isSet(form[name])) continue;
            filters.push(`${mapNumberInput[name].urlParam}:${form[name]}${form[name + "Mod"]}`);
        }

        if (filters.length > 0) {
            goto("/search/" + filters.join("/"));
        }
    }

    onMount(() => {
        if (history.state.prefillQueryUrl) {
            const formValues = snapshot.capture();
            const filterQueries = history.state.prefillQueryUrl.split(/(?<!\/)\/(?!\/)/g).map(f => f.replace(/\/\//g, "/"));

            for (const filterQuery of filterQueries) {
                const split = filterQuery.split(":");
                console.log(split);
                if (mapSelectInputReverse.hasOwnProperty(filterQuery)) {
                    console.log("select", filterQuery);
                    formValues[mapSelectInputReverse[filterQuery]] = filterQuery;
                } else if (mapTextInputReverse.hasOwnProperty(split[0])) {
                    console.log("text", split);
                    formValues[mapTextInputReverse[split[0]]] = split[1];
                } else if (mapNumberInputReverse.hasOwnProperty(split[0])) {
                    console.log("number", split);
                    formValues[mapNumberInputReverse[split[0]]] = parseInt(split[1]).toString();
                    if (split[1].endsWith("+") || split[1].endsWith("-")) {
                        formValues[mapNumberInputReverse[split[0]] + "Mod"] = split[1].at(-1);
                    } else {
                        formValues[mapNumberInputReverse[split[0]] + "Mod"] = "";
                    }
                }
            }

            console.log(formValues);
            snapshot.restore(formValues);
        }
    });
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
                                <option value="year:1">1st Year</option>
                                <option value="year:2">2nd Year</option>
                                <option value="year:3">3nd Year</option>
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
                            {#if isSet(memberCost)}
                                <select bind:value={memberCostMod}>
                                    <option value="" selected>exactly</option>
                                    <option value="-">or less</option>
                                    <option value="+">or more</option>
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
                            {#if isSet(memberPieces)}
                                <select bind:value={memberPiecesMod}>
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
                            <select bind:value={memberPiecesSmile}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if isSet(memberPiecesSmile)}
                                <select bind:value={memberPiecesSmileMod}>
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
                            <select bind:value={memberPiecesPure}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if isSet(memberPiecesPure)}
                                <select bind:value={memberPiecesPureMod}>
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
                            <select bind:value={memberPiecesCool}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if isSet(memberPiecesCool)}
                                <select bind:value={memberPiecesCoolMod}>
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
                            <select bind:value={memberPiecesAll}>
                                <option value="" selected>—</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {#if isSet(memberPiecesAll)}
                                <select bind:value={memberPiecesAllMod}>
                                    <option value="" selected>exactly</option>
                                    <option value="-">or less</option>
                                    <option value="+">or more</option>
                                </select>
                            {/if}
                        </div>
                        <div>
                            <b>Birthday Bonus:</b>
                            <select bind:value={memberPieceBonus}>
                                <option value="" selected>—</option>
                                <option value="nobonus">No</option>
                                <option value="bonus">Yes</option>
                            </select>
                        </div>
                        <div>
                            <b>Idolizable:</b>
                            <select bind:value={memberIdolizable}>
                                <option value="" selected>—</option>
                                <option value="notidolizable">No</option>
                                <option value="idolizable">Yes</option>
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
                            <input type="number" min="0" bind:value={songLivePoints} placeholder="—">
                            {#if isSet(songLivePoints)}
                                <select bind:value={songLivePointsMod}>
                                    <option value="" selected>exactly</option>
                                    <option value="-">or less</option>
                                    <option value="+">or more</option>
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
                        {#if songRequirementType === "anypiece"}
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
                                {#if isSet(songPiecesAll)}
                                    <select bind:value={songPiecesAllMod}>
                                        <option value="" selected>exactly</option>
                                        <option value="-">or less</option>
                                        <option value="+">or more</option>
                                    </select>
                                {/if}
                            </div>
                        {:else if songRequirementType === "attributepiece"}
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
                                {#if isSet(songPiecesSmile)}
                                    <select bind:value={songPiecesSmileMod}>
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
                                <select bind:value={songPiecesPure}>
                                    <option value="" selected>—</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                {#if isSet(songPiecesPure)}
                                    <select bind:value={songPiecesPureMod}>
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
                                <select bind:value={songPiecesCool}>
                                    <option value="" selected>—</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                {#if isSet(songPiecesCool)}
                                    <select bind:value={songPiecesCoolMod}>
                                        <option value="" selected>exactly</option>
                                        <option value="-">or less</option>
                                        <option value="+">or more</option>
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
                <Button accent on:click={query}>Search</Button>
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
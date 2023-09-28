<script lang="ts" context="module">
    import {
        type HotkeyAction,
        type Hotkeys,
        type Profile,
        keyEventToHotkeyName,
        loadHotkeysOrDefault,
        loadProfileOrNew,
        saveHotkeys as saveHotkeysToStorage,
        saveProfile as saveProfileToStorage,
        textColorForBackground,
    } from "$lib/play/profile.js";
    import { stringIsHexColor } from "$lib/utils/string.js";
    import Button from "$lib/style/Button.svelte";
</script>

<script lang="ts">
    let profile: Profile = loadProfileOrNew(),
        hotkeys: Hotkeys = loadHotkeysOrDefault();
    let profileButtonLabel: string = "Save Profile";
    let hotkeysButtonLabel: string = "Save Hotkeys";

    function validate(s: string) {
        if (stringIsHexColor(s)) return s;
        return "#000000";
    }

    function saveProfile() {
        saveProfileToStorage(profile);
        profileButtonLabel = "Profile Saved!";
        setTimeout(() => (profileButtonLabel = "Save Profile"), 2000);
    }

    function setHotkey(e: KeyboardEvent, action: HotkeyAction) {
        const key = keyEventToHotkeyName(e);
        if (key) hotkeys[action] = key;
    }

    function saveHotkeys() {
        saveHotkeysToStorage(hotkeys);
        hotkeysButtonLabel = "Hotkeys Saved!";
        setTimeout(() => (hotkeysButtonLabel = "Save Hotkeys"), 2000);
    }
</script>

<svelte:head>
    <title>Profile Settings &bull; SIC</title>
</svelte:head>

<div class="content">
    <h3>Profile Settings</h3>
    <div class="panel">
        <div class="panel-inner">
            <div class="my-4 rounded-3xl px-4 py-2 bg-yellow-800 text-justify">
                <b>Note: </b> While these options allow you to customize your play field, there is no in-built multiplayer
                (yet). As such, this info will be only visible to you yourself. However, if you want to play with others,
                you can still do that by screen-sharing your play field with others on something like Discord!
            </div>
            <div class="flex gap-4 flex-col lg:flex-row items-start">
                <div class="grid grid-cols-[1fr,2fr] gap-2 items-center">
                    <h5 class="col-span-2 m-0">Profile</h5>
                    <b>Player Name</b>
                    <input bind:value={profile.name} />
                    <b>Field Borders</b>
                    <div class="flex gap-2 items-center">
                        <input type="color" bind:value={profile.fieldColor} />
                        <input class="flex-grow" bind:value={profile.fieldColor} pattern={"#[a-fA-F0-9]{6}"} />
                    </div>
                    <b>Member Card Back</b>
                    <div class="flex gap-2 items-center">
                        <input type="color" bind:value={profile.deckColor} />
                        <input class="flex-grow" bind:value={profile.deckColor} pattern={"#[a-fA-F0-9]{6}"} />
                    </div>
                    <b>Song Card Back</b>
                    <div class="flex gap-2 items-center">
                        <input type="color" bind:value={profile.setListColor} />
                        <input class="flex-grow" bind:value={profile.setListColor} pattern={"#[a-fA-F0-9]{6}"} />
                    </div>
                    <div class="w-full col-span-full flex justify-end">
                        <Button
                            label="Save Profile"
                            accent
                            on:click={saveProfile}
                            disabled={profile.name.length === 0 ||
                                !stringIsHexColor(profile.fieldColor) ||
                                !stringIsHexColor(profile.deckColor) ||
                                !stringIsHexColor(profile.setListColor)}
                        >
                            {profileButtonLabel}
                        </Button>
                    </div>
                </div>
                <div class="flex-grow flex flex-col">
                    <h5>Preview</h5>
                    <div
                        class="bg-background flex-grow relative overflow-hidden w-full min-w-[360px] max-w-[500px] min-h-[300px] self-center"
                    >
                        <div class="background" style:--player-color={validate(profile.fieldColor)}>
                            <div class="area deck" />
                            <div class="area setlist" />
                            <div class="line live" />
                            <div class="line info" />
                            <div class="name">{profile.name}</div>
                        </div>
                        <div
                            class="objstack objstackdeck"
                            style:--stack-color={validate(profile.deckColor)}
                            style:--text-color={textColorForBackground(profile.deckColor)}
                        >
                            <div class="stack floor" />
                            <div class="stack bottom" />
                            <div class="stack top">30</div>
                        </div>
                        <div
                            class="objstack objstacksetlist"
                            style:--stack-color={validate(profile.setListColor)}
                            style:--text-color={textColorForBackground(profile.setListColor)}
                        >
                            <div class="stack floor" />
                            <div class="stack bottom" />
                            <div class="stack top">10</div>
                        </div>
                        <div
                            style:--deck-color={validate(profile.deckColor)}
                            style:--setlist-color={validate(profile.setListColor)}
                        >
                            <div class="card h" style:left="146px" style:bottom="23px" />
                            <div class="card v" style:right="20px" style:top="20px" />
                            <div class="card v" style:right="110px" style:top="20px" />
                            <div class="card v" style:right="100px" style:top="20px" />
                            <div class="card v" style:right="90px" style:top="20px" />
                            <div class="card v" style:left="75px" style:top="20px" />
                            <div class="card v" style:left="85px" style:top="20px" />
                            <div class="card v" style:left="95px" style:top="20px" />
                            <div class="card v" style:left="105px" style:top="20px" />
                            <div class="card v" style:left="115px" style:top="20px" />
                            <div class="card h" style:left="82px" style:top="33px" />
                        </div>
                    </div>
                </div>
            </div>
            <h5>Hotkeys</h5>
            <div
                class="grid grid-cols-[1fr,2fr] sm:grid-cols[repeat(2,1fr_2fr)] lg:grid-cols-[repeat(3,1fr_2fr)] xl:grid-cols-[repeat(4,1fr_2fr)] gap-2 items-center"
            >
                <b>⟪SCOUT⟫</b>
                <input
                    class="max-w-[8rem]"
                    bind:value={hotkeys["scout"]}
                    on:keydown={(e) => setHotkey(e, "scout")}
                    on:beforeinput|preventDefault={() => null}
                />
                <b>⟪ENTER⟫</b>
                <input
                    class="max-w-[8rem]"
                    bind:value={hotkeys["enter"]}
                    on:keydown={(e) => setHotkey(e, "enter")}
                    on:beforeinput|preventDefault={() => null}
                />
                <b>Prepare ⟪LIVE⟫</b>
                <input
                    class="max-w-[8rem]"
                    bind:value={hotkeys["live"]}
                    on:keydown={(e) => setHotkey(e, "live")}
                    on:beforeinput|preventDefault={() => null}
                />
                <b>Draw card from Deck</b>
                <input
                    class="max-w-[8rem]"
                    bind:value={hotkeys["draw"]}
                    on:keydown={(e) => setHotkey(e, "draw")}
                    on:beforeinput|preventDefault={() => null}
                />
                <b>Reveal Song card</b>
                <input
                    class="max-w-[8rem]"
                    bind:value={hotkeys["song"]}
                    on:keydown={(e) => setHotkey(e, "song")}
                    on:beforeinput|preventDefault={() => null}
                />
                <b>Flip card</b>
                <input
                    class="max-w-[8rem]"
                    bind:value={hotkeys["flip"]}
                    on:keydown={(e) => setHotkey(e, "flip")}
                    on:beforeinput|preventDefault={() => null}
                />
                <div class="w-full col-span-full flex justify-end">
                    <Button label="Save Hotkeys" accent on:click={saveHotkeys} disabled={false}>
                        {hotkeysButtonLabel}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .background {
        @apply absolute border border-solid box-content rounded-md;
        left: 5px;
        right: 5px;
        top: 5px;
        bottom: 5px;
        border-color: var(--player-color);

        & .area {
            @apply absolute border border-solid z-play-field box-content rounded-md;
            border-color: var(--player-color);

            &.setlist {
                left: 33px;
                right: 120px;
                height: 75.5px;
                bottom: 10px;

                &:before {
                    content: "Set List";
                    left: -25px;
                    top: -10px;
                    bottom: -10px;
                    transform: rotate(180deg);
                }
            }

            &.deck {
                right: 32px;
                width: 77.5px;
                bottom: 10px;
                height: 102px;

                &:before {
                    content: "Deck";
                    right: -25px;
                    top: 0px;
                    bottom: 0px;
                }
            }

            &:before {
                @apply absolute font-bold text-center uppercase tracking-widest;
                color: var(--player-color);
                font-size: 14px;
                line-height: 21px;
                writing-mode: vertical-rl;
            }
        }

        & .line {
            @apply absolute border-l border-solid z-play-field;
            width: 1px;
            top: 10px;
            bottom: 98px;
            border-color: var(--player-color);

            &.live {
                left: 190px;
            }
            &.info {
                left: 61px;
            }
        }

        & .name {
            @apply absolute text-white font-bold overflow-hidden text-ellipsis text-center z-play-ui;
            left: 0px;
            width: 60px;
            top: 10px;
            bottom: 98px;
            font-size: 30px;
            line-height: 60px;
            writing-mode: vertical-rl;
            transform: rotate(180deg);
        }
    }

    .objstack {
        @apply absolute w-min z-play-stack select-none;

        & .stack {
            &.floor {
                @apply absolute left-0 bottom-0 border border-solid box-border;
                border-color: var(--stack-color);
            }

            &.bottom {
                @apply absolute left-0 bottom-0;
                background-color: var(--stack-color);
                margin-top: 60px;

                &:after {
                    @apply absolute left-0 right-0 top-0 bottom-0;
                    content: " ";
                    background: repeating-linear-gradient(
                        0deg,
                        rgba(0, 0, 0, 0.25),
                        rgba(0, 0, 0, 0.25) 1px,
                        rgba(0, 0, 0, 0.5) 1px,
                        rgba(0, 0, 0, 0.5) 2px
                    );
                }
            }

            &.top {
                @apply absolute left-0 flex items-center justify-center font-bold border border-solid border-black/25;
                color: var(--text-color);
                background-color: var(--stack-color);
                font-size: 32px;
            }
        }

        &.objstackdeck {
            width: 65px;
            height: 151px;
            right: 45px;
            bottom: 23px;

            & .stack {
                @apply rounded-card-v;
                width: 65px;
                height: 91px;

                &.bottom:after {
                    @apply rounded-card-v;
                }
            }

            & .top {
                bottom: 30px;
            }
        }

        &.objstacksetlist {
            width: 91px;
            height: 125px;
            left: 46px;
            bottom: 23px;

            & .stack {
                @apply rounded-card-h;
                width: 91px;
                height: 65px;

                &.bottom:after {
                    @apply rounded-card-h;
                }
            }

            & .top {
                bottom: 10px;
            }
        }
    }

    .card {
        @apply absolute flex items-center justify-center shadow-sm shadow-black;

        &.h {
            @apply rounded-card-h;
            width: 91px;
            height: 65px;
            background-color: var(--setlist-color);
        }
        &.v {
            @apply rounded-card-v;
            width: 65px;
            height: 91px;
            background-color: var(--deck-color);
        }
    }
</style>

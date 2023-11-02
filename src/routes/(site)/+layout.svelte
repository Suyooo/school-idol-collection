<script lang="ts">
    import { onMount } from "svelte";
    import { goto as gotoInThisTab } from "$app/navigation";
    import "svooltip/styles.css";
    import "../../app.css";
    import { couldBeEntryCardNo, entryCardNoToCanonical } from "$lib/utils/entry.js";
    import { stringIsInteger } from "$lib/utils/string.js";
    import Button from "$lib/style/Button.svelte";
    import Collapse from "$lib/style/icons/Collapse.svelte";
    import Menu from "$lib/style/icons/Menu.svelte";
    import Search from "$lib/style/icons/Search.svelte";
    import Spinner from "$lib/style/icons/Spinner.svelte";

    let menuExpanded: boolean = false,
        quicksearch: string = "",
        searching: boolean = false,
        isAltDown: boolean = false;

    async function goto(url: string) {
        if (isAltDown) {
            window.open(url, "_blank");
        } else {
            await gotoInThisTab(url);
        }
        searching = false;
        quicksearch = "";
    }

    function doQuicksearch() {
        if (quicksearch === "" || searching) return;
        searching = true;
        if (couldBeEntryCardNo(quicksearch, false)) {
            // Card number - go directly to page
            goto(`/card/${entryCardNoToCanonical(quicksearch)}`);
        } else if (quicksearch.length <= 4 && stringIsInteger(quicksearch)) {
            // Only digits - probably a card ID, search for that
            fetch(`/json/search/id:${quicksearch}`).then(async (res) => {
                const cards = (await res.json()).cards;
                if (cards && cards.length > 0) {
                    goto(`/card/${cards[0].cardNo}`);
                } else {
                    // No cards with that ID, go to search page to show "no results" text
                    goto(`/search/id:${quicksearch}`);
                }
            });
        } else {
            // Name search
            goto(`/search/name:${quicksearch}`);
        }
    }

    function updateAltStatus(e: KeyboardEvent) {
        if (e.key === "Alt") {
            isAltDown = e.type === "keydown";
        }
    }

    if (import.meta.env.DEV) {
        onMount(() => {
            document.body.classList.add("ready");
        });
    }
</script>

<svelte:window on:keydown={updateAltStatus} on:keyup={updateAltStatus} />

<div class="header">
    <div class="cont">
        <div class="menu">
            <div class="top">
                <a class="logo" href="/">SIC</a>
                <div class="expand">
                    <div>
                        <Button
                            accent
                            classes="w-9 h-9 !px-0 !rounded-full flex items-center justify-center"
                            on:click={() => (menuExpanded = !menuExpanded)}
                            label={menuExpanded ? "Collapse Menu" : "Expand Menu"}
                        >
                            {#if menuExpanded}
                                <Collapse />
                            {:else}
                                <Menu />
                            {/if}
                        </Button>
                    </div>
                </div>
            </div>
            <div class="buttons" class:open={menuExpanded}>
                <a href="/list">Card List</a>
                <a href="/faq">How To Play</a>
                <a href="/search">Search</a>
                <a href="/labels">Label Printer</a>
                <a href="/about">About</a>
            </div>
        </div>
        <form class="quicksearch" on:submit|preventDefault={doQuicksearch}>
            {#if import.meta.env.DEV}
                <Button accent classes="!rounded-full mr-4" href="/admin" label="Admin">Admin</Button>
            {/if}
            <input
                placeholder="Quick Search (Card No., ID or Name)"
                bind:value={quicksearch}
                aria-label="Quick Search. Enter a card number, ID or name"
                disabled={searching}
            />
            <button
                class:text-primary-400={quicksearch === ""}
                disabled={quicksearch === "" || searching}
                aria-label="Submit Quick Search"
            >
                {#if searching}
                    <Spinner />
                {:else}
                    <Search />
                {/if}
            </button>
        </form>
    </div>
</div>

<div class="cont">
    <slot />
</div>

<style lang="postcss">
    .header {
        @apply w-full bg-primary-700;

        & .cont {
            @apply flex flex-col sm:flex-row gap-y-2 items-start justify-between;

            & .menu {
                @apply w-full flex flex-col sm:flex-row items-center sm:items-start text-accent-400 font-bold tracking-widest uppercase;

                & .top {
                    @apply w-full sm:w-max flex-shrink flex sm:ml-0 items-center justify-between sm:justify-start;

                    & .logo {
                        @apply text-3xl no-underline cursor-pointer;
                    }

                    & .expand {
                        @apply flex flex-none sm:px-4;
                    }
                }

                & .buttons {
                    @apply flex flex-wrap flex-col sm:flex-row items-center gap-x-4 gap-y-2;

                    & a {
                        @apply hidden px-6 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded-full no-underline whitespace-nowrap;

                        &:nth-child(-n + 1) {
                            @apply md:block;
                        }

                        &:nth-child(-n + 2) {
                            @apply lg:block;
                        }

                        &:nth-child(-n + 3) {
                            @apply 2xl:block;
                        }
                    }

                    &.open {
                        & a {
                            @apply block;
                        }
                    }
                }
            }

            & .quicksearch {
                @apply flex-grow w-full relative flex items-center sm:justify-end;

                & input {
                    @apply w-full sm:max-w-sm pr-9;
                }

                & button {
                    @apply absolute right-2;
                }
            }
        }
    }
</style>

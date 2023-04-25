<script lang="ts">
    import "../../app.css";
    import {goto} from "$app/navigation";
    import Button from "$lib/style/Button.svelte";
    import Collapse from "$lib/style/icons/Collapse.svelte";
    import Menu from "$lib/style/icons/Menu.svelte";
    import Search from "$lib/style/icons/Search.svelte";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import {couldBeEntryCardNo, entryCardNoToCanonical} from "$lib/utils/entry.js";
    import {stringIsInteger} from "$lib/utils/string.js";

    let menuExpanded: boolean = false, quicksearch: string = "", searching: boolean = false;

    function doQuicksearch() {
        if (quicksearch === "" || searching) return;
        searching = true;
        if (couldBeEntryCardNo(quicksearch, false)) {
            // Card number - go directly to page
            goto(`/card/${entryCardNoToCanonical(quicksearch)}`).finally(() => searching = false);
        } else if (quicksearch.length <= 4 && stringIsInteger(quicksearch)) {
            // Only digits - probably a card ID, search for that
            fetch(`/json/search/id:${quicksearch}`).then(async (res) => {
                const cards = (await res.json()).cards;
                if (cards.length > 0) {
                    goto(`/card/${cards[0].cardNo}`).finally(() => searching = false);
                } else {
                    // No cards with that ID, go to search page to show "no results" text
                    goto(`/search/id:${quicksearch}`).finally(() => searching = false);
                }
            });
        } else {
            // Name search
            goto(`/search/name:${quicksearch}`).finally(() => searching = false);
        }
    }
</script>

<div class="header">
    <div class="cont">
        <div class="menu">
            <div class="list">
                <div class="logo">SIC</div>
                <div class="buttons" class:!h-max={menuExpanded}>
                    <a href="/list">Card List</a>
                    <a href="/search">Search</a>
                    <a href="/faq">Rules and FAQ</a>
                    <a href="/labels">Label Printer</a>
                </div>
            </div>
            <div class="expand">
                <div>
                    <Button accent classes="w-9 h-9 !px-0 !rounded-full flex items-center justify-center"
                            on:click={() => menuExpanded = !menuExpanded}
                            label={menuExpanded ? "Collapse Menu" : "Expand Menu"}>
                        {#if menuExpanded}
                            <Collapse/>
                        {:else}
                            <Menu/>
                        {/if}
                    </Button>
                </div>
            </div>
        </div>
        <form class="quicksearch" on:submit|preventDefault={doQuicksearch}>
            <input placeholder="Quick Search (Card No., ID or Name)" bind:value={quicksearch}
                aria-label="Quick Search. Enter a card number, ID or name">
            <button class:text-primary-400={quicksearch === ""} disabled={quicksearch === "" || searching}
                    aria-label="Submit Quick Search">
                {#if searching}
                    <Spinner/>
                {:else}
                    <Search/>
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
        @apply w-full bg-primary-700 ;

        & .cont {
            @apply flex flex-col sm:flex-row gap-y-2 items-start justify-between;

            & .menu {
                @apply w-full flex flex-row items-stretch text-accent-400 font-bold tracking-widest uppercase;

                & .list {
                    @apply w-full flex-shrink flex flex-col sm:flex-row ml-16 sm:ml-0 items-center sm:items-start gap-x-4 gap-y-2;

                    & .logo {
                        @apply text-3xl;
                    }

                    & .buttons {
                        @apply h-0 sm:h-9 overflow-hidden flex flex-wrap flex-col sm:flex-row items-center gap-x-4 gap-y-2;

                        & a {
                            @apply px-6 py-2 bg-primary-500 text-white rounded-full no-underline whitespace-nowrap;
                        }
                    }
                }

                & .expand {
                    @apply flex flex-shrink-0 items-start justify-start basis-16 pl-4;
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
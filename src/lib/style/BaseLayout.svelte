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
	import ThemeLight from "$lib/style/icons/ThemeLight.svelte";
	import ThemeDark from "$lib/style/icons/ThemeDark.svelte";
	import { navigating } from "$app/stores";

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
			fetch(`/json/search/id=${quicksearch}`).then(async (res) => {
				const cards = (await res.json()).cards;
				if (cards && cards.length > 0) {
					goto(`/card/${cards[0].cardNo}`);
				} else {
					// No cards with that ID, go to search page to show "no results" text
					goto(`/search/id=${quicksearch}`);
				}
			});
		} else {
			// Name search
			goto(`/search/name=${quicksearch}`);
		}
	}

	function updateAltStatus(e: KeyboardEvent) {
		if (e.key === "Alt") {
			isAltDown = e.type === "keydown";
		}
	}

	let theme: string = (typeof localStorage === "undefined" ? null : localStorage)?.getItem("sic-theme") || "light";
	function changeTheme() {
		theme = document.body.dataset.theme === "dark" ? "light" : "dark";
		localStorage.setItem("sic-theme", theme);
		document.body.dataset.theme = theme;
	}

	if (import.meta.env.DEV) {
		onMount(() => {
			const onUnmount = navigating.subscribe((isNavigating) => {
				if (isNavigating) document.body.classList.remove("ready");
				else document.body.classList.add("ready");
			});
			document.body.classList.add("ready");
			return onUnmount;
		});
	}
</script>

<svelte:window on:keydown={updateAltStatus} on:keyup={updateAltStatus} />

<header class="header">
	<div class="cont">
		<div class="menu">
			<div class="top">
				<a class="logo" href="/">SIC</a>
				<div class="expand">
					<div>
						<Button
							accent
							class="flex h-10 w-10 items-center justify-center !px-0"
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
				<Button href="/list" label="Card List" class="!text-base !tracking-widest" header>Card List</Button>
				<Button href="/faq" label="How To Play" class="!text-base !tracking-widest" header>How To Play</Button>
				<Button href="/search" label="Card Search" class="!text-base !tracking-widest" header>Card Search</Button>
				<Button href="/labels" label="Label Printer" class="!text-base !tracking-widest" header>Label Printer</Button>
				<Button href="/about" label="About This Site" class="!text-base !tracking-widest" header>
					About This Site
				</Button>
			</div>
		</div>
		<div class="rightside">
			{#if import.meta.env.DEV}
				<Button accent href="/admin" label="Admin">Admin</Button>
			{/if}
			<div class="flex items-center gap-x-1">
				<ThemeLight></ThemeLight>
				<button class="relative box-content h-5 w-10 rounded-full border-2 text-text" on:click={changeTheme}>
					<div
						class="absolute top-0.5 h-4 w-4 rounded-full bg-text"
						class:left-0.5={theme !== "dark"}
						class:right-0.5={theme === "dark"}
					></div>
				</button>
				<ThemeDark></ThemeDark>
			</div>
			<form class="quicksearch" on:submit|preventDefault={doQuicksearch}>
				<input
					placeholder="Quick Search (Card No., ID or Name)"
					bind:value={quicksearch}
					aria-label="Quick Search. Enter a card number, ID or name"
					disabled={searching}
				/>
				<button disabled={quicksearch === "" || searching} aria-label="Submit Quick Search">
					{#if searching}
						<Spinner />
					{:else}
						<Search />
					{/if}
				</button>
			</form>
		</div>
	</div>
</header>

<main class="cont">
	<slot />
</main>

<style lang="postcss">
	.header {
		@apply w-full bg-background-accent;

		& .cont {
			@apply flex max-w-screen-2xl flex-col items-start justify-between gap-y-2 sm:flex-row;

			& .menu {
				@apply flex w-full flex-col items-center font-bold uppercase tracking-widest sm:flex-row sm:items-start;

				& .top {
					@apply flex w-full flex-shrink items-center justify-between sm:ml-0 sm:w-max sm:justify-start;

					& .logo {
						@apply cursor-pointer text-3xl leading-10 no-underline;
					}

					& .expand {
						@apply flex flex-none sm:px-4;
					}
				}

				& .buttons {
					@apply flex flex-col flex-wrap items-center gap-x-4 gap-y-2 sm:flex-row;

					& :global(a) {
						@apply hidden;

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
						& :global(a) {
							@apply block;
						}
					}
				}
			}

			& .rightside {
				@apply flex w-full flex-grow items-center gap-x-4 sm:justify-end;

				& .quicksearch {
					@apply relative min-w-[20rem];

					& input {
						@apply w-full pr-9 sm:max-w-sm;
					}

					& button {
						@apply absolute bottom-0 right-2 top-0;
					}
				}
			}
		}
	}
</style>

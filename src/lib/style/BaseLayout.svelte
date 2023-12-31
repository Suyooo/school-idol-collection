<script lang="ts">
	import { onMount } from "svelte";
	import { goto as gotoInThisTab } from "$app/navigation";
	import "svooltip/styles.css";
	import "../../app.css";
	import Button from "$lib/style/Button.svelte";
	import Collapse from "$lib/style/icons/Collapse.svelte";
	import Menu from "$lib/style/icons/Menu.svelte";
	import Search from "$lib/style/icons/Search.svelte";
	import Spinner from "$lib/style/icons/Spinner.svelte";
	import { navigating } from "$app/stores";
	import BaseLayoutThemeToggle from "$lib/style/BaseLayoutThemeToggle.svelte";
	import { getUrlForQuicksearchQuery } from "$lib/search/quicksearch.js";
	import type { FormEventHandler } from "svelte/elements";
	import { browser } from "$app/environment";

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
		getUrlForQuicksearchQuery(quicksearch).then((url) => goto(url));
	}

	function updateAltStatus(e: KeyboardEvent) {
		if (e.key === "Alt") {
			isAltDown = e.type === "keydown";
		}
	}

	let theme: string =
		typeof localStorage !== "undefined" ?
			localStorage.getItem("sic-theme") ||
			(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
		:	"light";
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
				<div class="topbuttons">
					<BaseLayoutThemeToggle {theme} {changeTheme} class="sm:hidden" />
					<div>
						<Button
							accent
							class="flex h-10 w-10 items-center justify-center !bg-link !px-0 !text-text-contrast hover:!bg-link-hover active:!bg-link-hover"
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
				<Button href="/list" label="Card List" header>Card List</Button>
				<Button href="/faq" label="How To Play" header>How To Play</Button>
				<Button href="/search" label="Card Search" header>Card Search</Button>
				<Button href="/labels" label="Label Printer" header>Label Printer</Button>
				<Button href="/about" label="About This Site" header>About This Site</Button>
				{#if import.meta.env.DEV}
					<Button accent href="/admin" label="Admin">Admin</Button>
				{/if}
			</div>
		</div>
		<div class="rightside">
			<BaseLayoutThemeToggle {theme} {changeTheme} class="max-sm:hidden" />
			<form class="quicksearch" on:submit|preventDefault={doQuicksearch} action="/redirect/quicksearch" method="POST">
				<input
					placeholder="Quick Search (Card No., ID or Name)"
					bind:value={quicksearch}
					aria-label="Quick Search. Enter a card number, ID or name"
					disabled={searching}
					name="query"
				/>
				<button disabled={browser && (quicksearch === "" || searching)} aria-label="Submit Quick Search">
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
			@apply flex max-w-screen-2xl flex-col items-start justify-between gap-y-2 max-sm:py-2 sm:flex-row;

			& .menu {
				@apply flex w-full flex-col items-center font-bold uppercase tracking-widest sm:flex-row sm:items-start;

				& .top {
					@apply flex w-full flex-shrink items-center justify-between sm:ml-0 sm:w-max sm:justify-start;

					& .logo {
						@apply cursor-pointer text-3xl leading-10 no-underline hover:underline active:underline;
					}

					& .topbuttons {
						@apply flex flex-none items-center gap-x-4 sm:px-4;
					}
				}

				& .buttons {
					@apply flex flex-col flex-wrap items-center gap-x-4 gap-y-2 sm:flex-row;

					& :global(a) {
						@apply hidden !text-base !tracking-widest;

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
					@apply relative w-full sm:min-w-[20rem] sm:max-w-sm;

					& input {
						@apply w-full pr-9;
					}

					& button {
						@apply absolute bottom-0 right-2 top-0;
					}
				}
			}
		}
	}
</style>

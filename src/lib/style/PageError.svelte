<script lang="ts">
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>Error &bull; SIC</title>
</svelte:head>

<h1 class="sr-only">Error Page: {$page.status}</h1>

<div class="panel error">
	<div class="panel-inner flex w-full items-center gap-4 max-lg:flex-col">
		<div class="text-3xl font-bold text-text-header-intext">{$page.status}</div>
		<div>{$page.error?.message ?? ""}</div>
	</div>
</div>

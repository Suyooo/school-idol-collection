<script>
	import Go from "$lib/style/icons/Go.svelte";
	import LinkList from "./LinkList.svelte";
</script>

<svelte:head>
	<title>Cards Admin Panel &bull; SIC</title>
</svelte:head>

<h1>
	<div>
		<a class="button" href="/admin">Admin Panel</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
	</div>
	Cards
</h1>
<div class="panel">
	<div class="panel-inner">
		<LinkList />
	</div>
</div>

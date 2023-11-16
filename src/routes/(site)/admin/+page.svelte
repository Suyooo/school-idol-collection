<script>
	import PageHeader from "$lib/style/PageHeader.svelte";
	import CardLinkList from "./card/LinkList.svelte";
	import PatternLinkList from "./pattern/LinkList.svelte";
</script>

<svelte:head>
	<title>Admin Panel &bull; SIC</title>
</svelte:head>

<PageHeader>Admin Panel</PageHeader>
<div class="panel">
	<div class="panel-inner">
		<h2><a href="/admin/card">Cards</a></h2>
		<CardLinkList />
	</div>
</div>
<div class="panel mt-4">
	<div class="panel-inner">
		<h2><a href="/admin/pattern">Patterns</a></h2>
		<PatternLinkList />
	</div>
</div>

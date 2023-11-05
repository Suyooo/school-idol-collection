<script>
	import CardLinkList from "./card/LinkList.svelte";
	import PatternLinkList from "./pattern/LinkList.svelte";
</script>

<svelte:head>
	<title>Admin &bull; SIC</title>
</svelte:head>

<div class="content">
	<h3>Admin Panel</h3>
	<div class="panel">
		<div class="panel-inner">
			<h4><a href="/admin/card">Cards</a></h4>
			<CardLinkList />
		</div>
	</div>
	<div class="panel">
		<div class="panel-inner">
			<h4><a href="/admin/pattern">Patterns</a></h4>
			<PatternLinkList />
		</div>
	</div>
</div>

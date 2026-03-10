<script>
	import '$lib/main.css';
	import favicon from '$lib/assets/icon.png';
	import { resolve } from '$app/paths';
	import { db } from '$lib/data'
	let { children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Idle Screen Engine</title>
	<script src="https://kit.fontawesome.com/5cf062dc93.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="page">
	{@render children()}
</div>

<style>


</style>
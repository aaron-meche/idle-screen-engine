<script>
	import '$lib/main.css';
	import favicon from '$lib/assets/icon.png';
	import { resolve } from '$app/paths';
	import { db } from '$lib/data'
	let { children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Aaron Meche - Resume</title>
	<script src="https://kit.fontawesome.com/5cf062dc93.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="page">
	{@render children()}
</div>

<style>
	.page{
		height: calc(100vh - 4rem);
		aspect-ratio: 1 / calc(11 / 8.5);
		margin: 2rem auto;
		background: white;
		box-shadow: 0 0 2rem 0 var(--l2);
	}

</style>
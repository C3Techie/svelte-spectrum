<script lang="ts">
	import './layout.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/600.css';
	import '@fontsource/geist-sans/400.css';
	import '@fontsource/geist-sans/700.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

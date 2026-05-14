<script lang="ts">
	import './layout.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/600.css';
	import '@fontsource/geist-sans/400.css';
	import '@fontsource/geist-sans/700.css';


	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	let { children } = $props();
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] bg-primary-fixed-dim text-on-primary-fixed px-4 py-2 rounded font-mono text-sm"
>
	Skip to content
</a>

{#key $page.url.pathname}
	<div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
		{@render children()}
	</div>
{/key}

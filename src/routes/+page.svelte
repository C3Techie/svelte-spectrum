<script lang="ts">
	import Background from '$lib/components/layout/Background.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Skills from '$lib/components/sections/Skills.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Terminal from '$lib/components/terminal/Terminal.svelte';
	import AIAssistant from '$lib/components/ui/AIAssistant.svelte';
	import { meta } from '$lib/data/meta';
</script>

<svelte:head>
	<title>{meta.handle} - {meta.name}</title>
</svelte:head>

<div class="relative min-h-screen flex flex-col font-body bg-background text-on-surface">
	<!-- Global Background -->
	<Background />

	<!-- Navigation -->
	<Navbar />

	<!-- Main Content Sections -->
	<main class="flex-grow flex flex-col relative z-10 w-full">
		<Hero />
		<About />
		<ProjectGrid />
		<Skills />
		<Contact />
	</main>

	<!-- Footer -->
	<Footer />

	<!-- Overlay Components -->
	<Terminal />
	<AIAssistant />
</div>

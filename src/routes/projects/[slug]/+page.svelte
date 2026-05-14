<script lang="ts">
	import { page } from '$app/state';
	import { projects } from '$lib/data/projects';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Background from '$lib/components/layout/Background.svelte';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Github from 'lucide-svelte/icons/git-branch';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Layers from 'lucide-svelte/icons/layers';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	const slug = page.params.slug;
	const project = projects.find(p => p.id === slug);

	onMount(() => {
		if (project) {
			gsap.from('.project-content > *', {
				y: 20,
				opacity: 0,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power3.out'
			});
		}
	});
</script>

<svelte:head>
	<title>{project ? project.title : 'Project Not Found'} - CCC.DEV</title>
</svelte:head>

<div class="relative min-h-screen flex flex-col font-body bg-background text-on-surface">
	<Background />
	<Navbar />

	<main id="main-content" class="flex-grow pt-[120px] pb-[80px] px-[16px] md:px-[64px] relative z-10 w-full flex flex-col items-center focus:outline-none" tabindex="-1">
		<div class="w-full max-w-4xl project-content">
			{#if project}
				<a href="/#projects" class="inline-flex items-center gap-[8px] text-primary-fixed-dim hover:text-on-primary-fixed hover:bg-primary-fixed-dim/20 px-[12px] py-[6px] rounded-full transition-all mb-[32px] font-mono text-[12px] border border-primary-fixed-dim/30">
					<ArrowLeft size={14} />
					<span>BACK TO SYSTEMS</span>
				</a>

				<div class="mb-[48px]">
					<div class="flex flex-wrap items-center gap-[12px] mb-[16px]">
						<span class="font-mono text-[11px] text-secondary-fixed-dim uppercase tracking-widest px-[8px] py-[4px] bg-secondary-fixed-dim/10 border border-secondary-fixed-dim/20 rounded">
							sys.{project.category}
						</span>
						<div class="flex items-center gap-[6px] font-mono text-[11px] text-outline">
							<Calendar size={12} />
							<span>{project.year}</span>
						</div>
						<div class="flex items-center gap-[6px] font-mono text-[11px] text-outline">
							<Layers size={12} />
							<span>{project.status.toUpperCase()}</span>
						</div>
					</div>
					<h1 class="font-display text-[40px] md:text-[64px] font-bold text-on-surface leading-tight mb-[24px]">
						{project.title}
					</h1>
					<p class="font-body text-[18px] md:text-[22px] text-on-surface-variant leading-[1.6] max-w-3xl">
						{project.description}
					</p>
				</div>

				<div class="relative w-full aspect-video rounded-xl overflow-hidden border border-outline-variant mb-[64px] group shadow-2xl">
					<img src={project.image} alt={project.title} class="w-full h-full object-cover" />
					<div class="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent"></div>
					
					<div class="absolute bottom-[24px] right-[24px] flex gap-[12px]">
						{#if project.github !== '#'}
							<a href={project.github} target="_blank" class="flex items-center gap-[8px] px-[20px] py-[10px] bg-surface-container/90 backdrop-blur border border-outline-variant rounded-full text-on-surface hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all shadow-lg">
								<Github size={18} />
								<span class="font-mono text-[12px] font-bold">SOURCE</span>
							</a>
						{/if}
						{#if project.demo !== '#'}
							<a href={project.demo} target="_blank" class="flex items-center gap-[8px] px-[20px] py-[10px] bg-primary-fixed-dim text-on-primary-fixed rounded-full hover:scale-105 transition-all shadow-lg shadow-primary-fixed-dim/20">
								<ExternalLink size={18} />
								<span class="font-mono text-[12px] font-bold">LIVE DEMO</span>
							</a>
						{/if}
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-[64px]">
					<div class="md:col-span-2">
						<h2 class="font-display text-[24px] font-bold text-on-surface mb-[24px] flex items-center gap-[12px]">
							<span class="w-[8px] h-[8px] rounded-full bg-primary-fixed-dim"></span>
							System Overview
						</h2>
						<div class="font-body text-[16px] text-on-surface-variant leading-[1.8] space-y-[16px]">
							<p>{project.longDescription}</p>
						</div>
					</div>

					<div>
						<h2 class="font-display text-[24px] font-bold text-on-surface mb-[24px]">Tech Stack</h2>
						<div class="flex flex-wrap gap-[10px]">
							{#each project.tech as t}
								<span class="font-mono text-[12px] text-on-surface-variant border border-outline-variant/50 bg-surface-container/30 px-[12px] py-[6px] rounded hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-colors">
									{t}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{:else}
				<div class="flex flex-col items-center justify-center py-[100px] text-center">
					<h1 class="font-display text-[48px] font-bold mb-[24px]">404_SYSTEM_NOT_FOUND</h1>
					<p class="font-mono text-outline mb-[32px]">The requested architecture does not exist in our database.</p>
					<a href="/" class="text-primary-fixed-dim border border-primary-fixed-dim px-[24px] py-[12px] rounded hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all">
						RETURN TO NEXUS
					</a>
				</div>
			{/if}
		</div>
	</main>

	<Footer />
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>

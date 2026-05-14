<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { projects, categories, type Category } from '$lib/data/projects';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Github from 'lucide-svelte/icons/git-branch';
	import Code from 'lucide-svelte/icons/code-xml';

	let activeCategory = $state<Category>('all');
	
	let filteredProjects = $derived(
		activeCategory === 'all' 
			? projects 
			: projects.filter(p => p.category === activeCategory)
	);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Header animation
		gsap.fromTo('.projects-header', 
			{ y: 30, opacity: 0 },
			{
				scrollTrigger: { trigger: '#projects', start: 'top 80%' },
				y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
			}
		);

		// Animate project cards on scroll
		const cards = gsap.utils.toArray('.project-card');
		cards.forEach((card: any, i) => {
			gsap.fromTo(card, 
				{ y: 50, opacity: 0 },
				{
					scrollTrigger: { trigger: card, start: 'top 85%' },
					y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: (i % 2) * 0.1
				}
			);
		});
	});

	function setCategory(cat: Category) {
		activeCategory = cat;
	}
</script>

<section id="projects" class="relative py-[80px] px-[16px] md:px-[64px] max-w-[1440px] mx-auto min-h-screen flex flex-col items-center z-10">
	
	<!-- Section Header -->
	<div class="projects-header opacity-0 flex flex-col items-center gap-[16px] mb-[64px] w-full max-w-4xl text-center">
		<div class="inline-flex items-center gap-[8px] bg-surface-container/60 backdrop-blur-md border border-outline-variant px-[12px] py-[6px] rounded">
			<Code size={14} class="text-primary-fixed-dim" />
			<span class="font-mono text-[12px] text-primary-fixed-dim tracking-wider uppercase">
				Execution.Log // Systems
			</span>
		</div>
		<h2 class="font-display text-[32px] md:text-[48px] text-on-surface font-bold leading-[1.1] tracking-[-0.02em]">
			Engineered Solutions
		</h2>
		<p class="font-mono text-[14px] md:text-[16px] text-outline-variant max-w-2xl leading-[1.6]">
			&gt; Index of deployed architectures and interface builds.
		</p>
	</div>

	<!-- Filter Tabs -->
	<div class="flex flex-wrap justify-center gap-[12px] mb-[48px]">
		{#each categories as cat}
			<button 
				class="font-mono text-[12px] uppercase tracking-widest px-[16px] py-[8px] rounded border transition-all duration-300
					{activeCategory === cat 
						? 'border-primary-fixed-dim bg-primary-fixed-dim/10 text-primary-fixed-dim' 
						: 'border-outline-variant/50 text-outline hover:border-outline hover:text-on-surface'}"
				onclick={() => setCategory(cat)}
			>
				{cat}
			</button>
		{/each}
	</div>

	<!-- Project Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full max-w-6xl">
		{#each filteredProjects as project (project.id)}
			<div class="project-card opacity-0 group relative flex flex-col bg-surface-container/30 backdrop-blur-sm border border-outline-variant rounded-lg overflow-hidden hover:border-primary-fixed-dim transition-all duration-500">
				
				<!-- Hover Glow -->
				<div class="absolute inset-0 bg-primary-fixed-dim/0 group-hover:bg-primary-fixed-dim/5 transition-colors duration-500 pointer-events-none z-0"></div>
				
				<!-- Image Container -->
				<div class="relative h-[240px] md:h-[300px] w-full overflow-hidden border-b border-outline-variant/50">
					<div class="absolute inset-0 bg-surface/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
					<img 
						src={project.image} 
						alt={project.title} 
						class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
					/>
					
					<!-- Top right badge -->
					<div class="absolute top-[16px] right-[16px] z-20">
						<span class="font-mono text-[10px] text-primary-fixed-dim bg-surface-container/80 backdrop-blur border border-primary-fixed-dim/30 px-[8px] py-[4px] rounded uppercase tracking-widest">
							{project.year} // {project.status}
						</span>
					</div>
				</div>

				<!-- Content -->
				<div class="flex flex-col flex-grow p-[24px] relative z-10">
					<div class="flex items-start justify-between gap-[16px] mb-[12px]">
						<div>
							<span class="font-mono text-[10px] text-secondary-fixed-dim uppercase tracking-widest block mb-[4px]">
								sys.{project.category}
							</span>
							<h3 class="font-display text-[24px] text-on-surface font-bold tracking-tight group-hover:text-primary-fixed-dim transition-colors">
								{project.title}
							</h3>
						</div>
						
						<!-- Action Links -->
						<div class="flex gap-[12px]">
							{#if project.github !== '#'}
								<a href={project.github} target="_blank" rel="noopener noreferrer" class="text-outline hover:text-primary-fixed-dim transition-colors" aria-label="GitHub Repository">
									<Github size={20} />
								</a>
							{/if}
							{#if project.demo !== '#'}
								<a href={project.demo} target="_blank" rel="noopener noreferrer" class="text-outline hover:text-primary-fixed-dim transition-colors" aria-label="Live Demo">
									<ExternalLink size={20} />
								</a>
							{/if}
						</div>
					</div>

					<p class="font-body text-[15px] text-on-surface-variant leading-[1.6] mb-[24px] flex-grow">
						{project.description}
					</p>

					<!-- Tech Stack -->
					<div class="flex flex-wrap gap-[8px] mt-auto">
						{#each project.tech as t}
							<span class="font-mono text-[11px] text-outline border border-outline-variant/50 bg-surface-container-highest/30 px-[8px] py-[4px] rounded">
								{t}
							</span>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Empty state (if filter yields 0) -->
	{#if filteredProjects.length === 0}
		<div class="w-full max-w-3xl text-center py-[64px] border border-outline-variant/30 border-dashed rounded-lg bg-surface-container/10">
			<span class="font-mono text-[14px] text-outline">
				&gt; No systems found matching criteria: {activeCategory}
			</span>
		</div>
	{/if}
</section>

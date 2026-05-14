<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { skills, skillCategories, type SkillCategory } from '$lib/data/skills';
	import Terminal from 'lucide-svelte/icons/terminal';

	let activeCategory = $state<SkillCategory>('frontend');

	let filteredSkills = $derived(skills.filter(s => s.category === activeCategory));

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo('.skills-header', 
			{ y: 30, opacity: 0 },
			{ scrollTrigger: { trigger: '#skills', start: 'top 80%' }, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
		);

		gsap.fromTo('.skill-category-btn', 
			{ x: -20, opacity: 0 },
			{ scrollTrigger: { trigger: '#skills', start: 'top 80%' }, x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
		);
	});

	// Reactively animate skill bars when category changes
	$effect(() => {
		if (filteredSkills.length > 0) {
			// Small delay to allow DOM update
			setTimeout(() => {
				gsap.fromTo('.skill-bar-fill', 
					{ scaleX: 0 },
					{ scaleX: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out', transformOrigin: 'left' }
				);
				gsap.fromTo('.skill-item',
					{ y: 10, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
				);
			}, 10);
		}
	});
</script>

<section id="skills" class="relative py-[80px] px-[16px] md:px-[64px] max-w-[1440px] mx-auto z-10">
	
	<!-- Header -->
	<div class="skills-header opacity-0 flex flex-col items-start gap-[16px] mb-[64px] w-full max-w-4xl">
		<div class="inline-flex items-center gap-[8px] bg-surface-container/60 backdrop-blur-md border border-outline-variant px-[12px] py-[6px] rounded">
			<Terminal size={14} class="text-secondary-fixed-dim" />
			<span class="font-mono text-[12px] text-secondary-fixed-dim tracking-wider uppercase">
				System Capabilities // Skills
			</span>
		</div>
		<h2 class="font-display text-[32px] md:text-[48px] text-on-surface font-bold leading-[1.1] tracking-[-0.02em]">
			Technical Proficiency
		</h2>
	</div>

	<div class="flex flex-col md:flex-row gap-[48px] w-full max-w-5xl">
		
		<!-- Category Selector (Left Sidebar) -->
		<div class="flex flex-col gap-[8px] md:w-1/3 border-l border-outline-variant/30 pl-[16px]">
			{#each skillCategories as cat}
				<button 
					class="skill-category-btn opacity-0 flex items-center gap-[12px] p-[12px] rounded border transition-all duration-300 text-left
						{activeCategory === cat.key 
							? 'border-secondary-fixed-dim bg-secondary-fixed-dim/10 text-secondary-fixed-dim' 
							: 'border-transparent text-outline hover:text-on-surface hover:bg-surface-container/40'}"
					onclick={() => activeCategory = cat.key}
				>
					<span class="font-mono text-[10px] uppercase tracking-widest opacity-60">
						{activeCategory === cat.key ? '>>' : '>'}
					</span>
					<span class="font-mono text-[13px] uppercase tracking-widest">
						{cat.label}
					</span>
				</button>
			{/each}
		</div>

		<!-- Skills Display (Right Panel) -->
		<div class="md:w-2/3 flex flex-col gap-[24px]">
			<div class="bg-surface-container/40 backdrop-blur-md border border-outline-variant rounded-lg p-[24px] md:p-[32px] min-h-[400px]">
				
				<div class="font-mono text-[11px] text-outline mb-[32px] border-b border-outline-variant/30 pb-[12px] uppercase tracking-widest">
					Loading modules for: {activeCategory}
				</div>

				<div class="flex flex-col gap-[24px]">
					{#each filteredSkills as skill}
						<div class="skill-item">
							<div class="flex justify-between items-center mb-[8px]">
								<span class="font-mono text-[14px] text-on-surface">
									{skill.name}
								</span>
								<span class="font-mono text-[12px] text-secondary-fixed-dim">
									LVL_0{skill.level}
								</span>
							</div>
							
							<!-- Progress Bar -->
							<div class="w-full h-[4px] bg-surface-container-highest rounded-full overflow-hidden">
								<div 
									class="skill-bar-fill h-full bg-secondary-fixed-dim rounded-full"
									style="width: {(skill.level / 5) * 100}%"
								></div>
							</div>
						</div>
					{/each}
				</div>

			</div>
		</div>

	</div>
</section>

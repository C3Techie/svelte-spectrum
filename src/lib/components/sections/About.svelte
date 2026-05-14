<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { meta } from '$lib/data/meta';
	import UserIcon from 'lucide-svelte/icons/user';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#about',
				start: 'top 75%'
			}
		});

		tl.fromTo('.about-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
		  .fromTo('.about-bio', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
		  .fromTo('.about-stat', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
		  .fromTo('.about-terminal', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '-=0.8');
	});
</script>

<section id="about" class="relative py-[80px] px-[16px] md:px-[64px] max-w-[1440px] mx-auto z-10">
	<div class="flex flex-col lg:flex-row gap-[64px] items-start w-full">
		
		<!-- Left: Text content & Stats -->
		<div class="lg:w-1/2 flex flex-col gap-[32px]">
			
			<div class="about-header opacity-0 flex flex-col md:flex-row md:items-center gap-[24px]">
				<!-- Avatar with Scanner Effect -->
				<div class="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex-shrink-0">
					<div class="absolute inset-0 rounded-full border-2 border-primary-fixed-dim/30 animate-pulse"></div>
					<div class="absolute inset-0 rounded-full border border-primary-fixed-dim/50 p-[4px]">
						<div class="w-full h-full rounded-full overflow-hidden bg-surface-container relative group">
							<img 
								src={meta.avatar} 
								alt={meta.name} 
								class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
							/>
							<!-- Scanline effect -->
							<div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary-fixed-dim/10 to-transparent h-[2px] w-full animate-scan pointer-events-none"></div>
						</div>
					</div>
					<!-- Corner decorations -->
					<div class="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary-fixed-dim rounded-tl-sm"></div>
					<div class="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary-fixed-dim rounded-br-sm"></div>
				</div>

				<div class="flex flex-col items-start gap-[12px]">
					<div class="inline-flex items-center gap-[8px] bg-surface-container/60 backdrop-blur-md border border-outline-variant px-[12px] py-[6px] rounded">
						<UserIcon size={14} class="text-primary-fixed-dim" />
						<span class="font-mono text-[12px] text-primary-fixed-dim tracking-wider uppercase">
							SYS.INFO // Identity
						</span>
					</div>
					<h2 class="font-display text-[32px] md:text-[48px] text-on-surface font-bold leading-[1.1] tracking-[-0.02em]">
						About The Architect
					</h2>
				</div>
			</div>

			<div class="about-bio opacity-0 font-body text-[16px] md:text-[18px] text-on-surface-variant leading-[1.8]">
				{meta.bio}
			</div>

			<!-- Stats Grid -->
			<div class="grid grid-cols-2 gap-[16px] mt-[16px]">
				{#each meta.stats as stat}
					<div class="about-stat opacity-0 p-[24px] bg-surface-container/30 border border-outline-variant/50 rounded-lg hover:border-primary-fixed-dim/50 transition-colors">
						<div class="font-display text-[32px] md:text-[40px] text-primary-fixed-dim font-bold tracking-tighter leading-none mb-[8px]">
							{stat.value}
						</div>
						<div class="font-mono text-[12px] text-outline uppercase tracking-widest">
							{stat.label}
						</div>
					</div>
				{/each}
			</div>
			
		</div>

		<!-- Right: Terminal Decorator (Identity Dump) -->
		<div class="about-terminal opacity-0 lg:w-1/2 w-full mt-[32px] lg:mt-0 max-w-full">
			<div class="bg-surface-container-highest/40 backdrop-blur-xl border border-outline-variant rounded-lg p-[12px] md:p-[20px] terminal-glow relative overflow-hidden w-full">
				
				<!-- Terminal Header -->
				<div class="flex items-center gap-[8px] mb-[16px] border-b border-outline-variant/50 pb-[12px]">
					<div class="flex gap-[6px]">
						<div class="w-3 h-3 rounded-full bg-error/60"></div>
						<div class="w-3 h-3 rounded-full bg-tertiary-fixed-dim/60"></div>
						<div class="w-3 h-3 rounded-full bg-primary-fixed-dim/60"></div>
					</div>
					<span class="font-mono text-[10px] text-outline-variant ml-[8px]">identity_dump.json</span>
				</div>

				<!-- JSON Body -->
				<div class="w-full overflow-x-auto">
					<pre class="font-mono text-[12px] md:text-[14px] leading-[1.7] text-on-surface whitespace-pre-wrap break-words min-w-0">
<span class="text-outline">&#123;</span>
  <span class="text-primary-fixed-dim">"id"</span>: <span class="text-secondary-fixed-dim">"christian_chibuike"</span>,
  <span class="text-primary-fixed-dim">"role"</span>: <span class="text-secondary-fixed-dim">"Frontend Engineer & System Architect"</span>,
  <span class="text-primary-fixed-dim">"location"</span>: <span class="text-secondary-fixed-dim">"{meta.location}"</span>,
  <span class="text-primary-fixed-dim">"primary_stack"</span>: <span class="text-outline">[</span><span class="text-secondary-fixed-dim">"React"</span>, <span class="text-secondary-fixed-dim">"NestJS"</span>, <span class="text-secondary-fixed-dim">"Node.js"</span>, <span class="text-secondary-fixed-dim">"TypeScript"</span><span class="text-outline">]</span>,
  <span class="text-primary-fixed-dim">"exp_stack"</span>: <span class="text-outline">[</span><span class="text-secondary-fixed-dim">"FastAPI"</span>, <span class="text-secondary-fixed-dim">"Flask"</span>, <span class="text-secondary-fixed-dim">"SvelteKit"</span><span class="text-outline">]</span>,
  <span class="text-primary-fixed-dim">"status"</span>: <span class="text-secondary-fixed-dim">"Available for Internship"</span>,
  <span class="text-primary-fixed-dim">"uptime"</span>: <span class="text-primary-container">"99.9%"</span>
<span class="text-outline">&#125;</span></pre>
				</div>
			</div>
		</div>

	</div>
</section>

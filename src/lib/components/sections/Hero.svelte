<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import LayersIcon from 'lucide-svelte/icons/layers';
	import ShareIcon from 'lucide-svelte/icons/share-2';
	import FileTextIcon from 'lucide-svelte/icons/file-text';
	import { meta } from '$lib/data/meta';
	import { Canvas } from '@threlte/core';
	import Scene from '../three/Scene.svelte';

	let heroSection: HTMLElement;
	let timestamp = $state('');
	let show3D = $state(false);

	onMount(() => {
		// Generate timestamp for terminal decorator
		const now = new Date();
		timestamp = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

		// SSR-safe 3D scene — mount after hydration
		show3D = true;

		// Cinematic intro sequence
		const tl = gsap.timeline({ delay: 0.1 });
		
		// Use fromTo to ensure they animate from 0 to 1 without FOUC
		tl
			.fromTo('.hero-tag', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
			.fromTo('.hero-name', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '-=0.3')
			.fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
			.fromTo('.hero-action', 
				{ scale: 0.92, opacity: 0 }, 
				{ scale: 1, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)' }, 
				'-=0.4'
			)
			.fromTo('.hero-terminal', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3');
	});
</script>

<section
	id="hero"
	bind:this={heroSection}
	class="relative min-h-screen flex flex-col justify-center items-center px-[16px] md:px-[64px] pt-[80px] pb-[48px] overflow-hidden"
>
	<!-- Three.js scene — hero background only -->
	{#if show3D}
		<div class="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
			<Canvas>
				<Scene />
			</Canvas>
		</div>
	{/if}

	<!-- Hero Content -->
	<div class="max-w-4xl w-full text-center flex flex-col items-center gap-[48px] relative z-10">

		<!-- Status Tag — exactly from sample.html -->
		<div class="hero-tag opacity-0 inline-flex items-center gap-[8px] bg-surface-container/60 backdrop-blur-md border border-outline-variant px-[16px] py-[8px] rounded">
			<div class="w-2 h-2 rounded-full bg-primary-container animate-pulse flex-shrink-0"></div>
			<span class="font-mono text-[12px] text-on-surface-variant tracking-wider uppercase">
				System Active // The Nexus
			</span>
		</div>

		<!-- Name + Tagline -->
		<div class="flex flex-col gap-[12px]">
			<h1 class="hero-name opacity-0 font-display text-[40px] md:text-[64px] text-on-surface font-bold leading-[1.1] tracking-[-0.04em]">
				{meta.name}
			</h1>
			<p class="hero-subtitle opacity-0 font-mono text-[15px] md:text-[18px] text-outline-variant max-w-2xl mx-auto leading-[1.7]">
				<span class="text-primary-fixed-dim">&gt;</span> {meta.title}.<br />
				<span class="text-primary-fixed-dim">&gt;</span> {meta.tagline}
			</p>
		</div>

		<!-- Bento CTA Grid — exact sample.html layout -->
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-[16px] w-full max-w-3xl">

			<!-- Primary CTA: View Systems -->
			<a
				href="#projects"
				class="hero-action opacity-0 group relative flex flex-col items-start justify-between p-[24px] bg-surface-container/40 backdrop-blur-xl border border-primary-fixed-dim/50 rounded-lg hover:border-primary-fixed-dim transition-all duration-500 overflow-hidden min-h-[140px]"
			>
				<div class="absolute inset-0 bg-primary-fixed-dim/0 group-hover:bg-primary-fixed-dim/10 transition-colors duration-500 pointer-events-none"></div>
				<span class="text-primary-fixed-dim group-hover:scale-110 transition-transform duration-500 origin-top-left">
					<LayersIcon size={32} />
				</span>
				<div class="mt-auto relative z-10 text-left">
					<span class="font-mono text-[11px] text-primary-fixed-dim uppercase tracking-widest block mb-[4px]">Execute</span>
					<span class="font-display text-[17px] text-on-surface group-hover:text-primary-fixed-dim transition-colors duration-300">View Systems (Projects)</span>
				</div>
			</a>

			<!-- Secondary CTA: Contact -->
			<a
				href="#contact"
				class="hero-action opacity-0 group relative flex flex-col items-start justify-between p-[24px] bg-surface-container/20 backdrop-blur-xl border border-outline-variant rounded-lg hover:border-secondary-fixed-dim transition-all duration-500 overflow-hidden min-h-[140px]"
			>
				<div class="absolute inset-0 bg-secondary-fixed-dim/0 group-hover:bg-secondary-fixed-dim/5 transition-colors duration-500 pointer-events-none"></div>
				<span class="text-outline group-hover:text-secondary-fixed-dim group-hover:scale-110 transition-all duration-500 origin-top-left">
					<ShareIcon size={32} />
				</span>
				<div class="mt-auto relative z-10 text-left">
					<span class="font-mono text-[11px] text-outline group-hover:text-secondary-fixed-dim uppercase tracking-widest block mb-[4px] transition-colors duration-300">Comm</span>
					<span class="font-display text-[17px] text-on-surface group-hover:text-secondary-fixed-dim transition-colors duration-300">Initialize Contact</span>
				</div>
			</a>

			<!-- Secondary CTA: Resume -->
			<a
				href={meta.resume}
				target="_blank"
				rel="noopener noreferrer"
				class="hero-action opacity-0 group relative flex flex-col items-start justify-between p-[24px] bg-surface-container/20 backdrop-blur-xl border border-outline-variant rounded-lg hover:border-secondary-fixed-dim transition-all duration-500 overflow-hidden min-h-[140px]"
			>
				<div class="absolute inset-0 bg-secondary-fixed-dim/0 group-hover:bg-secondary-fixed-dim/5 transition-colors duration-500 pointer-events-none"></div>
				<span class="text-outline group-hover:text-secondary-fixed-dim group-hover:scale-110 transition-all duration-500 origin-top-left">
					<FileTextIcon size={32} />
				</span>
				<div class="mt-auto relative z-10 text-left">
					<span class="font-mono text-[11px] text-outline group-hover:text-secondary-fixed-dim uppercase tracking-widest block mb-[4px] transition-colors duration-300">Data</span>
					<span class="font-display text-[17px] text-on-surface group-hover:text-secondary-fixed-dim transition-colors duration-300">Source Code (Resume)</span>
				</div>
			</a>
		</div>

		<!-- Terminal Decorator — exact sample.html block -->
		<div class="hero-terminal opacity-0 w-full max-w-3xl text-left">
			<div class="bg-[#1A1A1A]/70 backdrop-blur-md border border-outline-variant rounded p-[8px]">
				<!-- Terminal header bar -->
				<div class="flex items-center gap-[8px] mb-[8px] border-b border-outline-variant/30 pb-[8px] px-[8px]">
					<div class="flex gap-[6px]">
						<div class="w-3 h-3 rounded-full bg-error/60"></div>
						<div class="w-3 h-3 rounded-full bg-tertiary-fixed-dim/60"></div>
						<div class="w-3 h-3 rounded-full bg-primary-fixed-dim/60"></div>
					</div>
					<span class="font-mono text-[10px] text-outline-variant ml-[8px]">nexus_sys_status.sh</span>
				</div>
				<!-- Terminal body -->
				<div class="font-mono text-[13px] md:text-[14px] text-outline p-[8px] leading-[1.8]">
					<span class="text-primary-fixed-dim">user@ccc-os:~$</span> systemctl status nexus<br />
					<span class="text-secondary-fixed-dim">●</span> nexus.service - Main Identity Interface<br />
					&nbsp;&nbsp;&nbsp;Loaded: loaded (/etc/systemd/system/nexus.service)<br />
					&nbsp;&nbsp;&nbsp;Active: <span class="text-primary-container">active (running)</span> since {timestamp}<br />
					&nbsp;&nbsp;&nbsp;Docs: <span class="text-on-surface-variant">man:ccc(8)</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[8px] opacity-40 animate-bounce">
		<span class="font-mono text-[10px] text-outline uppercase tracking-widest">Scroll</span>
		<div class="w-[1px] h-[24px] bg-outline"></div>
	</div>
</section>

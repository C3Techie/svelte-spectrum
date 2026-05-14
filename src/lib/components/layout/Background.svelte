<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	onMount(() => {
		// Animate the ambient glow orbs — sample.html style
		gsap.to('.glow-orb-1', {
			x: '+=60', y: '+=40', duration: 12,
			repeat: -1, yoyo: true, ease: 'sine.inOut'
		});
		gsap.to('.glow-orb-2', {
			x: '-=50', y: '-=30', duration: 9,
			repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5
		});
		gsap.to('.glow-orb-3', {
			x: '+=30', y: '-=50', duration: 14,
			repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3
		});
	});
</script>

<!-- Fixed full-page atmospheric background layer -->
<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background" aria-hidden="true">

	<!-- Glow Orb 1 — center teal (primary) -->
	<div
		class="glow-orb-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
			w-[700px] h-[700px] rounded-full
			bg-secondary-container/10 blur-[120px]"
	></div>

	<!-- Glow Orb 2 — top-right cyan -->
	<div
		class="glow-orb-2 absolute -top-[200px] right-0
			w-[500px] h-[500px] rounded-full
			bg-primary-container/5 blur-[100px]"
	></div>

	<!-- Glow Orb 3 — bottom-left subtle -->
	<div
		class="glow-orb-3 absolute bottom-0 -left-[100px]
			w-[400px] h-[400px] rounded-full
			bg-secondary-container/8 blur-[100px]"
	></div>

	<!-- Subtle grid lines -->
	<div
		class="absolute inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(rgba(0,218,243,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,218,243,0.5) 1px, transparent 1px); background-size: 60px 60px;"
	></div>

	<!-- Noise texture overlay (from sample.html) -->
	<div class="noise-overlay absolute inset-0 pointer-events-none"></div>
</div>

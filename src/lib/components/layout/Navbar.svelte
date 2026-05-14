<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import TerminalIcon from 'lucide-svelte/icons/terminal';
	import MenuIcon from 'lucide-svelte/icons/menu';
	import XIcon from 'lucide-svelte/icons/x';
	import { toggleTerminal } from '$lib/stores/terminal';

	let nav: HTMLElement;
	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	const navLinks = [
		{ href: '#projects', label: 'STK.EXE', title: 'Stack / Projects' },
		{ href: '#about', label: 'SYS.INFO', title: 'About' },
		{ href: '#skills', label: 'CAP.LOG', title: 'Capabilities' },
		{ href: '#contact', label: 'COMM.CH', title: 'Contact' }
	];

	onMount(() => {
		gsap.from(nav, { y: -80, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.3 });

		const handleScroll = () => { scrolled = window.scrollY > 20; };
		window.addEventListener('scroll', handleScroll, { passive: true });

		const handleKey = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault();
				toggleTerminal();
			}
			if (e.key === 'Escape') mobileMenuOpen = false;
		};
		window.addEventListener('keydown', handleKey);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('keydown', handleKey);
		};
	});

	function closeMobile() { mobileMenuOpen = false; }
</script>

<!-- Desktop Nav -->
<nav
	bind:this={nav}
	class="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-between items-center px-[64px] py-[16px]
		transition-all duration-300
		{scrolled
		? 'bg-surface/95 backdrop-blur-2xl border-b border-outline-variant/40 py-[12px]'
		: 'bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20'}"
>
	<a href="/" class="font-display text-lg font-bold tracking-tighter text-primary-fixed-dim hover:opacity-80 transition-opacity">
		CCC.DEV
	</a>

	<div class="flex items-center gap-[32px]">
		{#each navLinks as link}
			<a
				href={link.href}
				title={link.title}
				class="font-mono text-[12px] uppercase tracking-widest text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-300"
			>
				{link.label}
			</a>
		{/each}
	</div>

	<button
		onclick={toggleTerminal}
		class="font-mono text-[12px] uppercase tracking-widest text-primary-fixed-dim border border-primary-fixed-dim px-[16px] py-[8px] rounded hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all duration-300 flex items-center gap-[8px]"
		aria-label="Open Terminal (Ctrl+K)"
	>
		<span>TERMINAL</span>
		<TerminalIcon size={14} />
	</button>
</nav>

<!-- Mobile Nav -->
<header class="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[16px] py-[16px] bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30">
	<a href="/" class="font-display text-lg font-bold tracking-tighter text-primary-fixed-dim">CCC.DEV</a>
	<button
		onclick={() => mobileMenuOpen = !mobileMenuOpen}
		class="text-primary-fixed-dim p-1"
		aria-label="Toggle mobile menu"
		aria-expanded={mobileMenuOpen}
	>
		{#if mobileMenuOpen}
			<XIcon size={22} />
		{:else}
			<MenuIcon size={22} />
		{/if}
	</button>
</header>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="md:hidden fixed inset-0 z-40 bg-surface/95 backdrop-blur-2xl flex flex-col pt-[80px] px-[16px] pb-[32px]"
		onclick={closeMobile}
		role="dialog"
		aria-modal="true"
		aria-label="Mobile navigation"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="flex flex-col gap-[4px]" onclick={(e) => e.stopPropagation()}>
			<!-- Status bar -->
			<div class="flex items-center gap-[8px] mb-[24px] px-[16px] py-[10px] bg-surface-container/50 rounded border border-outline-variant/30">
				<div class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
				<span class="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">SYSTEM ACTIVE // THE NEXUS</span>
			</div>

			{#each navLinks as link, i}
				<a
					href={link.href}
					onclick={closeMobile}
					class="flex items-center gap-[12px] px-[16px] py-[16px] rounded border border-transparent hover:border-outline-variant/40 hover:bg-surface-container/40 transition-all duration-300 group"
					style="animation-delay: {i * 0.05}s"
				>
					<span class="font-mono text-[11px] text-primary-fixed-dim/60 group-hover:text-primary-fixed-dim transition-colors w-[20px]">0{i + 1}</span>
					<span class="font-mono text-[13px] uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface transition-colors">{link.label}</span>
					<span class="ml-auto font-mono text-[11px] text-outline group-hover:text-primary-fixed-dim transition-colors">{link.title}</span>
				</a>
			{/each}

			<div class="mt-[24px] pt-[24px] border-t border-outline-variant/30">
				<button
					onclick={() => { closeMobile(); toggleTerminal(); }}
					class="w-full font-mono text-[12px] uppercase tracking-widest text-primary-fixed-dim border border-primary-fixed-dim px-[16px] py-[14px] rounded hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all duration-300 flex items-center justify-center gap-[8px]"
				>
					<TerminalIcon size={14} />
					<span>OPEN TERMINAL</span>
					<span class="text-primary-fixed-dim/50 text-[10px] ml-auto">CTRL+K</span>
				</button>
			</div>
		</div>
	</div>
{/if}

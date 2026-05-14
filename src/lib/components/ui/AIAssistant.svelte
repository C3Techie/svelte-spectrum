<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import MessageSquare from 'lucide-svelte/icons/message-square';
	import X from 'lucide-svelte/icons/x';
	import Sparkles from 'lucide-svelte/icons/sparkles';
	import Send from 'lucide-svelte/icons/send';
	import { projects } from '$lib/data/projects';

	let isOpen = $state(false);
	let input = $state('');
	let isTyping = $state(false);
	
	type Message = { role: 'user' | 'assistant'; text: string };
	let messages = $state<Message[]>([
		{ role: 'assistant', text: 'NEXUS AI v4.0 Online. How can I assist with your inquiry regarding Christian\'s systems today?' }
	]);

	const suggestions = [
		{ label: 'Show Featured Projects', query: 'featured' },
		{ label: 'Backend Capabilities', query: 'backend' },
		{ label: 'Availability', query: 'status' }
	];

	function toggleAssistant() {
		isOpen = !isOpen;
	}

	$effect(() => {
		if (isOpen) {
			// Small delay to ensure DOM is rendered before GSAP targets it
			setTimeout(() => {
				const el = document.querySelector('.ai-panel');
				if (el) {
					gsap.fromTo(el, 
						{ scale: 0.9, opacity: 0, y: 20 }, 
						{ scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
					);
				}
			}, 0);
		}
	});

	async function handleSubmit(query?: string) {
		const text = query || input;
		if (!text.trim() || isTyping) return;

		messages = [...messages, { role: 'user', text }];
		input = '';
		isTyping = true;

		try {
			const response = await fetch('/api/ai', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: text })
			});

			const data = await response.json();
			
			if (data.response) {
				messages = [...messages, { role: 'assistant', text: data.response }];
			} else {
				messages = [...messages, { role: 'assistant', text: "SYSTEM ERROR: Could not retrieve response from Nexus Core." }];
			}
		} catch (err) {
			messages = [...messages, { role: 'assistant', text: "NETWORK ERROR: Connection to Nexus Core lost." }];
		} finally {
			isTyping = false;
			
			// Scroll to bottom
			setTimeout(() => {
				const container = document.getElementById('chat-container');
				if (container) container.scrollTop = container.scrollHeight;
			}, 100);
		}
	}
</script>

<div class="fixed bottom-[24px] right-[24px] z-[100] font-mono">
	<!-- Trigger Button -->
	<button 
		onclick={toggleAssistant}
		class="w-[56px] h-[56px] rounded-full bg-primary-fixed-dim text-on-primary-container flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all duration-300 relative group"
	>
		{#if isOpen}
			<X size={24} />
		{:else}
			<div class="absolute inset-0 rounded-full border border-primary-fixed-dim animate-ping opacity-20"></div>
			<MessageSquare size={24} />
		{/if}
		
		<!-- Tooltip -->
		<span class="absolute right-[70px] bg-surface-container border border-outline-variant px-[12px] py-[6px] rounded text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-primary-fixed-dim">
			Nexus AI Assistant
		</span>
	</button>

	<!-- AI Panel -->
	{#if isOpen}
		<div class="ai-panel absolute bottom-[70px] right-0 w-[320px] md:w-[380px] h-[500px] bg-surface-container/95 backdrop-blur-xl border border-outline-variant rounded-xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right">
			<!-- Header -->
			<div class="p-[16px] border-b border-outline-variant flex items-center justify-between bg-primary-fixed-dim/5">
				<div class="flex items-center gap-[10px]">
					<div class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
					<span class="text-[12px] font-bold text-primary-fixed-dim uppercase tracking-tighter">Nexus Core Intelligence</span>
				</div>
				<Sparkles size={14} class="text-primary-fixed-dim" />
			</div>

			<!-- Messages -->
			<div id="chat-container" class="flex-grow overflow-y-auto p-[16px] flex flex-col gap-[16px] scrollbar-hide">
				{#each messages as msg}
					<div class="flex flex-col {msg.role === 'user' ? 'items-end' : 'items-start'}">
						<div class="max-w-[85%] p-[12px] rounded-lg text-[13px] leading-[1.5] 
							{msg.role === 'user' 
								? 'bg-secondary-fixed-dim/20 border border-secondary-fixed-dim/30 text-on-surface' 
								: 'bg-surface-container-highest/50 border border-outline-variant text-on-surface-variant'}"
						>
							{msg.text}
						</div>
					</div>
				{/each}

				{#if isTyping}
					<div class="flex items-start">
						<div class="bg-surface-container-highest/50 border border-outline-variant p-[12px] rounded-lg flex gap-[4px]">
							<div class="w-1 h-1 rounded-full bg-outline-variant animate-bounce"></div>
							<div class="w-1 h-1 rounded-full bg-outline-variant animate-bounce [animation-delay:0.2s]"></div>
							<div class="w-1 h-1 rounded-full bg-outline-variant animate-bounce [animation-delay:0.4s]"></div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Suggestions -->
			<div class="px-[16px] pb-[8px] flex flex-wrap gap-[6px]">
				{#each suggestions as sug}
					<button 
						onclick={() => handleSubmit(sug.query)}
						class="text-[10px] px-[8px] py-[4px] rounded-full border border-outline-variant hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-colors"
					>
						{sug.label}
					</button>
				{/each}
			</div>

			<!-- Input -->
			<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="p-[16px] border-t border-outline-variant flex gap-[8px]">
				<input 
					bind:value={input}
					placeholder="Query Nexus Intelligence..."
					class="flex-grow bg-surface-container-highest/30 border border-outline-variant/50 rounded px-[12px] py-[8px] text-[13px] focus:outline-none focus:border-primary-fixed-dim transition-colors"
				/>
				<button 
					type="submit"
					class="p-[8px] rounded bg-primary-fixed-dim text-on-primary-container hover:scale-105 transition-transform"
				>
					<Send size={16} />
				</button>
			</form>
		</div>
	{/if}
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>

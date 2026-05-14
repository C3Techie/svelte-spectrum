<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { terminalOpen, closeTerminal } from '$lib/stores/terminal';
	import { meta } from '$lib/data/meta';

	let terminalElement: HTMLDivElement | undefined = $state();
	let inputElement: HTMLInputElement | undefined = $state();
	let terminalBody: HTMLDivElement | undefined = $state();
	
	let input = $state('');
	let history = $state<{ type: 'info' | 'cmd' | 'error' | 'success', text: string, html?: boolean }[]>([
		{ type: 'info', text: `${meta.os} ${meta.osVersion} [Terminal Interface]` },
		{ type: 'info', text: "Type 'help' for a list of available commands." }
	]);

	const commands = {
		'help': 'List available commands',
		'whoami': 'Display identity data',
		'goto projects': 'Navigate to portfolio systems',
		'goto skills': 'Navigate to capabilities',
		'goto contact': 'Navigate to comms channel',
		'clear': 'Clear terminal buffer',
		'matrix': 'Enter the matrix',
		'sudo': 'Super user operations'
	};

	$effect(() => {
		if ($terminalOpen) {
			if (terminalElement) {
				gsap.fromTo(terminalElement, 
					{ scale: 0.95, opacity: 0, y: 20 }, 
					{ scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
				);
			}
			// Auto focus input
			setTimeout(() => inputElement?.focus(), 100);
		}
	});

	// Auto scroll to bottom
	$effect(() => {
		history; // dependency
		if (terminalBody) {
			setTimeout(() => {
				terminalBody!.scrollTop = terminalBody!.scrollHeight;
			}, 10);
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			executeCommand();
		}
		if (e.key === 'Escape') {
			closeTerminal();
		}
	}

	function executeCommand() {
		const cmd = input.trim().toLowerCase();
		if (!cmd) return;

		history = [...history, { type: 'cmd', text: cmd }];

		if (cmd === 'help') {
			history = [...history, { type: 'info', html: true, text: `
				<div class="flex flex-col gap-1 pl-2 border-l border-outline-variant/50 my-2">
					${Object.entries(commands).map(([name, desc]) => 
						`<div class="flex"><span class="w-[140px] text-primary-fixed-dim hover:bg-primary-fixed-dim/10 cursor-pointer rounded px-1" onclick="document.getElementById('term-input').value='${name}'; document.getElementById('term-input').focus();">${name}</span><span class="text-outline"># ${desc}</span></div>`
					).join('')}
				</div>
			` }];
		} else if (cmd === 'clear') {
			history = [];
		} else if (cmd === 'whoami') {
			history = [...history, 
				{ type: 'success', text: `Identity: ${meta.name}` },
				{ type: 'success', text: `Role: ${meta.title}` },
				{ type: 'success', text: `Location: ${meta.location}` }
			];
		} else if (cmd === 'goto projects') {
			closeTerminal();
			document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
		} else if (cmd === 'goto skills') {
			closeTerminal();
			document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
		} else if (cmd === 'goto contact') {
			closeTerminal();
			document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
		} else if (cmd === 'matrix') {
			history = [...history, { type: 'info', text: 'Wake up, Neo...' }];
			setTimeout(() => {
				history = [...history, { type: 'info', text: 'The Matrix has you...' }];
			}, 2000);
		} else if (cmd.startsWith('sudo')) {
			history = [...history, { type: 'error', text: `${meta.name} is not in the sudoers file. This incident will be reported.` }];
		} else {
			history = [...history, { type: 'error', text: `Command not found: ${cmd}. Type 'help' for available commands.` }];
		}

		input = '';
	}
</script>

{#if $terminalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center p-[16px] md:p-[64px] backdrop-blur-xl bg-surface/60"
		onclick={closeTerminal}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			bind:this={terminalElement}
			class="w-full max-w-3xl bg-surface-container/80 backdrop-blur-md rounded-lg border border-primary-fixed-dim/30 terminal-glow overflow-hidden relative shadow-2xl flex flex-col h-[600px]"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Terminal Header (Exactly from sample1.html) -->
			<div class="flex items-center justify-between px-[16px] py-[8px] border-b border-outline-variant/30 bg-surface-container-highest/50">
				<div class="flex gap-[8px] items-center">
					<span class="w-3 h-3 rounded-full bg-error/50"></span>
					<span class="w-3 h-3 rounded-full bg-tertiary-fixed-dim/50"></span>
					<span class="w-3 h-3 rounded-full bg-primary-fixed-dim/50"></span>
				</div>
				<div class="font-mono text-[12px] text-outline tracking-widest uppercase">COMMAND_PALETTE</div>
				<div class="w-[44px]"></div> <!-- Spacer to center the title -->
			</div>

			<!-- Terminal Body -->
			<div bind:this={terminalBody} class="flex-grow p-[24px] overflow-y-auto font-mono text-[14px] flex flex-col gap-[8px]">
				
				{#each history as line}
					<div class="flex gap-[8px] leading-[1.6]">
						{#if line.type === 'cmd'}
							<span class="text-primary-fixed-dim font-bold mt-[2px]">&gt;</span>
							<span class="text-on-surface-variant">{line.text}</span>
						{:else if line.type === 'error'}
							<span class="text-error font-bold mt-[2px]">!</span>
							<span class="text-error">{line.text}</span>
						{:else if line.type === 'success'}
							<span class="text-primary-fixed-dim font-bold mt-[2px]">✓</span>
							<span class="text-primary-fixed-dim">{line.text}</span>
						{:else}
							{#if line.html}
								<div class="w-full text-outline">{@html line.text}</div>
							{:else}
								<span class="text-secondary-fixed-dim">{line.text}</span>
							{/if}
						{/if}
					</div>
				{/each}

				<!-- Active Prompt -->
				<div class="flex items-center mt-auto pt-[16px]">
					<span class="text-primary-fixed-dim mr-[8px] font-bold">&gt;</span>
					<input
						id="term-input"
						bind:this={inputElement}
						type="text"
						bind:value={input}
						onkeydown={handleKeydown}
						class="bg-transparent border-none outline-none flex-grow text-on-surface font-mono text-[14px]"
						autocomplete="off"
						spellcheck="false"
					/>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Make the cursor invisible and use a custom blinking block if desired, 
	   but native input is more accessible. We'll stick to styling the native caret. */
	input {
		caret-color: var(--color-primary-fixed-dim);
	}
</style>

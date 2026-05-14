<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { meta } from '$lib/data/meta';
	import MailIcon from 'lucide-svelte/icons/mail';
	import SendIcon from 'lucide-svelte/icons/send';
	import Github from 'lucide-svelte/icons/git-branch';
	import Linkedin from 'lucide-svelte/icons/link';
	import Twitter from 'lucide-svelte/icons/at-sign';

	let formStatus = $state<'idle' | 'sending' | 'success' | 'error'>('idle');

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo('.contact-header', 
			{ y: 30, opacity: 0 },
			{ scrollTrigger: { trigger: '#contact', start: 'top 80%' }, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
		);

		gsap.fromTo('.contact-element', 
			{ y: 20, opacity: 0 },
			{ scrollTrigger: { trigger: '#contact', start: 'top 70%' }, y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
		);
	});

	async function handleSubmit(e: Event) {
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const payload = {
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message')
		};

		formStatus = 'sending';
		
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!response.ok) throw new Error('Transmission failed');

			formStatus = 'success';
			form.reset();
			setTimeout(() => formStatus = 'idle', 5000);
		} catch (err) {
			console.error(err);
			formStatus = 'error';
			setTimeout(() => formStatus = 'idle', 4000);
		}
	}
</script>

<section id="contact" class="relative py-[80px] px-[16px] md:px-[64px] max-w-[1440px] mx-auto z-10 mb-[64px]">
	
	<!-- Header -->
	<div class="contact-header opacity-0 flex flex-col items-center gap-[16px] mb-[64px] w-full text-center">
		<div class="inline-flex items-center gap-[8px] bg-surface-container/60 backdrop-blur-md border border-outline-variant px-[12px] py-[6px] rounded">
			<MailIcon size={14} class="text-primary-fixed-dim" />
			<span class="font-mono text-[12px] text-primary-fixed-dim tracking-wider uppercase">
				COMM.CH // Open Channel
			</span>
		</div>
		<h2 class="font-display text-[32px] md:text-[48px] text-on-surface font-bold leading-[1.1] tracking-[-0.02em]">
			Initialize Contact
		</h2>
		<p class="font-mono text-[14px] md:text-[16px] text-outline-variant max-w-2xl leading-[1.6]">
			&gt; Secure line open for new opportunities and collaborations.
		</p>
	</div>

	<div class="flex flex-col lg:flex-row gap-[48px] justify-center items-start max-w-5xl mx-auto w-full">
		
		<!-- Left: Form (Terminal Styled) -->
		<div class="contact-element opacity-0 w-full lg:w-3/5 bg-surface-container/40 backdrop-blur-xl border border-outline-variant rounded-lg p-[24px] md:p-[32px]">
			
			<form onsubmit={handleSubmit} class="flex flex-col gap-[24px]">
				
				<div class="flex flex-col gap-[8px]">
					<label for="name" class="font-mono text-[11px] text-primary-fixed-dim uppercase tracking-widest flex items-center gap-[8px]">
						<span class="text-primary-fixed-dim">&gt;</span> Enter Identity (Name)
					</label>
					<input 
						type="text" 
						name="name"
						id="name" 
						required
						class="bg-surface-container-highest/50 border border-outline-variant/50 focus:border-primary-fixed-dim rounded px-[16px] py-[12px] font-body text-on-surface outline-none transition-colors"
						placeholder="John Doe"
					/>
				</div>

				<div class="flex flex-col gap-[8px]">
					<label for="email" class="font-mono text-[11px] text-primary-fixed-dim uppercase tracking-widest flex items-center gap-[8px]">
						<span class="text-primary-fixed-dim">&gt;</span> Enter Address (Email)
					</label>
					<input 
						type="email" 
						name="email"
						id="email" 
						required
						class="bg-surface-container-highest/50 border border-outline-variant/50 focus:border-primary-fixed-dim rounded px-[16px] py-[12px] font-body text-on-surface outline-none transition-colors"
						placeholder="john@example.com"
					/>
				</div>

				<div class="flex flex-col gap-[8px]">
					<label for="message" class="font-mono text-[11px] text-primary-fixed-dim uppercase tracking-widest flex items-center gap-[8px]">
						<span class="text-primary-fixed-dim">&gt;</span> Enter Payload (Message)
					</label>
					<textarea 
						name="message"
						id="message" 
						required
						rows="4"
						class="bg-surface-container-highest/50 border border-outline-variant/50 focus:border-primary-fixed-dim rounded px-[16px] py-[12px] font-body text-on-surface outline-none transition-colors resize-none"
						placeholder="Initiating transmission..."
					></textarea>
				</div>

				<button 
					type="submit"
					disabled={formStatus !== 'idle'}
					class="mt-[8px] font-mono text-[14px] uppercase tracking-widest text-surface-container-lowest bg-primary-fixed-dim border border-primary-fixed-dim px-[24px] py-[14px] rounded hover:bg-transparent hover:text-primary-fixed-dim transition-all duration-300 flex justify-center items-center gap-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{#if formStatus === 'sending'}
						<div class="w-4 h-4 border-2 border-surface-container-lowest border-t-transparent rounded-full animate-spin"></div>
						<span>TRANSMITTING...</span>
					{:else if formStatus === 'success'}
						<span>PAYLOAD DELIVERED</span>
					{:else if formStatus === 'error'}
						<span>TRANSMISSION FAILED</span>
					{:else}
						<span>TRANSMIT PAYLOAD</span>
						<SendIcon size={16} />
					{/if}
				</button>
			</form>
		</div>

		<!-- Right: Direct Contact & Socials -->
		<div class="w-full lg:w-2/5 flex flex-col gap-[32px]">
			
			<div class="contact-element opacity-0 flex flex-col gap-[16px] p-[24px] bg-surface-container/20 border border-outline-variant/50 rounded-lg">
				<h3 class="font-mono text-[12px] text-outline uppercase tracking-widest border-b border-outline-variant/30 pb-[12px]">
					Direct Channel
				</h3>
				<a href="mailto:{meta.email}" class="font-display text-[20px] text-on-surface hover:text-primary-fixed-dim transition-colors break-all">
					{meta.email}
				</a>
				<p class="font-body text-[14px] text-on-surface-variant">
					PGP Key available upon request. Expected response time: &lt; 24h.
				</p>
			</div>

			<div class="contact-element opacity-0 flex flex-col gap-[16px] p-[24px] bg-surface-container/20 border border-outline-variant/50 rounded-lg">
				<h3 class="font-mono text-[12px] text-outline uppercase tracking-widest border-b border-outline-variant/30 pb-[12px]">
					Network Nodes
				</h3>
				<div class="flex flex-col gap-[12px]">
					<a href={meta.github} target="_blank" rel="noopener noreferrer" class="flex items-center gap-[12px] text-outline hover:text-on-surface transition-colors group">
						<Github size={20} class="group-hover:text-primary-fixed-dim transition-colors" />
						<span class="font-mono text-[14px]">github.com/C3Techie</span>
					</a>
					<a href={meta.linkedin} target="_blank" rel="noopener noreferrer" class="flex items-center gap-[12px] text-outline hover:text-on-surface transition-colors group">
						<Linkedin size={20} class="group-hover:text-primary-fixed-dim transition-colors" />
						<span class="font-mono text-[14px]">linkedin/christian-chibuike</span>
					</a>
					<a href={meta.twitter} target="_blank" rel="noopener noreferrer" class="flex items-center gap-[12px] text-outline hover:text-on-surface transition-colors group">
						<Twitter size={20} class="group-hover:text-primary-fixed-dim transition-colors" />
						<span class="font-mono text-[14px]">twitter/C3Techie</span>
					</a>
				</div>
			</div>

		</div>

	</div>
</section>

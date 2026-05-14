<script lang="ts">
	import Github from 'lucide-svelte/icons/git-branch';
	import Linkedin from 'lucide-svelte/icons/link';
	import { toggleTerminal } from '$lib/stores/terminal';
	import { meta } from '$lib/data/meta';
</script>

<footer class="w-full px-[16px] md:px-[64px] py-[48px] flex flex-col md:flex-row justify-between items-center gap-[24px] bg-surface-container-lowest border-t border-outline-variant/30 z-20 relative mt-auto">
	
	<div class="font-mono text-[12px] text-primary-fixed-dim uppercase tracking-widest text-center md:text-left opacity-80">
		© 2026 {meta.os} // BUILT_FOR_PERFORMANCE
	</div>
	
	<div class="flex items-center gap-[32px] flex-wrap justify-center">
		<button 
			onclick={toggleTerminal}
			class="font-mono text-[12px] uppercase tracking-widest text-outline hover:text-primary-fixed-dim transition-all duration-300"
		>
			TERMINAL_ACCESS
		</button>
		
		<a 
			class="font-mono text-[12px] uppercase tracking-widest text-outline hover:text-primary-fixed-dim transition-all duration-300 flex items-center gap-[8px]" 
			href={meta.github}
			target="_blank" 
			rel="noopener noreferrer"
		>
			<Github size={14} />
			<span>GIT_HUB</span>
		</a>
		
		<a 
			class="font-mono text-[12px] uppercase tracking-widest text-outline hover:text-primary-fixed-dim transition-all duration-300 flex items-center gap-[8px]" 
			href={meta.linkedin}
			target="_blank" 
			rel="noopener noreferrer"
		>
			<Linkedin size={14} />
			<span>LINKED_IN</span>
		</a>
	</div>

</footer>

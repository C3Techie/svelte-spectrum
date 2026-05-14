import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
	if (!browser) return 'dark';
	const stored = localStorage.getItem('theme') as Theme;
	if (stored) return stored;
	if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
	return 'dark';
};

export const theme = writable<Theme>(getInitialTheme());

if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
}

export const toggleTheme = () => {
	theme.update((t) => (t === 'light' ? 'dark' : 'light'));
};

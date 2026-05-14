export interface Project {
	id: string;
	title: string;
	description: string;
	longDescription: string;
	tech: string[];
	github: string;
	demo: string;
	image: string;
	category: 'frontend' | 'backend' | 'system' | 'fullstack';
	featured: boolean;
	year: number;
	status: 'live' | 'wip' | 'archived';
}

export const projects: Project[] = [
	{
		id: 'nexus-os',
		title: 'Nexus OS',
		description: 'A futuristic operating system interface built with Svelte and WebGL. Features a custom terminal, neural navigation, and real-time system visualization.',
		longDescription: 'Nexus OS is a full-scale web-based OS simulation built entirely in Svelte with WebGL rendering. It features a fully interactive terminal with custom commands, a neural network visualization module, file system abstraction, and cinematic transitions.',
		tech: ['SvelteKit', 'Three.js', 'GSAP', 'TypeScript', 'Tailwind'],
		github: 'https://github.com/C3Techie',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
		category: 'system',
		featured: true,
		year: 2024,
		status: 'live'
	},
	{
		id: 'spectral-analytics',
		title: 'Spectral Analytics',
		description: 'Real-time data visualization platform with chromatic light effects, WebSocket streams, and sub-100ms rendering performance.',
		longDescription: 'Spectral Analytics processes live market data streams via WebSocket and renders complex visualizations at 60fps using WebGL. Features custom shader effects, D3.js integration, and a predictive analytics module.',
		tech: ['React', 'D3.js', 'WebSocket', 'WebGL', 'SCSS'],
		github: 'https://github.com/C3Techie',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
		category: 'frontend',
		featured: true,
		year: 2024,
		status: 'live'
	},
	{
		id: 'neural-core',
		title: 'Neural Core',
		description: 'Scalable backend architecture for AI-driven applications, utilizing distributed node clusters, gRPC microservices, and predictive caching.',
		longDescription: 'Neural Core is a high-throughput backend infrastructure for AI workloads. Built with NestJS and Rust for performance-critical paths, it uses gRPC for inter-service communication and BullMQ for distributed task queues.',
		tech: ['NestJS', 'Rust', 'Docker', 'gRPC', 'PostgreSQL'],
		github: 'https://github.com/C3Techie',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=1000',
		category: 'backend',
		featured: true,
		year: 2024,
		status: 'live'
	},
	{
		id: 'whisperbox',
		title: 'WhisperBox',
		description: 'End-to-end encrypted messaging platform with RSA-OAEP key exchange, AES-GCM message encryption, and zero-knowledge architecture.',
		longDescription: 'WhisperBox implements a full E2EE messaging stack in the browser using WebCrypto APIs. Keys are generated and stored client-side, messages are encrypted before transmission, and the server never sees plaintext.',
		tech: ['Next.js', 'WebCrypto', 'Socket.io', 'Prisma', 'Redis'],
		github: 'https://github.com/C3Techie',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=1000',
		category: 'fullstack',
		featured: false,
		year: 2023,
		status: 'live'
	},
	{
		id: 'insighta-labs',
		title: 'Insighta Labs+',
		description: 'AI-powered data intelligence platform with natural language querying, ML aggregation stats, and automated 2026-profile dataset ingestion.',
		longDescription: 'Insighta Labs+ is a full-stack data intelligence platform. Features a FastAPI backend with NLP-powered query parsing, vector embeddings for semantic search, and an interactive React dashboard with real-time updates.',
		tech: ['FastAPI', 'React', 'PostgreSQL', 'Redis', 'Docker'],
		github: 'https://github.com/C3Techie',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1000',
		category: 'fullstack',
		featured: false,
		year: 2024,
		status: 'live'
	},
	{
		id: 'c3techie-nexus',
		title: 'C3Techie Nexus',
		description: 'Production-grade real-time analytics dashboard with Binance WebSocket integration, ECharts rendering, and mobile-first responsive architecture.',
		longDescription: 'A comprehensive trading analytics dashboard featuring real-time market data from Binance WebSocket streams, complex chart rendering with ECharts, and a fully responsive mobile-first layout with a unified slide-over sidebar.',
		tech: ['SvelteKit', 'ECharts', 'WebSocket', 'Tailwind', 'TypeScript'],
		github: 'https://github.com/C3Techie',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000',
		category: 'frontend',
		featured: false,
		year: 2024,
		status: 'live'
	}
];

export const categories = ['all', 'frontend', 'backend', 'system', 'fullstack'] as const;
export type Category = typeof categories[number];

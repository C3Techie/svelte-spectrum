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
		id: 'audiophile-ecommerce',
		title: 'Audiophile Ecommerce',
		description: 'A premium fullstack e-commerce experience with product management, cart systems, and automated email notifications.',
		longDescription: 'A fully functional e-commerce platform built with Next.js and Convex. Features include product listing, complex cart state management, checkout flow, and automated order confirmation emails via Resend.',
		tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Convex', 'Resend'],
		github: 'https://github.com/C3Techie/C3TECHIE-AUDIOPHILE-ECOMMERCE',
		demo: 'https://c3-techie-audiophile-ecommerce.vercel.app/',
		image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
		category: 'fullstack',
		featured: true,
		year: 2025,
		status: 'live'
	},
	{
		id: 'qverse-agent',
		title: 'QVerse AI Agent',
		description: 'Intelligent AI agent providing bilingual Quranic insights and contextual explanations using Mastra AI.',
		longDescription: 'Designed and built AI workflows for bilingual Quranic analysis. Integrated with Telex via Mastra A2A protocol, implementing smart validation and quality scoring for high-accuracy explanations.',
		tech: ['Node.js', 'Mastra AI', 'TypeScript', 'Telex'],
		github: 'https://github.com/C3Techie/qverse-agent',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
		category: 'backend',
		featured: true,
		year: 2025,
		status: 'live'
	},
	{
		id: 'c3techie-nexus',
		title: 'C3Techie Nexus',
		description: 'Real-time analytics dashboard with Binance WebSocket integration and high-performance ECharts rendering.',
		longDescription: 'A production-grade analytics platform featuring real-time market data streams, complex chart visualizations, and a unified slide-over sidebar for mobile-first responsiveness.',
		tech: ['SvelteKit', 'ECharts', 'WebSocket', 'Tailwind', 'TypeScript'],
		github: 'https://github.com/C3Techie/realtime-analytics-dashboard',
		demo: 'https://realtime-analytics-dashboard-mu.vercel.app/',
		image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000',
		category: 'frontend',
		featured: true,
		year: 2026,
		status: 'live'
	},
	{
		id: 'wallet-service',
		title: 'Secure Wallet Engine',
		description: 'High-integrity backend for financial transactions featuring atomic transfers and Paystack integration.',
		longDescription: 'A secure NestJS microservice for balance management, deposits, and transfers. Implemented atomic transaction handling, Google OAuth/JWT security, and secure Paystack webhook validation.',
		tech: ['NestJS', 'PostgreSQL', 'Paystack', 'Google OAuth', 'JWT'],
		github: 'https://github.com/C3Techie/wallet-service',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1000',
		category: 'backend',
		featured: false,
		year: 2025,
		status: 'live'
	},
	{
		id: 'ai-doc-summarizer',
		title: 'AI Doc Summarizer',
		description: 'Microservice for intelligent text extraction and AI-powered summarization using OpenRouter LLMs.',
		longDescription: 'Built text extraction pipelines for document processing. Features file storage with MinIO, secure JWT authentication, and natural language summarization via LLM integration.',
		tech: ['NestJS', 'MongoDB', 'OpenRouter LLM', 'MinIO', 'JWT'],
		github: 'https://github.com/C3Techie/ai-doc-summarizer-service',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=1000',
		category: 'backend',
		featured: false,
		year: 2025,
		status: 'live'
	},
	{
		id: 'framez',
		title: 'Framez Mobile',
		description: 'Modern social media mobile application for moment sharing and connection.',
		longDescription: 'A cross-platform social media app built with React Native and Expo. Features include real-time feeds, image uploads to Firebase, and secure user authentication.',
		tech: ['React Native', 'Firebase', 'TypeScript', 'Expo'],
		github: 'https://github.com/C3Techie/Framez',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&q=80&w=1000',
		category: 'frontend',
		featured: false,
		year: 2025,
		status: 'live'
	},
	{
		id: 'whisperbox',
		title: 'WhisperBox E2EE',
		description: 'End-to-end encrypted messaging platform with RSA-OAEP key exchange and AES-GCM encryption.',
		longDescription: 'A zero-knowledge messaging architecture implementing browser-based encryption via WebCrypto APIs, ensuring privacy and security for real-time communication.',
		tech: ['Next.js', 'WebCrypto', 'Socket.io', 'Prisma', 'Redis'],
		github: 'https://github.com/C3Techie/c3techie-whisperbox',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=1000',
		category: 'fullstack',
		featured: false,
		year: 2026,
		status: 'live'
	},
	{
		id: 'invoice-management',
		title: 'Invoice Manager',
		description: 'Sleek invoice management system with CRUD operations and status tracking.',
		longDescription: 'A React-based dashboard for managing client invoices, featuring automated status updates, filtering, and a responsive interface designed for professional workflow.',
		tech: ['React', 'TypeScript', 'Tailwind CSS'],
		github: 'https://github.com/C3Techie/invoice-management-app',
		demo: 'https://invoice-management-app-eight.vercel.app/',
		image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000',
		category: 'frontend',
		featured: false,
		year: 2026,
		status: 'live'
	},
	{
		id: 'ticket-webapp',
		title: 'Ticket Management',
		description: 'Responsive ticketing system with full CRUD functionality and animated transitions.',
		longDescription: 'A robust ticket management application featuring user authentication, form validation, and smooth UI transitions using Framer Motion.',
		tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		github: 'https://github.com/C3Techie/ticket-webapp-react',
		demo: '#',
		image: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&q=80&w=1000',
		category: 'frontend',
		featured: false,
		year: 2025,
		status: 'live'
	}
];

export const categories = ['all', 'frontend', 'backend', 'fullstack'] as const;
export type Category = typeof categories[number];

export interface Skill {
	name: string;
	level: number; // 1-5
	category: SkillCategory;
}

export type SkillCategory = 'frontend' | 'backend' | 'cloud' | 'tooling' | 'languages';

export const skills: Skill[] = [
	// Frontend
	{ name: 'SvelteKit', level: 5, category: 'frontend' },
	{ name: 'React / Next.js', level: 5, category: 'frontend' },
	{ name: 'TypeScript', level: 5, category: 'frontend' },
	{ name: 'Three.js / WebGL', level: 4, category: 'frontend' },
	{ name: 'GSAP', level: 4, category: 'frontend' },
	{ name: 'Tailwind CSS', level: 5, category: 'frontend' },
	{ name: 'CSS / Animations', level: 5, category: 'frontend' },

	// Backend
	{ name: 'NestJS', level: 4, category: 'backend' },
	{ name: 'Node.js', level: 5, category: 'backend' },
	{ name: 'FastAPI / Python', level: 3, category: 'backend' },
	{ name: 'PostgreSQL', level: 4, category: 'backend' },
	{ name: 'Redis', level: 4, category: 'backend' },
	{ name: 'gRPC', level: 3, category: 'backend' },

	// Cloud & DevOps
	{ name: 'Docker', level: 4, category: 'cloud' },
	{ name: 'Vercel / Netlify', level: 5, category: 'cloud' },
	{ name: 'AWS (EC2, S3, Lambda)', level: 3, category: 'cloud' },
	{ name: 'GitHub Actions', level: 4, category: 'cloud' },
	{ name: 'Nginx', level: 3, category: 'cloud' },

	// Tooling
	{ name: 'Vite', level: 5, category: 'tooling' },
	{ name: 'Git / GitHub', level: 5, category: 'tooling' },
	{ name: 'Figma', level: 4, category: 'tooling' },
	{ name: 'Playwright / Vitest', level: 3, category: 'tooling' },
	{ name: 'Prisma', level: 4, category: 'tooling' },

	// Languages
	{ name: 'JavaScript', level: 5, category: 'languages' },
	{ name: 'Rust', level: 2, category: 'languages' },
	{ name: 'Python', level: 3, category: 'languages' },
	{ name: 'SQL', level: 4, category: 'languages' },
];

export const skillCategories: { key: SkillCategory; label: string }[] = [
	{ key: 'frontend', label: 'FRONTEND' },
	{ key: 'backend', label: 'BACKEND' },
	{ key: 'cloud', label: 'CLOUD / DEVOPS' },
	{ key: 'tooling', label: 'TOOLING' },
	{ key: 'languages', label: 'LANGUAGES' },
];

export interface Skill {
	name: string;
	level: number; // 1-5
	category: SkillCategory;
}

export type SkillCategory = 'frontend' | 'backend' | 'cloud' | 'tooling' | 'languages';

export const skills: Skill[] = [
	// Frontend
	{ name: 'React / Next.js', level: 5, category: 'frontend' },
	{ name: 'React Native', level: 5, category: 'frontend' },
	{ name: 'TypeScript', level: 5, category: 'frontend' },
	{ name: 'Tailwind CSS', level: 5, category: 'frontend' },
	{ name: 'SvelteKit', level: 2, category: 'frontend' }, // Learning
	{ name: 'Framer Motion', level: 4, category: 'frontend' },
	{ name: 'React Hook Form', level: 5, category: 'frontend' },

	// Backend
	{ name: 'Node.js / Express', level: 5, category: 'backend' },
	{ name: 'NestJS', level: 5, category: 'backend' },
	{ name: 'FastAPI', level: 4, category: 'backend' },
	{ name: 'Flask', level: 3, category: 'backend' },
	{ name: 'RESTful APIs', level: 5, category: 'backend' },
	{ name: 'JWT / OAuth', level: 5, category: 'backend' },

	// Database
	{ name: 'PostgreSQL', level: 4, category: 'backend' },
	{ name: 'MongoDB', level: 5, category: 'backend' },
	{ name: 'MySQL', level: 4, category: 'backend' },
	{ name: 'Firebase', level: 5, category: 'backend' },

	// Cloud & DevOps
	{ name: 'Docker', level: 4, category: 'cloud' },
	{ name: 'Vercel', level: 5, category: 'cloud' },
	{ name: 'AWS', level: 3, category: 'cloud' },
	{ name: 'CI/CD', level: 4, category: 'cloud' },

	// Tooling
	{ name: 'Git / GitHub', level: 5, category: 'tooling' },
	{ name: 'Postman', level: 5, category: 'tooling' },
	{ name: 'Vite', level: 5, category: 'tooling' },

	// Languages
	{ name: 'JavaScript / TypeScript', level: 5, category: 'languages' },
	{ name: 'Python', level: 4, category: 'languages' },
	{ name: 'SQL', level: 4, category: 'languages' },
];

export const skillCategories: { key: SkillCategory; label: string }[] = [
	{ key: 'frontend', label: 'FRONTEND' },
	{ key: 'backend', label: 'BACKEND / DB' },
	{ key: 'cloud', label: 'CLOUD / DEVOPS' },
	{ key: 'tooling', label: 'TOOLING' },
	{ key: 'languages', label: 'LANGUAGES' },
];

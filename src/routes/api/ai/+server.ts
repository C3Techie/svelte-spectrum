import { json } from '@sveltejs/kit';
import { GROQ_API_KEY } from '$env/static/private';
import { projects } from '$lib/data/projects';
import { skills } from '$lib/data/skills';
import { meta } from '$lib/data/meta';

export async function POST({ request }) {
	try {
		const { message } = await request.json();

		if (!message) {
			return json({ error: 'No message provided' }, { status: 400 });
		}

		// If Groq API Key is provided, use it
		if (GROQ_API_KEY && GROQ_API_KEY.trim() !== '') {
			try {
				const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${GROQ_API_KEY}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						model: 'llama-3.3-70b-versatile',
						messages: [
							{
								role: 'system',
								content: `You are Nexus AI, the portfolio assistant for Christian Chibuike (C3Techie).
								Your goal is to represent him professionally and showcase his skills and projects.
								
								CONTEXT:
								Name: ${meta.name}
								Role: ${meta.title}
								Bio: ${meta.bio}
								Projects: ${JSON.stringify(projects.map(p => ({ title: p.title, desc: p.description, tech: p.tech })))}
								Skills: ${skills.map(s => s.name).join(', ')}
								Contact: ${meta.email}, ${meta.linkedin}, ${meta.github}
								
								Instructions:
								- Be concise, professional, and slightly futuristic (engineered tone).
								- If asked about projects, mention specific ones from the list.
								- If asked about hiring, direct them to the contact section or email.
								- Stay in character as a high-integrity system assistant.`
							},
							{ role: 'user', content: message }
						],
						temperature: 0.7,
						max_tokens: 500
					})
				});

				const data = await response.json();
				
				if (data.choices && data.choices[0]?.message?.content) {
					return json({ response: data.choices[0].message.content });
				}
			} catch (err) {
				console.error('Groq API Error:', err);
				// Fallback to rule-based logic below
			}
		}

		// Fallback Rule-based Logic (if Groq key is missing or fails)
		const query = message.toLowerCase();
		let responseText = "";

		if (query.includes('project') || query.includes('work')) {
			const featured = projects.filter(p => p.featured);
			responseText = `Christian has ${projects.length} major projects. Highlights include: ${featured.map(p => p.title).join(', ')}. Would you like to know more about a specific one?`;
		} else if (query.includes('skill') || query.includes('tech') || query.includes('stack')) {
			const topSkills = skills.slice(0, 5).map(s => s.name).join(', ');
			responseText = `Christian is proficient in a wide range of technologies, including ${topSkills}. His core focus is on high-integrity backend systems and interactive frontend experiences.`;
		} else if (query.includes('contact') || query.includes('hire') || query.includes('email')) {
			responseText = `You can reach Christian at ${meta.email} or through the contact form on this site. He is currently available for internship opportunities.`;
		} else if (query.includes('who') || query.includes('about')) {
			responseText = `Christian (also known as ${meta.handle}) is a ${meta.title} based in ${meta.location}. He specializes in ${meta.bio.split('.')[0]}.`;
		} else {
			responseText = "I am Nexus AI, Christian's portfolio assistant. I can tell you about his projects, skills, or how to contact him. What would you like to explore?";
		}

		await new Promise(resolve => setTimeout(resolve, 800));
		return json({ response: responseText });

	} catch (err) {
		console.error('AI Processing Error:', err);
		return json({ error: 'Failed to process AI request' }, { status: 500 });
	}
}

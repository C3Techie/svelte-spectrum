import { json } from '@sveltejs/kit';
import { RESEND_API_KEY } from '$env/static/private';

export async function POST({ fetch, request }) {
	try {
		const { name, email, message } = await request.json();

		if (!name || !email || !message) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Using SvelteKit's fetch from the event object
		// This is generally more robust in SvelteKit environments
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${RESEND_API_KEY}`
			},
			body: JSON.stringify({
				from: 'Portfolio Contact <onboarding@resend.dev>',
				to: 'christianchibuike14@gmail.com',
				subject: `New Message from ${name}`,
				html: `
					<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: auto;">
						<h2 style="color: #00daf3; border-bottom: 2px solid #00daf3; padding-bottom: 10px;">New Transmission Received</h2>
						<p style="font-size: 16px;"><strong>From:</strong> ${name}</p>
						<p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
						<div style="margin-top: 20px; padding: 20px; background: #f4f7f8; border-left: 5px solid #00daf3; font-style: italic;">
							<p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
						</div>
						<p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
							Nexus Portfolio Security System // Automated Message
						</p>
					</div>
				`
			})
		});

		const result = await response.json();

		if (!response.ok) {
			console.error('Resend API Error:', result);
			return json({ 
				error: result.message || 'Failed to send email',
				details: result
			}, { status: response.status });
		}

		return json({ success: true, id: result.id });
	} catch (err: any) {
		console.error('Detailed Server Error:', err);
		
		// Handle DNS resolution errors specifically
		if (err.code === 'EAI_AGAIN') {
			return json({ 
				error: 'Network Error: DNS resolution failed for api.resend.com. Please check your internet connection or DNS settings.',
				code: 'DNS_FAILURE'
			}, { status: 503 });
		}

		return json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
	}
}

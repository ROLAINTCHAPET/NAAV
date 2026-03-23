'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const type = formData.get('type') as string;

    try {
        await resend.emails.send({
            from: 'NAAV Contact <onboarding@resend.dev>', // Must use verified domain or onboarding email
            to: process.env.ADMIN_EMAIL || 'naav.vison@gmail.com',
            subject: `Nouveau message de ${name} - ${type}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Nouveau message depuis le site NAAV</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Type de projet:</strong> ${type}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message}
          </div>
        </div>
      `
        });

        return { success: true };
    } catch (error) {
        console.error('Resend Error:', error);
        return { success: false, error: 'Une erreur est survenue lors de l\'envoi.' };
    }
}
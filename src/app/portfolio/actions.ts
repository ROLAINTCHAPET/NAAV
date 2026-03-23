'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function submitProjectFeedback(formData: FormData) {
    if (!supabase) return { success: false, message: "Configuration Supabase manquante." };

    const projectId = formData.get('projectId') as string;
    const rating = parseInt(formData.get('rating') as string) || 5;
    const comment = formData.get('comment') as string;
    const userName = formData.get('name') as string;

    try {
        const { error } = await supabase
            .from('testimonials')
            .insert([{
                client_name: userName,
                content: comment,
                rating: rating,
                status: 'brouillon', // For moderation
                company: 'Portfolio Feedback' // Tagging source
            }]);

        if (error) throw error;

        revalidatePath('/admin/testimonials');
        return { success: true, message: "Merci pour votre avis ! Il sera modéré avant publication." };
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return { success: false, message: "Impossible d'envoyer votre avis pour le moment." };
    }
}

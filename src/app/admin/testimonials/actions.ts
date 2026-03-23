'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveTestimonial(formData: FormData) {
    if (!supabase) return { error: 'Supabase non configuré' };

    const id = formData.get('id') as string;
    const client_name = formData.get('client_name') as string;
    const company = formData.get('company') as string;
    const content = formData.get('content') as string;
    const rating = parseInt(formData.get('rating') as string) || 5;
    const status = formData.get('status') as string || 'publie';
    const photo = formData.get('photo') as string;

    const data = {
        client_name,
        company,
        content,
        rating,
        status,
        photo,
    };

    if (id) {
        const { error } = await supabase.from('testimonials').update(data).eq('id', id);
        if (error) throw error;
    } else {
        const { error } = await supabase.from('testimonials').insert([data]);
        if (error) throw error;
    }

    revalidatePath('/admin/testimonials');
    revalidatePath('/temoignages');
    redirect('/admin/testimonials');
}

export async function deleteTestimonial(id: string) {
    if (!supabase) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/testimonials');
}

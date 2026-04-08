'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createPartner(formData: FormData) {
    if (!supabase) throw new Error('Supabase not configured');

    const name = formData.get('name') as string;
    const logo_url = formData.get('logo_url') as string;
    const website_url = formData.get('website_url') as string;

    const { error } = await supabase
        .from('partners')
        .insert([{ name, logo_url, website_url, is_active: true }]);

    if (error) throw error;
    revalidatePath('/admin/partners');
    revalidatePath('/');
}

export async function deletePartner(id: string) {
    if (!supabase) throw new Error('Supabase not configured');

    const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/partners');
    revalidatePath('/');
}

export async function togglePartnerStatus(id: string, currentStatus: boolean) {
    if (!supabase) throw new Error('Supabase not configured');

    const { error } = await supabase
        .from('partners')
        .update({ is_active: !currentStatus })
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/partners');
    revalidatePath('/');
}

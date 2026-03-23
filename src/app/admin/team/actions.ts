'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function saveMember(formData: any) {
    const { id, ...data } = formData;

    if (id) {
        const { error } = await supabase
            .from('team_members')
            .update(data)
            .eq('id', id);
        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('team_members')
            .insert([data]);
        if (error) throw error;
    }

    revalidatePath('/admin/team');
    revalidatePath('/about');
    return { success: true };
}

export async function deleteMember(id: string) {
    const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/team');
    return { success: true };
}

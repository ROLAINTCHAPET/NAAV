'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function saveArticle(formData: any) {
    const { id, ...data } = formData;

    if (id) {
        const { error } = await supabase
            .from('articles')
            .update(data)
            .eq('id', id);
        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('articles')
            .insert([data]);
        if (error) throw error;
    }

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath('/');
    return { success: true };
}

export async function deleteArticle(id: string) {
    const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/blog');
    return { success: true };
}

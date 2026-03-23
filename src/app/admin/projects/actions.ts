'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function saveProject(formData: any) {
    const { id, ...data } = formData;

    if (id) {
        // Update
        const { error } = await supabase
            .from('projects')
            .update(data)
            .eq('id', id);

        if (error) throw error;
    } else {
        // Create
        const { error } = await supabase
            .from('projects')
            .insert([data]);

        if (error) throw error;
    }

    revalidatePath('/admin/projects');
    revalidatePath('/portfolio');
    return { success: true };
}

export async function deleteProject(id: string) {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/projects');
    revalidatePath('/portfolio');
    return { success: true };
}

export async function uploadProjectImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

    return data.publicUrl;
}

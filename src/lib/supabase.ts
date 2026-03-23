import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only initialize if both variables are present to avoid runtime crashes
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any; // Cast as any to avoid breaking typings, but usage will need checks

if (!supabase) {
    console.warn('⚠️ Supabase credentials missing. Dynamic features will not work.');
}

export async function getProjects() {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', {
            code: error.code,
            message: error.message,
            details: error.details
        });
        return [];
    }
    return data;
}

export async function getProjectBySlug(slug: string) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        // PGRST116 means no rows were found, which is a valid case handled by fallbacks
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error('Error fetching project by slug:', {
            code: error.code,
            message: error.message,
            details: error.details,
            slug
        });
        return null;
    }
    return data;
}

export async function getLatestArticles() {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'publie')
        .order('published_at', { ascending: false })
        .limit(3);

    return data || [];
}
export async function getProjectById(id: string) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error('Error fetching project by id:', {
            code: error.code,
            message: error.message,
            details: error.details,
            id
        });
        return null;
    }
    return data;
}

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
        console.error('Error fetching projects:', error);
        return [];
    }

    // Normalize data to match Project interface
    return data.map((p: any) => ({
        ...p,
        image: p.cover_image,
        description: p.short_description,
        gallery: p.images || [],
    }));
}

export async function getProjectBySlug(slug: string) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null;
        console.error('Error fetching project by slug:', error);
        return null;
    }

    // Normalize
    return {
        ...data,
        image: data.cover_image,
        description: data.short_description,
        challenge: data.challenge || data.short_description, // Fallback if missing
        solution: data.solution || data.long_description,    // Mapping long_description to solution
        gallery: data.images || [],
    };
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
export async function getDashboardCounts() {
    if (!supabase) return { projects: 0, articles: 0, team: 0, testimonials: 0, partners: 0 };

    const [projects, articles, team, testimonials, partners] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('partners').select('*', { count: 'exact', head: true }),
    ]);

    return {
        projects: projects.count || 0,
        articles: articles.count || 0,
        team: team.count || 0,
        testimonials: testimonials.count || 0,
        partners: partners.count || 0,
    };
}

export async function getPartners() {
    if (!supabase) return [];
    const { data } = await supabase
        .from('partners')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });
    return data || [];
}

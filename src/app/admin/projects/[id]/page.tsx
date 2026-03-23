import ProjectForm from '@/components/admin/ProjectForm';
import { getProjectById } from '@/lib/supabase';
import { projects as mockProjects } from '@/data/projects';
import { notFound } from 'next/navigation';
import styles from '../Projects.module.css';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
    const { id } = await params;

    // Try Supabase first (if ID looks like a UUID)
    let project = null;
    if (id.length > 20) { // Simple UUID check
        project = await getProjectById(id);
    }

    // Fallback to mocks for development/demo
    if (!project) {
        project = mockProjects.find(p => p.id === id || p.slug === id);
    }

    if (!project) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Modifier le Projet</h1>
                    <p>Mise à jour de : <strong>{project.title}</strong></p>
                </div>
            </header>

            <ProjectForm mode="edit" initialData={project} />
        </div>
    );
}

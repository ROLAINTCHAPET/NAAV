'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, Image as ImageIcon, FolderKanban } from 'lucide-react';
import { getProjects } from '@/lib/supabase';
import { deleteProject } from './actions';
import styles from './Projects.module.css';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Voulez-vous vraiment supprimer le projet "${title}" ?`)) return;

        try {
            await deleteProject(id);
            alert('Projet supprimé avec succès');
            loadProjects();
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la suppression');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Gestion des Projets</h1>
                    <p>Ajoutez, modifiez ou supprimez vos réalisations architecturales.</p>
                </div>
                <Link href="/admin/projects/new" className="btn-primary">
                    <Plus size={18} /> Nouveau Projet
                </Link>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Vignette</th>
                            <th>Titre</th>
                            <th>Catégorie</th>
                            <th>Localisation</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '100px' }}>
                                    <div className="loading-spinner"></div>
                                    <p style={{ marginTop: '20px', color: '#666' }}>Chargement des projets...</p>
                                </td>
                            </tr>
                        ) : projects.length === 0 ? (
                            <tr>
                                <td colSpan={6}>
                                    <div className={styles.emptyState}>
                                        <div className={styles.emptyIcon}>
                                            <FolderKanban size={40} />
                                        </div>
                                        <h3>Aucun projet trouvé</h3>
                                        <p>Commencez par ajouter votre première réalisation architecturale pour qu'elle apparaisse ici et sur votre portfolio.</p>
                                        <Link href="/admin/projects/new" className="btn-primary" style={{ marginTop: '10px' }}>
                                            <Plus size={18} /> Nouveau Projet
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        <div className={styles.thumb}>
                                            {project.image || project.cover_image ? (
                                                <img src={project.image || project.cover_image} alt="" />
                                            ) : (
                                                <ImageIcon size={20} />
                                            )}
                                        </div>
                                    </td>
                                    <td className={styles.titleCell}>
                                        <strong>{project.title}</strong>
                                        <span>/{project.slug}</span>
                                    </td>
                                    <td><span className={styles.badge}>{project.category || 'Non classé'}</span></td>
                                    <td>{project.location || '-'}</td>
                                    <td>
                                        <span className={`${styles.status} ${project.status === 'brouillon' ? styles.draft : styles.published}`}>
                                            {project.status === 'brouillon' ? 'Brouillon' : 'Publié'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/projects/${project.id}`} className={styles.editBtn} title="Modifier">
                                                <Edit size={16} />
                                            </Link>
                                            <Link href={`/portfolio/${project.slug}`} target="_blank" className={styles.viewBtn} title="Voir sur le site">
                                                <ExternalLink size={16} />
                                            </Link>
                                            <button
                                                className={styles.deleteBtn}
                                                title="Supprimer"
                                                onClick={() => handleDelete(project.id, project.title)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

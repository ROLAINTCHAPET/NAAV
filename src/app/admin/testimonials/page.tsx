'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { deleteTestimonial } from '@/app/admin/testimonials/actions';
import styles from '../projects/Projects.module.css';

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        setLoading(true);
        if (!supabase) return;
        const { data } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });
        setTestimonials(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Supprimer le témoignage de "${name}" ?`)) return;

        try {
            await deleteTestimonial(id);
            loadTestimonials();
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la suppression');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Témoignages</h1>
                    <p className={styles.subtitle}>Gérez les retours et avis de vos clients.</p>
                </div>
                <Link href="/admin/testimonials/new" className="btn-primary">
                    + Nouveau Témoignage
                </Link>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Entreprise</th>
                            <th>Note</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((t: any) => (
                            <tr key={t.id}>
                                <td><strong>{t.client_name}</strong></td>
                                <td>{t.company || '-'}</td>
                                <td>{t.rating ? '★'.repeat(t.rating) : '-'}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[t.status]}`}>
                                        {t.status === 'publie' ? 'Publié' : 'Brouillon'}
                                    </span>
                                </td>
                                <td className={styles.actions}>
                                    <Link href={`/admin/testimonials/${t.id}`} className={styles.editBtn}>Modifier</Link>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(t.id, t.client_name)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {testimonials.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>
                                    Aucun témoignage trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

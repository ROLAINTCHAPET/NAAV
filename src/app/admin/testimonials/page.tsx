'use client';

import React, { useEffect, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deleteTestimonial } from '@/app/admin/testimonials/actions';
import styles from '../projects/Projects.module.css';

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

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
                    <p className={styles.subtitle}>Modérez les avis clients envoyés depuis le portfolio.</p>
                </div>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Projet</th>
                            <th>Note</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((t: any) => (
                            <React.Fragment key={t.id}>
                                <tr>
                                    <td><strong>{t.client_name}</strong></td>
                                    <td>{t.company || '-'}</td>
                                    <td>{t.rating ? '★'.repeat(t.rating) : '-'}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[t.status]}`}>
                                            {t.status === 'publie' ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <button
                                            className={styles.viewBtn}
                                            onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                                            title="Voir l'avis"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => handleDelete(t.id, t.client_name)}
                                            title="Supprimer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                                {expandedId === t.id && (
                                    <tr key={`expanded-${t.id}`}>
                                        <td colSpan={5}>
                                            <div className={styles.contentBox}>
                                                <strong>Avis de {t.client_name} :</strong>
                                                <p style={{ marginTop: '10px' }}>{t.content}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
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
        </div >
    );
}

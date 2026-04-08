'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deletePartner, togglePartnerStatus } from './actions';
import styles from '../projects/Projects.module.css';

export default function PartnersAdmin() {
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPartners();
    }, []);

    const loadPartners = async () => {
        setLoading(true);
        if (!supabase) { setLoading(false); return; }
        const { data } = await supabase
            .from('partners')
            .select('*')
            .order('created_at', { ascending: false });
        setPartners(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Supprimer le partenaire "${name}" ?`)) return;
        try {
            await deletePartner(id);
            loadPartners();
        } catch (e) {
            alert('Erreur lors de la suppression');
        }
    };

    const handleToggle = async (id: string, currentStatus: boolean) => {
        try {
            await togglePartnerStatus(id, currentStatus);
            loadPartners();
        } catch (e) {
            alert('Erreur lors de la mise à jour');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Partenaires</h1>
                    <p className={styles.subtitle}>Gérez les partenaires affichés sur la page d'accueil.</p>
                </div>
                <Link href="/admin/partners/new" className={styles.addBtn}>
                    <Plus size={16} /> Ajouter
                </Link>
            </header>

            {!supabase && (
                <div style={{ background: '#2a1a0a', border: '1px solid #8B6914', borderRadius: '8px', padding: '16px', marginBottom: '24px', color: '#C9A84C' }}>
                    ⚠️ Supabase non configuré. Exécutez <code>PARTNERS_SETUP.sql</code> dans votre dashboard Supabase pour activer la gestion des partenaires.
                </div>
            )}

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Partenaire</th>
                            <th>Site Web</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px' }}>Chargement...</td></tr>
                        ) : partners.length === 0 ? (
                            <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px' }}>Aucun partenaire. <Link href="/admin/partners/new">Ajouter le premier</Link></td></tr>
                        ) : partners.map((p: any) => (
                            <tr key={p.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {p.logo_url && (
                                            <img src={p.logo_url} alt={p.name} style={{ height: '32px', width: '60px', objectFit: 'contain', filter: 'grayscale(1)' }} />
                                        )}
                                        <strong>{p.name}</strong>
                                    </div>
                                </td>
                                <td>
                                    {p.website_url ? (
                                        <a href={p.website_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)' }}>
                                            {p.website_url}
                                        </a>
                                    ) : '—'}
                                </td>
                                <td>
                                    <span className={`${styles.status} ${p.is_active ? styles.publie : styles.brouillon}`}>
                                        {p.is_active ? 'Actif' : 'Inactif'}
                                    </span>
                                </td>
                                <td className={styles.actions}>
                                    <button
                                        className={styles.viewBtn}
                                        onClick={() => handleToggle(p.id, p.is_active)}
                                        title={p.is_active ? 'Désactiver' : 'Activer'}
                                    >
                                        {p.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(p.id, p.name)}
                                        title="Supprimer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

'use client';

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload, Users, Settings, Camera } from 'lucide-react';
import { saveMember } from './actions';
import styles from '@/components/admin/ProjectForm.module.css';

interface TeamFormProps {
    initialData?: any;
}

export default function TeamForm({ initialData }: TeamFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: initialData?.full_name || '',
        role: initialData?.role || '',
        bio: initialData?.bio || '',
        photo: initialData?.photo || '',
        linkedin: initialData?.linkedin || '',
        instagram: initialData?.instagram || '',
        display_order: initialData?.display_order || 0,
        status: initialData?.status || 'actif',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'display_order' ? parseInt(value) : value }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        try {
            const { uploadProjectImage } = await import('../projects/actions');
            const url = await uploadProjectImage(file);
            setFormData(prev => ({ ...prev, photo: url }));
        } catch (err: any) {
            alert('Erreur d\'upload : ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveMember({
                ...formData,
                id: initialData?.id
            });
            router.push('/admin/team');
        } catch (err: any) {
            alert('Erreur : ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.main}>
                <section className={styles.section}>
                    <h2><Users size={20} /> Informations du Membre</h2>
                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>Nom complet</label>
                            <input name="full_name" value={formData.full_name} onChange={handleChange} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Poste / Rôle</label>
                            <input name="role" value={formData.role} onChange={handleChange} required placeholder="ex: Architecte Senior" />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Biographie</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>LinkedIn (URL)</label>
                            <input name="linkedin" value={formData.linkedin} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Instagram (URL)</label>
                            <input name="instagram" value={formData.instagram} onChange={handleChange} />
                        </div>
                    </div>
                </section>
            </div>

            <aside className={styles.aside}>
                <div className={styles.sticky}>
                    <div className={styles.card}>
                        <h3><Settings size={16} /> Affichage</h3>
                        <div className={styles.inputGroup}>
                            <label>Ordre d&apos;affichage</label>
                            <input type="number" name="display_order" value={formData.display_order} onChange={handleChange} />
                        </div>
                        <div className={styles.actions}>
                            <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>
                                <X size={16} /> Annuler
                            </button>
                            <button type="submit" disabled={loading} className={styles.saveBtn}>
                                <Save size={16} /> {loading ? 'Envoi...' : 'Enregistrer'}
                            </button>
                        </div>
                    </div>

                    <div className={styles.card} style={{ marginTop: '20px' }}>
                        <h3><Camera size={16} /> Photo de Profil</h3>
                        <div className={styles.uploadArea} style={{ padding: '20px', position: 'relative' }}>
                            <Upload size={24} />
                            <p style={{ fontSize: '0.8rem' }}>Ajouter une photo</p>
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                                disabled={loading}
                            />
                        </div>
                        {formData.photo && (
                            <img src={formData.photo} alt="" style={{ width: '100%', borderRadius: '50%', aspectRatio: '1', objectFit: 'cover', marginTop: '10px' }} />
                        )}
                    </div>
                </div>
            </aside>
        </form>
    );
}

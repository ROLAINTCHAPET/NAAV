'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload, FileText, Send, Image as ImageIcon } from 'lucide-react';
import { saveArticle } from './actions';
import styles from '@/components/admin/ProjectForm.module.css';
import LoadingModal from '@/components/ui/LoadingModal';

interface BlogFormProps {
    initialData?: any;
}

export default function BlogForm({ initialData }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean | string>(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        content: initialData?.content || '',
        cover_image: initialData?.cover_image || '',
        status: initialData?.status || 'publie',
        tags: initialData?.tags || [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading("Téléchargement de l'image...");
        try {
            const { uploadProjectImage } = await import('../projects/actions');
            const url = await uploadProjectImage(file);
            setFormData(prev => ({ ...prev, cover_image: url }));
        } catch (err: any) {
            alert('Erreur d\'upload : ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading("Enregistrement de l'article...");
        try {
            await saveArticle({
                ...formData,
                id: initialData?.id
            });
            router.push('/admin/blog');
            router.refresh();
        } catch (err: any) {
            alert('Erreur : ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.main}>
                    <section className={styles.section}>
                        <h2><FileText size={20} /> Contenu de l&apos;Article</h2>
                        <div className={styles.inputGroup}>
                            <label>Titre de l&apos;Article</label>
                            <input name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Slug (URL)</label>
                            <input name="slug" value={formData.slug} onChange={handleChange} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Contenu</label>
                            <textarea name="content" value={formData.content} onChange={handleChange} rows={15} required />
                        </div>
                    </section>
                </div>

                <aside className={styles.aside}>
                    <div className={styles.sticky}>
                        <div className={styles.card}>
                            <h3><Send size={16} /> Publication</h3>
                            <div className={styles.inputGroup}>
                                <label>Statut</label>
                                <select name="status" value={formData.status} onChange={handleChange}>
                                    <option value="publie">Publié</option>
                                    <option value="brouillon">Brouillon</option>
                                </select>
                            </div>
                            <div className={styles.actions}>
                                <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>
                                    <X size={16} /> Annuler
                                </button>
                                <button type="submit" disabled={!!loading} className={styles.saveBtn}>
                                    <Save size={16} /> {loading ? 'Envoi...' : 'Enregistrer'}
                                </button>
                            </div>
                        </div>

                        <div className={styles.card} style={{ marginTop: '20px' }}>
                            <h3><ImageIcon size={16} /> Image de Couverture</h3>
                            <div className={styles.uploadArea} style={{ padding: '20px', position: 'relative' }}>
                                <Upload size={24} />
                                <p style={{ fontSize: '0.8rem' }}>Ajouter une image</p>
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                                    disabled={!!loading}
                                />
                            </div>
                            {formData.cover_image && (
                                <img src={formData.cover_image} alt="" style={{ width: '100%', borderRadius: '4px', marginTop: '10px' }} />
                            )}
                        </div>
                    </div>
                </aside>
            </form>

            <LoadingModal
                isOpen={!!loading}
                message={typeof loading === 'string' ? loading : "Traitement en cours..."}
            />
        </>
    );
}

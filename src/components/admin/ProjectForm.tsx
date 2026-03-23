'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload, Trash2 } from 'lucide-react';
import { saveProject } from '@/app/admin/projects/actions';
import styles from './ProjectForm.module.css';

interface ProjectFormProps {
    initialData?: any;
    mode: 'create' | 'edit';
}

export default function ProjectForm({ initialData, mode }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        category: initialData?.category || 'Résidentiel',
        location: initialData?.location || '',
        year: initialData?.year || '',
        area: initialData?.area || '',
        short_description: initialData?.short_description || '',
        long_description: initialData?.long_description || '',
        featured: initialData?.featured || false,
        status: initialData?.status || 'publie',
    });

    const [images, setImages] = useState<string[]>(initialData?.images || []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as any;
        setFormData((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setLoading(true);
        try {
            const newImages = [...images];
            const { uploadProjectImage } = await import('@/app/admin/projects/actions');
            for (let i = 0; i < files.length; i++) {
                const url = await uploadProjectImage(files[i]);
                newImages.push(url);
            }
            setImages(newImages);
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
            await saveProject({
                ...formData,
                id: initialData?.id,
                images,
                cover_image: images[0] || ''
            });
            router.push('/admin/projects');
        } catch (err: any) {
            alert('Erreur lors de l\'enregistrement : ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.main}>
                <section className={styles.section}>
                    <h2>Informations Générales</h2>
                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>Titre du Projet</label>
                            <input name="title" value={formData.title} onChange={handleChange} required placeholder="ex: Villa Horizon" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Slug (URL)</label>
                            <input name="slug" value={formData.slug} onChange={handleChange} required placeholder="ex: villa-horizon" />
                        </div>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>Catégorie</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option>Résidentiel</option>
                                <option>Commercial</option>
                                <option>Intérieur</option>
                                <option>Urbanisme</option>
                                <option>Visualisation 3D</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Localisation</label>
                            <input name="location" value={formData.location} onChange={handleChange} placeholder="ex: Dakar, Sénégal" />
                        </div>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>Année</label>
                            <input name="year" value={formData.year} onChange={handleChange} placeholder="ex: 2025" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Superficie</label>
                            <input name="area" value={formData.area} onChange={handleChange} placeholder="ex: 450 m²" />
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Descriptions</h2>
                    <div className={styles.inputGroup}>
                        <label>Accroche (Courte description)</label>
                        <textarea name="short_description" value={formData.short_description} onChange={handleChange} rows={2} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Description Détaillée</label>
                        <textarea name="long_description" value={formData.long_description} onChange={handleChange} rows={6} />
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Médias</h2>
                    <div className={styles.uploadArea}>
                        <Upload size={32} />
                        <p>Glissez vos images ici ou <span>parcourez</span></p>
                        <input
                            type="file"
                            multiple
                            className={styles.fileInput}
                            onChange={handleFileUpload}
                            disabled={loading}
                        />
                    </div>
                    {images.length > 0 && (
                        <div className={styles.imageGrid}>
                            {images.map((img: string, i: number) => (
                                <div key={i} className={styles.imageThumb}>
                                    <img src={img} alt="" />
                                    <button type="button" onClick={() => setImages(images.filter((_, idx: number) => idx !== i))}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <aside className={styles.aside}>
                <div className={styles.sticky}>
                    <div className={styles.card}>
                        <h3>Publication</h3>
                        <div className={styles.inputGroup}>
                            <label>Statut</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="publie">Publié</option>
                                <option value="brouillon">Brouillon</option>
                            </select>
                        </div>
                        <label className={styles.checkbox}>
                            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange as any} />
                            Projet à la une
                        </label>
                        <div className={styles.actions}>
                            <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>
                                <X size={16} /> Annuler
                            </button>
                            <button type="submit" disabled={loading} className={styles.saveBtn}>
                                <Save size={16} /> {loading ? 'Enregistrement...' : 'Enregistrer'}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </form>
    );
}

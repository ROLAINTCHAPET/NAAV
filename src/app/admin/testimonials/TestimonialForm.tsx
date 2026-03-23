'use client';

'use client';

import { useState } from 'react';
import { saveTestimonial } from './actions';
import styles from '../projects/ProjectForm.module.css';

export default function TestimonialForm({ testimonial }: { testimonial?: any }) {
    const [loading, setLoading] = useState(false);

    return (
        <form action={saveTestimonial} className={styles.form} onSubmit={() => setLoading(true)}>
            {testimonial?.id && <input type="hidden" name="id" value={testimonial.id} />}

            <div className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.inputGroup}>
                        <label>Nom du Client</label>
                        <input name="client_name" defaultValue={testimonial?.client_name} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Entreprise / Poste</label>
                        <input name="company" defaultValue={testimonial?.company} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Témoignage (Texte)</label>
                        <textarea name="content" defaultValue={testimonial?.content} rows={6} required />
                    </div>
                </div>
            </div>

            <div className={styles.sidebar}>
                <div className={styles.card}>
                    <div className={styles.inputGroup}>
                        <label>Note (1-5)</label>
                        <select name="rating" defaultValue={testimonial?.rating || 5}>
                            <option value="5">5 Étoiles</option>
                            <option value="4">4 Étoiles</option>
                            <option value="3">3 Étoiles</option>
                            <option value="2">2 Étoiles</option>
                            <option value="1">1 Étoile</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Statut</label>
                        <select name="status" defaultValue={testimonial?.status || 'publie'}>
                            <option value="publie">Publié</option>
                            <option value="brouillon">Brouillon</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>URL Photo Client (Optionnel)</label>
                        <input name="photo" defaultValue={testimonial?.photo} placeholder="https://..." />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '20px' }} disabled={loading}>
                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                    <a href="/admin/testimonials" className={styles.cancelLink}>Annuler</a>
                </div>
            </div>
        </form>
    );
}

'use client';

import { useState } from 'react';
import styles from './Feedback.module.css';
import { submitProjectFeedback } from '@/app/portfolio/actions';

interface Props {
    projectId: string;
    projectTitle: string;
}

const Feedback = ({ projectId, projectTitle }: Props) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    async function handleAction(formData: FormData) {
        if (rating === 0) {
            setStatus('error');
            setMessage("Veuillez sélectionner une note.");
            return;
        }

        setStatus('loading');
        formData.append('rating', rating.toString());
        formData.append('projectId', projectId);

        try {
            const result = await submitProjectFeedback(formData);
            if (result.success) {
                setStatus('success');
                setMessage(result.message);
            } else {
                setStatus('error');
                setMessage("Une erreur est survenue.");
            }
        } catch (err) {
            setStatus('error');
            setMessage("Impossible d'envoyer votre avis.");
        }
    }

    return (
        <div className={styles.feedbackContainer}>
            <h2 className={styles.title}>Donner votre avis</h2>
            <p className={styles.subtitle}>Que pensez-vous du projet <strong>{projectTitle}</strong> ?</p>

            {status === 'success' ? (
                <div className={styles.success}>
                    <div className={styles.icon}>✓</div>
                    <p>{message}</p>
                    <button onClick={() => setStatus('idle')} className="btn-outline">Donner un autre avis</button>
                </div>
            ) : (
                <form action={handleAction} className={styles.form}>
                    <div className={styles.ratingBox}>
                        <label>Votre Note :</label>
                        <div className={styles.stars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`${styles.star} ${(hover || rating) >= star ? styles.active : ''}`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <input type="text" name="name" placeholder="Votre Nom" required className={styles.input} />
                    </div>

                    <div className={styles.inputGroup}>
                        <textarea
                            name="comment"
                            placeholder="Votre avis sur l'architecture, le design ou l'innovation..."
                            required
                            rows={4}
                            className={styles.textarea}
                        ></textarea>
                    </div>

                    {status === 'error' && <p className={styles.error}>{message}</p>}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={status === 'loading'}
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer mon avis'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Feedback;

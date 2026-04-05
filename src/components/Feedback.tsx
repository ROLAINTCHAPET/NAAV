import styles from './Feedback.module.css';
import { submitProjectFeedback } from '@/app/portfolio/actions';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
    projectId: string;
    projectTitle: string;
}

const Feedback = ({ projectId, projectTitle }: Props) => {
    const { t } = useLanguage();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    async function handleAction(formData: FormData) {
        if (rating === 0) {
            setStatus('error');
            setMessage(t('feedback.rateRequired'));
            return;
        }

        setStatus('loading');
        formData.append('rating', rating.toString());
        formData.append('projectId', projectId);
        formData.append('projectTitle', projectTitle);

        try {
            const result = await submitProjectFeedback(formData);
            if (result.success) {
                setStatus('success');
                setMessage(result.message || t('feedback.successMsg'));
            } else {
                setStatus('error');
                setMessage(t('feedback.errorMsg'));
            }
        } catch (err) {
            setStatus('error');
            setMessage(t('feedback.unexpectedError'));
        }
    }

    return (
        <div className={styles.feedbackContainer}>
            <h2 className={styles.title}>{t('feedback.title')}</h2>
            <p className={styles.subtitle}>{t('feedback.subtitle')} <strong>{projectTitle}</strong> ?</p>

            {status === 'success' ? (
                <div className={styles.success}>
                    <div className={styles.icon}>✓</div>
                    <p>{message}</p>
                    <button onClick={() => setStatus('idle')} className="btn-outline">{t('feedback.sendAnother')}</button>
                </div>
            ) : (
                <form action={handleAction} className={styles.form}>
                    <div className={styles.ratingBox}>
                        <label>{t('feedback.ratingLabel')}</label>
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
                        <input type="text" name="name" placeholder={t('feedback.namePlaceholder')} required className={styles.input} />
                    </div>

                    <div className={styles.inputGroup}>
                        <textarea
                            name="comment"
                            placeholder={t('feedback.commentPlaceholder')}
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
                        {status === 'loading' ? t('feedback.sending') : t('feedback.submit')}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Feedback;

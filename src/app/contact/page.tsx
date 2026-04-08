"use client";
import { useState } from 'react';
import styles from './Contact.module.css';
import { sendContactEmail } from './actions';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    async function handleSubmit(formData: FormData) {
        setStatus('loading');
        try {
            const result = await sendContactEmail(formData) as any;
            if (result.success) {
                setStatus('success');
                setMessage(result.simulated ? t('contact.form.successSimulation') : t('contact.form.successMsg'));
            } else {
                setStatus('error');
                setMessage(result.error || t('contact.form.errorMsg'));
            }
        } catch (err) {
            setStatus('error');
            setMessage(t('contact.form.unexpectedError'));
        }
    }

    return (
        <div className={styles.contactWrapper}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className="section-eyebrow">{t('contact.heroEyebrow')}</div>
                    <h1 className="section-title">{t('contact.heroTitle')} <em>{t('contact.heroTitleEmphasis')}</em></h1>
                    <p className={styles.heroLead}>
                        {t('contact.heroLead')}
                    </p>
                </div>
            </section>

            <section className={styles.formSection}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Info Column */}
                        <div className={styles.infoCol}>
                            <div className={styles.infoItem}>
                                <h3>{t('contact.info.offices')}</h3>
                                <p>{t('contact.info.address')}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <h3>{t('contact.info.direct')}</h3>
                                <p>contact@naav-architecture.com</p>
                                <p>+221 33 123 45 67</p>
                            </div>
                            <div className={styles.infoItem}>
                                <h3>{t('contact.info.hours')}</h3>
                                <p>{t('contact.info.weekdays')}</p>
                                <p>{t('contact.info.saturday')}</p>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className={styles.formCol}>
                            {status === 'success' ? (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIcon}>✓</div>
                                    <h2>{t('contact.form.success')}</h2>
                                    <p>{message}</p>
                                    <button onClick={() => setStatus('idle')} className="btn-outline" style={{ marginTop: '20px' }}>
                                        {t('contact.form.sendAnother')}
                                    </button>
                                </div>
                            ) : (
                                <form action={handleSubmit} className={styles.form}>
                                    <div className={styles.formGrid}>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="name">{t('contact.form.name')}</label>
                                            <input type="text" id="name" name="name" placeholder={t('contact.form.namePlaceholder')} required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="email">{t('contact.form.email')}</label>
                                            <input type="email" id="email" name="email" placeholder={t('contact.form.emailPlaceholder')} required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="phone">{t('contact.form.phone')}</label>
                                            <input type="tel" id="phone" name="phone" placeholder={t('contact.form.phonePlaceholder')} />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="project-type">{t('contact.form.projectType')}</label>
                                            <select id="project-type" name="project-type">
                                                <option value="residentiel">{t('contact.form.types.luxury')}</option>
                                                <option value="commercial">{t('contact.form.types.commercial')}</option>
                                                <option value="interieur">{t('contact.form.types.interior')}</option>
                                                <option value="urbanisme">{t('contact.form.types.urban')}</option>
                                                <option value="autre">{t('contact.form.types.other')}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup} style={{ marginTop: '24px' }}>
                                        <label htmlFor="message">{t('contact.form.message')}</label>
                                        <textarea id="message" name="message" rows={5} placeholder={t('contact.form.messagePlaceholder')} required></textarea>
                                    </div>

                                    <div className={styles.checkboxGroup}>
                                        <input type="checkbox" id="devis" name="devis" />
                                        <label htmlFor="devis">{t('contact.form.estimate')}</label>
                                    </div>

                                    {status === 'error' && <p className={styles.errorMessage}>{message}</p>}

                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={status === 'loading'}
                                        style={{ width: '100%', marginTop: '30px', justifyContent: 'center' }}
                                    >
                                        {status === 'loading' ? t('contact.form.sending') : t('contact.form.submit')}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

"use client";

import Image from 'next/image';
import styles from './Pitch.module.css';
import { useLanguage } from '@/context/LanguageContext';

const Pitch = () => {
    const { t } = useLanguage();

    return (
        <section className={styles.pitch}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.visual}>
                        <Image
                            src="/images/projects/project2.png"
                            alt="Vision Architecture"
                            fill
                            className={styles.image}
                        />
                        <div className={styles.badge}>
                            <div className={styles.badgeIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.87L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            </div>
                            <div className={styles.badgeText}>
                                <strong>{t('pitch.badgeTitle')}</strong>
                                {t('pitch.badgeSubtitle')}
                            </div>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className="section-eyebrow">{t('pitch.eyebrow')}</div>
                        <h2 className="section-title">
                            {t('pitch.title')} <em>{t('pitch.titleEmphasis')}</em>
                        </h2>
                        <div className={styles.quote}>
                            &quot;{t('pitch.quote')}&quot;
                        </div>
                        <p className={styles.desc}>
                            {t('pitch.desc')}
                        </p>
                        <div className={styles.tags}>
                            <span className={styles.tag}>{t('pitch.tags.modernity')}</span>
                            <span className={styles.tag}>{t('pitch.tags.heritage')}</span>
                            <span className={styles.tag}>{t('pitch.tags.sustainability')}</span>
                            <span className={styles.tag}>{t('pitch.tags.innovation')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pitch;

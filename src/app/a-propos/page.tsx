import Image from 'next/image';
import styles from './About.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className={styles.wrapper}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className="section-eyebrow">{t('about.heroEyebrow')}</div>
                    <h1 className="section-title">{t('about.heroTitle')} <em>{t('about.heroTitleEmphasis')}</em></h1>
                    <p className={styles.heroLead}>
                        {t('about.heroLead')}
                    </p>
                </div>
            </section>

            {/* Philosophy */}
            <section className={styles.philosophy}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        <div className={styles.content}>
                            <h2 className={styles.heading}>{t('about.philosophy.title')}</h2>
                            <p>
                                {t('about.philosophy.text')}
                            </p>
                            <div className={styles.values}>
                                <div className={styles.valueItem}>
                                    <span>01.</span>
                                    <div>
                                        <h4>{t('about.philosophy.values.v1.title')}</h4>
                                        <p>{t('about.philosophy.values.v1.desc')}</p>
                                    </div>
                                </div>
                                <div className={styles.valueItem}>
                                    <span>02.</span>
                                    <div>
                                        <h4>{t('about.philosophy.values.v2.title')}</h4>
                                        <p>{t('about.philosophy.values.v2.desc')}</p>
                                    </div>
                                </div>
                                <div className={styles.valueItem}>
                                    <span>03.</span>
                                    <div>
                                        <h4>{t('about.philosophy.values.v3.title')}</h4>
                                        <p>{t('about.philosophy.values.v3.desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.visual}>
                            <Image
                                src="/images/projects/project1.png"
                                alt="Philosophie NAAV"
                                fill
                                className={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className={styles.mission}>
                <div className={styles.container}>
                    <div className={styles.missionCard}>
                        <h2 className={styles.missionTitle}>&quot;{t('about.mission.text')}&quot;</h2>
                        <span className={styles.author}>— {t('about.mission.author')}</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

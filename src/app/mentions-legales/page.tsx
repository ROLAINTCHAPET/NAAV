import styles from './MentionsLegales.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function MentionsLegalesPage() {
    const { t } = useLanguage();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>{t('about.legal.title')}</h1>
                <p className={styles.lastUpdate}>{t('about.legal.lastUpdate')} : 21 Mars 2026</p>

                <section className={styles.section}>
                    <h2>{t('about.legal.s1Title')}</h2>
                    <p>
                        {t('about.legal.s1Text')}<br />
                        {t('about.legal.s1Company')}<br />
                        {t('about.legal.s1Address')}<br />
                        Immatriculée au RCCM : [Numéro]<br />
                        {t('about.legal.s1Director')} [Nom du Directeur]
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>{t('about.legal.s2Title')}</h2>
                    <p>
                        {t('about.legal.s2Text')}<br />
                        Vercel Inc.<br />
                        440 N Barranca Ave #4133<br />
                        Covina, CA 91723<br />
                        États-Unis
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>{t('about.legal.s3Title')}</h2>
                    <p>
                        {t('about.legal.s3Text')}
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>{t('about.legal.s4Title')}</h2>
                    <p>
                        {t('about.legal.s4Text')}
                    </p>
                </section>
            </div>
        </div>
    );
}

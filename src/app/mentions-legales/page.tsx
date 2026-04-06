import styles from './MentionsLegales.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function MentionsLegalesPage() {
    const { t } = useLanguage();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>{t('legal.title')}</h1>
                <p className={styles.lastUpdate}>{t('legal.lastUpdate')} : 21 Mars 2026</p>

                <section className={styles.section}>
                    <h2>{t('legal.s1Title')}</h2>
                    <p>
                        {t('legal.s1Text')}<br />
                        {t('legal.s1Company')}<br />
                        {t('legal.s1Address')}<br />
                        Immatriculée au RCCM : [Numéro]<br />
                        {t('legal.s1Director')} [Nom du Directeur]
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>{t('legal.s2Title')}</h2>
                    <p>
                        {t('legal.s2Text')}<br />
                        Vercel Inc.<br />
                        440 N Barranca Ave #4133<br />
                        Covina, CA 91723<br />
                        États-Unis
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>{t('legal.s3Title')}</h2>
                    <p>
                        {t('legal.s3Text')}
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>{t('legal.s4Title')}</h2>
                    <p>
                        {t('legal.s4Text')}
                    </p>
                </section>
            </div>
        </div>
    );
}

import styles from './Services.module.css';
import { useLanguage } from '@/context/LanguageContext';

const Services = () => {
    const { t, dict } = useLanguage();

    return (
        <section className={styles.services}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className="section-eyebrow">{t('services.eyebrow')}</div>
                        <h2 className="section-title">
                            {t('services.title')} <em>{t('services.titleEmphasis')}</em>
                        </h2>
                    </div>
                    <p className={styles.headerDesc}>
                        {t('services.headerDesc')}
                    </p>
                </div>

                <div className={styles.grid}>
                    {dict.services.items.map((service: any, i: number) => (
                        <div key={i} className={styles.card}>
                            <div className={styles.num}>{service.num}</div>
                            <h3 className={styles.name}>{service.name}</h3>
                            <p className={styles.desc}>{service.desc}</p>
                            <div className={styles.line}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

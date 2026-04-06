import styles from './Services.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function ServicesPage() {
  const { t, dict } = useLanguage();

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className="section-eyebrow">{t('about.servicesPage.heroEyebrow')}</div>
          <h1 className="section-title">{t('about.servicesPage.heroTitle')} <em>{t('about.servicesPage.heroTitleEmphasis')}</em></h1>
          <p className={styles.heroLead}>
            {t('about.servicesPage.heroLead')}
          </p>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className={styles.expertise}>
        <div className={styles.container}>
          <div className={styles.expertiseGrid}>
            {dict.about.servicesPage.expertise.items.map((item: any, idx: number) => (
              <div key={idx} className={styles.expertiseCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>{(idx + 1).toString().padStart(2, '0')}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p className={styles.cardDesc}>{item.desc}</p>
                <ul className={styles.featureList}>
                  {item.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.processHeader}>
            <div className="section-eyebrow">{t('about.servicesPage.methodology.eyebrow')}</div>
            <h2 className="section-title">{t('about.servicesPage.methodology.title')} <em>{t('about.servicesPage.methodology.titleEmphasis')}</em></h2>
          </div>

          <div className={styles.processGrid}>
            {dict.about.servicesPage.methodology.steps.map((item: any, idx: number) => (
              <div key={idx} className={styles.processItem}>
                <div className={styles.stepCircle}>{item.step}</div>
                <div className={styles.stepContent}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                {idx < dict.about.servicesPage.methodology.steps.length - 1 && <div className={styles.stepLine}></div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

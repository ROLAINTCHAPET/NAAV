"use client";

import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className={styles.hero}>
            <div className={styles.heroBg}></div>
            <div className={styles.heroOverlay}></div>

            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.eyebrow}>{t('hero.eyebrow')}</div>
                    <h1 className={styles.title}>
                        {t('hero.title')} <em>{t('hero.titleEmphasis')}</em> <br />
                        {t('hero.subtitle')}
                    </h1>
                    <div className={styles.actions}>
                        <a href="/portfolio" className="btn-primary">
                            {t('hero.ctaPortfolio')}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                        <a href="/contact" className="btn-outline">
                            {t('hero.ctaContact')}
                        </a>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <div className={styles.statNum}>15+</div>
                            <div className={styles.statLabel}>{t('hero.stats.countries')}</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statNum}>120+</div>
                            <div className={styles.statLabel}>{t('hero.stats.delivered')}</div>
                        </div>
                    </div>

                    <div className={styles.scroll}>
                        <span>{t('hero.stats.discover')}</span>
                        <div className={styles.scrollLine}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

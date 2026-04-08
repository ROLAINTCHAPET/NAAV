"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './PortfolioPreview.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface PortfolioPreviewProps {
    projects: any[];
}

const PortfolioPreview = ({ projects }: PortfolioPreviewProps) => {
    const { t } = useLanguage();

    return (
        <section className={styles.portfolio}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className="section-eyebrow">{t('portfolioPreview.eyebrow')}</div>
                        <h2 className="section-title">
                            {t('portfolioPreview.title')} <em>{t('portfolioPreview.titleEmphasis')}</em>
                        </h2>
                    </div>
                    <Link href="/portfolio" className={styles.seeAll}>
                        {t('portfolioPreview.seeAll')}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                </div>

                <div className={styles.grid}>
                    {projects.map((project, i) => (
                        <Link
                            href={`/portfolio/${project.slug}`}
                            key={project.id || i}
                            className={`${styles.card} ${styles[project.size || 'small']}`}
                        >
                            <div className={styles.imageWrapper}>
                                {project.cover_image && (
                                    <Image
                                        src={project.cover_image}
                                        alt={project.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                            <div className={styles.overlay}>
                                <div className={styles.info}>
                                    <div className={styles.cat}>{project.category}</div>
                                    <h3 className={styles.name}>{project.title}</h3>
                                    <div className={styles.loc}>{project.location}</div>
                                </div>
                                <div className={styles.arrow}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioPreview;

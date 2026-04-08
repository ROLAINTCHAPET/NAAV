"use client";

import Link from 'next/link';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage(); // ✅ correction

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            NA<span>AV</span>
                        </div>
                        <p className={styles.tagline}>
                            {t('footer.philosophy')}
                        </p>
                        <div className={styles.socials}>
                            {['instagram', 'linkedin', 'facebook'].map(social => (
                                <a key={social} href="#" className={styles.socialLink} aria-label={social}>
                                    <span className={styles.socialDot}></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.col}>
                            <h4>Navigation</h4>
                            <ul>
                                <li><Link href="/">{t('nav.home')}</Link></li>
                                <li><Link href="/portfolio">{t('nav.portfolio')}</Link></li>
                                <li><Link href="/a-propos">{t('nav.about')}</Link></li>
                                <li><Link href="/services">{t('nav.services')}</Link></li>
                                <li><Link href="/contact">{t('nav.contact')}</Link></li>
                            </ul>
                        </div>

                        <div className={styles.col}>
                            <h4>Expertise</h4>
                            <ul>
                                <li><Link href="/services#conception">Conception</Link></li>
                                <li><Link href="/services#interieur">Design Intérieur</Link></li>
                                <li><Link href="/services#visualisation">Visualisation 3D</Link></li>
                                <li><Link href="/services#conseil">Conseil</Link></li>
                            </ul>
                        </div>

                        <div className={styles.col}>
                            <h4>Contact</h4>
                            <ul>
                                <li>contact@naav-architecture.com</li>
                                <li>+237 680590758</li>
                                <li>Yaoundé, Cameroun</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copy}>
                        © {new Date().getFullYear()} New African Architecture Vision. {t('footer.rights')}
                    </div>
                    <div className={styles.legal}>
                        <Link href="/mentions-legales">Mentions Légales</Link>
                        <Link href="/confidentialite">Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
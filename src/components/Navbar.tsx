'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import ThemeToggle from './ui/ThemeToggle';
import LanguageToggle from './ui/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const [clickCount, setClickCount] = useState(0);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogoClick = (e: React.MouseEvent) => {
        const newCount = clickCount + 1;
        setClickCount(newCount);

        if ((window as any).clickTimer) clearTimeout((window as any).clickTimer);
        (window as any).clickTimer = setTimeout(() => {
            setClickCount(0);
            delete (window as any).clickTimer;
        }, 2000);

        if (newCount >= 3) {
            e.preventDefault();
            router.push('/nx72-naav/login');
        }
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                <Link
                    href="/"
                    className={styles.logo}
                    onClick={handleLogoClick}
                >
                    NA<span>AV</span>
                </Link>

                <div className={styles.navLinks}>
                    <Link href="/">{t('nav.home')}</Link>
                    <Link href="/portfolio">{t('nav.portfolio')}</Link>
                    <Link href="/a-propos">{t('nav.about')}</Link>
                    <Link href="/services">{t('nav.services')}</Link>
                    <Link href="/contact" className={styles.cta}>{t('nav.contact')}</Link>
                    <div className={styles.desktopControls}>
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </div>

                <div className={styles.mobileActions}>
                    <LanguageToggle />
                    <ThemeToggle />
                    <button
                        className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.open : ''}`}>
                <div className={styles.mobileNavHeader}>
                    <div className={styles.logo}>NA<span>AV</span></div>
                </div>
                <div className={styles.mobileNavLinks}>
                    {[
                        { href: '/', key: 'nav.home' },
                        { href: '/portfolio', key: 'nav.portfolio' },
                        { href: '/a-propos', key: 'nav.about' },
                        { href: '/services', key: 'nav.services' },
                        { href: '/contact', key: 'nav.contact', isCta: true }
                    ].map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                            className={link.isCta ? styles.mobileCta : ''}
                        >
                            {t(link.key)}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

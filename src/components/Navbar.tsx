'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import ThemeToggle from './ui/ThemeToggle';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const [clickCount, setClickCount] = useState(0);

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
                    <Link href="/">Accueil</Link>
                    <Link href="/portfolio">Portfolio</Link>
                    <Link href="/a-propos">À Propos</Link>
                    <Link href="/services">Services</Link>
                    <Link href="/contact" className={styles.cta}>Contact</Link>
                    <div className={styles.desktopToggle}>
                        <ThemeToggle />
                    </div>
                </div>

                <div className={styles.mobileActions}>
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
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
                <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
                <Link href="/a-propos" onClick={() => setMobileMenuOpen(false)}>À Propos</Link>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;

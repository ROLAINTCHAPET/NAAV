import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            NA<span>AV</span>
                        </div>
                        <p className={styles.tagline}>
                            Redéfinir l&apos;architecture africaine à travers l&apos;innovation, le respect de l&apos;héritage et l&apos;excellence durable.
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
                                <li><Link href="/">Accueil</Link></li>
                                <li><Link href="/portfolio">Portfolio</Link></li>
                                <li><Link href="/blog">Blog</Link></li>
                                <li><Link href="/temoignages">Témoignages</Link></li>
                                <li><Link href="/a-propos">À Propos</Link></li>
                                <li><Link href="/services">Services</Link></li>
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
                        © {new Date().getFullYear()} New African Architecture Vision. Tous droits réservés.
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

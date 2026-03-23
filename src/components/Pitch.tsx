import Image from 'next/image';
import styles from './Pitch.module.css';

const Pitch = () => {
    return (
        <section className={styles.pitch}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.visual}>
                        <Image
                            src="/images/projects/project2.png"
                            alt="Vision Architecture"
                            fill
                            className={styles.image}
                        />
                        <div className={styles.badge}>
                            <div className={styles.badgeIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.87L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            </div>
                            <div className={styles.badgeText}>
                                <strong>Standard d&apos;Excellence</strong>
                                Reconnu internationalement
                            </div>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className="section-eyebrow">Notre Vision</div>
                        <h2 className="section-title">
                            Redéfinir le paysage urbain <em>Africain</em>
                        </h2>
                        <div className={styles.quote}>
                            &quot;L&apos;architecture n&apos;est pas seulement une question d&apos;espace, c&apos;est une question de temps, de culture et d&apos;identité.&quot;
                        </div>
                        <p className={styles.desc}>
                            Chez New African Architecture Vision (NAAV), nous fusionnons modernité et héritage. Nos projets ne sont pas de simples bâtiments, mais des écosystèmes conçus pour durer et inspirer. Nous transformons les contraintes en opportunités architecturales uniques.
                        </p>
                        <div className={styles.tags}>
                            <span className={styles.tag}>Modernité</span>
                            <span className={styles.tag}>Héritage</span>
                            <span className={styles.tag}>Durabilité</span>
                            <span className={styles.tag}>Innovation</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pitch;

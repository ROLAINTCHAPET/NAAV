import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBg}></div>
            <div className={styles.heroOverlay}></div>

            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.eyebrow}>New African Architecture Vision</div>
                    <h1 className={styles.title}>
                        L&apos;Architecture de <em>Demain</em> <br />
                        Inspirée par l&apos;Afrique
                    </h1>
                    <div className={styles.actions}>
                        <a href="/portfolio" className="btn-primary">
                            Explorer le Portfolio
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                        <a href="/contact" className="btn-outline">
                            Nous Contacter
                        </a>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <div className={styles.statNum}>15+</div>
                            <div className={styles.statLabel}>Pays d&apos;intervention</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statNum}>120+</div>
                            <div className={styles.statLabel}>Projets Livrés</div>
                        </div>
                    </div>

                    <div className={styles.scroll}>
                        <span>Découvrir</span>
                        <div className={styles.scrollLine}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

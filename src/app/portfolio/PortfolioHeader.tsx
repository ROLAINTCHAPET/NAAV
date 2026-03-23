import styles from './Portfolio.module.css';

const PortfolioHeader = () => {
    return (
        <section className={styles.header}>
            <div className={styles.container}>
                <div className="section-eyebrow">Nos Réalisations</div>
                <h1 className={styles.title}>
                    Un Portfolio d&apos;<em>Excellence</em>
                </h1>
                <p className={styles.subtitle}>
                    Découvrez comment nous redéfinissons l&apos;architecture africaine à travers des projets innovants, durables et ancrés dans leur contexte.
                </p>
            </div>
        </section>
    );
};

export default PortfolioHeader;

import Image from 'next/image';
import styles from './About.module.css';

export default function AboutPage() {
    return (
        <div className={styles.wrapper}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className="section-eyebrow">Notre Histoire</div>
                    <h1 className="section-title">Une Vision pour l&apos;Architecture <em>Africaine</em></h1>
                    <p className={styles.heroLead}>
                        Fondé avec l&apos;ambition de redéfinir le paysage urbain du continent, NAAV fusionne l&apos;héritage culturel riche de l&apos;Afrique avec les technologies de pointe du 21ème siècle.
                    </p>
                </div>
            </section>

            {/* Philosophy */}
            <section className={styles.philosophy}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        <div className={styles.content}>
                            <h2 className={styles.heading}>Notre Philosophie</h2>
                            <p>
                                Pour nous, l&apos;architecture dépasse la simple construction. C&apos;est un dialogue entre le passé, le présent et le futur. Nous croyons en une architecture qui respire, qui respecte son environnement et qui inspire les générations futures.
                            </p>
                            <div className={styles.values}>
                                <div className={styles.valueItem}>
                                    <span>01.</span>
                                    <div>
                                        <h4>Excellence</h4>
                                        <p>Un standard de qualité sans compromis dans chaque détail.</p>
                                    </div>
                                </div>
                                <div className={styles.valueItem}>
                                    <span>02.</span>
                                    <div>
                                        <h4>Innovation</h4>
                                        <p>L&apos;usage de la VR et du BIM pour une précision absolue.</p>
                                    </div>
                                </div>
                                <div className={styles.valueItem}>
                                    <span>03.</span>
                                    <div>
                                        <h4>Héritage</h4>
                                        <p>Récupérer les codes ancestraux pour les magnifier demain.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.visual}>
                            <div className={styles.imagePlaceholder}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className={styles.mission}>
                <div className={styles.container}>
                    <div className={styles.missionCard}>
                        <h2 className={styles.missionTitle}>"L&apos;architecture est le témoin silencieux de notre culture et l&apos;outil le plus puissant pour façonner notre futur."</h2>
                        <span className={styles.author}>— Direction Créative NAAV</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

import styles from './Services.module.css';

const servicesList = [
    {
        num: '01',
        name: 'Conception Architecturale',
        desc: 'Des résidences de luxe aux complexes commerciaux, nous créons des espaces iconiques.'
    },
    {
        num: '02',
        name: 'Design d’Intérieur',
        desc: 'Un aménagement intérieur harmonieux qui allie esthétique moderne et confort absolu.'
    },
    {
        num: '03',
        name: 'Visualisation 3D',
        desc: 'Des rendus photoréalistes et des visites virtuelles pour donner vie à vos projets.'
    },
    {
        num: '04',
        name: 'Conseil & Stratégie',
        desc: 'Accompagnement complet dans le développement urbain et la viabilité des projets.'
    }
];

const Services = () => {
    return (
        <section className={styles.services}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className="section-eyebrow">Nos Services</div>
                        <h2 className="section-title">
                            Une Expertise <em>Pluridisciplinaire</em>
                        </h2>
                    </div>
                    <p className={styles.headerDesc}>
                        Nous offrons une gamme complète de services pour transformer votre vision en réalité construite.
                    </p>
                </div>

                <div className={styles.grid}>
                    {servicesList.map((service, i) => (
                        <div key={i} className={styles.card}>
                            <div className={styles.num}>{service.num}</div>
                            <h3 className={styles.name}>{service.name}</h3>
                            <p className={styles.desc}>{service.desc}</p>
                            <div className={styles.line}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

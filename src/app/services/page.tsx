import styles from './Services.module.css';

const expertiseList = [
  {
    title: "Conception Architecturale",
    desc: "De l'esquisse à l'exécution, nous concevons des structures qui redéfinissent l'esthétique contemporaine africaine.",
    features: ["Résidences de prestige", "Complexes hôteliers", "Bâtiments institutionnels"]
  },
  {
    title: "Design d'Intérieur",
    desc: "Nous créons des espaces intérieurs harmonieux, mêlant luxe moderne et artisanat local raffiné.",
    features: ["Aménagement d'espaces", "Curations artistiques", "Mobilier sur mesure"]
  },
  {
    title: "Visualisation 3D & VR",
    desc: "Une immersion totale dans vos futurs projets grâce à des rendus photoréalistes et des visites virtuelles.",
    features: ["Rendus HD", "Animations 3D", "Expériences VR"]
  },
  {
    title: "Urbanisme & Conseil",
    desc: "Développement de stratégies urbaines durables et planification de quartiers intelligents.",
    features: ["Masterplanning", "Analyse d'impact", "Régénération urbaine"]
  }
];

const processSteps = [
  { step: "01", title: "Diagnostic & Vision", desc: "Analyse du site, compréhension de vos besoins et définition du concept architectural initial." },
  { step: "02", title: "Esquisses & Modélisation", desc: "Développement des premières formes et visualisation 3D pour valider la direction artistique." },
  { step: "03", title: "Développement Technique", desc: "Plans détaillés, choix des matériaux et intégration des solutions durables." },
  { step: "04", title: "Suivi & Réalisation", desc: "Accompagnement rigoureux durant toute la phase de construction pour garantir l'excellence." }
];

export default function ServicesPage() {
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className="section-eyebrow">Notre Expertise</div>
          <h1 className="section-title">Des Services sur <em>Mesure</em></h1>
          <p className={styles.heroLead}>
            NAAV offre un accompagnement complet, de la conception initiale à la livraison finale, garantissant une cohérence esthétique et technique absolue.
          </p>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className={styles.expertise}>
        <div className={styles.container}>
          <div className={styles.expertiseGrid}>
            {expertiseList.map((item, idx) => (
              <div key={idx} className={styles.expertiseCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>{(idx + 1).toString().padStart(2, '0')}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p className={styles.cardDesc}>{item.desc}</p>
                <ul className={styles.featureList}>
                  {item.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.processHeader}>
            <div className="section-eyebrow">Méthodologie</div>
            <h2 className="section-title">Notre Processus de <em>Création</em></h2>
          </div>
          
          <div className={styles.processGrid}>
            {processSteps.map((item, idx) => (
              <div key={idx} className={styles.processItem}>
                <div className={styles.stepCircle}>{item.step}</div>
                <div className={styles.stepContent}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                {idx < processSteps.length - 1 && <div className={styles.stepLine}></div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

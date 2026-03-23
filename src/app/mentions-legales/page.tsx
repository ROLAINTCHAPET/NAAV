import styles from './MentionsLegales.module.css';

export default function MentionsLegalesPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Mentions Légales</h1>
                <p className={styles.lastUpdate}>Dernière mise à jour : 21 Mars 2026</p>

                <section className={styles.section}>
                    <h2>1. Éditeur du site</h2>
                    <p>
                        Le site <strong>NAAV - New African Architecture Vision</strong> est édité par :<br />
                        Société NAAV Architecture S.A.R.L.<br />
                        Siège social : [Adresse à Dakar, Sénégal]<br />
                        Immatriculée au RCCM : [Numéro]<br />
                        Directeur de la publication : [Nom du Directeur]
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Hébergement</h2>
                    <p>
                        Le site est hébergé par :<br />
                        Vercel Inc.<br />
                        440 N Barranca Ave #4133<br />
                        Covina, CA 91723<br />
                        États-Unis
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>3. Propriété Intellectuelle</h2>
                    <p>
                        L&apos;ensemble de ce site relève de la législation internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>4. Données Personnelles</h2>
                    <p>
                        Conformément à la réglementation sur la protection des données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant. Vous pouvez exercer ce droit en nous contactant via le formulaire de contact du site.
                    </p>
                </section>
            </div>
        </div>
    );
}

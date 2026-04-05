import Image from 'next/image';
import styles from './Partners.module.css';

const partners = [
    { name: 'Amani Architects', logo: '/images/partners/amani.png' },
    { name: 'Horizon Design', logo: '/images/partners/horizon.png' },
    { name: 'Urban Studio', logo: '/images/partners/urban.png' },
    { name: 'Terra Collective', logo: '/images/partners/terra.png' }
];

const Partners = () => {
    return (
        <section className={styles.partners}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className="section-eyebrow">Collaboration</span>
                    <h2 className={styles.title}>Partenaires de Confiance</h2>
                </div>

                <div className={styles.logosGrid}>
                    {/* Using the generated image as a placeholder for now */}
                    <div className={styles.logosWrapper}>
                        <Image
                            src="/images/partners/all-partners.png"
                            alt="Nos Partenaires"
                            width={1000}
                            height={250}
                            className={styles.allLogos}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;

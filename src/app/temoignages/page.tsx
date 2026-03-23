import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from './Testimonials.module.css';

export const revalidate = 3600;

async function getTestimonials() {
    const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'publie')
        .order('created_at', { ascending: false });
    return data || [];
}

export default async function TestimonialsPage() {
    const testimonials = await getTestimonials();

    return (
        <div className={styles.wrapper}>
            <header className={styles.hero}>
                <div className={styles.container}>
                    <div className="section-eyebrow">La Voix de nos Clients</div>
                    <h1 className={styles.title}>Confiance & Excellence</h1>
                    <p className={styles.lead}>Découvrez les retours de ceux qui nous ont confié leurs visions architecturales les plus ambitieuses.</p>
                </div>
            </header>

            <section className={styles.gridSection}>
                <div className={styles.container}>
                    {testimonials.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Nos clients s&apos;exprimeront ici très bientôt.</p>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {testimonials.map((t) => (
                                <div key={t.id} className={styles.card}>
                                    <div className={styles.quote}>&ldquo;</div>
                                    <p className={styles.text}>{t.content}</p>
                                    <div className={styles.author}>
                                        {t.photo && (
                                            <div className={styles.avatar}>
                                                <Image src={t.photo} alt={t.client_name} width={50} height={50} />
                                            </div>
                                        )}
                                        <div className={styles.info}>
                                            <span className={styles.name}>{t.client_name}</span>
                                            <span className={styles.company}>{t.company}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

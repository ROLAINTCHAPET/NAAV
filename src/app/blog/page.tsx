import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from './Blog.module.css';

export const revalidate = 3600; // Refresh once per hour

async function getArticles() {
    const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'publie')
        .order('published_at', { ascending: false });
    return data || [];
}

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <div className={styles.wrapper}>
            <header className={styles.hero}>
                <div className={styles.container}>
                    <div className="section-eyebrow">Insights & Visions</div>
                    <h1 className={styles.title}>Le Blog de NAAV</h1>
                    <p className={styles.lead}>Exploration des tendances architecturales et récits de nos dernières réalisations en Afrique.</p>
                </div>
            </header>

            <section className={styles.blogGrid}>
                <div className={styles.container}>
                    {articles.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Aucun article publié pour le moment. Revenez bientôt !</p>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {articles.map((article) => (
                                <Link href={`/blog/${article.slug}`} key={article.id} className={styles.articleCard}>
                                    <div className={styles.imageWrapper}>
                                        {article.cover_image && (
                                            <Image
                                                src={article.cover_image}
                                                alt={article.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )}
                                        <div className={styles.date}>
                                            {new Date(article.published_at).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className={styles.content}>
                                        <h2 className={styles.articleTitle}>{article.title}</h2>
                                        <p className={styles.excerpt}>
                                            {article.content.substring(0, 120).replace(/<[^>]*>?/gm, '')}...
                                        </p>
                                        <span className={styles.readMore}>Lire la suite →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './BlogDetail.module.css';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const { data } = await supabase.from('articles').select('slug').eq('status', 'publie');
    return data?.map((article) => ({ slug: article.slug })) || [];
}

async function getArticle(slug: string) {
    const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();
    return data;
}

export default async function ArticleDetailPage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <article className={styles.article}>
            <header className={styles.hero}>
                <div className={styles.container}>
                    <Link href="/blog" className={styles.backBtn}>← Retour au blog</Link>
                    <div className={styles.meta}>
                        Publié le {new Date(article.published_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h1 className={styles.title}>{article.title}</h1>
                </div>
            </header>

            {article.cover_image && (
                <div className={styles.coverWrapper}>
                    <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            )}

            <div className={styles.container}>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content }} />

                <footer className={styles.footer}>
                    <div className={styles.share}>
                        <span>Partager cet article</span>
                        <div className={styles.socials}>
                            {/* Placeholders for social share buttons */}
                            <div className={styles.socialIcon}>IN</div>
                            <div className={styles.socialIcon}>FB</div>
                            <div className={styles.socialIcon}>TW</div>
                        </div>
                    </div>
                </footer>
            </div>
        </article>
    );
}

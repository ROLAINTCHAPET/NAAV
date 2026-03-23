import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import styles from '../projects/Projects.module.css'; // Reusing table styles

export const revalidate = 0;

async function getArticles() {
    const { data } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });
    return data || [];
}

export default async function AdminBlogPage() {
    const articles = await getArticles();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Gestion du Blog</h1>
                    <p>Publiez des articles sur l&apos;actualité et les tendances de NAAV.</p>
                </div>
                <Link href="/admin/blog/new" className="btn-primary">
                    <Plus size={18} /> Nouvel Article
                </Link>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Couverture</th>
                            <th>Titre</th>
                            <th>Date</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                                    Aucun article pour le moment.
                                </td>
                            </tr>
                        ) : (
                            articles.map((article) => (
                                <tr key={article.id}>
                                    <td>
                                        <div className={styles.thumb}>
                                            {article.cover_image ? (
                                                <img src={article.cover_image} alt="" />
                                            ) : (
                                                <FileText size={20} />
                                            )}
                                        </div>
                                    </td>
                                    <td className={styles.titleCell}>
                                        <strong>{article.title}</strong>
                                        <span>/{article.slug}</span>
                                    </td>
                                    <td>{new Date(article.published_at).toLocaleDateString('fr-FR')}</td>
                                    <td>
                                        <span className={`${styles.status} ${article.status === 'brouillon' ? styles.draft : styles.published}`}>
                                            {article.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/blog/${article.id}`} className={styles.editBtn}>
                                                <Edit size={16} />
                                            </Link>
                                            <button className={styles.deleteBtn}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

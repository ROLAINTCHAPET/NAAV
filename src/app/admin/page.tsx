'use client';

import Link from 'next/link';
import {
    Briefcase,
    FileText,
    Users,
    MessageSquare,
    LayoutDashboard,
    PlusCircle,
    ExternalLink,
    LogOut,
    FolderKanban,
    PenTool
} from 'lucide-react';
import styles from './Admin.module.css';

export default function AdminDashboard() {
    // Statics or fetch counts here if needed
    const counts = {
        projects: 12,
        articles: 4,
        team: 8,
        testimonials: 6
    };

    return (
        <>
            <header className={styles.header}>
                <div>
                    <h1>Tableau de Bord</h1>
                    <p>Bienvenue dans votre espace de gestion NAAV.</p>
                </div>
            </header>

            <div className={styles.grid}>
                {/* Projects Card */}
                <div className={styles.card}>
                    <div className={styles.cardIcon}><FolderKanban size={24} /></div>
                    <div className={styles.cardCount}>{counts.projects}</div>
                    <div className={styles.cardTitle}>Projets Réalisés</div>
                    <div className={styles.cardActions}>
                        <Link href="/admin/projects/new" className={styles.addBtn}>+ Nouveau</Link>
                        <Link href="/admin/projects" className={styles.manageBtn}>Gérer</Link>
                    </div>
                </div>

                {/* Blog Card */}
                <div className={styles.card}>
                    <div className={styles.cardIcon}><PenTool size={24} /></div>
                    <div className={styles.cardCount}>{counts.articles}</div>
                    <div className={styles.cardTitle}>Articles de Blog</div>
                    <div className={styles.cardActions}>
                        <Link href="/admin/blog/new" className={styles.addBtn}>+ Rédiger</Link>
                        <Link href="/admin/blog" className={styles.manageBtn}>Gérer</Link>
                    </div>
                </div>

                {/* Team Card */}
                <div className={styles.card}>
                    <div className={styles.cardIcon}><Users size={24} /></div>
                    <div className={styles.cardCount}>{counts.team}</div>
                    <div className={styles.cardTitle}>Membres d&apos;Équipe</div>
                    <div className={styles.cardActions}>
                        <Link href="/admin/team/new" className={styles.addBtn}>+ Ajouter</Link>
                        <Link href="/admin/team" className={styles.manageBtn}>Gérer</Link>
                    </div>
                </div>

                {/* Testimonials Card */}
                <div className={styles.card}>
                    <div className={styles.cardIcon}><MessageSquare size={24} /></div>
                    <div className={styles.cardCount}>{counts.testimonials}</div>
                    <div className={styles.cardTitle}>Témoignages Clients</div>
                    <div className={styles.cardActions}>
                        <Link href="/admin/testimonials/new" className={styles.addBtn}>+ Nouveau</Link>
                        <Link href="/admin/testimonials" className={styles.manageBtn}>Gérer</Link>
                    </div>
                </div>
            </div>

            <section className={styles.recentSection}>
                <h2>Gestion rapide</h2>
                <div className={styles.placeholderTable}>
                    Utilisez les cartes ci-dessus pour naviguer dans les modules de gestion.
                </div>
            </section>
        </>
    );
}

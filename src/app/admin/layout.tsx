'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    PenTool,
    MessageSquare,
    Home,
    LogOut
} from 'lucide-react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import styles from './Admin.module.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    return (
        <div className={styles.wrapper}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    NA<span>AV</span> Admin
                </div>

                <nav className={styles.sideNav}>
                    <Link href="/admin" className={pathname === '/admin' ? styles.active : ''}>
                        <LayoutDashboard size={20} />
                        <span>Vue d'ensemble</span>
                    </Link>
                    <Link href="/admin/projects" className={pathname.startsWith('/admin/projects') ? styles.active : ''}>
                        <FolderKanban size={20} />
                        <span>Projets</span>
                    </Link>
                    <Link href="/admin/blog" className={pathname.startsWith('/admin/blog') ? styles.active : ''}>
                        <PenTool size={20} />
                        <span>Actualités</span>
                    </Link>
                    <Link href="/admin/team" className={pathname.startsWith('/admin/team') ? styles.active : ''}>
                        <Users size={20} />
                        <span>Équipe</span>
                    </Link>
                    <Link href="/admin/testimonials" className={pathname.startsWith('/admin/testimonials') ? styles.active : ''}>
                        <MessageSquare size={20} />
                        <span>Témoignages</span>
                    </Link>
                </nav>

                <div className={styles.bottomLinks}>
                    <Link href="/" className={styles.siteLink}>
                        <Home size={18} />
                        <span>Voir le site</span>
                    </Link>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <LogOut size={18} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}

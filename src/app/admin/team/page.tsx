import Link from 'next/link';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import styles from '../projects/Projects.module.css';

export const revalidate = 0;

async function getTeam() {
    const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });
    return data || [];
}

export default async function AdminTeamPage() {
    const members = await getTeam();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Gestion de l&apos;Équipe</h1>
                    <p>Gérez les membres qui composent l&apos;excellence de NAAV.</p>
                </div>
                <Link href="/admin/team/new" className="btn-primary">
                    <Plus size={18} /> Nouveau Membre
                </Link>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Nom complet</th>
                            <th>Poste</th>
                            <th>Ordre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                                    Aucun membre enregistré.
                                </td>
                            </tr>
                        ) : (
                            members.map((member) => (
                                <tr key={member.id}>
                                    <td>
                                        <div className={styles.thumb} style={{ borderRadius: '50%' }}>
                                            {member.photo ? (
                                                <img src={member.photo} alt="" />
                                            ) : (
                                                <Users size={20} />
                                            )}
                                        </div>
                                    </td>
                                    <td><strong>{member.full_name}</strong></td>
                                    <td>{member.role}</td>
                                    <td>{member.display_order}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/team/${member.id}`} className={styles.editBtn}>
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

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { createPartner } from '../actions';
import styles from '../../projects/Projects.module.css';

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--color-input-bg, rgba(255,255,255,0.05))',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-cream)',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    color: 'var(--color-muted)',
    marginBottom: '8px',
    textTransform: 'uppercase',
};

const groupStyle: React.CSSProperties = {
    marginBottom: '24px',
};

export default function NewPartnerPage() {
    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        setError('');
        try {
            const formData = new FormData(e.currentTarget);
            await createPartner(formData);
            setStatus('success');
            setTimeout(() => router.push('/admin/partners'), 1200);
        } catch (err: any) {
            setStatus('error');
            setError(err.message || 'Erreur lors de la création');
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <Link href="/admin/partners" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-muted)', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '12px' }}>
                        <ArrowLeft size={14} /> Retour aux partenaires
                    </Link>
                    <h1 className={styles.title}>Nouveau Partenaire</h1>
                    <p className={styles.subtitle}>Ajoutez un partenaire à afficher sur la page d&apos;accueil.</p>
                </div>
            </header>

            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', marginTop: '32px' }}>
                <div style={groupStyle}>
                    <label htmlFor="name" style={labelStyle}>Nom du partenaire *</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Ex: Horizon Design Group"
                        style={inputStyle}
                    />
                </div>

                <div style={groupStyle}>
                    <label htmlFor="logo_url" style={labelStyle}>URL du logo *</label>
                    <input
                        id="logo_url"
                        name="logo_url"
                        type="text"
                        required
                        placeholder="https://example.com/logo.png ou /images/partners/logo.png"
                        style={inputStyle}
                    />
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '6px' }}>
                        URL externe (https://) ou chemin local dans /public/images/partners/
                    </p>
                </div>

                <div style={groupStyle}>
                    <label htmlFor="website_url" style={labelStyle}>Site web du partenaire</label>
                    <input
                        id="website_url"
                        name="website_url"
                        type="url"
                        placeholder="https://partenaire.com"
                        style={inputStyle}
                    />
                </div>

                {status === 'error' && (
                    <div style={{ background: 'rgba(180,30,30,0.15)', border: '1px solid rgba(200,50,50,0.4)', borderRadius: '8px', padding: '12px', color: '#f87171', marginBottom: '20px' }}>
                        ❌ {error}
                    </div>
                )}
                {status === 'success' && (
                    <div style={{ background: 'rgba(30,180,80,0.1)', border: '1px solid rgba(50,180,80,0.4)', borderRadius: '8px', padding: '12px', color: '#4ade80', marginBottom: '20px' }}>
                        ✅ Partenaire créé ! Redirection en cours...
                    </div>
                )}

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                    <Link href="/admin/partners" style={{ padding: '10px 20px', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                        Annuler
                    </Link>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={styles.addBtn}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
                    >
                        <Save size={16} />
                        {status === 'loading' ? 'Enregistrement...' : 'Enregistrer le partenaire'}
                    </button>
                </div>
            </form>
        </div>
    );
}

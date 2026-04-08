"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from './Partners.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// Fallback partners if Supabase is not configured
const FALLBACK_PARTNERS = [
    { id: '1', name: 'Amani Architects', logo_url: '/images/partners/all-partners.png', website_url: '#', displayLogo: 'AMANI' },
    { id: '2', name: 'Horizon Design', logo_url: '/images/partners/all-partners.png', website_url: '#', displayLogo: 'HORIZON' },
    { id: '3', name: 'Urban Co.', logo_url: '/images/partners/all-partners.png', website_url: '#', displayLogo: 'URBAN CO.' },
    { id: '4', name: 'Terra Collective', logo_url: '/images/partners/all-partners.png', website_url: '#', displayLogo: 'TERRA' },
    { id: '5', name: 'Axis Group', logo_url: '/images/partners/all-partners.png', website_url: '#', displayLogo: 'AXIS GROUP' },
];

// SVG icons for each partner
const PARTNER_ICONS: Record<string, string> = {
    'AMANI': `<svg viewBox="0 0 80 50" fill="currentColor"><polygon points="40,5 70,45 10,45" fill="none" stroke="currentColor" stroke-width="3.5"/><line x1="40" y1="18" x2="40" y2="38" stroke="currentColor" stroke-width="2.5"/></svg>`,
    'HORIZON': `<svg viewBox="0 0 90 50" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="10" y1="20" x2="80" y2="20"/><line x1="5" y1="30" x2="85" y2="30"/><line x1="15" y1="40" x2="75" y2="40"/></svg>`,
    'URBAN CO.': `<svg viewBox="0 0 80 50" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="10" y="10" width="28" height="28"/><rect x="22" y="22" width="28" height="28"/></svg>`,
    'TERRA': `<svg viewBox="0 0 80 50" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M 10,40 Q 40,5 70,40"/><ellipse cx="40" cy="38" rx="18" ry="6" fill="currentColor" opacity="0.15"/></svg>`,
    'AXIS GROUP': `<svg viewBox="0 0 80 50" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="40" y1="5" x2="40" y2="45"/><line x1="10" y1="25" x2="70" y2="25"/><rect x="28" y="13" width="24" height="24" stroke-dasharray="4 2"/></svg>`,
};

interface Partner {
    id: string;
    name: string;
    logo_url: string;
    website_url?: string;
}

const PartnerCard = ({ partner }: { partner: Partner }) => {
    const icon = PARTNER_ICONS[partner.name.toUpperCase()];
    return (
        <a
            href={partner.website_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.partnerCard}
            title={partner.name}
        >
            {icon ? (
                <span className={styles.iconWrapper} dangerouslySetInnerHTML={{ __html: icon }} />
            ) : (
                <Image
                    src={partner.logo_url}
                    alt={partner.name}
                    width={120}
                    height={40}
                    className={styles.logoImg}
                    unoptimized
                />
            )}
            <span className={styles.partnerName}>{partner.name}</span>
        </a>
    );
};

const Partners = () => {
    const { t } = useLanguage();
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        const fetchPartners = async () => {
            if (!supabase) {
                setPartners(FALLBACK_PARTNERS);
                return;
            }
            const { data } = await supabase
                .from('partners')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: true });
            setPartners(data && data.length > 0 ? data : FALLBACK_PARTNERS);
        };
        fetchPartners();
    }, []);

    // Duplicate for seamless loop
    const marqueeItems = [...partners, ...partners];

    return (
        <section className={styles.partners}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className="section-eyebrow">{t('partners.eyebrow') || 'Nos Partenaires'}</span>
                    <h2 className={styles.title}>{t('partners.title') || 'Partenaires de Confiance'}</h2>
                </div>
            </div>

            <div className={styles.marqueeWrapper}>
                <div className={styles.marqueeTrack}>
                    {marqueeItems.map((partner, i) => (
                        <PartnerCard key={`${partner.id}-${i}`} partner={partner} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;

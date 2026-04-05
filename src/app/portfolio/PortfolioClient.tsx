'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Loader2 } from 'lucide-react';
import { projects as mockProjects, Project } from '@/data/projects';
import { getProjects } from '@/lib/supabase';
import styles from './Portfolio.module.css';

const categories = ['Tous', 'Résidentiel', 'Commercial', 'Intérieur', 'Architecture paysagère', 'Autres'];

const PortfolioClient = () => {
    const [allProjects, setAllProjects] = useState<Project[]>(mockProjects);
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            setLoading(true);
            try {
                const supabaseProjects = await getProjects();
                if (supabaseProjects && supabaseProjects.length > 0) {
                    // Combine Supabase projects with mock projects, avoiding duplicates by slug
                    const combined = [...supabaseProjects];

                    mockProjects.forEach(mock => {
                        if (!combined.some(p => p.slug === mock.slug)) {
                            combined.push(mock);
                        }
                    });

                    setAllProjects(combined as any);
                }
            } catch (error) {
                console.error('Error fetching dynamic projects:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    const filteredProjects = allProjects.filter(p => {
        const matchesCategory = activeCategory === 'Tous' || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const displayedProjects = filteredProjects.slice(0, visibleCount);

    return (
        <section className={styles.portfolioSection}>
            <div className={styles.container}>
                {/* Search & Filters */}
                <div className={styles.controls}>
                    <div className={styles.searchBox}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher un projet..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setVisibleCount(6);
                            }}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.filterBar}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setVisibleCount(6);
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading && (
                    <div className={styles.loader}>
                        <Loader2 className="animate-spin" size={40} />
                        <p>Chargement des projets...</p>
                    </div>
                )}

                {/* Grid */}
                <div className={`${styles.grid} ${loading ? styles.fadeOut : ''}`}>
                    {displayedProjects.map((project) => (
                        <Link key={project.id} href={`/portfolio/${project.slug}`} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={project.image || '/images/projects/project1.png'}
                                    alt={project.title}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className={styles.overlay}>
                                    <div className={styles.viewLabel}>Voir le projet</div>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.category}>{project.category}</span>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.location}>{project.location}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                {visibleCount < filteredProjects.length && (
                    <div className={styles.loadMoreContainer}>
                        <button
                            className="btn-outline"
                            onClick={() => setVisibleCount(prev => prev + 6)}
                        >
                            Charger plus de projets
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PortfolioClient;

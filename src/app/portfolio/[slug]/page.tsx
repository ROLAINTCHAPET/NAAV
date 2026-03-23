import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/supabase';
import { projects as mockProjects, Project } from '@/data/projects';
import Feedback from '@/components/Feedback';
import styles from './ProjectDetail.module.css';

interface Props {
    params: Promise<{ slug: string }>;
}

// Generate static params for better performance
export async function generateStaticParams() {
    const supabaseProjects = await getProjects();
    const slugs = supabaseProjects.length > 0
        ? supabaseProjects.map((p: Project) => ({ slug: p.slug }))
        : mockProjects.map((p: Project) => ({ slug: p.slug }));

    return slugs;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    let project = await getProjectBySlug(slug);

    if (!project) {
        project = mockProjects.find((p: Project) => p.slug === slug);
    }

    if (!project) return { title: 'Projet non trouvé | NAAV' };

    return {
        title: `${project.title} | Portfolio NAAV`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;

    // Try Supabase first
    let project = await getProjectBySlug(slug);

    // Fallback to mocks
    if (!project) {
        project = mockProjects.find((p) => p.slug === slug) as any;
    }

    if (!project) {
        notFound();
    }

    return (
        <div className={styles.wrapper}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <Link href="/portfolio" className={styles.backBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Retour au Portfolio
                    </Link>
                    <div className={styles.headerInfo}>
                        <span className={styles.cat}>{project.category}</span>
                        <h1 className={styles.title}>{project.title}</h1>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className={styles.gallerySection}>
                <div className={styles.container}>
                    <div className={styles.mainGallery}>
                        {project.gallery && project.gallery.map((img: string, idx: number) => (
                            <div key={idx} className={styles.galleryItem}>
                                <Image
                                    src={img}
                                    alt={`${project.title} - Image ${idx + 1}`}
                                    width={1200}
                                    height={800}
                                    className={styles.galleryImg}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Section */}
            {project.video && (
                <section className={styles.videoSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionHeading}>Présentation Vidéo</h2>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src={project.video}
                                title={`${project.title} - Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>
            )}

            {/* Stats Bar */}
            <section className={styles.statsBar}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Localisation</span>
                            <span className={styles.statValue}>{project.location}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Année</span>
                            <span className={styles.statValue}>{project.year}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Superficie</span>
                            <span className={styles.statValue}>{project.area}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.contentGrid}>
                        <div className={styles.mainContent}>
                            <h2 className={styles.sectionHeading}>Aperçu du Projet</h2>
                            <p className={styles.projectDesc}>{project.description}</p>

                            <div className={styles.detailsBlock}>
                                <div className={styles.block}>
                                    <h3 className={styles.blockTitle}>Le Défi</h3>
                                    <p>{project.challenge}</p>
                                </div>
                                <div className={styles.block}>
                                    <h3 className={styles.blockTitle}>Notre Solution</h3>
                                    <p>{project.solution}</p>
                                </div>
                            </div>
                        </div>

                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarCard}>
                                <h3>Intéressé par un projet similaire ?</h3>
                                <p>Nos experts sont prêts à discuter de votre vision unique.</p>
                                <Link href="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
                                    Démarrer un Projet
                                </Link>
                            </div>
                        </aside>
                    </div>

                    <Feedback projectId={project.id} projectTitle={project.title} />
                </div>
            </section>

            {/* CTA Bottom */}
            <section className={styles.nextCta}>
                <div className={styles.container}>
                    <div className={styles.nextGrid}>
                        <div className="section-eyebrow">Réalisation Suivante</div>
                        <h2 className={styles.nextTitle}>Explorer d&apos;autres visions</h2>
                        <Link href="/portfolio" className="btn-outline">Voir tous les projets</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

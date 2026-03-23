export interface Project {
    id: string;
    slug: string;
    title: string;
    category: 'Résidentiel' | 'Commercial' | 'Intérieur' | 'Urbanisme' | 'Visualisation 3D';
    location: string;
    year: string;
    area: string;
    image: string; // Main image
    gallery: string[]; // Additional images
    video?: string; // Optional video URL
    plans?: string[]; // Architectural plans
    description: string;
    challenge: string;
    solution: string;
}

export const projects: Project[] = [
    {
        id: '1',
        slug: 'residence-terracotta',
        title: 'Résidence Terracotta',
        category: 'Résidentiel',
        location: 'Dakar, Sénégal',
        year: '2025',
        area: '450 m²',
        image: '/images/projects/project1.png',
        gallery: [
            '/images/projects/project1.png',
            '/images/projects/project2.png',
            '/images/projects/project3.png'
        ],
        description: 'Une villa de luxe alliant architecture moderne et matériaux locaux pour une régulation thermique naturelle.',
        challenge: 'Intégrer une esthétique ultra-moderne dans un environnement côtier tout en gérant l\'humidité et la chaleur.',
        solution: 'Utilisation de doubles parois en terre cuite et d\'une ventilation transversale optimisée.'
    },
    {
        id: '2',
        slug: 'business-hub-abidjan',
        title: 'Abidjan Business Hub',
        category: 'Commercial',
        location: 'Abidjan, Côte d’Ivoire',
        year: '2024',
        area: '12,500 m²',
        image: '/images/projects/project2.png',
        gallery: [
            '/images/projects/project2.png',
            '/images/projects/project1.png'
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        description: 'Complexe de bureaux innovant au cœur du quartier des affaires.',
        challenge: 'Maximiser l\'espace de travail tout en créant des zones de respiration verdoyantes en hauteur.',
        solution: 'Structure modulaire avec jardins suspendus et façade en verre à haute performance énergétique.'
    },
    {
        id: '3',
        slug: 'lounge-heritage',
        title: 'Lounge Héritage',
        category: 'Intérieur',
        location: 'Lagos, Nigeria',
        year: '2025',
        area: '180 m²',
        image: '/images/projects/project3.png',
        gallery: [
            '/images/projects/project3.png',
            '/images/projects/project2.png'
        ],
        description: 'Design d\'intérieur pour un lobby d\'hôtel de luxe célébrant l\'artisanat local.',
        challenge: 'Créer une atmosphère premium sans perdre l\'âme et l\'authenticité des matériaux traditionnels.',
        solution: 'Équilibre subtil entre mobilier contemporain minimaliste et textures artisanales riches.'
    },
    {
        id: '4',
        slug: 'eco-quartier-sahel',
        title: 'Éco-Quartier Sahel',
        category: 'Urbanisme',
        location: 'Bamako, Mali',
        year: '2026',
        area: '5 hectares',
        image: '/images/projects/project1.png',
        gallery: ['/images/projects/project1.png'],
        description: 'Planification urbaine d\'un quartier durable adapté au climat sahélien.',
        challenge: 'Gérer la densification urbaine tout en préservant les espaces verts et l\'accès à l\'eau.',
        solution: 'Conception basée sur des îlots de fraîcheur et une gestion circulaire des ressources.'
    },
    {
        id: '5',
        slug: 'arena-vision',
        title: 'Arena Vision 3D',
        category: 'Visualisation 3D',
        location: 'Conceptuel',
        year: '2026',
        area: 'N/A',
        image: '/images/projects/project2.png',
        gallery: ['/images/projects/project2.png'],
        description: 'Rendus photoréalistes pour un complexe sportif de nouvelle génération.',
        challenge: 'Traduire la complexité d\'une structure en maille dorée sous différents éclairages nocturnes.',
        solution: 'Mise en œuvre de techniques de ray-tracing avancées pour une immersion totale.'
    }
];

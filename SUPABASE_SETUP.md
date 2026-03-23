# Configuration du Site NAAV (Next.js 14 + Supabase)

# 1. Base de données : Exécuter ce SQL dans l'éditeur SQL de Supabase

-- Tables
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  long_description TEXT,
  category TEXT,
  area TEXT,
  year TEXT,
  location TEXT,
  cover_image TEXT,
  images TEXT[],
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'publie',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  cover_image TEXT,
  tags TEXT[],
  published_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'publie',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo TEXT,
  linkedin TEXT,
  instagram TEXT,
  display_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'actif'
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  company TEXT,
  content TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  photo TEXT,
  status TEXT DEFAULT 'publie',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sécurité RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour tous
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);

-- Écriture réservée aux authentifiés (Admin)
CREATE POLICY "Admin write access" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access" ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

# 2. Stockage : Créer le Bucket de Médias

1. Dans le tableau de bord Supabase, allez dans **Storage**.
2. Cliquez sur **"New Bucket"**.
3. Nommez-le obligatoirement **`media`**.
4. Rendez-le **Public** (pour que les images soient visibles sur le site).
5. (Optionnel) Créez un dossier nommé `projects` à l'intérieur pour mieux organiser vos fichiers.

# 3. Migration .env.local

Ajouter les clés suivantes à votre fichier .env.local :
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme
RESEND_API_KEY=votre_cle_resend
ADMIN_EMAIL=votre_email_admin

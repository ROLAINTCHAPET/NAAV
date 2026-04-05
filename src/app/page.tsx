import Hero from "@/components/Hero";
import Pitch from "@/components/Pitch";
import Services from "@/components/Services";
import PortfolioPreview from "@/components/PortfolioPreview";
import { getProjects } from "@/lib/supabase";
import { projects as mockProjects } from "@/data/projects";
import Partners from "@/components/Partners";

export const revalidate = 60; // Dynamic revalidation every minute

export default async function Home() {
  const supabaseProjects = await getProjects();

  // Use featured projects from Supabase or top 3 from mocks
  const featured = supabaseProjects.length > 0
    ? supabaseProjects.filter((p: any) => p.featured).slice(0, 3)
    : mockProjects.slice(0, 3);

  return (
    <>
      <Hero />
      <Pitch />
      <PortfolioPreview projects={featured} />
      <Services />
      <Partners />

      {/* CTA Section */}
      <section style={{
        padding: '120px 5%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #100d05 0%, #1a1206 40%, #0d100a 100%)',
        position: 'relative'
      }}>
        <h2 className="section-title" style={{ color: '#f5f0e8' }}>Prêt à donner vie à votre <em>Projet</em> ?</h2>
        <p style={{ color: '#a0a0a0', maxWidth: '500px', margin: '0 auto 40px', lineHeight: '1.8' }}>
          Contactez notre équipe d&apos;experts pour une consultation personnalisée et commencez votre voyage architectural dès aujourd&apos;hui.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/contact" className="btn-primary">Démarrer un Projet</a>
          <a href="/services" className="btn-outline" style={{ color: '#f5f0e8', borderColor: 'rgba(201,168,76,0.35)' }}>Nos Services</a>
        </div>
      </section>
    </>
  );
}

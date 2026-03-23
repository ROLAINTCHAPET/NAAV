import PortfolioHeader from './PortfolioHeader';
import PortfolioClient from './PortfolioClient';

export const metadata = {
    title: "Portfolio — NAAV",
    description: "Découvrez nos réalisations architecturales à travers l'Afrique : luxe résidentiel, complexe commerciaux et urbanisme durable.",
};

export default function PortfolioPage() {
    return (
        <div className="portfolioWrapper">
            <PortfolioHeader />
            <PortfolioClient />
        </div>
    );
}

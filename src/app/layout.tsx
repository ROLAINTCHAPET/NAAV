import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecretGateway from "@/components/admin/SecretGateway";

export const metadata: Metadata = {
  title: "NAAV — New African Architecture Vision",
  description: "Cabinet d'architecture contemporaine redéfinissant le paysage urbain africain par l'innovation et le respect de l'héritage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <SecretGateway />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

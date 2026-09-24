import type { Metadata } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: "Ruta Cuscatlán", template: "%s | Ruta Cuscatlán" },
  description: "Guía de destinos para recorrer El Salvador: volcanes, playas y pueblos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <header className="site-header">
          <Link href="/" className="brand">Ruta Cuscatlán</Link>
          <nav>
            <Link href="/categorias/montanas">Montaña</Link>
            <Link href="/categorias/playas">Playas</Link>
            <Link href="/categorias/pueblos">Pueblos</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          Hecho con Next.js y Supabase. Datos de ejemplo para fines educativos.
        </footer>
      </body>
    </html>
  );
}

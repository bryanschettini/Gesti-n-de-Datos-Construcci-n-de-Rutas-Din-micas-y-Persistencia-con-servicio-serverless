import Link from "next/link";
import { getCategories, getDestinations } from "@/lib/data";
import DestinationCard from "@/components/DestinationCard";

export const revalidate = 60;

export default async function Home() {
  const [categories, destinations] = await Promise.all([getCategories(), getDestinations()]);

  return (
    <>
      <section className="hero">
        <h1>El Salvador cabe en un fin de semana</h1>
        <p>
          Del cráter del Ilamatepec a las olas de El Tunco: destinos reales, a pocas horas de San
          Salvador, con lo que necesitas saber antes de ir.
        </p>
        <div className="hero-links">
          {categories.map((c) => (
            <Link key={c.id} href={`/categorias/${c.slug}`}>{c.name}</Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Todos los destinos</h2>
        <div className="grid">
          {destinations.map((d) => <DestinationCard key={d.id} d={d} />)}
        </div>
      </section>
    </>
  );
}

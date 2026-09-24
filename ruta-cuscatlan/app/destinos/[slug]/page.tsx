import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestinationBySlug, getDestinations } from "@/lib/data";
import DestinationCard from "@/components/DestinationCard";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  return d ? { title: d.name, description: d.summary } : { title: "Destino no encontrado" };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  if (!d) notFound();

  const related = (await getDestinations(d.category.slug)).filter((x) => x.id !== d.id);

  return (
    <article>
      <div className="detail-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d.image_url} alt={d.name} />
      </div>
      <div className="detail">
        <Link href={`/categorias/${d.category.slug}`} className="back">
          Volver a {d.category.name}
        </Link>
        <h1>{d.name}</h1>
        <p className="lead">{d.summary}</p>
        <dl className="facts">
          <div><dt>Región</dt><dd>{d.region}</dd></div>
          <div><dt>Mejor época</dt><dd>{d.best_season}</dd></div>
          <div><dt>Dificultad</dt><dd>{d.difficulty}</dd></div>
        </dl>
        <p>{d.description}</p>
      </div>

      {related.length > 0 && (
        <section className="section">
          <h2>Más de {d.category.name.toLowerCase()}</h2>
          <div className="grid">
            {related.map((r) => <DestinationCard key={r.id} d={r} />)}
          </div>
        </section>
      )}
    </article>
  );
}

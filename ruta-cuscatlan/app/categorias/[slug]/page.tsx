import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getDestinations } from "@/lib/data";
import DestinationCard from "@/components/DestinationCard";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCategoryBySlug(slug);
  return c ? { title: c.name, description: c.description } : { title: "Categoría no encontrada" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const destinations = await getDestinations(slug);

  return (
    <section className="section">
      <h1>{category.name}</h1>
      <p className="lead">{category.description}</p>
      {destinations.length === 0 ? (
        <p>Aún no hay destinos en esta categoría.</p>
      ) : (
        <div className="grid">
          {destinations.map((d) => <DestinationCard key={d.id} d={d} />)}
        </div>
      )}
    </section>
  );
}

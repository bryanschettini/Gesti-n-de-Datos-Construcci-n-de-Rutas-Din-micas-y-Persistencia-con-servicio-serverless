import Link from "next/link";
import type { Destination } from "@/lib/types";

export default function DestinationCard({ d }: { d: Destination }) {
  return (
    <Link href={`/destinos/${d.slug}`} className="card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={d.image_url} alt={d.name} loading="lazy" />
      <div className="card-body">
        <p className="card-meta">{d.category.name}, {d.region}</p>
        <h3>{d.name}</h3>
        <p>{d.summary}</p>
      </div>
    </Link>
  );
}

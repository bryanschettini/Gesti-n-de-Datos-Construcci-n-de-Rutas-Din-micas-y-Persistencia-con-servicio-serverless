import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section state">
      <h1>Esta ruta no existe</h1>
      <p>El destino o la categoría que buscas no está en la guía.</p>
      <Link href="/" className="button">Ver todos los destinos</Link>
    </section>
  );
}

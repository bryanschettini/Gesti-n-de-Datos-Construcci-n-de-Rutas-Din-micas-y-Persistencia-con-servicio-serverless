export default function Loading() {
  return (
    <section className="section" aria-busy="true" aria-live="polite">
      <div className="skeleton skeleton-title" />
      <div className="grid">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton skeleton-card" />)}
      </div>
      <span className="sr-only">Cargando destinos…</span>
    </section>
  );
}

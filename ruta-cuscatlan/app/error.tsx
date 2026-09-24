"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section state">
      <h1>No pudimos cargar los datos</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Reintentar</button>
    </section>
  );
}

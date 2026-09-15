import Header from "@/components/layout/Header";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Des outils simples et utiles
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Les bons outils, au bon endroit.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Utiluna rassemble des outils en ligne simples, rapides et gratuits
            pour vous aider au quotidien.
          </p>
        </section>
      </main>
    </>
  );
}
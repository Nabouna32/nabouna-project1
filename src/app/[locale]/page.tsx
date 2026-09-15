import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Categories />
      </main>
    </>
  );
}
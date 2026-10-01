import About from "@/components/home/About";
import Approach from "@/components/home/Approach";
import Collection from "@/components/home/Collection";
import Find from "@/components/home/Find";
import Hero from "@/components/home/Hero";
import Modular from "@/components/home/Modular";

export default function Home() {
  return (
    <main>
      <section className="mb">
        <Hero />
      </section>
      <section className="mb">
        <About />
      </section>
      <section className="mb">
        <Approach />
      </section>
      <section className="mb">
        <Collection />
      </section>
      <section className="mb">
        <Modular />
      </section>
      <section className="mb">
        <Find />
      </section>
    </main>
  );
}

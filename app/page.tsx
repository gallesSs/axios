import About from "@/components/home/About";
import Approach from "@/components/home/Approach";
import Collection from "@/components/home/Collection";
import Cta from "@/components/home/Cta";
import Find from "@/components/home/Find";
import Hero from "@/components/home/Hero";
import Modular from "@/components/home/Modular";
import s from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className="mb-hero">
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
      {/* На десктопе Find и CTA стоят рядом, 50/50 */}
      <div className={s.split}>
        <section>
          <Find />
        </section>
        <section>
          <Cta />
        </section>
      </div>
    </main>
  );
}

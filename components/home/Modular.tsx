import LineReveal from "@/components/motion/LineReveal";
import ModularImage from "@/components/motion/ModularImage";
import ScrambleText from "@/components/motion/ScrambleText";
import ModularList from "./ModularList";
import s from "./Modular.module.css";

const ITEMS = [
  {
    title: "FLEXIBLE",
    text: "Modules can be combined and configured around different ways of living.",
  },
  {
    title: "PRECISE",
    text: "Every element is designed and produced with controlled precision.",
  },
  {
    title: "EFFICIENT",
    text: "Off-site production reduces construction time without compromising quality.",
  },
  {
    title: "ADAPTABLE",
    text: "Spaces can evolve with your needs, site and lifestyle.",
  },
];

function Modular() {
  return (
    <>
      <div className={`container ${s.wrapper}`}>
        <div className={s.heading}>
          <ScrambleText text="/04" className={s.tag} />
          <h2 className={s.title}>
            <LineReveal>MODULAR</LineReveal>
            <LineReveal delay={0.1}>SYSTEM</LineReveal>
          </h2>
        </div>
        <div className={s.content}>
          <ModularImage src="/home/modular.png" />
          <ModularList items={ITEMS} />
        </div>
      </div>
    </>
  );
}

export default Modular;

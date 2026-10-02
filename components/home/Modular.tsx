import LineReveal from "@/components/motion/LineReveal";
import ModularImage from "@/components/motion/ModularImage";
import ScrambleText from "@/components/motion/ScrambleText";
import ScrollWords from "@/components/motion/ScrollWords";
import ModularList from "./ModularList";
import s from "./Modular.module.css";

// «\n» — переносы строк из десктопного макета; на мобилке схлопываются в пробел
const ITEMS = [
  {
    title: "FLEXIBLE",
    text: "Modules can be combined and configured\naround different ways of living.",
  },
  {
    title: "PRECISE",
    text: "Every element is designed and produced\nwith controlled precision.",
  },
  {
    title: "EFFICIENT",
    text: "Off-site production reduces construction\ntime without compromising quality.",
  },
  {
    title: "ADAPTABLE",
    text: "Spaces can evolve with your needs,\nsite and lifestyle.",
  },
];

function Modular() {
  return (
    <div className={`container ${s.wrapper}`}>
      <div className={s.heading}>
        <ScrambleText text="/04" className={s.tag} />
        <h2 className={s.title}>
          <LineReveal>MODULAR</LineReveal>
          <LineReveal delay={0.1}>SYSTEM</LineReveal>
        </h2>
      </div>
      <div className={s.content}>
        <ModularImage src="/home/modular.png" className={s.image} />
        <ModularList items={ITEMS} />
      </div>
      <ScrollWords
        className={s.wrapperText}
        text="FLEXIBLE ARCHITECTURE FOR A CHANGING WAY OF LIVING."
      />
    </div>
  );
}

export default Modular;

import ScrambleText from "@/components/motion/ScrambleText";
import StretchLetters from "@/components/motion/StretchLetters";
import ApproachList from "./ApproachList";
import s from "./Approach.module.css";

const STEPS = [
  {
    title: "01 — RESEARCH",
    text: "We study the site, its natural context and spatial potential.",
  },
  {
    title: "02 — STRATEGY",
    text: "We define the concept around how you live — considering flexibility, function and longevity.",
  },
  {
    title: "03 — DESIGN",
    text: "We shape architecture through proportion, light, material and connection to place.",
  },
  {
    title: "04 — BUILD",
    text: "We bring the vision to life through a precise modular process.",
  },
];

function Approach() {
  return (
    <div className={`container ${s.wrapper}`}>
      <div className={s.heading}>
        <ScrambleText text="/02" className={s.tag} />
        <StretchLetters lines={["OUR", "APPROACH"]} className={s.title} inline />
      </div>
      <ApproachList steps={STEPS} />
    </div>
  );
}

export default Approach;

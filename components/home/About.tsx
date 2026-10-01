import FlipLetters from "@/components/motion/FlipLetters";
import LineReveal from "@/components/motion/LineReveal";
import RevealImage from "@/components/motion/RevealImage";
import ScrambleText from "@/components/motion/ScrambleText";
import ScrollWords from "@/components/motion/ScrollWords";
import s from "./About.module.css";

function About() {
  return (
    <>
      <div className={`container ${s.textContainer}`}>
        <ScrambleText text="/01" className={s.tag} />
        <FlipLetters text="ABOUT" className={s.title} />
      </div>
      <div className={s.aboutContent}>
        <RevealImage src="/home/about.png" className={s.img} />
        <div className={`container ${s.textContent}`}>
          <div className={s.textTitles}>
            <LineReveal className={s.contentTitle}>WE CREATE SPACES</LineReveal>
            <LineReveal className={s.contentTitle} delay={0.1}>
              THAT FEEL LIKE HOME.
            </LineReveal>
          </div>
          <ScrollWords
            className={s.text}
            text="AXIS is a modular architecture studio creating thoughtful homes for modern living. We combine architectural design, precision and modular construction to create spaces that feel personal, timeless and connected to their surroundings."
          />
        </div>
      </div>
    </>
  );
}

export default About;

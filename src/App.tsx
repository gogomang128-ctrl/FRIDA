import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Heart } from "lucide-react";
import CinematicIntro from "./components/CinematicIntro";
import HeartCanvas from "./components/HeartCanvas";
import CursorHearts from "./components/CursorHearts";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import LoveLetter from "./components/LoveLetter";
import Reasons from "./components/Reasons";
import LoveCounter from "./components/LoveCounter";
import Footer from "./components/Footer";

function VerseBand() {
  return (
    <section className="relative px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <span className="mb-8 grid h-14 w-14 place-items-center rounded-full border border-gold/30 bg-gold/10">
          <Quote className="h-6 w-6 text-gold" strokeWidth={1.4} />
        </span>
        <p className="font-amiri text-2xl leading-[2.2] text-white/85 md:text-4xl md:leading-[2]">
          «أنتِ القصيدةُ التي عجزَ الشعراءُ عن كتابتِها…
          <br />
          <span className="text-glow-gold text-gold-soft">وأنا الوحيدُ الذي حفظَها قلبي»</span>
        </p>
        <div className="mt-10 flex items-center gap-3">
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose-deep/60" />
          <Heart className="h-4 w-4 fill-rose-deep text-rose-deep" />
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose-deep/60" />
        </div>
      </motion.div>
    </section>
  );
}

export default function App() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = revealed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [revealed]);

  return (
    <div className="grain relative min-h-screen overflow-hidden bg-night font-tajawal text-white selection:bg-rose-deep">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="soft-orb soft-orb-one" />
        <div className="soft-orb soft-orb-two" />
        <div className="romantic-video-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,197,0.12),transparent_38%),linear-gradient(180deg,rgba(8,3,13,0.15),rgba(8,3,13,0.82))]" />
      </div>

      <HeartCanvas />
      <CursorHearts />

      {!revealed && <CinematicIntro onFinish={() => setRevealed(true)} />}

      <Navbar />
      <main className="relative z-10">
        <Hero revealed={revealed} />
        <Story />
        <VerseBand />
        <LoveLetter />
        <Reasons />
        <LoveCounter />
      </main>
      <Footer />
    </div>
  );
}

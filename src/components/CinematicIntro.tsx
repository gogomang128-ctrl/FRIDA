import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const LATIN = ["F", "A", "R", "I", "D", "A"];

interface Dust {
  left: string;
  top: string;
  delay: number;
  dur: number;
  size: number;
}

export default function CinematicIntro({ onFinish }: { onFinish: () => void }) {
  const [entered, setEntered] = useState(false);
  const [gone, setGone] = useState(false);

  const dust = useMemo<Dust[]>(
    () =>
      Array.from({ length: 34 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 6,
        dur: 5 + Math.random() * 7,
        size: 1.5 + Math.random() * 2.5,
      })),
    []
  );

  const handleEnter = () => {
    if (entered) return;
    setEntered(true);
    window.setTimeout(() => setGone(true), 1650);
    window.setTimeout(() => onFinish(), 1900);
  };

  if (gone) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] overflow-hidden bg-[#050208]"
        data-no-burst
        animate={entered ? { opacity: 0, scale: 1.15 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      >
        {/* cinematic light beam */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[130vmin] w-[130vmin] rounded-full bg-[radial-gradient(circle,rgba(255,77,109,0.16)_0%,rgba(120,30,70,0.08)_38%,transparent_68%)]" />
        </div>

        {/* floating dust */}
        {dust.map((d, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-rose-blush"
            style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
            animate={{ opacity: [0, 0.8, 0], y: [-10, -70], x: [0, i % 2 ? 14 : -14] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* letterbox bars */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[9vh] bg-black z-20"
          initial={{ y: "-100%" }}
          animate={{ y: entered ? "-100%" : "0%" }}
          transition={{ duration: entered ? 1.2 : 1.1, ease: [0.76, 0, 0.24, 1], delay: entered ? 0.15 : 0.2 }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[9vh] bg-black z-20"
          initial={{ y: "100%" }}
          animate={{ y: entered ? "100%" : "0%" }}
          transition={{ duration: entered ? 1.2 : 1.1, ease: [0.76, 0, 0.24, 1], delay: entered ? 0.15 : 0.2 }}
        />

        {/* content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p
            className="mb-6 flex items-center gap-3 text-xs md:text-sm font-light tracking-[0.5em] text-rose-blush/70 font-tajawal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: entered ? 0 : 1, y: entered ? -20 : 0 }}
            transition={{ duration: 1, delay: entered ? 0 : 1.1 }}
          >
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.5} />
            قلبٌ يُقدِّم لكِ
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.5} />
          </motion.p>

          {/* ---- THE NAME ---- */}
          <div className="relative select-none overflow-hidden px-8 py-2">
            <motion.h1
              className="font-ruqaa text-glow-rose text-[21vw] leading-[1.1] md:text-[11rem] lg:text-[12.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ffd9de] via-rose-soft to-rose-deep"
              initial={{ opacity: 0, scale: 1.35, y: 40, filter: "blur(22px)" }}
              animate={
                entered
                  ? { opacity: 0, y: -70, scale: 0.94, filter: "blur(10px)" }
                  : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
              }
              transition={
                entered
                  ? { duration: 0.9, ease: "easeIn" }
                  : { duration: 1.7, delay: 1.9, ease: [0.16, 1, 0.3, 1] }
              }
            >
              فريدة
            </motion.h1>

            {/* golden light sweep across the name */}
            {!entered && (
              <motion.span
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-l from-transparent via-gold/50 to-transparent mix-blend-screen"
                initial={{ x: "220%" }}
                animate={{ x: "-320%" }}
                transition={{ duration: 1.6, delay: 2.9, ease: "easeInOut" }}
              />
            )}
          </div>

          {/* latin letters one by one */}
          <div dir="ltr" className="mt-3 flex items-center justify-center gap-[0.6em] select-none">
            {LATIN.map((ch, i) => (
              <motion.span
                key={i}
                className="font-script text-2xl md:text-4xl text-gold/90"
                initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                animate={entered ? { opacity: 0, y: -26 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={
                  entered
                    ? { duration: 0.6, delay: 0.04 * i }
                    : { duration: 0.7, delay: 2.6 + i * 0.14, ease: [0.16, 1, 0.3, 1] }
                }
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* golden sweep line */}
          <motion.div
            className="mt-4 h-px w-[62vw] max-w-xl origin-center bg-gradient-to-l from-transparent via-gold to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={entered ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={entered ? { duration: 0.7 } : { duration: 1.4, delay: 3.7, ease: "easeInOut" }}
          />

          <motion.p
            className="mt-7 max-w-md font-amiri text-lg md:text-2xl leading-relaxed text-rose-blush/90"
            initial={{ opacity: 0, y: 24 }}
            animate={entered ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
            transition={entered ? { duration: 0.7 } : { duration: 1.2, delay: 4.15 }}
          >
            حكايةُ حبٍّ تُروى تحتَ النجوم…
            <br />
            وبطولتُها أنتِ
          </motion.p>

          <motion.p
            className="mt-4 font-script text-2xl md:text-3xl text-gold/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: entered ? 0 : 1 }}
            transition={entered ? { duration: 0.5 } : { duration: 1.2, delay: 4.7 }}
          >
            a story written in the stars
          </motion.p>

          {/* enter button */}
          <motion.button
            onClick={handleEnter}
            className="group relative mt-12 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={entered ? { opacity: 0, y: -30, pointerEvents: "none" as const } : { opacity: 1, y: 0 }}
            transition={entered ? { duration: 0.6 } : { duration: 1, delay: 5.1 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <span className="pulse-ring absolute inset-0 rounded-full border border-rose-deep/60" />
            <span className="relative flex items-center gap-3 rounded-full border border-rose-deep/50 bg-gradient-to-l from-rose-deep/25 to-plum/80 px-9 py-4 font-tajawal text-base md:text-lg font-medium tracking-wide text-rose-blush backdrop-blur-md transition-colors duration-300 group-hover:border-rose-soft group-hover:text-white">
              <Heart className="animate-heartbeat h-5 w-5 fill-rose-deep text-rose-deep" />
              ادخلي إلى الحكاية
            </span>
          </motion.button>

          <motion.div
            className="absolute bottom-[12vh] flex items-center gap-2 text-[10px] tracking-[0.4em] text-white/25 font-tajawal"
            initial={{ opacity: 0 }}
            animate={{ opacity: entered ? 0 : 1 }}
            transition={{ delay: 5.6, duration: 1 }}
          >
            <span className="h-px w-8 bg-white/20" />
            LOVE PRODUCTION PRESENTS
            <span className="h-px w-8 bg-white/20" />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

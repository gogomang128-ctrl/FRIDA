import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Menu, X, Pause } from "lucide-react";

/* soft romantic ambient generated with Web Audio */
function useAmbient() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number>(0);
  const masterRef = useRef<GainNode | null>(null);

  const stop = () => {
    window.clearInterval(timerRef.current);
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.8);
      const m = masterRef.current;
      window.setTimeout(() => m.disconnect(), 900);
    }
    setPlaying(false);
  };

  const start = () => {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!ctxRef.current) ctxRef.current = new AC();
    const ctx = ctxRef.current;
    void ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.5);
    master.connect(ctx.destination);
    masterRef.current = master;

    // warm drone
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.5;
    droneGain.connect(master);
    [130.81, 196.0].forEach((f) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.08;
      o.connect(g).connect(droneGain);
      o.start();
    });

    // gentle melody
    const melody = [523.25, 587.33, 659.25, 783.99, 698.46, 659.25, 587.33, 523.25];
    let step = 0;
    const playNote = () => {
      const f = melody[step % melody.length];
      step++;
      const t = ctx.currentTime;
      [f, f * 1.005].forEach((freq, i) => {
        const o = ctx.createOscillator();
        o.type = i === 0 ? "sine" : "triangle";
        o.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(i === 0 ? 0.34 : 0.1, t + 0.35);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
        o.connect(g).connect(master);
        o.start(t);
        o.stop(t + 2.6);
      });
    };
    playNote();
    timerRef.current = window.setInterval(playNote, 820);
    setPlaying(true);
  };

  useEffect(() => () => stop(), []);

  return { playing, toggle: () => (playing ? stop() : start()) };
}

const LINKS = [
  { href: "#hero", label: "البداية" },
  { href: "#story", label: "حكايتنا" },
  { href: "#letter", label: "رسالتي" },
  { href: "#reasons", label: "أسباب حبّي" },
  { href: "#counter", label: "عدّاد الحب" },
];

export default function Navbar() {
  const { playing, toggle } = useAmbient();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav
        className={`mx-auto flex max-w-3xl items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-rose-soft/25 bg-night/70 shadow-[0_10px_40px_-12px_rgba(255,77,109,0.3)]"
            : "border-white/10 bg-white/[0.04]"
        }`}
        data-no-burst
      >
        <a href="#hero" className="flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-rose-deep to-[#8b1e3f] shadow-[0_0_18px_rgba(255,77,109,0.6)]">
            <Heart className="h-4 w-4 fill-white text-white" />
          </span>
          <span className="font-ruqaa text-2xl leading-none text-rose-blush">فريدة</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-white/70 transition-colors hover:text-rose-blush"
            >
              {l.label}
              <span className="absolute -bottom-1 right-0 h-px w-0 bg-gradient-to-l from-rose-deep to-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="تشغيل الموسيقى"
            className={`grid h-9 w-9 cursor-pointer place-items-center rounded-full border transition-all duration-300 ${
              playing
                ? "border-gold/60 bg-gold/15 text-gold shadow-[0_0_16px_rgba(247,201,127,0.4)]"
                : "border-white/15 bg-white/5 text-white/60 hover:border-rose-soft/50 hover:text-rose-blush"
            }`}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 flex max-w-3xl flex-col gap-1 rounded-3xl border border-white/10 bg-night/90 p-4 backdrop-blur-xl md:hidden"
            data-no-burst
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-rose-deep/15 hover:text-rose-blush"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

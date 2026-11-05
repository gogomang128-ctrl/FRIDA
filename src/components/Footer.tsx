import { motion } from "framer-motion";
import { Heart, CloudRainWind, ChevronUp } from "lucide-react";

export default function Footer() {
  const shower = () => {
    window.dispatchEvent(new CustomEvent("farida:shower"));
  };

  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-28">
      {/* rose glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[60vmin] w-[110vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_bottom,rgba(255,77,109,0.14),transparent_65%)]" />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10"
        >
          <span className="pulse-ring absolute inset-0 rounded-full bg-rose-deep/40" />
          <Heart className="animate-heartbeat relative h-20 w-20 fill-rose-deep text-rose-deep drop-shadow-[0_0_35px_rgba(255,77,109,0.8)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-ruqaa text-4xl font-bold leading-relaxed md:text-6xl text-glow-rose text-transparent bg-clip-text bg-gradient-to-b from-[#ffe3ea] via-rose-soft to-rose-deep"
        >
          فريدة… حبيبتي إلى الأبد
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-script mt-4 text-3xl text-gold/85"
        >
          and this is only the beginning
        </motion.p>

        <motion.button
          onClick={shower}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.45 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          className="mt-10 flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-l from-rose-deep via-[#e0345a] to-[#c9184a] px-9 py-4 text-base font-bold text-white shadow-[0_18px_50px_-12px_rgba(255,77,109,0.7)]"
        >
          <CloudRainWind className="h-5 w-5" />
          أمطريها حبًّا يا سماء
        </motion.button>

        <div className="mt-20 flex w-full flex-col items-center gap-5 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <p className="flex items-center gap-2 text-sm text-white/50">
            صُنع بكلِّ
            <Heart className="h-4 w-4 fill-rose-deep text-rose-deep" />
            من أجل أغلى إنسانة
          </p>
          <p className="font-amiri text-base text-white/40">
            «ولو كان للحبّ خاتمة… لما كتبتُ اسمَكِ في البداية»
          </p>
          <a
            href="#hero"
            aria-label="العودة للأعلى"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all hover:border-rose-soft/60 hover:text-rose-blush"
          >
            <ChevronUp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

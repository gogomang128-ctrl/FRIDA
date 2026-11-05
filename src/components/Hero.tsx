import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, ChevronDown, Mail, Sparkles } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 44 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero({ revealed }: { revealed: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const a = (d: number) => ({
    ...fadeUp(d),
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 },
  });

  return (
    <section ref={ref} id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32">
      {/* halo moon */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85vmin] w-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,201,127,0.1)_0%,rgba(255,77,109,0.07)_40%,transparent_70%)]" />

      <motion.div style={{ y: titleY, opacity: fade }} className="flex flex-col items-center text-center">
        <motion.p {...a(0.15)} className="mb-5 flex items-center gap-3 text-xs md:text-sm tracking-[0.45em] text-gold/80">
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
          تحتَ سماءٍ تشهدُ على حبّنا
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
        </motion.p>

        <motion.h1
          {...a(0.3)}
          className="shimmer-text font-ruqaa text-[26vw] font-bold leading-[0.95] md:text-[11rem] lg:text-[13rem]"
        >
          فريدة
        </motion.h1>

        <motion.p {...a(0.5)} className="font-script mt-1 text-3xl md:text-4xl text-rose-soft/90">
          my whole heart
        </motion.p>

        <motion.p {...a(0.62)} className="mt-6 max-w-2xl font-amiri text-lg md:text-2xl leading-relaxed text-white/80">
          عيونُكِ مثل القمر الساطع، وكلامُكِ يخلعُ عن قلبي التوتر ويتركه يطمئنُ،
          <br />
          <span className="text-rose-blush">وأنتِ يا فريدة، صرتِ أغلى أمنٍ في حياتي، وأحلى فرحةٍ تُصنعُ مع كل نبضةٍ أقبَلُ فيها عليكِ</span>
        </motion.p>
      </motion.div>

      {/* the lovers — arched cinema frame */}
      <motion.div
        initial={{ opacity: 0, y: 90, scale: 0.92 }}
        animate={revealed ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: imgY }}
        className="relative mt-14"
      >
        {/* orbiting sparkles */}
        <div className="animate-spin-slow pointer-events-none absolute -inset-16 md:-inset-24">
          <Heart className="absolute right-[8%] top-[4%] h-5 w-5 fill-rose-deep text-rose-deep opacity-80" />
          <Heart className="absolute left-[6%] top-1/2 h-4 w-4 fill-gold text-gold opacity-70" />
          <Sparkles className="absolute bottom-[10%] right-[12%] h-5 w-5 text-rose-blush opacity-80" />
          <Sparkles className="absolute left-[14%] top-[14%] h-4 w-4 text-gold-soft opacity-70" />
        </div>

        <span className="absolute -top-6 left-1/2 z-10 -translate-x-1/2">
          <span className="pulse-ring absolute inset-0 rounded-full bg-rose-deep/50" />
          <Heart className="animate-heartbeat relative h-9 w-9 fill-rose-deep text-rose-deep drop-shadow-[0_0_18px_rgba(255,77,109,0.9)]" />
        </span>

        <div className="animate-floaty relative overflow-hidden rounded-t-[999px] rounded-b-[36px] border border-rose-soft/25 p-2 shadow-[0_40px_120px_-30px_rgba(255,77,109,0.45),0_0_60px_-20px_rgba(247,201,127,0.3)]">
          <div className="relative w-[min(88vw,540px)] overflow-hidden rounded-t-[999px] rounded-b-[28px]">
            <img
              src="/images/couple-silhouette.png"
              alt="عاشقان تحت ضوء القمر"
              className="aspect-[4/4.6] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12040f]/85 via-transparent to-transparent" />
            <p className="absolute bottom-5 inset-x-0 text-center font-amiri text-base md:text-lg text-rose-blush/95">
              «أنا وأنتِ… وحدنا ضدّ العالم كله»
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div {...a(1.1)} className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#letter"
          className="group flex items-center gap-2.5 rounded-full bg-gradient-to-l from-rose-deep to-[#c9184a] px-8 py-3.5 text-sm md:text-base font-bold text-white shadow-[0_14px_40px_-10px_rgba(255,77,109,0.65)] transition-transform duration-300 hover:scale-105"
        >
          <Mail className="h-4.5 w-4.5 transition-transform group-hover:-rotate-12" />
          اقرئي رسالتي
        </a>
        <a
          href="#story"
          className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm md:text-base font-medium text-white/85 backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:text-gold"
        >
          <Sparkles className="h-4.5 w-4.5" />
          شاهدي حكايتنا
        </a>
      </motion.div>

      {/* scroll hint */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-7 flex flex-col items-center gap-2 text-white/40 transition-colors hover:text-rose-blush"
        aria-label="انزلي للأسفل"
      >
        <span className="text-[10px] tracking-[0.35em]">اسحبي للحكاية</span>
        <span className="relative flex h-9 w-5.5 justify-center rounded-full border border-current pt-1.5">
          <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-current" />
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}

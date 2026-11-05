import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock3, HeartPulse, Infinity as InfinityIcon } from "lucide-react";
import SectionTitle from "./SectionTitle";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function LoveCounter() {
  const startRef = useRef(Date.now());
  const [, force] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => force((v) => v + 1), 1000);
    return () => window.clearInterval(t);
  }, []);

  const seconds = Math.max(0, Math.floor((Date.now() - startRef.current) / 1000));
  const minutes = Math.floor(seconds / 60);
  const beats = Math.floor((seconds / 60) * 80 + 40); // heart racing for you

  const stats = [
    {
      icon: Clock3,
      value: `${pad(minutes)} : ${pad(seconds % 60)}`,
      label: "دقيقة وثانية وأنا أفكّر فيكِ",
      accent: "text-gold-soft",
    },
    {
      icon: HeartPulse,
      value: beats.toLocaleString("en-US"),
      label: "نبضةٌ نبضَها قلبي باسمِكِ",
      accent: "text-rose-soft",
    },
    {
      icon: InfinityIcon,
      value: "∞",
      label: "عددُ المرّات التي سأختارُكِ فيها",
      accent: "text-rose-deep",
    },
  ];

  return (
    <section id="counter" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="يشتغل من اللحظة التي فتحتِ فيها عينيكِ على الصفحة"
          title="عدّادُ الحبّ"
          sub="لأنّ الحبّ الحقيقي يُقاس بالدقائق… ويزيد مع كل ثانية"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                className="love-card relative flex flex-col items-center rounded-[26px] px-6 py-10 text-center"
              >
                <span className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.05]">
                  <Icon className={`h-6 w-6 ${s.accent}`} strokeWidth={1.6} />
                </span>
                <p
                  className={`font-tajawal text-5xl font-black tabular-nums tracking-tight md:text-[3.4rem] ${s.accent} drop-shadow-[0_0_24px_rgba(255,77,109,0.35)]`}
                  dir="ltr"
                >
                  {s.value}
                </p>
                <p className="mt-4 font-amiri text-lg text-white/60">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mx-auto mt-14 max-w-xl text-center font-amiri text-xl leading-loose text-white/55"
        >
          «وكلّما زاد العدّادُ رقمًا…
          <br />
          <span className="text-rose-blush">زاد قلبي لكِ عشقًا»</span>
        </motion.p>
      </div>
    </section>
  );
}

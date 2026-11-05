import { motion } from "framer-motion";
import {
  Smile,
  MoonStar,
  HandHeart,
  AudioLines,
  Sun,
  Sparkles,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

const REASONS = [
  {
    icon: Smile,
    title: "ضحكتُكِ",
    text: "ضحكتُكِ بتفتح في قلبي نور، وكأن الدنيا فجأة بقت أحلى من اللي قبلها.",
    tint: "from-rose-deep/25",
  },
  {
    icon: MoonStar,
    title: "عيونُكِ",
    text: "عيونكِ زي القمر الساطع: هاديّة، جميلة، وبتخلّي قلبي يطمئنّ من أول نظرة.",
    tint: "from-gold/25",
  },
  {
    icon: HandHeart,
    title: "طريقه كلامكِ",
    text: "كلامكِ بيحسّني بالأمان، وكأن كل كلمة منكِ رقيقة زي رَحْمَة وأمل في قلبٍ مُتعب.",
    tint: "from-rose-soft/25",
  },
  {
    icon: AudioLines,
    title: "شاورماتكِ",
    text: "حتى شاورماكِ المفضلة بقت ليها حكاية معاكِ، لأن كل لحظة معاكِ بتتحوّل لذكريّة حلوة.",
    tint: "from-[#c9184a]/30",
  },
  {
    icon: Sun,
    title: "حضورُكِ",
    text: "أنتِ بتدخلين المكان بوجودكِ، وبعدين العالم كله بيبان أجمل من قبل.",
    tint: "from-gold-soft/20",
  },
  {
    icon: Sparkles,
    title: "حُبّكِ المُجمل",
    text: "وأنتِ طولكِ 155 سنتيمتر، لكنكِ وسّعتي قلبي أكثر من أي مساحة في الدنيا.",
    tint: "from-rose-deep/20",
  },
];

export default function Reasons() {
  return (
    <section id="reasons" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="وسبعون سببًا آخر لم أكتبها بعد"
          title="لماذا أحبُّكِ؟"
          sub="سألوني مرّة، فضحكتُ… والسبب؟ لأنّ الإجابة تحتاج عمرًا كاملًا"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.article
                key={r.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.07 * (i % 3), ease: [0.16, 1, 0.3, 1] }}
                className="love-card group relative overflow-hidden rounded-[26px] p-8"
              >
                <span
                  className={`pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${r.tint} to-transparent blur-2xl transition-transform duration-700 group-hover:scale-150`}
                />
                <span className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.06] text-rose-blush ring-1 ring-white/10 transition-all duration-500 group-hover:scale-110 group-hover:text-gold-soft group-hover:ring-gold/40">
                  <Icon className="h-7 w-7" strokeWidth={1.4} />
                </span>
                <h3 className="relative font-ruqaa text-2xl md:text-[1.7rem] leading-snug text-white">
                  {r.title}
                </h3>
                <p className="relative mt-3 font-amiri text-lg leading-relaxed text-white/60">
                  {r.text}
                </p>
                <span className="mt-6 block h-px w-0 bg-gradient-to-l from-rose-deep to-gold transition-all duration-700 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

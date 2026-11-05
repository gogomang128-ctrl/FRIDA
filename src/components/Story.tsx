import { motion } from "framer-motion";
import { Eye, Laugh, HeartHandshake, Infinity as InfinityIcon } from "lucide-react";
import SectionTitle from "./SectionTitle";

const CHAPTERS = [
  {
    icon: Eye,
    chapter: "الفصل الأول",
    title: "القمر في عينيكِ",
    text: "من أول مرة شفتِكِ، حسيتي عيونكِ زي القمر الساطع: هادية، مضيئة، وبتخلي قلبي يطمئنّ من غير ما أقول حاجة. وبدأت الحكاية من نظرة… ومن يومها ما لقيتش غيركِ.",
  },
  {
    icon: Laugh,
    chapter: "الفصل الثاني",
    title: "كلامُكِ يريحني",
    text: "طريقه كلامكِ تحسسني بالأمان، وكأنّ كل كلمة منكِ بتفتح بابًا جديدًا في قلبي. وبتضحكِ بتحوّل أي يوم بايخ لنهار منور، وده اللي خلّىني أحبّكِ أكتر.",
  },
  {
    icon: HeartHandshake,
    chapter: "الفصل الثالث",
    title: "شاورما وقلوب",
    text: "وياكِ حتى الشاورما بقت جزء من أحلى ذكرياتي، لأن كل المواقف الحلوة معاكِ بتتحوّل لقصص تُحفظ في القلب. وأنتِ، بكلّ رَوْحِكِ الجميلة، جعلتي كل تفاصيل حياتي أحلى.",
  },
  {
    icon: InfinityIcon,
    chapter: "الفصل الأخير",
    title: "…وأنا معاكِ للأبد",
    text: "ولو كانت الشجرة عالية، والسنين كثيرة، ما كانش في نهاية للحب اللي بيننا. لأن كل يوم بيمدّ الحكاية، وكل خطوة بتمشيها مع بعض بتحوّلها لــ 155 سنتيمتر من سعادة، واسمها فريدة.",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative px-6 py-28 md:py-36">
      {/* starlit backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/images/couple-stars.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/70 to-night" />
      </div>

      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="فيلم قصير بطولة أنتِ"
          title="حكايتُنا"
          sub="أربعة فصول… وقلبٌ واحد يكتب"
        />

        <div className="relative">
          {/* spine */}
          <span className="absolute right-1/2 top-0 hidden h-full w-px translate-x-1/2 bg-gradient-to-b from-transparent via-rose-deep/40 to-transparent md:block" />

          <div className="flex flex-col gap-10 md:gap-0">
            {CHAPTERS.map((c, i) => {
              const Icon = c.icon;
              const right = i % 2 === 0;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 60, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex md:w-1/2 ${right ? "md:self-start md:pl-14" : "md:self-end md:pr-14 md:text-left"}`}
                >
                  {/* node dot */}
                  <span
                    className={`absolute top-9 hidden h-3.5 w-3.5 rounded-full border-2 border-gold bg-night shadow-[0_0_14px_rgba(247,201,127,0.8)] md:block ${
                      right ? "-left-[7px]" : "-right-[7px]"
                    }`}
                  />

                  <article className="love-card w-full rounded-[28px] p-8">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-deep/30 to-rose-deep/5 text-rose-blush ring-1 ring-rose-deep/30">
                        <Icon className="h-6 w-6" strokeWidth={1.6} />
                      </span>
                      <div>
                        <p className="font-script text-xl text-gold/90">{c.chapter}</p>
                        <h3 className="font-ruqaa text-2xl md:text-3xl leading-snug text-white">
                          {c.title}
                        </h3>
                      </div>
                    </div>
                    <p className="font-amiri text-lg leading-loose text-white/70">{c.text}</p>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

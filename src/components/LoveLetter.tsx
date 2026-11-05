import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Feather } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function LoveLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section id="letter" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="مكتوبة بدم القلب لا بالحبر"
          title="رسالةٌ إلى فريدة"
          sub="اضغطي على الختم… فالقلب لا يصبر"
        />

        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: 0, scale: 1.012 }}
          className="relative mx-auto rounded-[30px] border border-gold/25 bg-[linear-gradient(165deg,rgba(247,201,127,0.09),rgba(20,8,24,0.92)_35%)] p-8 shadow-[0_50px_120px_-40px_rgba(247,201,127,0.25)] backdrop-blur-xl md:p-14"
        >
          {/* corner ornaments */}
          <span className="pointer-events-none absolute right-4 top-4 h-10 w-10 rounded-tr-2xl border-r-2 border-t-2 border-gold/35" />
          <span className="pointer-events-none absolute left-4 top-4 h-10 w-10 rounded-tl-2xl border-l-2 border-t-2 border-gold/35" />
          <span className="pointer-events-none absolute bottom-4 right-4 h-10 w-10 rounded-br-2xl border-b-2 border-r-2 border-gold/35" />
          <span className="pointer-events-none absolute bottom-4 left-4 h-10 w-10 rounded-bl-2xl border-b-2 border-l-2 border-gold/35" />

          {/* wax seal */}
          <motion.button
            onClick={() => setOpened(!opened)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={opened ? "إغلاق الرسالة" : "فتح الرسالة"}
            className="absolute -top-7 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
            data-no-burst
          >
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#e0345a,#8b1e3f_70%)] shadow-[0_8px_28px_rgba(255,77,109,0.55),inset_0_-4px_10px_rgba(0,0,0,0.4)] ring-4 ring-[#6d1630]">
              {opened ? (
                <span className="font-ruqaa text-xl text-white">ف</span>
              ) : (
                <Heart className="animate-heartbeat h-6 w-6 fill-white text-white" />
              )}
            </span>
          </motion.button>

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex min-h-64 flex-col items-center justify-center py-10 text-center"
              >
                <Feather className="mb-6 h-10 w-10 text-gold/70" strokeWidth={1.2} />
                <p className="font-ruqaa text-3xl md:text-4xl text-rose-blush">إلى أغلى البشر…</p>
                <p className="mt-4 max-w-sm font-amiri text-lg leading-relaxed text-white/50">
                  رسالةٌ مختومةٌ بالشوق، لا تُفتح إلا بيديكِ أنتِ
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="py-6 text-center"
                data-no-burst
              >
                <p className="font-script text-3xl text-gold md:text-4xl">To my dearest Farida</p>

                <div className="mx-auto mt-8 max-w-2xl space-y-6 font-amiri text-xl leading-[2.3] text-white/85 md:text-2xl">
                  <p className="font-ruqaa text-3xl text-rose-blush md:text-4xl">فريدة…</p>
                  <p>
                    يا أغلى إنسانة في حياتي، يا اللي عيونها زي القمر الساطع، وطبعتها الحلوة كأنها ضوء في الليالي.
                    من أول مرة اتكلمتِ معي، حسيت إن قلبي بيطمئنّ، وكأنّ في كلامكِ هو الدفء اللي كنت أبحث عنه.
                  </p>
                  <p>
                    أحبّ فيكِ طريقتكِ في الكلام، اللي بتحسسني بالأمان من غير ما أقول لكِ حاجة،
                    وحنانكِ اللي بيبان في كل كلمة، وذكائكِ الجميل اللي بيخلي أي لحظة معاكِ أهم من الدنيا.
                  </p>
                  <p>
                    وأحبّ فيكِ اللي تحبيه الشاورما، والضحكة اللي بتخلّي اليوم يبان أحلى،
                    والأنوثة اللي كأنها نور بيمشي في قلبي. حتى طولكِ 155 سنتيمتر بقى جزء من جمالكِ،
                    لأنكِ مش بس جميلة، أنتِ رِاحةٌ وأمانٌ ونسمةٌ حلوة.
                  </p>
                  <p>
                    لو قلت لكِ إنّي أحبّكِ، هيكون الكلام ناقص، لأن الحب اللي عندي فيكِ أكبر من الكلمات.
                    <span className="text-gold-soft">أنتِ حياتي اللي بتهديني، وأمنّي اللي أرجع له،</span>
                    واسمكِ اللي بكتبّه في كل أحلامي.
                  </p>
                </div>

                <div className="mt-10 flex flex-col items-center gap-2">
                  <span className="h-px w-40 bg-gradient-to-l from-transparent via-gold/50 to-transparent" />
                  <p className="font-script text-3xl text-rose-soft">Forever yours,</p>
                  <p className="text-sm tracking-[0.3em] text-white/40">قلبٌ لا ينبض إلا باسمِكِ</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function SectionTitle({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5 flex items-center justify-center gap-3 text-xs tracking-[0.4em] text-gold/80"
      >
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
        <Heart className="h-3.5 w-3.5 fill-rose-deep text-rose-deep" />
        {eyebrow}
        <Heart className="h-3.5 w-3.5 fill-rose-deep text-rose-deep" />
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="font-ruqaa text-5xl md:text-7xl font-bold leading-tight text-glow-rose text-transparent bg-clip-text bg-gradient-to-b from-[#ffe3ea] via-rose-soft to-rose-deep"
      >
        {title}
      </motion.h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-amiri text-lg md:text-xl leading-relaxed text-white/60"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

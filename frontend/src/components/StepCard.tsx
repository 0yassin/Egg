import { motion, type Variants } from "motion/react";

export const CardVariant:Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const ContainerVariant:Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <motion.article variants={CardVariant}  whileHover={{ y: -6 }} className="group rounded-2xl border border-(--accent-color)/10 bg-white/50 p-7 hover:border-(--accent-blue)/40">
      <span className="font-serif text-6xl font-bold text-[#6882bb]/40">{step}</span>

      <div className="mt-10">
        <h3 className="mt-2 font-serif text-2xl font-bold">{title}</h3>

        <p className="mt-3 leading-7 text-(--accent-color)/75">{description}</p>
      </div>
    </motion.article>
  );
}
export function UseCard({ step, title, description }: StepCardProps) {
  return (
    <motion.article variants={CardVariant} whileHover={{ y: -6 }} className="group rounded-2xl border border-(--accent-color)/10 bg-white/50 p-7 hover:border-(--accent-blue)/40">
      <span className="font-serif text-6xl font-bold text-[#6882bb]/40">{step}</span>
      <div className="mt-10">
        <h3 className="mt-2 font-serif text-2xl font-bold">{title}</h3>
        <p className="mt-3 leading-7 text-(--accent-color)/75">{description}</p>
      </div>
    </motion.article>
  );
}

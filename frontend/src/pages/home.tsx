import { EggPlaceHolder } from "../components/EggPlaceHolder";
import Button from "../components/botton";
import { StepCard } from "../components/StepCard";
import { UseCard } from "../components/StepCard";
import { motion, number } from "motion/react";

export function Home() {
  return (
    <main className="min-h-screen px-6 pt-16 pb-28 md:px-12">
      <section className=" mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-(--accent-blue)"
          >
            Your memories, planted in time
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className="font-serif text-4xl font-bold leading-tight text-(--accent-color) md:text-6xl"
          >
            Welcome to your
            <span className="block text-(--accent-blue)">Egg Farm.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-6 max-w-lg text-base leading-7 text-(--accent-color)/75 md:text-lg"
          >
            Egg is a digital memory holder where you can save your favorite moments, stories, images, and videos for your future self or someone you love.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-8 flex items-center gap-4">
            <Button variant="secondary">Learn more</Button>

            <span className="text-sm text-[#5d4a43]/60">Plant a memory today.</span>
          </motion.div>
        </div>
        <div className="flex justify-center md:justify-end">
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="egg-float"
          >
            <EggPlaceHolder />
          </motion.div>
        </div>
      </section>
      <section className="px-6 py-24 text-(--accent-color) md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-md font-semibold uppercase tracking-[0.2em] text-(--accent-blue)">How egg works</p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-5xl">
              PLant a memory
              <br />
              let time do the rest
            </h2>
            <p className="mt-5 leading-tight">Some memory are meant to be for future experienced . Egg gives them a place to wait </p>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            <StepCard delay={0} step="1" title="Plant a memory" description="Write a message, add your favorite photos, or save a moment you want to remember later" />
            <StepCard delay={0.15} step="2" title="Seal your egg" description="Choose when you want your memory to return. Once planted, your Egg stays sealed." />
            <StepCard delay={0.3} step="3" title="Rediscover it" description="When the time comes, your Egg opens and your memory returns to you." />
          </div>
        </div>
      </section>
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--accent-blue)">Made for moments</p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-3 font-serif text-3xl font-bold leading-tight text-(--accent-color) md:text-5xl"
            >
              What will you
              <span className="text-(--accent-blue)"> plant ?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-5 max-w-3xl leading-7 text-(--accent-color)/75"
            >
              From a message to your future self to a collection of memories shared with someone you loved ,every egg can hold a story worth coming back
            </motion.p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <UseCard delay={0} step="1" title="A letter to your future self" description="Write down what you're feeling today and let your future descover it months or years from now" />
            <UseCard delay={0.1} step="2" title="Something for someonee you love" description="Create a memory filled with messages , photos, and moments for someone special " />
            <UseCard delay={0.2} step="3" title="Remember a milestone" description="Capture the moment u want to remember as u complete your milestone" />
            <UseCard delay={0.3} step="4" title="A collection of moments" description="having a collection of photo u want to see in future" />
            <UseCard delay={0.4} step="5" title="A future celebration" description="Plant an egg today and let the egg celebrate your birthday aniversary and another meaning full day " />
            <UseCard delay={0.5} step="6" title="Anything" description="Add anything you want to preserver for your future self" />
          </div>
        </div>
      </section>
    </main>
  );
}

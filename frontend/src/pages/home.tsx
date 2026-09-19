import { EggPlaceHolder } from "../components/EggPlaceHolder";
import Button from "../components/botton";
import { StepCard } from "../components/StepCard";
export function Home() {
  return (
    <main className="min-h-screen px-6 pt-16 pb-28 md:px-12">
      <section className=" mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-(--accent-blue)">Your memories, planted in time</p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-(--accent-color) md:text-6xl">
            Welcome to your
            <span className="block text-(--accent-blue)">Egg Farm.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-(--accent-color)/75 md:text-lg">
            Egg is a digital memory holder where you can save your favorite moments, stories, images, and videos for your future self or someone you love.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button variant="secondary">Learn more</Button>

            <span className="text-sm text-[#5d4a43]/60">Plant a memory today.</span>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="egg-float">
            <EggPlaceHolder />
          </div>
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
           <StepCard step="1" title="Plant a memory" description="Write a message, add your favorite photos, or save a moment you want to remember later"/>
           <StepCard step="2" title="Seal your egg" description="Choose when you want your memory to return. Once planted, your Egg stays sealed."/>
           <StepCard step="3" title="Rediscover it" description="When the time comes, your Egg opens and your memory returns to you."/>
          </div>
        </div>
      </section>
    </main>
  );
}

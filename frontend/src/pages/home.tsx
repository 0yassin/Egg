import { EggPlaceHolder } from "../components/EggPlaceHolder";
import Button from "../components/botton";

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
      <section className="">
        adwad
      </section>
    </main>
  );
}

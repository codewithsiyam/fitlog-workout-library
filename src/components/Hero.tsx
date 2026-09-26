import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-border bg-base">
      <div className="container-px mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-start gap-5">
          <span className="tag-pill text-accent">WORKOUT LIBRARY</span>

          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="max-w-md text-base text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a href="#library" className="btn-primary mt-2">
            Browse workouts
            <ArrowDown size={18} />
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />
          <Image
            src="/banner.png"
            alt="Illustration of a muscular figure using gym equipment"
            fill
            priority
            className="relative object-contain"
          />
        </div>
      </div>
    </section>
  );
}

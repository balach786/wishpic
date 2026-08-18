import { Countdown } from "./Countdown";
import { Particles } from "./Particles";
import { Reveal } from "./Reveal";
import type { Remaining } from "@/lib/use-countdown";
import { birthdayConfig } from "@/lib/birthday-config";

export function TheWait({ remaining }: { remaining: Remaining }) {
  return (
    <section
      aria-labelledby="chapter-the-wait"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-night py-24"
    >
      <img
        src={birthdayConfig.photos[2]!.src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center opacity-20 blur-[5px]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 70% at 50% 45%, oklch(0.35 0.06 50 / 0.28), oklch(0.13 0.02 50 / 0.95) 72%)",
        }}
      />
      <Particles count={14} />

      <div className="relative mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-[0.6rem] uppercase tracking-[0.45em] text-ember/80 sm:text-xs">Chapter 04</p>
          <h2
            id="chapter-the-wait"
            className="mt-6 font-display text-cream"
            style={{ fontSize: "clamp(2.6rem, 9vw, 6rem)", lineHeight: 1 }}
          >
            Okay…
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-6 font-display text-2xl text-cream/75 sm:text-4xl">The moment is almost here.</p>
        </Reveal>
        <Reveal delay={520} className="mt-14 flex flex-col items-center">
          <Countdown remaining={remaining} />
          <p className="mt-8 text-xs tracking-[0.2em] uppercase text-cream/40">
            {birthdayConfig.firstName}&apos;s day is almost here
          </p>
        </Reveal>
      </div>
    </section>
  );
}

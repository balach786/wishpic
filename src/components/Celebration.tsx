import { useEffect, useState } from "react";
import { Confetti, Particles } from "./Particles";
import { birthdayConfig } from "@/lib/birthday-config";

/** Cinematic reveal: "It's Your Day." → HAPPY BIRTHDAY → IQUIRA BHATTI */
export function Celebration({ instant = false }: { instant?: boolean }) {
  const [stage, setStage] = useState(instant ? 3 : 0);

  useEffect(() => {
    if (instant) return;
    const t1 = window.setTimeout(() => setStage(1), 200);
    const t2 = window.setTimeout(() => setStage(2), 2600);
    const t3 = window.setTimeout(() => setStage(3), 4200);
    return () => [t1, t2, t3].forEach(window.clearTimeout);
  }, [instant]);

  return (
    <section
      aria-labelledby="celebration-heading"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center"
      style={{ background: "var(--gradient-warm)" }}
    >
      {stage >= 2 && <Confetti />}
      <Particles count={20} />
      <div
        aria-hidden
        className="absolute h-[70vmin] w-[70vmin] rounded-full blur-3xl animate-glow-pulse"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.11 55 / 0.55), transparent 70%)" }}
      />

      {stage < 2 ? (
        <p
          key="its-your-day"
          className="relative font-display text-ink animate-shimmer-in"
          style={{ fontSize: "clamp(2.5rem, 10vw, 6rem)" }}
        >
          It&apos;s Your Day.
        </p>
      ) : (
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center">
          <p className="text-[0.6rem] uppercase tracking-[0.5em] text-ember animate-shimmer-in sm:text-xs">
            Chapter 05 · Celebration
          </p>
          <h2
            id="celebration-heading"
            className="mt-5 font-display uppercase leading-[0.9] text-ink animate-shimmer-in"
            style={{ fontSize: "clamp(2.8rem, 13vw, 9rem)", animationDelay: "0.15s" }}
          >
            Happy Birthday
          </h2>

          {stage >= 3 && (
            <>
              <p
                className="mt-4 font-display text-ember-gradient animate-shimmer-in"
                style={{ fontSize: "clamp(1.8rem, 8vw, 5rem)", animationDelay: "0.1s" }}
              >
                {birthdayConfig.name} <span aria-hidden>❤️</span>
              </p>
              <figure
                className="relative mt-12 w-full max-w-2xl animate-shimmer-in"
                style={{ animationDelay: "0.35s" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-[2.5rem] blur-2xl animate-burst"
                  style={{ background: "oklch(0.82 0.13 50 / 0.55)" }}
                />
                <div className="overflow-hidden rounded-[2rem] border border-cream/60 shadow-[var(--shadow-lift)]">
                  <div className="aspect-4/5 sm:aspect-4/3">
                    <img
                      src={birthdayConfig.photos[1]!.src}
                      alt={birthdayConfig.photos[1]!.alt}
                      className="h-full w-full object-cover object-[50%_22%]"
                    />
                  </div>
                </div>
              </figure>
              <p
                className="mt-10 max-w-lg text-balance text-base text-muted-foreground animate-shimmer-in sm:text-xl"
                style={{ animationDelay: "0.6s" }}
              >
                Today is all about celebrating you.
              </p>
            </>
          )}
        </div>
      )}
    </section>
  );
}

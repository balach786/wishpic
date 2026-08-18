import { ArrowRight } from "lucide-react";
import { Countdown } from "./Countdown";
import { Particles } from "./Particles";
import type { Remaining } from "@/lib/use-countdown";
import { birthdayConfig } from "@/lib/birthday-config";

type Props = {
  remaining: Remaining;
  onOpen: () => void;
  leaving: boolean;
};

export function OpeningScreen({ remaining, onOpen, leaving }: Props) {
  const isDay = remaining.isOver;

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-night px-6 transition-all duration-[1200ms] ${
        leaving ? "scale-[1.06] opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <img
        src={birthdayConfig.photos[4]!.src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center opacity-25 blur-[3px] animate-slow-zoom"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, oklch(0.3 0.05 50 / 0.2), oklch(0.13 0.02 50 / 0.92) 70%)",
        }}
      />
      <Particles count={16} />

      <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
        <p className="mb-4 text-[0.6rem] uppercase tracking-[0.45em] text-cream/45 animate-shimmer-in sm:text-xs">
          {birthdayConfig.dateLabel} · {birthdayConfig.timezoneLabel}
        </p>
        <h1
          className="font-display text-cream animate-shimmer-in"
          style={{ fontSize: "clamp(2.1rem, 7vw, 4.6rem)", lineHeight: 1.05, animationDelay: "0.25s" }}
        >
          I made something just for you<span className="text-ember">.</span>
        </h1>
        <p
          className="mt-5 max-w-md text-balance text-sm text-cream/60 animate-shimmer-in sm:text-lg"
          style={{ animationDelay: "0.7s" }}
        >
          {isDay
            ? "And the right moment has finally arrived."
            : "But you'll have to wait for the right moment."}
        </p>

        <div className="mt-10 flex w-full flex-col items-center animate-shimmer-in" style={{ animationDelay: "1s" }}>
          {!isDay && <Countdown remaining={remaining} />}
          {!isDay && (
            <p className="mt-6 text-xs tracking-wide text-cream/45 sm:text-sm">
              Counting down to your special day…
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="group mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink shadow-[0_20px_60px_-20px_oklch(0.75_0.15_50_/_0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-peach active:translate-y-0 active:scale-[0.98] animate-shimmer-in sm:text-base"
          style={{ animationDelay: "1.3s" }}
        >
          Open Your Surprise
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </button>
        <p className="mt-4 text-[0.65rem] tracking-[0.2em] text-cream/30 uppercase">
          {birthdayConfig.firstName}&apos;s day is almost here
        </p>
      </div>
    </div>
  );
}

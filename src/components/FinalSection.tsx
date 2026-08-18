import { Particles } from "./Particles";
import { Reveal } from "./Reveal";
import { birthdayConfig } from "@/lib/birthday-config";

const lines = ["Keep smiling.", "Keep being you.", "And keep making ordinary moments a little more special."];

export function FinalSection() {
  return (
    <footer className="relative flex min-h-[100svh] items-center overflow-hidden bg-night">
      <img
        src={birthdayConfig.photos[4]!.src}
        alt={birthdayConfig.photos[4]!.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[50%_30%] opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.14 0.02 50 / 0.75), oklch(0.14 0.02 50 / 0.45) 40%, oklch(0.13 0.02 50 / 0.95))",
        }}
      />
      <Particles count={12} />

      <div className="relative mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-8">
        {lines.map((line, i) => (
          <Reveal as="p" key={line} delay={i * 260}>
            <span
              className="block font-display text-cream"
              style={{ fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)", lineHeight: 1.25 }}
            >
              {line}
            </span>
          </Reveal>
        ))}

        <Reveal delay={900} className="mt-16">
          <p className="text-[0.6rem] uppercase tracking-[0.5em] text-cream/45 sm:text-xs">With love,</p>
          <p
            className="mt-5 font-display uppercase tracking-[0.1em] text-ember-gradient"
            style={{ fontSize: "clamp(1.8rem, 8vw, 4.5rem)" }}
          >
            {birthdayConfig.sender}
          </p>
          <span
            aria-hidden
            className="mx-auto mt-10 block h-px w-24"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.8 0.13 50), transparent)" }}
          />
          <p className="mt-8 text-[0.65rem] tracking-[0.3em] uppercase text-cream/25">
            {birthdayConfig.dateLabel}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

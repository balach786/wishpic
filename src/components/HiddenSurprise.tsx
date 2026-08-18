import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { birthdayConfig } from "@/lib/birthday-config";

export function HiddenSurprise() {
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-labelledby="surprise-heading"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--gradient-warm)" }}
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 id="surprise-heading" className="sr-only">
          One last thing
        </h2>

        {!open && (
          <Reveal>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="surprise-panel"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember active:translate-y-0 active:scale-[0.98] sm:text-base"
            >
              <Sparkles className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12" aria-hidden />
              One Last Thing…
            </button>
          </Reveal>
        )}

        <div
          id="surprise-panel"
          hidden={!open}
          className={`transition-all duration-1000 ${open ? "opacity-100" : "opacity-0"}`}
        >
          {open && (
            <div className="flex flex-col items-center">
              <figure
                className="relative w-full max-w-xl animate-shimmer-in"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
                  <div className="aspect-4/5 sm:aspect-4/3">
                    <img
                      src={birthdayConfig.photos[0]!.src}
                      alt={birthdayConfig.photos[0]!.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-[50%_28%]"
                    />
                  </div>
                </div>
              </figure>
              <p
                className="mt-12 max-w-2xl text-balance font-display text-2xl leading-snug text-ink animate-shimmer-in sm:text-4xl"
                style={{ animationDelay: "0.9s" }}
              >
                No matter how many pictures there are, some people are simply impossible to capture in one frame.
              </p>
              <p
                className="mt-8 font-display text-xl text-ember animate-shimmer-in sm:text-3xl"
                style={{ animationDelay: "1.7s" }}
              >
                Happy Birthday, {birthdayConfig.firstName} <span aria-hidden>❤️</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

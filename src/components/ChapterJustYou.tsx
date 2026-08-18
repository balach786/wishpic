import { Reveal } from "./Reveal";
import { birthdayConfig } from "@/lib/birthday-config";

const [p1, p2, p3, p4, p5] = birthdayConfig.photos;

export function ChapterJustYou() {
  return (
    <section aria-labelledby="chapter-just-you" className="relative overflow-hidden bg-cream py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.6rem] uppercase tracking-[0.45em] text-ember sm:text-xs">Chapter 01</p>
          <h2
            id="chapter-just-you"
            className="mt-4 font-display text-ink"
            style={{ fontSize: "clamp(2.6rem, 11vw, 7rem)", lineHeight: 0.95 }}
          >
            Just You<span className="text-ember">.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            No filters on the feeling. Just a few frames of someone worth celebrating.
          </p>
        </Reveal>

        {/* Full-bleed portrait */}
        <Reveal delay={100} className="mt-16 sm:mt-24">
          <figure className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
            <div className="aspect-4/5 w-full sm:aspect-16/10">
              <img
                src={p1!.src}
                alt={p1!.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[50%_30%] transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
              />
            </div>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 to-transparent p-6 font-display text-xl text-cream sm:p-10 sm:text-3xl">
              Candlelight suits you.
            </figcaption>
          </figure>
        </Reveal>

        {/* Split screen */}
        <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-12">
          <Reveal className="sm:col-span-7">
            <div className="overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-soft)]">
              <div className="aspect-4/5 sm:aspect-4/3">
                <img
                  src={p2!.src}
                  alt={p2!.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_25%]"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={150} className="flex items-center sm:col-span-5">
            <blockquote className="surface-glass rounded-[1.75rem] p-7 sm:p-10">
              <p className="font-display text-2xl leading-snug text-ink sm:text-4xl">
                Some people don&apos;t need an occasion to be the best part of the room.
              </p>
              <footer className="mt-6 text-[0.6rem] uppercase tracking-[0.35em] text-ember">
                For {birthdayConfig.firstName}
              </footer>
            </blockquote>
          </Reveal>
        </div>

        {/* Overlapping editorial pair */}
        <div className="relative mt-14 sm:mt-24">
          <Reveal>
            <div className="overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-soft)] sm:mr-[22%]">
              <div className="aspect-16/10">
                <img
                  src={p3!.src}
                  alt={p3!.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[45%_35%]"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={220} className="mt-6 sm:absolute sm:-bottom-16 sm:right-0 sm:mt-0 sm:w-[36%]">
            <div className="overflow-hidden rounded-[1.5rem] border border-peach/40 shadow-[var(--shadow-lift)] animate-float-soft">
              <div className="aspect-3/4">
                <img
                  src={p4!.src}
                  alt={p4!.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_25%]"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-10 sm:mt-40">
          <figure className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem]">
            <div className="aspect-16/9">
              <img
                src={p5!.src}
                alt={p5!.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="mt-5 text-center text-sm italic text-muted-foreground">
              Warm light, quiet mood — exactly your kind of frame.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

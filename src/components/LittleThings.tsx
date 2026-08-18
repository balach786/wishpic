import { Reveal } from "./Reveal";
import { birthdayConfig } from "@/lib/birthday-config";

export function LittleThings() {
  return (
    <section
      aria-labelledby="chapter-little-things"
      className="relative overflow-hidden py-24 sm:py-36"
      style={{ background: "var(--gradient-warm)" }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[0.6rem] uppercase tracking-[0.45em] text-ember sm:text-xs">Chapter 02</p>
          <h2
            id="chapter-little-things"
            className="mt-4 font-display text-ink"
            style={{ fontSize: "clamp(2.1rem, 6.5vw, 4.5rem)", lineHeight: 1.02 }}
          >
            Little Things That Make You, You.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {birthdayConfig.littleThings.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 110} className="list-none">
              <article className="group h-full rounded-[1.5rem] border border-peach/40 bg-card/70 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] sm:p-9">
                <span className="font-display text-sm text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-2xl text-ink sm:text-3xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <span
                  aria-hidden
                  className="mt-6 block h-px w-10 bg-ember transition-all duration-500 group-hover:w-20"
                />
              </article>
            </Reveal>
          ))}
          <Reveal as="li" delay={birthdayConfig.littleThings.length * 110} className="list-none">
            <div className="flex h-full flex-col justify-center rounded-[1.5rem] bg-ink p-9 text-cream">
              <p className="font-display text-2xl leading-snug sm:text-3xl">
                And a hundred other things there isn&apos;t room to write.
              </p>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

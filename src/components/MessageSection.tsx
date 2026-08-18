import { Reveal } from "./Reveal";
import { birthdayConfig } from "@/lib/birthday-config";

export function MessageSection() {
  return (
    <section aria-labelledby="message-heading" className="relative overflow-hidden bg-cream py-24 sm:py-36">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.45em] text-ember sm:text-xs">From me to you</p>
          <h2
            id="message-heading"
            className="mt-4 font-display text-ink"
            style={{ fontSize: "clamp(2rem, 6.5vw, 4rem)", lineHeight: 1.05 }}
          >
            A Little Message For You
          </h2>
        </Reveal>

        <div className="mt-14 space-y-7 sm:mt-20">
          {birthdayConfig.message.map((para, i) => (
            <Reveal as="p" key={para} delay={i * 90}>
              <span
                className={
                  i === 0
                    ? "block font-display text-3xl leading-snug text-ink sm:text-4xl"
                    : "block text-base leading-[1.85] text-muted-foreground sm:text-lg"
                }
              >
                {para}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "./Reveal";
import { birthdayConfig } from "@/lib/birthday-config";

const layouts = [
  "portrait-left",
  "wide-center",
  "portrait-right",
] as const;

export function Moments() {
  const captions = birthdayConfig.moments;
  const photos = [birthdayConfig.photos[3], birthdayConfig.photos[0], birthdayConfig.photos[1]];

  return (
    <section aria-labelledby="chapter-moments" className="relative overflow-hidden bg-cream py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.6rem] uppercase tracking-[0.45em] text-ember sm:text-xs">Chapter 03</p>
          <h2
            id="chapter-moments"
            className="mt-4 font-display text-ink"
            style={{ fontSize: "clamp(2.4rem, 8vw, 5.5rem)", lineHeight: 1 }}
          >
            Moments
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-36">
          {captions.map((caption, i) => {
            const layout = layouts[i % layouts.length];
            const photo = photos[i % photos.length]!;
            const imageBlock = (
              <div
                className={`overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-soft)] ${
                  layout === "wide-center" ? "aspect-16/9" : "aspect-3/4"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_28%] transition-transform duration-[1600ms] ease-out hover:scale-105"
                />
              </div>
            );
            const textBlock = (
              <p className="font-display text-3xl leading-tight text-ink sm:text-5xl">{caption}</p>
            );

            if (layout === "wide-center") {
              return (
                <Reveal key={caption} className="mx-auto max-w-4xl text-center">
                  {imageBlock}
                  <div className="mt-8">{textBlock}</div>
                </Reveal>
              );
            }

            return (
              <Reveal key={caption}>
                <div
                  className={`grid items-center gap-8 sm:grid-cols-2 sm:gap-14 ${
                    layout === "portrait-right" ? "sm:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {imageBlock}
                  <div>
                    {textBlock}
                    <span aria-hidden className="mt-6 block h-px w-16 bg-ember" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

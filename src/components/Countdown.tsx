import type { Remaining } from "@/lib/use-countdown";

const pad = (n: number, len = 2) => String(n).padStart(len, "0");

export function Countdown({ remaining, dark = true }: { remaining: Remaining; dark?: boolean }) {
  const units = [
    { label: "Days", value: pad(remaining.days) },
    { label: "Hours", value: pad(remaining.hours) },
    { label: "Minutes", value: pad(remaining.minutes) },
    { label: "Seconds", value: pad(remaining.seconds) },
  ];

  return (
    <div
      className="grid w-full max-w-2xl grid-cols-4 gap-2 sm:gap-4"
      role="timer"
      aria-live="off"
      aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds remaining`}
    >
      {units.map((u) => (
        <div
          key={u.label}
          className={`relative flex flex-col items-center justify-center rounded-2xl px-1 py-4 sm:rounded-3xl sm:px-3 sm:py-7 ${
            dark ? "surface-glass-dark" : "surface-glass"
          }`}
        >
          <span
            aria-hidden
            className="absolute inset-x-6 -top-px h-px"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.8 0.13 50 / 0.7), transparent)" }}
          />
          <span
            className={`font-display text-3xl leading-none tabular-nums sm:text-6xl ${
              dark ? "text-cream" : "text-ink"
            }`}
            style={{ textShadow: dark ? "0 0 40px oklch(0.75 0.14 50 / 0.35)" : "none" }}
          >
            {u.value}
          </span>
          <span
            className={`mt-2 text-[0.55rem] uppercase tracking-[0.28em] sm:mt-3 sm:text-[0.65rem] ${
              dark ? "text-cream/55" : "text-muted-foreground"
            }`}
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}

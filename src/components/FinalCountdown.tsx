import { useEffect, useState } from "react";

/** Full-screen cinematic 10 → 1 anticipation overlay. */
export function FinalCountdown({ seconds }: { seconds: number }) {
  const [key, setKey] = useState(seconds);
  useEffect(() => setKey(seconds), [seconds]);

  const intensity = Math.min(1, (10 - seconds) / 9);
  const focus = seconds <= 1;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-night transition-all duration-700"
      style={{ backdropFilter: `blur(${8 + intensity * 14}px)` }}
      role="status"
      aria-live="assertive"
      aria-label={`${seconds} seconds remaining`}
    >
      <div
        aria-hidden
        className="absolute rounded-full blur-3xl transition-all duration-1000"
        style={{
          width: `${340 + intensity * 460}px`,
          height: `${340 + intensity * 460}px`,
          opacity: 0.28 + intensity * 0.5,
          background: "radial-gradient(circle, oklch(0.78 0.15 50 / 0.75), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center px-6 text-center">
        <p
          className="mb-6 text-[0.6rem] uppercase tracking-[0.5em] text-cream/50 transition-opacity duration-700 sm:text-xs"
          style={{ opacity: focus ? 0 : 1 - intensity * 0.6 }}
        >
          The moment is almost here
        </p>
        <span
          key={key}
          className="font-display tabular-nums text-cream animate-shimmer-in"
          style={{
            fontSize: `clamp(6rem, ${28 + intensity * 14}vw, ${18 + intensity * 12}rem)`,
            lineHeight: 0.85,
            textShadow: `0 0 ${40 + intensity * 120}px oklch(0.8 0.15 50 / ${0.4 + intensity * 0.5})`,
          }}
        >
          {seconds}
        </span>
      </div>
    </div>
  );
}

import { useMemo } from "react";

type Props = { count?: number; tone?: "warm" | "light"; className?: string };

export function Particles({ count = 18, tone = "warm", className = "" }: Props) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        size: 2 + ((i * 13) % 5),
        delay: (i * 1.37) % 14,
        duration: 14 + ((i * 7) % 12),
        drift: ((i % 7) - 3) * 26,
      })),
    [count],
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: tone === "warm" ? "oklch(0.85 0.12 60)" : "oklch(0.99 0.02 80)",
            boxShadow: `0 0 ${p.size * 4}px oklch(0.8 0.14 55 / 0.8)`,
            ["--drift-x" as string]: `${p.drift}px`,
            animation: `drift-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Confetti({ count = 46 }: { count?: number }) {
  const colors = [
    "oklch(0.71 0.16 44)",
    "oklch(0.88 0.07 55)",
    "oklch(0.9 0.045 24)",
    "oklch(0.97 0.02 80)",
    "oklch(0.8 0.1 30)",
  ];
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 53) % 100,
        delay: (i % 12) * 0.35,
        duration: 5 + ((i * 3) % 5),
        drift: ((i % 9) - 4) * 30,
        color: colors[i % colors.length],
        w: 5 + (i % 4),
        h: 9 + (i % 7),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {items.map((c) => (
        <span
          key={c.id}
          className="absolute top-0 rounded-[2px]"
          style={{
            left: `${c.left}%`,
            width: c.w,
            height: c.h,
            background: c.color,
            opacity: 0.9,
            ["--drift-x" as string]: `${c.drift}px`,
            animation: `confetti-fall ${c.duration}s linear ${c.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

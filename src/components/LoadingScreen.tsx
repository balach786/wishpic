import { useEffect, useRef, useState } from "react";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const a = window.setTimeout(() => setLeaving(true), 2100);
    const b = window.setTimeout(() => doneRef.current(), 3000);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-night transition-opacity duration-[900ms] ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <div
        aria-hidden
        className="absolute h-[420px] w-[420px] rounded-full opacity-40 blur-3xl animate-glow-pulse"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.15 45 / 0.5), transparent 70%)" }}
      />
      <div className="relative px-6 text-center">
        <p className="font-display text-2xl text-cream animate-shimmer-in sm:text-4xl">
          Creating a little something special
          <span className="inline-flex w-8 justify-start">
            <Dots />
          </span>
        </p>
        <div className="mx-auto mt-8 h-px w-40 overflow-hidden bg-cream/15">
          <span
            className="block h-full w-full origin-left bg-ember"
            style={{ animation: "shimmer-in 2.2s ease-out both", transform: "scaleX(1)" }}
          />
        </div>
      </div>
    </div>
  );
}

function Dots() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setN((v) => (v + 1) % 4), 420);
    return () => window.clearInterval(id);
  }, []);
  return <span aria-hidden>{".".repeat(n)}</span>;
}

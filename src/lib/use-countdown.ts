import { useEffect, useRef, useState } from "react";

export type Remaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
};

function compute(target: number): Remaining {
  const total = Math.max(0, target - Date.now());
  const s = Math.floor(total / 1000);
  return {
    total,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    isOver: total <= 0,
  };
}

/** Real-time countdown to a fixed UTC timestamp (timezone independent). */
export function useCountdown(target: number): Remaining {
  const [state, setState] = useState<Remaining>(() => compute(target));
  const raf = useRef<number | null>(null);

  useEffect(() => {
    let last = -1;
    const tick = () => {
      const next = compute(target);
      if (next.total !== last) {
        last = next.total;
        setState((prev) =>
          prev.seconds === next.seconds &&
          prev.minutes === next.minutes &&
          prev.hours === next.hours &&
          prev.days === next.days &&
          prev.isOver === next.isOver
            ? prev
            : next,
        );
      }
      raf.current = window.requestAnimationFrame(tick);
    };
    raf.current = window.requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) window.cancelAnimationFrame(raf.current);
    };
  }, [target]);

  return state;
}

import type { ReactNode } from "react";
import { useReveal } from "@/lib/use-reveal";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "figure" | "li" | "p";
};

export function Reveal({ children, delay = 0, className = "", as = "div" }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.15);
  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={`reveal-base ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

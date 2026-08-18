import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "subtle";
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = "surface", hover = false, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[1.25rem] border transition-colors duration-200",
        variant === "surface" &&
          "border-[color:var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)] shadow-[0_12px_30px_rgba(25,28,29,0.06)]",
        variant === "subtle" &&
          "border-[color:var(--outline-variant)] bg-[var(--surface-container-low)] text-[var(--on-surface)]",
        hover && "hover:border-[color:var(--primary)] hover:shadow-[0_14px_32px_rgba(139,26,26,0.08)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

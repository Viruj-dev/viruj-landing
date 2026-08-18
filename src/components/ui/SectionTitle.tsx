import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionTitleProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  className,
  eyebrow,
  title,
  description,
  align = "left",
  ...props
}: SectionTitleProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={cn("flex max-w-3xl flex-col gap-3", alignment, className)} {...props}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-[-0.04em] text-[var(--on-surface)]">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

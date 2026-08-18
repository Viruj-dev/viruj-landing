import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type DeviceFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function DeviceFrame({ className, children, ...props }: DeviceFrameProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[color:var(--outline-variant)] bg-[var(--surface-container-lowest)] p-5 shadow-[0_28px_70px_rgba(25,28,29,0.14)]",
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex items-center gap-2 border-b border-[color:var(--outline-variant)] pb-4">
        <span className="h-3 w-3 rounded-full bg-[var(--primary)]/80" />
        <span className="h-3 w-3 rounded-full bg-[var(--secondary)]/40" />
        <span className="h-3 w-3 rounded-full bg-[var(--outline)]/40" />
      </div>
      {children}
    </div>
  );
}

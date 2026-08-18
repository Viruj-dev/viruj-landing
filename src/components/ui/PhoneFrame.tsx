import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PhoneFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function PhoneFrame({ className, children, ...props }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[color:var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4 shadow-[0_24px_60px_rgba(25,28,29,0.14)]",
        className,
      )}
      {...props}
    >
      <div className="rounded-[1.5rem] border border-[color:var(--outline-variant)] bg-[linear-gradient(180deg,var(--surface-container-low),var(--surface-container-lowest))] p-4">
        {children}
      </div>
    </div>
  );
}

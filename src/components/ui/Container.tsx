import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Container({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full min-w-0 max-w-7xl px-5 sm:px-6 lg:px-8", className)}
        {...props}
      />
    );
  },
);

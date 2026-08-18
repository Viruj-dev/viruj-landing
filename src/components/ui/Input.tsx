import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "ghost";
  fullWidth?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      fullWidth = false,
      error,
      label,
      helperText,
      id,
      ...props
    },
    ref,
  ) => {
    const variantStyles = {
      default:
        "border-[color:var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)] focus-visible:ring-[var(--primary)]",
      ghost:
        "border-x-0 border-t-0 border-b-[color:var(--outline-variant)] bg-transparent text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)] focus-visible:ring-0",
    };

    return (
      <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
        {label ? (
          <label htmlFor={id} className="text-sm font-semibold text-[var(--on-surface-variant)]">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={id}
          className={cn(
            "rounded-xl border px-4 py-3 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
            variantStyles[variant],
            error && "border-[#b42318] focus-visible:ring-[#b42318]",
            fullWidth && "w-full",
            className,
          )}
          {...props}
        />
        {error ? (
          <span className="text-sm font-medium text-[#b42318]">{error}</span>
        ) : helperText ? (
          <span className="text-sm text-[var(--on-surface-variant)]">{helperText}</span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

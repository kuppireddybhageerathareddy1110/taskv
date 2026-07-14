// src/components/ui/Badge.tsx
import * as React from "react";

interface BadgeProps extends React.ComponentProps<'span'> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const Badge = React.forwardRef<
  HTMLSpanElement,
  BadgeProps
>(({ variant = "default", size = "default", className = "", ...props }, ref) => {
  // Base classes
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

  // Variant classes
  const variantClasses = {
    default: "border-transparent bg-[var(--color-primary)] text-[var(--color-on-primary)]",
    secondary: "border-transparent bg-[var(--color-secondary)] text-[var(--color-on-primary)]",
    destructive: "border-[var(--color-error)] text-[var(--color-error)] bg-[var(--color-error)/10]",
    outline: "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)]",
    success: "border-[var(--color-success)] text-[var(--color-success)] bg-[var(--color-success)/10]",
    warning: "border-[var(--color-warning)] text-[var(--color-warning)] bg-[var(--color-warning)/10]",
  }[variant];

  // Size classes
  const sizeClasses = {
    default: "",
    sm: "",
    lg: "",
    icon: "h-6 w-6",
  }[size];

  return (
    <span
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
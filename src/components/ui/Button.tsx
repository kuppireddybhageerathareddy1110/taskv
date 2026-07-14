// src/components/ui/Button.tsx
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  className?: string;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({
  variant = "default",
  size = "default",
  asChild = false,
  className = "",
  ...props
}, ref) => {
  const Composer = asChild ? "span" : "button";

  // Base classes
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  // Variant classes
  const variantClasses = {
    default: "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-secondary)]",
    destructive: "bg-[var(--color-error)] text-[var(--color-on-primary)] hover:bg-[var(--color-error)/90]",
    outline: "border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
    secondary: "bg-[var(--color-secondary)] text-[var(--color-on-primary)] hover:bg-[var(--color-muted)]",
    ghost: "hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
    link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
  }[variant];

  // Size classes
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10 p-0",
  }[size];

  return (
    <Composer
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
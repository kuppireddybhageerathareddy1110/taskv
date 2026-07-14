// src/components/ui/Card.tsx
import * as React from "react";

interface CardProps extends React.ComponentProps<'div'> {
  className?: string;
  variant?: "default" | "elevated" | "outlined";
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className = "", variant = "default", ...props }, ref) => {
  // Base classes
  const baseClasses = "glass transition-enhanced hover-lift";

  // Variant classes
  const variantClasses = {
    default: "",
    elevated: "hover:shadow-lg",
    outlined: "border border-border/50",
  }[variant];

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Card.displayName = "Card";

export default Card;
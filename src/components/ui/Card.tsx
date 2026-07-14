// src/components/ui/Card.tsx
import * as React from "react";

interface CardProps extends React.DivHTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className = "", ...props }, ref) => {
  return (
    <div
      className={`bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg shadow-sm ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Card.displayName = "Card";

export { Card };
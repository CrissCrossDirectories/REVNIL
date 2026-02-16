import * as React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const spinnerSize = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
} as const;

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span className="sr-only">Loading</span>
      <span
        className={cn(
          "inline-block animate-spin rounded-full border-primary border-t-transparent",
          spinnerSize[size]
        )}
      />
    </div>
  );
}

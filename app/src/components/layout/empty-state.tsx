import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed bg-card px-6 py-10 text-center shadow-soft",
        className
      )}
      {...props}
    >
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}


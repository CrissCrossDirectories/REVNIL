import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  guidance?: string;
  metadata?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  guidance,
  metadata,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card px-6 py-10 text-center shadow-soft ring-1 ring-border/60",
        className
      )}
      {...props}
    >
      <p className="eyebrow-label">Action Guidance</p>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
      {guidance ? <p className="mx-auto mt-2 max-w-2xl text-sm text-foreground">{guidance}</p> : null}
      {metadata ? <p className="mt-3 text-xs text-muted-foreground">{metadata}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

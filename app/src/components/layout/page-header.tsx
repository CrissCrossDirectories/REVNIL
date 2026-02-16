import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  metadata?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  metadata,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-start md:justify-between",
        className
      )}
      {...props}
    >
      <div className="space-y-2">
        {eyebrow ? <p className="eyebrow-label">{eyebrow}</p> : null}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle ? <p className="max-w-4xl text-sm text-muted-foreground">{subtitle}</p> : null}
        {metadata ? <div className="confidence-meta">{metadata}</div> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

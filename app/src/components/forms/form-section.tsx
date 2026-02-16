import * as React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function FormSection({
  title,
  description,
  className,
  children,
  ...props
}: FormSectionProps) {
  return (
    <section className={cn("space-y-4", className)} {...props}>
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}


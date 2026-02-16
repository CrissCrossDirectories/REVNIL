import * as React from "react";
import { cn } from "@/lib/utils";
import { FormDescription, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const control = React.isValidElement(children)
    ? React.cloneElement(children, {
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      } as Record<string, unknown>)
    : children;

  return (
    <FormItem className={cn(className)}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>
      {control}
      {hint ? <FormDescription id={hintId}>{hint}</FormDescription> : null}
      {error ? <FormMessage id={errorId}>{error}</FormMessage> : null}
    </FormItem>
  );
}


/**
 * General Utilities
 *
 * Shared utility functions used across the REVNIL frontend.
 * This file will grow as the application develops.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally join class names together.
 * A lightweight alternative to clsx/classnames — will be replaced
 * by the cn() utility from shadcn/ui in subtask 0.5.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a currency value for display.
 * Defaults to USD formatting.
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Format a date for display.
 * Defaults to medium date style.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(d);
}

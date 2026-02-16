"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import type { TenantRole } from "@/lib/auth/claims";

interface NavItem {
  label: string;
  href: string;
  roles?: TenantRole[];
}

const navItems: NavItem[] = [
  { label: "Executive Brief", href: "/dashboard" },
  {
    label: "GM Operations",
    href: "/dashboard/gm",
    roles: ["org_admin", "ad_leadership", "coach", "staff"],
  },
  {
    label: "Collective Pipeline",
    href: "/dashboard/collective",
    roles: ["org_admin", "ad_leadership", "staff"],
  },
  {
    label: "Athlete Portfolio",
    href: "/dashboard/athlete",
    roles: ["org_admin", "ad_leadership", "coach", "staff", "athlete"],
  },
  {
    label: "Cross-Stakeholder Connect",
    href: "/dashboard/connect",
    roles: ["org_admin", "ad_leadership", "coach", "staff", "athlete"],
  },
  {
    label: "Org Governance",
    href: "/dashboard/admin",
    roles: ["org_admin", "ad_leadership"],
  },
  {
    label: "Sport Access Matrix",
    href: "/dashboard/access",
    roles: ["org_admin", "ad_leadership", "coach", "staff"],
  },
  {
    label: "Org Configuration",
    href: "/dashboard/organization",
    roles: ["org_admin", "ad_leadership"],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { claims } = useAuth();

  const visibleNavItems = navItems.filter((item) => {
    if (!item.roles || item.roles.length === 0) {
      return true;
    }

    return claims?.role ? item.roles.includes(claims.role) : false;
  });

  return (
    <aside className="hidden w-64 bg-card ring-1 ring-border/60 md:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="px-6 py-6">
          <p className="eyebrow-label">REVNIL</p>
          <p className="mt-1 text-lg font-semibold text-foreground">Athletics Command</p>
          <p className="mt-1 text-xs text-muted-foreground">Role-scoped decisions and compliance actions</p>
        </div>

        <nav aria-label="Primary" className="flex-1 space-y-1 px-3 pb-4">
          {visibleNavItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "motion-standard block rounded-lg px-3 py-2 text-sm font-medium",
                  active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

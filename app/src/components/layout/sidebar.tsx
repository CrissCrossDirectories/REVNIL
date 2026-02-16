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
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "GM",
    href: "/dashboard/gm",
    roles: ["org_admin", "ad_leadership", "coach", "staff"],
  },
  {
    label: "Collective",
    href: "/dashboard/collective",
    roles: ["org_admin", "ad_leadership", "staff"],
  },
  {
    label: "Athlete",
    href: "/dashboard/athlete",
    roles: ["org_admin", "ad_leadership", "coach", "staff", "athlete"],
  },
  {
    label: "Connect",
    href: "/dashboard/connect",
    roles: ["org_admin", "ad_leadership", "coach", "staff", "athlete"],
  },
  {
    label: "Organization Admin",
    href: "/dashboard/admin",
    roles: ["org_admin", "ad_leadership"],
  },
  {
    label: "Sports Access",
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
    <aside className="hidden w-64 border-r bg-card md:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b px-6 py-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">REVNIL</p>
          <p className="mt-1 text-lg font-semibold text-foreground">Control Center</p>
        </div>

        <nav aria-label="Primary" className="flex-1 space-y-1 p-3">
          {visibleNavItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
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

"use client";

import { useMemo } from "react";
import { useAuth } from "@/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
  const { user, claims, signOut } = useAuth();

  const initials = useMemo(() => {
    const name = user?.displayName ?? user?.email ?? "REVNIL";
    return name
      .split(" ")
      .slice(0, 2)
      .map((chunk) => chunk.charAt(0).toUpperCase())
      .join("");
  }, [user?.displayName, user?.email]);

  async function handleSignOut() {
    await signOut();
    window.location.assign("/login");
  }

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-muted-foreground">REVNIL Platform</p>
          {claims?.role ? <Badge variant="secondary">{claims.role}</Badge> : null}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label="Open account menu"
              className="gap-2"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                {initials || "NR"}
              </span>
              <span className="hidden text-sm md:inline">{user?.email ?? "Account"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem disabled>{user?.email ?? "Unknown user"}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}


"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { canAccessRoute, type RoutePolicy } from "@/lib/auth/policies";
import { useAuth } from "@/providers/auth-provider";
import { Spinner } from "@/components/ui/spinner";
import { createRequestId, getOrCreateSessionId, logWarn } from "@/lib/observability/logger";

interface AuthGuardProps {
  children: ReactNode;
  policy: RoutePolicy;
}

export function AuthGuard({ children, policy }: AuthGuardProps) {
  const { user, loading, claims } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const sessionId = getOrCreateSessionId();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      const nextParam = encodeURIComponent(pathname || "/dashboard");
      logWarn({
        event: "auth.guard.redirect.unauthenticated",
        module: "auth-guard",
        sessionId,
        requestId: createRequestId(),
        data: {
          path: pathname,
          policyRoles: policy.roles,
        },
      });
      router.replace(`/login?next=${nextParam}`);
      return;
    }

    if (!canAccessRoute(claims, policy)) {
      logWarn({
        event: "auth.guard.redirect.forbidden",
        module: "auth-guard",
        sessionId,
        requestId: createRequestId(),
        uid: user.uid,
        tenantType: claims?.tenantType,
        tenantId: claims?.tenantId,
        role: claims?.role,
        data: {
          path: pathname,
          policyRoles: policy.roles,
        },
      });
      router.replace("/login?error=insufficient_permissions");
    }
  }, [loading, user, claims, policy, router, pathname, sessionId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-6 text-sm text-muted-foreground">
        <Spinner size="sm" />
        Checking session…
      </div>
    );
  }

  if (!user || !canAccessRoute(claims, policy)) {
    return null;
  }

  return <>{children}</>;
}

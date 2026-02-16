import type { AuthClaims, TenantRole } from "@/lib/auth/claims";

export interface RoutePolicy {
  allowAnonymous?: boolean;
  roles?: readonly TenantRole[];
  tenantIds?: readonly string[];
  sportIds?: readonly string[];
  athleteId?: string;
}

export function hasAnyRole(
  claims: AuthClaims | null | undefined,
  allowedRoles: TenantRole[]
): boolean {
  if (!claims) {
    return false;
  }

  return allowedRoles.includes(claims.role);
}

export function canAccessRoute(
  claims: AuthClaims | null | undefined,
  policy: RoutePolicy
): boolean {
  if (policy.allowAnonymous) {
    return true;
  }

  if (!claims) {
    return false;
  }

  if (policy.roles && policy.roles.length > 0 && !policy.roles.includes(claims.role)) {
    return false;
  }

  if (policy.tenantIds && policy.tenantIds.length > 0) {
    const scope = new Set([claims.tenantId, ...(claims.linkedTenants ?? [])]);
    const hasAllowedTenant = policy.tenantIds.some((tenantId) => scope.has(tenantId));

    if (!hasAllowedTenant) {
      return false;
    }
  }

  if (policy.sportIds && policy.sportIds.length > 0) {
    if (claims.role === "org_admin" || claims.role === "ad_leadership") {
      return true;
    }

    const assignedSports = new Set(claims.sportIds ?? []);
    const hasAllowedSport = policy.sportIds.some((sportId) => assignedSports.has(sportId));

    if (!hasAllowedSport) {
      return false;
    }
  }

  if (policy.athleteId) {
    if (claims.role === "athlete") {
      return claims.athleteId === policy.athleteId;
    }
  }

  return true;
}

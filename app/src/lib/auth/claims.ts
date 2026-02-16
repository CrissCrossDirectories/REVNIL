export const TENANT_TYPES = [
  "institution",
  "collective",
  "athlete",
  "agent",
] as const;

export const TENANT_ROLES = [
  "org_admin",
  "ad_leadership",
  "coach",
  "staff",
  "athlete",
] as const;

export type TenantType = (typeof TENANT_TYPES)[number];
export type TenantRole = (typeof TENANT_ROLES)[number];

export interface AuthClaims {
  tenantType: TenantType;
  tenantId: string;
  role: TenantRole;
  linkedTenants?: string[];
  sportIds?: string[];
  athleteId?: string;
}

export function isAuthClaims(value: unknown): value is AuthClaims {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  if (
    !TENANT_TYPES.includes(record.tenantType as TenantType) ||
    typeof record.tenantId !== "string" ||
    record.tenantId.trim().length === 0 ||
    !TENANT_ROLES.includes(record.role as TenantRole)
  ) {
    return false;
  }

  if (
    record.linkedTenants !== undefined &&
    (!Array.isArray(record.linkedTenants) ||
      record.linkedTenants.some(
        (tenantId) => typeof tenantId !== "string" || tenantId.trim().length === 0
      ))
  ) {
    return false;
  }

  if (
    record.sportIds !== undefined &&
    (!Array.isArray(record.sportIds) ||
      record.sportIds.some(
        (sportId) => typeof sportId !== "string" || sportId.trim().length === 0
      ))
  ) {
    return false;
  }

  if (
    record.athleteId !== undefined &&
    (typeof record.athleteId !== "string" || record.athleteId.trim().length === 0)
  ) {
    return false;
  }

  return true;
}

export function claimsFromTokenClaims(tokenClaims: unknown): AuthClaims | null {
  if (!tokenClaims || typeof tokenClaims !== "object") {
    return null;
  }

  const source = tokenClaims as Record<string, unknown>;
  const candidate: unknown = {
    tenantType: source.tenantType,
    tenantId: source.tenantId,
    role: source.role,
    linkedTenants: source.linkedTenants,
    sportIds: source.sportIds,
    athleteId: source.athleteId,
  };

  return isAuthClaims(candidate) ? candidate : null;
}

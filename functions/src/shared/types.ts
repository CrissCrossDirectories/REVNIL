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

export interface TenantClaims {
  tenantType: TenantType;
  tenantId: string;
  role: TenantRole;
  linkedTenants?: string[];
  sportIds?: string[];
  athleteId?: string;
}

export interface PlatformClaims extends TenantClaims {
  platformAdmin?: boolean;
}

export interface RequestAuthContext {
  uid: string;
  email?: string;
  claims: PlatformClaims;
  token: Record<string, unknown>;
}

export interface FirestoreBase {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InstitutionProfile extends FirestoreBase {
  institutionId: string;
  name: string;
  conference?: string;
  division?: string;
}

export interface InstitutionConfig extends FirestoreBase {
  institutionId: string;
  timezone?: string;
  fiscalYearStartMonth?: number;
  features?: Record<string, boolean>;
}

export interface InstitutionRosterEntry extends FirestoreBase {
  institutionId: string;
  athleteId: string;
  sport: string;
  status: "active" | "inactive" | "transferred";
}

export interface InstitutionCapManagement extends FirestoreBase {
  institutionId: string;
  category: string;
  amount: number;
  effectiveDate: string;
}

export interface InstitutionTitleIX extends FirestoreBase {
  institutionId: string;
  reportingPeriod: string;
  notes?: string;
}

export interface InstitutionRiskAlert extends FirestoreBase {
  institutionId: string;
  athleteId?: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved";
  reason: string;
}

export interface InstitutionImport extends FirestoreBase {
  institutionId: string;
  source: string;
  fileName: string;
  status: "pending" | "processing" | "completed" | "failed";
}

export interface CollectiveProfile extends FirestoreBase {
  collectiveId: string;
  name: string;
  institutionId?: string;
}

export interface CollectiveDeal extends FirestoreBase {
  collectiveId: string;
  athleteId: string;
  institutionId?: string;
  status: "draft" | "proposed" | "active" | "completed" | "cancelled";
  value?: number;
  startDate?: string;
  endDate?: string;
}

export interface CollectiveActivation extends FirestoreBase {
  collectiveId: string;
  dealId?: string;
  athleteId?: string;
  activationType: string;
  scheduledAt?: string;
  status: "planned" | "live" | "done" | "cancelled";
}

export interface CollectiveDonor extends FirestoreBase {
  collectiveId: string;
  displayName: string;
  tier?: string;
  status: "active" | "inactive";
}

export interface CollectiveFinancial extends FirestoreBase {
  collectiveId: string;
  period: string;
  category: string;
  amount: number;
}

export interface AthleteProfile extends FirestoreBase {
  athleteId: string;
  fullName: string;
  sport?: string;
  institutionId?: string;
}

export interface AthleteIncome extends FirestoreBase {
  athleteId: string;
  sourceType: "collective" | "brand" | "appearance" | "other";
  amount: number;
  receivedAt?: string;
}

export interface AthleteDeal extends FirestoreBase {
  athleteId: string;
  collectiveId?: string;
  institutionId?: string;
  status: "draft" | "active" | "completed" | "cancelled";
  value?: number;
}

export interface AthleteConsent extends FirestoreBase {
  athleteId: string;
  tenantType: "institution" | "collective" | "agent";
  tenantId: string;
  granted: boolean;
  revoked?: boolean;
  permissions?: {
    readProfile?: boolean;
    readDeals?: boolean;
    readAll?: boolean;
  };
  readProfile?: boolean;
  readDeals?: boolean;
  expiresAt?: string;
}

export interface ConnectConversation extends FirestoreBase {
  conversationId: string;
  participantUids: string[];
  tenantRefs?: string[];
  lastMessageAt?: string;
}

export interface ConnectMessage extends FirestoreBase {
  conversationId: string;
  senderUid: string;
  body: string;
  sentAt: string;
}

export interface ConnectNotification extends FirestoreBase {
  userId: string;
  type: string;
  title: string;
  read: boolean;
}

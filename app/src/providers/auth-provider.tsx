"use client";

import {
  onAuthStateChanged,
  type IdTokenResult,
  type User,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getAuthInstance,
  initializeClientAuth,
  signInWithEmailPassword,
  signInWithGoogleProvider,
  signOutUser,
} from "@/lib/firebase/auth";
import {
  claimsFromTokenClaims,
  type AuthClaims,
} from "@/lib/auth/claims";
import {
  createRequestId,
  getOrCreateSessionId,
  logAudit,
  logInfo,
} from "@/lib/observability/logger";
import { reportAppError } from "@/lib/observability/errors";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  claims: AuthClaims | null;
  signInWithEmailPassword: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
  refreshClaims: () => Promise<AuthClaims | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function extractClaims(user: User | null): Promise<AuthClaims | null> {
  if (!user) {
    return null;
  }

  const tokenResult: IdTokenResult = await user.getIdTokenResult();
  return claimsFromTokenClaims(tokenResult.claims);
}

function claimsContext(claims: AuthClaims | null) {
  return {
    tenantType: claims?.tenantType,
    tenantId: claims?.tenantId,
    role: claims?.role,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<AuthClaims | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;
    const sessionId = getOrCreateSessionId();

    const start = async () => {
      try {
        await initializeClientAuth();
        logInfo({
          event: "auth.provider.init.success",
          module: "auth-provider",
          sessionId,
          requestId: createRequestId(),
        });

        const auth = getAuthInstance();
        unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
          if (!mounted) {
            return;
          }

          const nextClaims = await extractClaims(nextUser);

          setUser(nextUser);
          setClaims(nextClaims);
          setLoading(false);

          logAudit({
            event: "auth.state.changed",
            module: "auth-provider",
            sessionId,
            requestId: createRequestId(),
            uid: nextUser?.uid,
            ...claimsContext(nextClaims),
            data: {
              signedIn: Boolean(nextUser),
            },
          });
        });
      } catch (error) {
        if (!mounted) {
          return;
        }

        reportAppError(error, {
          event: "auth.provider.init.error",
          module: "auth-provider",
          sessionId,
          requestId: createRequestId(),
        });

        setUser(null);
        setClaims(null);
        setLoading(false);
      }
    };

    void start();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  const refreshClaims = useCallback(async () => {
    const nextClaims = await extractClaims(getAuthInstance().currentUser);
    setClaims(nextClaims);

    logInfo({
      event: "auth.claims.refresh",
      module: "auth-provider",
      sessionId: getOrCreateSessionId(),
      requestId: createRequestId(),
      uid: getAuthInstance().currentUser?.uid,
      ...claimsContext(nextClaims),
    });

    return nextClaims;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      claims,
      signInWithEmailPassword,
      signInWithGoogle: signInWithGoogleProvider,
      signOut: signOutUser,
      refreshClaims,
    }),
    [user, loading, claims, refreshClaims]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

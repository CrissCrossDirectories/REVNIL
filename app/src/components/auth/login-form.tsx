"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/forms/form-field";
import { FormSection } from "@/components/forms/form-section";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  createRequestId,
  getOrCreateSessionId,
  logAudit,
  logInfo,
} from "@/lib/observability/logger";
import { reportAppError } from "@/lib/observability/errors";

function isValidNextPath(next: string | null): string {
  if (!next) {
    return "/dashboard";
  }

  if (!next.startsWith("/") || next.startsWith("//")) {
    return "/dashboard";
  }

  return next;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithEmailPassword, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = getOrCreateSessionId();

  const destination = useMemo(
    () => isValidNextPath(searchParams.get("next")),
    [searchParams]
  );
  const routeError = searchParams.get("error");

  async function handleEmailSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      logInfo({
        event: "auth.login.email.attempt",
        module: "login-form",
        sessionId,
        requestId: createRequestId(),
        data: { destination },
      });

      await signInWithEmailPassword(email, password);

      logAudit({
        event: "auth.login.email.success",
        module: "login-form",
        sessionId,
        requestId: createRequestId(),
        data: { destination },
      });

      router.replace(destination);
    } catch (err) {
      const normalized = reportAppError(err, {
        event: "auth.login.email.error",
        module: "login-form",
        sessionId,
        requestId: createRequestId(),
        data: { destination },
      });
      setError(normalized.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleSignIn() {
    setBusy(true);
    setError(null);

    try {
      logInfo({
        event: "auth.login.google.attempt",
        module: "login-form",
        sessionId,
        requestId: createRequestId(),
        data: { destination },
      });

      await signInWithGoogle();

      logAudit({
        event: "auth.login.google.success",
        module: "login-form",
        sessionId,
        requestId: createRequestId(),
        data: { destination },
      });

      router.replace(destination);
    } catch (err) {
      const normalized = reportAppError(err, {
        event: "auth.login.google.error",
        module: "login-form",
        sessionId,
        requestId: createRequestId(),
        data: { destination },
      });
      setError(normalized.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in to REVNIL</CardTitle>
        <CardDescription>
          Use email/password or Google authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {routeError === "insufficient_permissions" ? (
          <Alert variant="destructive">
            <AlertTitle>Access Restricted</AlertTitle>
            <AlertDescription>
              Your account is authenticated but lacks required dashboard access.
            </AlertDescription>
          </Alert>
        ) : null}

        <form className="space-y-4" onSubmit={handleEmailSignIn}>
          <FormSection title="Account Login" description="Enter your credentials to continue.">
            <FormField id="email" label="Email" required>
              <Input
                type="email"
                autoComplete="email"
                required
                value={email}
                disabled={busy}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>

            <FormField id="password" label="Password" required>
              <Input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                disabled={busy}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>
          </FormSection>

          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <Button type="submit" disabled={busy} className="w-full gap-2">
            {busy ? (
              <>
                <Spinner size="sm" className="text-primary-foreground" />
                Signing in...
              </>
            ) : (
              "Sign in with Email"
            )}
          </Button>
        </form>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Separator className="flex-1" />
          <span>OR</span>
          <Separator className="flex-1" />
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={handleGoogleSignIn}
          className="w-full"
        >
          {busy ? "Working..." : "Continue with Google"}
        </Button>
      </CardContent>
    </Card>
  );
}

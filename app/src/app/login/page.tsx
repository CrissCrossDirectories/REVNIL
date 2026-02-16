import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading login…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}

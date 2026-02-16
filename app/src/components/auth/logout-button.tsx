"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function LogoutButton() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [busy, setBusy] = useState(false);

  async function handleSignOut() {
    setBusy(true);
    try {
      await signOut();
      router.replace("/login");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleSignOut}
      disabled={busy}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {busy ? (
        <>
          <Spinner size="sm" />
          Signing out...
        </>
      ) : (
        "Sign out"
      )}
    </Button>
  );
}

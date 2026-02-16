import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/40 p-8 md:p-24">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          REV<span className="text-primary">|</span>NIL
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Multi-tenant ERP platform for collegiate athletics NIL management
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 md:flex-row">
          <div className="rounded-lg border border-border bg-card px-6 py-4 shadow-soft">
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="text-lg font-semibold text-primary">
              Infrastructure Ready
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card px-6 py-4 shadow-soft">
            <p className="text-sm font-medium text-muted-foreground">Version</p>
            <p className="text-lg font-semibold text-foreground">0.1.0</p>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Protected Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

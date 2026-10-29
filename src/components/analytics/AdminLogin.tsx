const MESSAGES: Record<string, string> = {
  invalid: "That email and password didn't match.",
  locked: "Too many attempts. Try again in 15 minutes.",
};

export default function AdminLogin({ action, error }: { action: string; error?: string }) {
  const message = error ? MESSAGES[error] : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-paper">
      <form method="post" action={action} className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Studio</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Sign in</h1>
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-mist">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="username"
            required
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-paper outline-none transition-colors focus:border-signal"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-mist">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-paper outline-none transition-colors focus:border-signal"
          />
        </label>

        {message ? (
          <p role="alert" className="text-sm text-[#ff8a7a]">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          className="rounded-full bg-signal px-6 py-4 font-mono text-xs uppercase tracking-wider text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}

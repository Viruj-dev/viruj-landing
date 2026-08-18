import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-6 py-20 text-[var(--on-surface)]">
      <div className="mx-auto flex w-full max-w-xl flex-col items-start gap-6 rounded-[2rem] border border-black/5 bg-white/80 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--primary)]">
          404
        </p>
        <h1 className="font-sentient text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
          We could not find that page.
        </h1>
        <p className="max-w-prose text-base leading-7 text-slate-600">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

// Route-level error boundary. Next.js renders this automatically
// whenever a Server Component further down this route (page.tsx,
// generateMetadata) throws — which happens if the FitLog API request
// for a single workout fails (network hiccup, API downtime, etc).
// Without this file, that failure shows Next's raw default error page.
export default function WorkoutDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Workout detail page failed to load:", error);
  }, [error]);

  return (
    <section className="container-px mx-auto flex max-w-2xl flex-col items-center gap-4 py-28 text-center">
      <AlertTriangle size={48} className="text-accent" />
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide">
        Couldn&apos;t load this workout
      </h1>
      <p className="text-muted">
        Something went wrong talking to the FitLog API. Please try again.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent"
        >
          Go to workouts
        </Link>
      </div>
    </section>
  );
}

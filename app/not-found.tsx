import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-px mx-auto flex max-w-2xl flex-col items-center gap-4 py-28 text-center">
      <Compass size={48} className="text-accent" />
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide">
        404 — Page not found
      </h1>
      <p className="text-muted">
        The page or workout you&apos;re looking for doesn&apos;t exist or may have
        been moved.
      </p>
      <Link href="/" className="btn-primary mt-2">
        Go to workouts
      </Link>
    </section>
  );
}

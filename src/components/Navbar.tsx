"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-base/90 backdrop-blur">
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} priority />
          <span className="font-display text-lg font-bold uppercase tracking-wide">
            FitLog
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition ${
                  isActive ? "text-accent" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Both badges link to /my-plan (per spec), with a ?tab= hint
              so the right tab is already active when the page opens. */}
          <Link
            href="/my-plan?tab=plan"
            aria-label={`Today's plan, ${plan.length} items`}
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black transition hover:brightness-95"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan?tab=saved"
            aria-label={`Saved workouts, ${saved.length} items`}
            className="rounded-full border border-border px-3 py-1 text-xs font-bold text-white transition hover:border-accent hover:text-accent"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>

      {/* mobile nav links */}
      <nav className="flex items-center justify-center gap-6 border-t border-border py-2 md:hidden">
        {links.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-wide transition ${
                isActive ? "text-accent" : "text-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

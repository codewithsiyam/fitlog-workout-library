"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Dumbbell, Clock, Flame } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import Loader from "@/components/Loader";
import type { PlanTab } from "@/lib/types";

const TABS: { value: PlanTab; label: string }[] = [
  { value: "plan", label: "Today's Plan" },
  { value: "saved", label: "Saved" },
];

// The navbar's "Saved" badge links to /my-plan?tab=saved so it opens
// straight on the Saved tab. useSearchParams needs a Suspense boundary
// around it, so the real page content lives in MyPlanContent below.
export default function MyPlanPage() {
  return (
    <Suspense fallback={<Loader label="Loading workouts…" />}>
      <MyPlanContent />
    </Suspense>
  );
}

function MyPlanContent() {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const initialTab: PlanTab = requestedTab === "saved" ? "saved" : "plan";

  const [activeTab, setActiveTab] = useState<PlanTab>(initialTab);

  // If the user navigates here again with a different ?tab= value
  // (e.g. clicking "Saved" in the navbar while already on this page),
  // switch tabs to match instead of ignoring the new link.
  useEffect(() => {
    if (requestedTab === "saved" || requestedTab === "plan") {
      setActiveTab(requestedTab);
    }
  }, [requestedTab]);

  const { plan, saved, metrics, hydrated, doneIds, clearCompleted } = usePlan();

  const list = activeTab === "plan" ? plan : saved;
  const completedCount = plan.filter((w) => doneIds.includes(w.id)).length;

  return (
    <section className="container-px mx-auto max-w-7xl py-12 md:py-16">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          My Plan
        </h1>
        <p className="text-muted">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard icon={<Dumbbell size={18} />} label="Exercises" value={metrics.exercises} />
        <StatCard icon={<Clock size={18} />} label="Minutes" value={metrics.minutes} />
        <StatCard icon={<Flame size={18} />} label="Calories" value={metrics.calories} />
      </div>

      <div className="mt-10 flex items-center justify-between border-b border-border">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`relative px-4 py-3 text-sm font-bold uppercase tracking-wide transition ${
                activeTab === tab.value ? "text-accent" : "text-muted hover:text-white"
              }`}
            >
              {tab.label}
              {activeTab === tab.value && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "plan" && completedCount > 0 && (
          <button
            type="button"
            onClick={clearCompleted}
            className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted transition hover:text-accent"
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>

      <div className="mt-6">
        {!hydrated && <Loader label="Loading workouts…" />}

        {hydrated && list.length === 0 && (
          <div className="card-surface flex flex-col items-center gap-3 p-14 text-center">
            <p className="font-display text-2xl font-bold uppercase">Nothing here yet</p>
            <p className="max-w-sm text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link href="/" className="btn-primary mt-2">
              Go to workouts
            </Link>
          </div>
        )}

        {hydrated && list.length > 0 && (
          <div className="flex flex-col gap-4">
            {list.map((workout) => (
              <PlanWorkoutCard key={workout.id} workout={workout} tab={activeTab} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="card-surface flex flex-col items-center gap-1 py-5 sm:flex-row sm:items-center sm:justify-center sm:gap-2">
      <span className="text-accent">{icon}</span>
      <div className="flex flex-col items-center sm:items-start">
        <span className="font-display text-xl font-bold">{value}</span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

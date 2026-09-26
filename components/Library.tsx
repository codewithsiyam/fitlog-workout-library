"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { getAllWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";
import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/Loader";

type Status = "loading" | "success" | "error";
type SortKey = "duration" | "caloriesBurned" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function loadWorkouts() {
      setStatus("loading");
      try {
        const data = await getAllWorkouts();
        if (!isCancelled) {
          setWorkouts(data);
          setStatus("success");
        }
      } catch (err) {
        console.error(err);
        if (!isCancelled) setStatus("error");
      }
    }

    loadWorkouts();
    return () => {
      isCancelled = true;
    };
  }, []);

  const visibleWorkouts = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = q
      ? workouts.filter((w) => {
          const nameMatch = w.name.toLowerCase().includes(q);
          const tagMatch = (w.muscleGroups || []).some((tag) =>
            tag.toLowerCase().includes(q)
          );
          return nameMatch || tagMatch;
        })
      : workouts;

    return [...filtered].sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0));
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="scroll-mt-20 bg-base py-16 md:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            The Library
          </h2>
          <p className="text-muted">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative w-full max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or tag…"
              aria-label="Search workouts by name or tag"
              className="w-full rounded-full border border-border bg-surface py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </label>

          <label className="relative inline-flex w-full items-center sm:w-auto">
            <span className="sr-only">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              aria-label="Sort workouts"
              className="w-full appearance-none rounded-full border border-border bg-surface py-2.5 pl-4 pr-9 text-sm font-semibold text-white focus:border-accent focus:outline-none sm:w-44"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort By: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 text-muted"
            />
          </label>
        </div>

        <div className="mt-8">
          {status === "loading" && <Loader label="Loading workouts…" />}

          {status === "error" && (
            <div className="card-surface flex flex-col items-center gap-2 p-10 text-center">
              <p className="font-display text-xl font-bold uppercase">
                Couldn&apos;t load workouts
              </p>
              <p className="text-sm text-muted">
                Something went wrong talking to the FitLog API. Please refresh the page.
              </p>
            </div>
          )}

          {status === "success" && visibleWorkouts.length === 0 && (
            <div className="card-surface flex flex-col items-center gap-2 p-10 text-center">
              <p className="font-display text-xl font-bold uppercase">No matches</p>
              <p className="text-sm text-muted">Try a different search term.</p>
            </div>
          )}

          {status === "success" && visibleWorkouts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleWorkouts.map((workout, index) => (
                <div
                  key={workout.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                >
                  <WorkoutCard workout={workout} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

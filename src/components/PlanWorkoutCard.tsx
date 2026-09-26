"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, CheckCircle, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import type { Workout, PlanTab } from "@/lib/types";

export default function PlanWorkoutCard({
  workout,
  tab,
}: {
  workout: Workout;
  tab: PlanTab;
}) {
  const { markAsDone, isDone, removeFromPlan, removeFromSaved } = usePlan();
  const done = tab === "plan" && isDone(workout.id);

  function handleRemove() {
    if (tab === "plan") removeFromPlan(workout.id);
    else removeFromSaved(workout.id);
  }

  return (
    <div className="card-surface flex flex-col gap-4 p-4 transition hover:border-accent/40 sm:flex-row sm:items-center">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-display text-base font-bold uppercase tracking-wide">
          {workout.name}
          {done && (
            <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent">
              DONE
            </span>
          )}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs font-semibold text-muted">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-accent" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-accent" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        {tab === "plan" && (
          <button
            type="button"
            onClick={() => markAsDone(workout.id)}
            disabled={done}
            className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCircle size={14} />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-white transition hover:border-red-400 hover:text-red-400"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

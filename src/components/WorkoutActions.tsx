"use client";

import { PlusCircle, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/lib/types";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull, planLimit } =
    usePlan();

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const disableAdd = alreadyInPlan || isPlanFull;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => addToPlan(workout)}
          disabled={disableAdd}
          className="btn-primary"
        >
          <PlusCircle size={18} />
          {alreadyInPlan ? "Already in today's plan" : "Add to today's plan"}
        </button>

        <button
          type="button"
          onClick={() => addToSaved(workout)}
          disabled={alreadySaved}
          className="btn-secondary"
        >
          <Bookmark size={18} />
          {alreadySaved ? "Saved" : "Save for later"}
        </button>
      </div>

      {isPlanFull && !alreadyInPlan && (
        <p className="text-xs font-semibold text-muted">
          Today&apos;s plan is full — it holds a max of {planLimit} lifts. Finish or
          remove one to add more.
        </p>
      )}
    </div>
  );
}

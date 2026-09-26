"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Workout, Toast } from "@/lib/types";

const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-state-v1";

interface PlanMetrics {
  exercises: number;
  minutes: number;
  calories: number;
}

interface PlanContextValue {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  hydrated: boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  isPlanFull: boolean;
  planLimit: number;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  clearCompleted: () => void;
  metrics: PlanMetrics;
  toasts: Toast[];
  pushToast: (message: string) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

interface PersistedState {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved state from localStorage once, on the client only.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistedState>;
        setPlan(Array.isArray(parsed.plan) ? parsed.plan : []);
        setSaved(Array.isArray(parsed.saved) ? parsed.saved : []);
        setDoneIds(Array.isArray(parsed.doneIds) ? parsed.doneIds : []);
      }
    } catch (err) {
      // if localStorage is unavailable or the data is corrupt, just start fresh
      console.error("Could not read saved FitLog data:", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist to localStorage whenever state changes, after the first load.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved, doneIds })
      );
    } catch (err) {
      console.error("Could not save FitLog data:", err);
    }
  }, [plan, saved, doneIds, hydrated]);

  const pushToast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const isInPlan = useCallback((id: number) => plan.some((w) => w.id === id), [plan]);
  const isSaved = useCallback((id: number) => saved.some((w) => w.id === id), [saved]);
  const isDone = useCallback((id: number) => doneIds.includes(id), [doneIds]);
  const isPlanFull = plan.length >= PLAN_LIMIT;

  // IMPORTANT BUG FIX:
  // pushToast (a side effect) must never run *inside* a setState updater
  // function (e.g. setPlan(prev => { pushToast(...); return ... })).
  // In development, React 18 Strict Mode intentionally invokes updater
  // functions twice to catch impure updaters — so a side effect placed
  // inside one fires twice, which is exactly why "Added to today's plan"
  // was showing as a double toast. The fix: decide the outcome first
  // using the current state already in scope, call pushToast exactly
  // once, and only then call the plain setState with a fixed value.

  const addToPlan = useCallback(
    (workout: Workout) => {
      if (plan.some((w) => w.id === workout.id)) {
        pushToast(`${workout.name} is already in today's plan`);
        return;
      }
      if (plan.length >= PLAN_LIMIT) {
        pushToast("Today's plan is full (max 5 lifts)");
        return;
      }
      setPlan((prev) => [...prev, workout]);
      pushToast("Added to today's plan");
    },
    [plan, pushToast]
  );

  const addToSaved = useCallback(
    (workout: Workout) => {
      if (saved.some((w) => w.id === workout.id)) {
        pushToast(`${workout.name} is already saved`);
        return;
      }
      setSaved((prev) => [...prev, workout]);
      pushToast("Saved for later");
    },
    [saved, pushToast]
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      setPlan((prev) => prev.filter((w) => w.id !== id));
      setDoneIds((prev) => prev.filter((d) => d !== id));
      pushToast("Removed from today's plan");
    },
    [pushToast]
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      setSaved((prev) => prev.filter((w) => w.id !== id));
      pushToast("Removed from saved");
    },
    [pushToast]
  );

  const markAsDone = useCallback(
    (id: number) => {
      if (doneIds.includes(id)) return;
      setDoneIds((prev) => [...prev, id]);
      pushToast("Marked as done. Nice work!");
    },
    [doneIds, pushToast]
  );

  // "Clear completed state" — unmarks every done item in today's plan
  // (the workouts themselves stay in the plan, only the DONE flag resets).
  const clearCompleted = useCallback(() => {
    if (doneIds.length === 0) return;
    setDoneIds([]);
    pushToast("Cleared completed workouts");
  }, [doneIds, pushToast]);

  // live metrics for the Today's Plan tab
  const metrics: PlanMetrics = plan.reduce(
    (acc, w) => {
      acc.exercises += 1;
      acc.minutes += w.duration || 0;
      acc.calories += w.caloriesBurned || 0;
      return acc;
    },
    { exercises: 0, minutes: 0, calories: 0 }
  );

  const value: PlanContextValue = {
    plan,
    saved,
    doneIds,
    hydrated,
    isInPlan,
    isSaved,
    isDone,
    isPlanFull,
    planLimit: PLAN_LIMIT,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    clearCompleted,
    metrics,
    toasts,
    pushToast,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used inside a PlanProvider");
  }
  return ctx;
}

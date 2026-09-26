import type { Workout } from "@/lib/types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetches every workout from the FitLog API.
 * Throws an error if the network request fails so the calling
 * component can show a proper error state.
 */
export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load workouts from the API.");
  }

  return res.json();
}

/**
 * Fetches a single workout by id.
 * Returns null when the workout does not exist (404) so the page
 * can render the not-found UI instead of crashing.
 */
export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to load this workout from the API.");
  }

  const data = await res.json();

  // some APIs return an array even for a single id, handle both shapes
  if (Array.isArray(data)) {
    return data[0] ?? null;
  }

  return data as Workout;
}

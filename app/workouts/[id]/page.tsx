import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, Flame, Star } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const workout = await getWorkoutById(params.id);
  if (!workout) return { title: "Workout not found — FitLog" };
  return {
    title: `${workout.name} — FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const workout = await getWorkoutById(params.id);

  if (!workout) {
    notFound();
  }

  const specs: { label: string; value: string | number }[] = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <section className="container-px mx-auto max-w-7xl py-12 md:py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {(workout.muscleGroups || []).map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl">
              {workout.name}
            </h1>

            <p className="text-muted">{workout.description}</p>
          </div>

          <div className="card-surface grid grid-cols-2 gap-x-6 gap-y-4 p-5 sm:grid-cols-3">
            {specs.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  {spec.label}
                </span>
                <span className="text-sm font-bold">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm font-semibold text-muted">
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-accent" /> {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame size={16} className="text-accent" /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={16} className="text-accent" /> {workout.rating}
            </span>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="flex flex-col gap-3">
              {(workout.instructions || []).map((step, index) => (
                <li key={index} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface2 text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </section>
  );
}

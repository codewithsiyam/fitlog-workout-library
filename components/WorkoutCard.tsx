import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const tags = workout.muscleGroups || [];

  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="card-surface group flex flex-col overflow-hidden transition hover:border-accent/60 hover:shadow-[0_0_0_1px_rgba(204,255,0,0.4)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-wide">
          {workout.name}
        </h3>

        <p className="text-sm text-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 border-t border-border pt-3 text-xs font-semibold text-muted">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}

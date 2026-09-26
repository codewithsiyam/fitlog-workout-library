import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-px mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={24} height={24} />
          <span className="font-display text-base font-bold uppercase tracking-wide">
            FitLog
          </span>
        </div>
        <p className="text-center text-xs text-muted sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

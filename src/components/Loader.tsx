export default function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      <p className="text-sm font-semibold uppercase tracking-wide">{label}</p>
    </div>
  );
}

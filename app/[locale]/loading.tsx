export default function Loading() {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-white/70 dark:bg-slate-950/70 backdrop-blur-[1px]">
      <div
        className="size-8 rounded-full border-4 border-slate-300 border-t-slate-700 dark:border-slate-700 dark:border-t-slate-200 animate-spin"
        aria-label="Loading"
      />
    </div>
  )
}

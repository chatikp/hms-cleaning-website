export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-blue-100 border-t-blue-600" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

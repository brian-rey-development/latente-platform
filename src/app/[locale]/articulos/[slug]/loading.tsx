export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-surface animate-pulse flex">
      {/* Aside skeleton */}
      <div className="hidden lg:block w-1/4 border-r-2 border-divider p-12 space-y-8">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-divider rounded" />
          <div className="h-5 w-32 bg-divider rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 bg-divider rounded" />
          <div className="h-5 w-24 bg-divider rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-18 bg-divider rounded" />
          <div className="h-5 w-28 bg-divider rounded" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="w-full lg:w-3/4 p-6 md:p-12 lg:px-24 lg:py-16 space-y-6">
        {/* Title */}
        <div className="h-10 w-3/4 bg-divider rounded" />
        <div className="h-10 w-1/2 bg-divider rounded" />

        {/* Body lines */}
        <div className="mt-8 space-y-4 max-w-2xl">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-5 bg-divider rounded"
              style={{ width: `${70 + (i % 3) * 10}%` }}
            />
          ))}
          <div className="pt-4" />
          {[...Array(6)].map((_, i) => (
            <div
              key={`b-${i}`}
              className="h-5 bg-divider rounded"
              style={{ width: `${60 + (i % 4) * 10}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LoadingSkeleton({ type = "card", count = 6 }: { type?: "card" | "detail" | "list"; count?: number }) {
  if (type === "detail") {
    return (
      <div className="animate-pulse max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="shimmer w-full h-80 rounded-2xl mb-8" />
        <div className="shimmer h-10 w-1/2 rounded-lg mb-4" />
        <div className="shimmer h-4 w-full rounded mb-2" />
        <div className="shimmer h-4 w-3/4 rounded mb-2" />
        <div className="shimmer h-4 w-1/2 rounded mb-8" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="shimmer h-24 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="animate-pulse flex gap-4 p-4 bg-white rounded-xl">
            <div className="shimmer w-20 h-20 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="shimmer h-4 w-1/3 rounded" />
              <div className="shimmer h-3 w-2/3 rounded" />
              <div className="shimmer h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="shimmer h-52" />
          <div className="p-4 space-y-3">
            <div className="shimmer h-5 w-2/3 rounded" />
            <div className="shimmer h-3 w-full rounded" />
            <div className="shimmer h-3 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

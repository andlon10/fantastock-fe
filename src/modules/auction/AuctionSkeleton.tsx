export function AuctionSkeleton() {
  return (
    <div className="w-full h-full p-4 md:p-6 animate-pulse">
      <div className="h-9 w-40 rounded bg-gray-200 mb-6" />

      <div className="rounded bg-white p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="h-6 w-44 rounded bg-gray-200" />
            <div className="h-20 w-full rounded bg-gray-100" />
            <div className="h-20 w-full rounded bg-gray-100" />
            <div className="h-20 w-full rounded bg-gray-100" />
          </div>
          <div className="h-80 w-full rounded bg-gray-100" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded bg-white p-4 border border-gray-100">
            <div className="h-6 w-16 rounded bg-gray-200 mb-4" />
            <div className="space-y-3">
              <div className="h-10 w-full rounded bg-gray-100" />
              <div className="h-10 w-full rounded bg-gray-100" />
              <div className="h-10 w-full rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

const RankingPageLoading = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {/* Sticky Sidebar Skeleton */}
      <div className="hidden lg:block w-[368px] sticky self-end bottom-6">
        <div className="min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4">
          {/* UserProgress Skeleton */}
          <div className="flex items-center justify-between gap-x-2 w-full">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
          {/* Quests Skeleton */}
          <div className="border-2 rounded-xl p-4 space-y-4">
            <Skeleton className="h-6 w-40 rounded-md" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center w-full pb-4 gap-x-3">
                <Skeleton className="h-10 w-10 rounded-md shrink-0" />
                <div className="flex flex-col gap-y-2 w-full">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 relative top-0 pb-10">
        <div className="w-full flex flex-col items-center">
          <Skeleton className="h-[90px] w-[90px] rounded-full" />
          <Skeleton className="h-8 w-[220px] rounded-md mt-6 mb-2" />
          <Skeleton className="h-5 w-[320px] rounded-md mb-6" />

          {/* Current User Ranking Card */}
          <div className="w-full p-6 rounded-xl border-2 mb-8">
            <div className="flex items-center gap-x-4 mb-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-8 w-[260px] rounded-md" />
                <Skeleton className="h-6 w-[160px] rounded-md mt-2" />
              </div>
              <div className="text-right">
                <Skeleton className="h-10 w-[90px] rounded-md ml-auto" />
                <Skeleton className="h-4 w-[80px] rounded-md mt-2 ml-auto" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <Skeleton className="h-4 w-[200px] rounded-md" />
                <Skeleton className="h-4 w-[60px] rounded-md" />
              </div>
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-3 w-full rounded-md" />
            </div>

            <div className="mt-4 pt-4 border-t border-stone-brown-200/50">
              <Skeleton className="h-4 w-[260px] rounded-md" />
              <Skeleton className="h-4 w-[300px] rounded-md mt-2" />
            </div>

            <div className="mt-4 pt-4 border-t border-red-200">
              <div className="flex items-center gap-x-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-[260px] rounded-md" />
              </div>
            </div>
          </div>

          {/* All Tiers */}
          <h2 className="text-xl font-bold text-stone-brown-900 mb-4 w-full">
            <Skeleton className="h-6 w-[200px] rounded-md" />
          </h2>

          <div className="w-full space-y-3 mb-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className="w-full p-4 rounded-xl border-2"
              >
                <div className="flex items-center gap-x-3 mb-3">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-[180px] rounded-md" />
                    <Skeleton className="h-4 w-[220px] rounded-md mt-2" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 5 }).map((__, subIdx) => (
                    <Skeleton
                      // eslint-disable-next-line react/no-array-index-key
                      key={subIdx}
                      className="h-14 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard preview */}
          <Skeleton className="mb-6 h-0.5 w-full rounded-full" />
          <h2 className="text-xl font-bold text-stone-brown-900 mb-1 w-full">
            <Skeleton className="h-6 w-[180px] rounded-md" />
          </h2>
          <Skeleton className="h-4 w-[330px] rounded-md mb-2 self-start" />

          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              className="flex items-center w-full p-2 px-4 rounded-xl border-2 border-transparent"
            >
              <Skeleton className="h-6 w-6 rounded-md mr-4" />
              <Skeleton className="h-10 w-10 rounded-full mr-3" />
              <div className="flex-1 min-w-0">
                <Skeleton className="h-5 w-[240px] rounded-md" />
                <Skeleton className="h-4 w-[180px] rounded-md mt-2" />
              </div>
              <Skeleton className="h-5 w-[90px] rounded-md ml-2" />
            </div>
          ))}

          {/* Current user row */}
          <div className="flex items-center w-full p-2 px-4 rounded-xl bg-linen-100 border-2 border-linen-300 mt-2">
            <Skeleton className="h-6 w-6 rounded-md mr-4" />
            <Skeleton className="h-10 w-10 rounded-full mr-3" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-[200px] rounded-md" />
              <Skeleton className="h-4 w-[220px] rounded-md mt-2" />
            </div>
            <Skeleton className="h-5 w-[90px] rounded-md ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPageLoading;
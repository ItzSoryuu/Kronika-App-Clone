import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
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
      {/* Feed Skeleton */}
      <div className="flex-1 relative top-0 pb-10">
        <div className="w-full flex flex-col items-center">
          {/* Leaderboard Icon Skeleton */}
          <Skeleton className="h-[90px] w-[90px] rounded-xl" />
          {/* Title Skeleton */}
          <Skeleton className="h-8 w-48 rounded-md my-6" />
          {/* Description Skeleton */}
          <Skeleton className="h-5 w-80 rounded-md mb-6" />
          {/* Separator */}
          <Skeleton className="h-0.5 w-full rounded-full mb-4" />
          {/* Leaderboard Items Skeleton */}
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="flex items-center w-full p-2 px-4 rounded-xl"
            >
              {/* Rank Number */}
              <Skeleton className="h-6 w-6 rounded mr-4" />
              {/* Avatar */}
              <Skeleton className="h-12 w-12 rounded-full ml-3 mr-6 shrink-0" />
              {/* Name & Tier */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <Skeleton className="h-5 w-32 rounded-md" />
                <div className="flex items-center gap-x-1">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
              </div>
              {/* Points */}
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;

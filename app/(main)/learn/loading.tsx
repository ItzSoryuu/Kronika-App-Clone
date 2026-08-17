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
        {/* Header Skeleton */}
        <div className="sticky top-0 bg-background pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        {/* Unit Skeletons */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-10">
            {/* Unit Banner Skeleton */}
            <div className="w-full rounded-xl bg-muted/60 p-5 flex items-center justify-between">
              <div className="space-y-2.5 flex-1">
                <Skeleton className="h-7 w-48 rounded-md bg-muted-foreground/10" />
                <Skeleton className="h-5 w-64 rounded-md bg-muted-foreground/10" />
              </div>
              <Skeleton className="hidden xl:block h-10 w-28 rounded-lg bg-muted-foreground/10" />
            </div>
            {/* Lesson Buttons Skeleton */}
            <div className="flex items-center flex-col relative mt-8">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="mb-6 flex flex-col items-center">
                  <Skeleton className="h-[70px] w-[70px] rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;

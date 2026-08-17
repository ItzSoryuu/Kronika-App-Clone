import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full max-w-[912px] px-3 pt-2 mx-auto">
      {/* Title Skeleton */}
      <Skeleton className="h-8 w-40 rounded-md" />
      {/* Course Cards Grid Skeleton */}
      <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]"
          >
            {/* Course Image Skeleton */}
            <Skeleton className="rounded-lg w-full h-[120px]" />
            {/* Course Title Skeleton */}
            <Skeleton className="h-5 w-24 rounded-md mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;

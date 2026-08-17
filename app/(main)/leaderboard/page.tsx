import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getTopTenUsers, getUserProgress } from "@/db/queries";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Quests } from "@/components/quests";
import { getTierProgress } from "@/lib/ranking";
import { cn } from "@/lib/utils";

// Halaman leaderboard 10 besar
const LeaderboardPage = async () => {
  const userProgressData = getUserProgress();
  const leaderboardData = getTopTenUsers();

  const [
    userProgress,
    leaderboard,
  ] = await Promise.all([
    userProgressData,
    leaderboardData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return ( 
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Lihat posisi kamu di antara pemain lainnya dalam game ini.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboard.map((userProgressItem, index) => {
            const itemRanking = getTierProgress(userProgressItem.points);
            return (
              <div 
                key={userProgressItem.userId}
                className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
              >
                <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                <Avatar
                  className="border bg-green-500 h-12 w-12 ml-3 mr-6"
                >
                  <AvatarImage
                    className="object-cover"
                    src={userProgressItem.userImageSrc}
                  />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-neutral-800 truncate">
                    {userProgressItem.userName}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-x-1">
                    <span className={cn("relative inline-block select-none", itemRanking.tier.key === "JAWARA" || itemRanking.tier.key === "JAWARA BINTANG" ? "w-5 h-5" : "w-4 h-4")}>
                      <Image
                        src={itemRanking.tier.icon}
                        alt={itemRanking.tier.label}
                        fill
                        className="object-contain"
                      />
                    </span>
                    <span style={{ color: itemRanking.tier.color }} className="font-semibold">
                      {itemRanking.tier.label} {itemRanking.subTier.suffix}
                    </span>
                  </p>
                </div>
                <p className="text-muted-foreground">
                  {userProgressItem.points} XP
                </p>
              </div>
            );
          })}
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default LeaderboardPage;

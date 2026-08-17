import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Quests } from "@/components/quests";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { getUserProgress, getTopTenUsers, getUserRankPosition } from "@/db/queries";
import { TIERS, getTierProgress, getNextTierOrSubTier } from "@/lib/ranking";
import { cn } from "@/lib/utils";

// Halaman ranking pribadi (tier, progress, posisi)
const RankingPage = async () => {
  const userProgressData = getUserProgress();
  const leaderboardData = getTopTenUsers();
  const userRankPositionData = getUserRankPosition();

  const [
    userProgress,
    leaderboard,
    userRankPosition,
  ] = await Promise.all([
    userProgressData,
    leaderboardData,
    userRankPositionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const userRanking = getTierProgress(userProgress.points);
  userRanking.rankPosition = userRankPosition;

  const nextMilestone = getNextTierOrSubTier(userProgress.points);
  const currentRankIndex = leaderboard.findIndex((u) => u.userId === userProgress.userId);

  const isJawaraBintangEligible = userProgress.points >= 6000 && userRankPosition !== null && userRankPosition <= 100;

  return ( 
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <style>{`
        .interactive-tier-card {
          box-shadow: var(--tier-shadow);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .interactive-tier-card:hover {
          box-shadow: var(--tier-shadow-hover);
          border-color: var(--tier-color) !important;
        }
        .interactive-subtier-card:hover {
          background-color: var(--tier-bg-hover) !important;
          border-color: var(--tier-color) !important;
          color: var(--tier-color) !important;
        }
        .interactive-leaderboard-row {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-width: 2px;
        }
        .interactive-leaderboard-row:hover {
          background-color: var(--hover-bg) !important;
          border-color: var(--hover-border) !important;
          box-shadow: var(--hover-shadow) !important;
        }
      `}</style>

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
            src="/ranking.svg"
            alt="Ranking"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-stone-brown-900 text-2xl mt-6 mb-1">
            Ranking
          </h1>
          <p className="text-dust-grey-600 text-center text-sm mb-6 font-ui">
            Lihat ranking kamu berdasarkan XP yang diperoleh.
          </p>

          {/* Current User Ranking Card */}
          <div 
            className={cn(
              "w-full p-6 rounded-xl border-2 mb-8 transition-all duration-300 group interactive-tier-card hover:scale-[1.015]",
              userRanking.tier.bgColor,
              userRanking.tier.borderColor,
            )}
            style={{
              "--tier-color": userRanking.tier.color,
              "--tier-shadow": `0 10px 25px -5px ${userRanking.tier.color}30, 0 8px 10px -6px ${userRanking.tier.color}25`,
              "--tier-shadow-hover": `0 16px 35px -5px ${userRanking.tier.color}45, 0 12px 16px -6px ${userRanking.tier.color}35`,
              borderColor: userRanking.tier.color,
            } as React.CSSProperties}
          >
            <div className="flex items-center gap-x-4 mb-4">
              <span className={cn("relative inline-block select-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", userRanking.tier.key === "JAWARA" || userRanking.tier.key === "JAWARA BINTANG" ? "w-16 h-16" : "w-14 h-14")}>
                <Image
                  src={userRanking.tier.icon}
                  alt={userRanking.tier.label}
                  fill
                  className="object-contain"
                />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-bold" style={{ color: userRanking.tier.color }}>
                  {userRanking.tier.label} {userRanking.subTier.suffix}
                </h2>
                <p className={cn("text-lg font-semibold", userRanking.tier.textColor)}>
                  {userProgress.points.toLocaleString()} XP
                </p>
              </div>
              {userRankPosition && (
                <div className="text-right">
                  <p className="text-3xl font-bold text-stone-brown-800">#{userRankPosition}</p>
                  <p className="text-sm text-dust-grey-500">Peringkat</p>
                </div>
              )}
            </div>

            {/* Progress bar within current sub-tier */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={cn("font-medium", userRanking.tier.textColor)}>
                  {userRanking.tier.label} {userRanking.subTier.suffix}
                </span>
                <span className={
                  userRanking.progress >= 100 ? "text-blue-500":
                  userRanking.progress >= 80 ? "text-green-500":
                  userRanking.progress >= 50 ? "text-yellow-500":
                  userRanking.progress >= 25 ? "text-orange-500":
                  "text-red-500"}>
                  {userRanking.progress}%
                </span>
              </div>
              <Progress value={userRanking.progress} className="h-3" />
            </div>

            {/* Next milestone */}
            {nextMilestone && (
              <div className="mt-4 pt-4 border-t border-stone-brown-200/50">
                <p className="text-sm text-dust-grey-600">
                  Tier selanjutnya: <span className="font-bold text-stone-brown-800">{nextMilestone.label}</span>
                </p>
                <p className="text-sm text-dust-grey-600">
                  Butuh <span className="font-bold text-linen-600">{nextMilestone.pointsNeeded.toLocaleString()} EXP</span> lagi
                </p>
              </div>
            )}

            {/* Jawara Summit special badge */}
            {isJawaraBintangEligible && (
              <div className="mt-4 pt-4 border-t border-red-200">
                <div className="flex items-center gap-x-2">
                  <span className="text-2xl">🏆</span>
                  <p className="font-bold text-red-600">
                    Selamat, kamu telah mencapai rank tertinggi!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* All Tiers */}
          <h2 className="text-xl font-bold text-stone-brown-900 mb-4 w-full">
            Daftar Tier
          </h2>
          <div className="w-full space-y-3 mb-8">
            {[...TIERS].reverse().map((tier) => {
              const isCurrentTier = tier.key === userRanking.tier.key;
              return (
                <div
                  key={tier.key}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all duration-300 group interactive-tier-card",
                    isCurrentTier 
                      ? "ring-2 ring-offset-2 scale-[1.02] hover:scale-[1.025]" 
                      : "opacity-80 hover:opacity-100 hover:scale-[1.015] hover:-translate-y-0.5",
                    tier.bgColor,
                    tier.borderColor,
                  )}
                  style={{
                    "--tier-color": tier.color,
                    "--tier-shadow": isCurrentTier 
                      ? `0 10px 25px -5px ${tier.color}40, 0 8px 10px -6px ${tier.color}30` 
                      : `0 4px 12px -2px ${tier.color}20`,
                    "--tier-shadow-hover": isCurrentTier
                      ? `0 16px 35px -5px ${tier.color}55, 0 12px 16px -6px ${tier.color}45`
                      : `0 12px 24px -4px ${tier.color}40`,
                    borderColor: isCurrentTier ? tier.color : undefined,
                  } as React.CSSProperties}
                >
                  <div className="flex items-center gap-x-3 mb-3">
                    <span className={cn("relative inline-block select-none transition-transform duration-500 group-hover:scale-120 group-hover:rotate-6", tier.key === "JAWARA" || tier.key === "JAWARA BINTANG" ? "w-16 h-16" : "w-12 h-12")}>
                      <Image
                        src={tier.icon}
                        alt={tier.label}
                        fill
                        className="object-contain"
                      />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-x-2">
                        <h3 className="text-lg font-bold" style={{ color: tier.color }}>
                          {tier.label}
                        </h3>
                        {isCurrentTier && (
                          <span className={cn(
                            "text-xs font-bold font-ui px-2 py-0.5 rounded-full",
                            "bg-linen-100 text-linen-800",
                          )}>
                            Kamu di sini
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-dust-grey-600">
                        {tier.minExp.toLocaleString()} - {tier.maxExp !== null ? `${tier.maxExp.toLocaleString()} XP` : `${tier.minExp.toLocaleString()}+ XP`}
                      </p>
                    </div>
                  </div>

                  {/* Sub-tiers */}
                  <div className="grid grid-cols-5 gap-2">
                    {tier.subTiers.map((subTier) => {
                      const isCurrentSubTier = isCurrentTier && subTier.suffix === userRanking.subTier.suffix;
                      return (
                        <div
                          key={subTier.suffix}
                          className={cn(
                            "text-center p-2 rounded-lg text-xs border transition-all duration-200 select-none",
                            isCurrentSubTier
                              ? "bg-white font-bold shadow-sm"
                              : "bg-black/5 border-transparent hover:bg-white hover:scale-105 interactive-subtier-card cursor-pointer",
                          )}
                          style={{
                            "--tier-color": tier.color,
                            "--tier-bg-hover": `${tier.color}10`,
                            borderColor: isCurrentSubTier ? tier.color : undefined,
                            color: isCurrentSubTier ? tier.color : undefined,
                          } as React.CSSProperties}
                        >
                          <div className="font-semibold">{subTier.suffix}</div>
                          <div className="text-[10px] text-dust-grey-500">
                            {subTier.minExp.toLocaleString()}-{subTier.maxExp.toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leaderboard preview */}
          <Separator className="mb-6 h-0.5 rounded-full" />
          <h2 className="text-xl font-bold text-stone-brown-900 mb-1 w-full">
            Papan Peringkat
          </h2>
          <p className="text-dust-grey-600 text-left text-sm mb-2 font-ui self-start">
            Lihat posisimu di antara pengguna lain.
          </p>
          {leaderboard.map((userProgressItem, index) => {
            const isCurrentUser = userProgressItem.userId === userProgress.userId;
            const itemRanking = getTierProgress(userProgressItem.points);

            return (
              <div 
                key={userProgressItem.userId}
                className={cn(
                  "flex items-center w-full p-2 px-4 rounded-xl transition-all duration-300 group border-2 border-transparent",
                  isCurrentUser 
                    ? "bg-linen-100 border-linen-300 shadow-sm scale-[1.01] hover:scale-[1.02] hover:shadow-md hover:border-linen-400" 
                    : "hover:bg-white hover:scale-[1.01] hover:-translate-y-0.5 interactive-leaderboard-row cursor-pointer",
                )}
                style={!isCurrentUser ? {
                  "--tier-color": itemRanking.tier.color,
                  "--hover-bg": `${itemRanking.tier.color}08`,
                  "--hover-border": `${itemRanking.tier.color}30`,
                  "--hover-shadow": `0 6px 20px -4px ${itemRanking.tier.color}25`,
                } as React.CSSProperties : {}}
              >
                <p className={cn(
                  "font-bold mr-4 w-6 text-center transition-all duration-300 group-hover:scale-115",
                  index === 0 ? "text-yellow-500 text-lg" : 
                  index === 1 ? "text-gray-400 text-lg" : 
                  index === 2 ? "text-amber-600 text-lg" : 
                  "text-stone-brown-600",
                )}>
                  {index + 1}
                </p>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linen-500 border-2 border-linen-600 mr-3 flex-shrink-0 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm">
                  {userProgressItem.userImageSrc ? (
                    <Image
                      src={userProgressItem.userImageSrc}
                      alt={userProgressItem.userName}
                      width={40}
                      height={40}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {userProgressItem.userName?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-bold truncate transition-colors duration-300",
                    isCurrentUser ? "text-linen-800" : "text-stone-brown-900 group-hover:text-black",
                  )}>
                    {userProgressItem.userName}
                    {isCurrentUser && " (Kamu)"}
                  </p>
                  <p className="text-xs text-dust-grey-600 transition-colors duration-300 group-hover:text-dust-grey-800 flex items-center gap-x-1">
                    <span className={cn("relative inline-block select-none", itemRanking.tier.key === "JAWARA" || itemRanking.tier.key === "JAWARA BINTANG" ? "w-5 h-5" : "w-4 h-4")}>
                      <Image
                        src={itemRanking.tier.icon}
                        alt={itemRanking.tier.label}
                        fill
                        className="object-contain"
                      />
                    </span>
                    <span>{itemRanking.tier.label} {itemRanking.subTier.suffix}</span>
                  </p>
                </div>
                <p className="text-dust-grey-600 font-bold ml-2 transition-all duration-300 group-hover:text-stone-brown-800 group-hover:scale-105">
                  {userProgressItem.points.toLocaleString()} XP
                </p>
              </div>
            );
          })}

          {currentRankIndex !== -1 && currentRankIndex >= 10 && (
            <div className="flex items-center w-full p-2 px-4 rounded-xl bg-linen-100 border-2 border-linen-300 mt-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-linen-400 group">
              <p className="font-bold text-linen-800 mr-4 w-6 text-center transition-transform duration-300 group-hover:scale-115">
                {userRankPosition}
              </p>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linen-500 border-2 border-linen-600 mr-3 flex-shrink-0 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm">
                <Image
                  src={userProgress.userImageSrc}
                  alt={userProgress.userName}
                  width={40}
                  height={40}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-linen-800 truncate">
                  {userProgress.userName} (Kamu)
                </p>
                <p className="text-xs text-dust-grey-600 transition-colors duration-300 group-hover:text-dust-grey-800 flex items-center gap-x-1">
                  <span className={cn("relative inline-block select-none", userRanking.tier.key === "JAWARA" || userRanking.tier.key === "JAWARA BINTANG" ? "w-5 h-5" : "w-4 h-4")}>
                    <Image
                      src={userRanking.tier.icon}
                      alt={userRanking.tier.label}
                      fill
                      className="object-contain"
                    />
                  </span>
                  <span>{userRanking.tier.label} {userRanking.subTier.suffix}</span>
                </p>
              </div>
              <p className="text-dust-grey-600 font-bold ml-2 transition-all duration-300 group-hover:text-linen-800 group-hover:scale-105">
                {userProgress.points.toLocaleString()} XP
              </p>
            </div>
          )}
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default RankingPage;

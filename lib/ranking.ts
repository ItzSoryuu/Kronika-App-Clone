// Tipe untuk key tier ranking
export type TierKey = "PERUNGGU" | "PERAK" | "EMAS" | "PLATINUM" | "BERLIAN" | "JAWARA" | "JAWARA BINTANG";

// Informasi lengkap sebuah tier (peringkat)
export interface TierInfo {
  key: TierKey;
  label: string;
  minExp: number;
  maxExp: number | null; // null = tidak terbatas
  subTiers: SubTier[];
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

// Sub-tier dalam satu tier (V, IV, III, II, I)
export interface SubTier {
  label: string;
  suffix: string;
  minExp: number;
  maxExp: number;
}

// Data ranking lengkap seorang user
export interface UserRanking {
  tier: TierInfo;
  subTier: SubTier;
  progress: number; // persentase progress 0-100 dalam sub-tier saat ini
  rankPosition: number | null; // posisi di leaderboard
}

const SUB_TIER_RANGES = [
  { suffix: "V", multiplier: 0.0 },
  { suffix: "IV", multiplier: 0.2 },
  { suffix: "III", multiplier: 0.4 },
  { suffix: "II", multiplier: 0.6 },
  { suffix: "I", multiplier: 0.8 },
];

function generateSubTiers(min: number, max: number): SubTier[] {
  const range = max - min;
  // Returns sub-tiers in ascending order: V (lowest), IV, III, II, I (highest)
  return SUB_TIER_RANGES.map(({ suffix, multiplier }) => ({
    label: `Tier ${suffix}`,
    suffix,
    minExp: min + Math.floor(range * multiplier),
    maxExp: suffix === "I" ? max : min + Math.floor(range * (multiplier + 0.2)) - 1,
  }));
}

// Definisi semua tier dari terendah ke tertinggi
export const TIERS: TierInfo[] = [
  {
    key: "PERUNGGU",
    label: "Perunggu",
    minExp: 0,
    maxExp: 999,
    subTiers: generateSubTiers(0, 1000),
    icon: "/Perunggu.png",
    color: "#CD7F32",
    bgColor: "bg-amber-50",
    textColor: "text-amber-900",
    borderColor: "border-amber-300",
  },
  {
    key: "PERAK",
    label: "Perak",
    minExp: 1000,
    maxExp: 1999,
    subTiers: generateSubTiers(1000, 2000),
    icon: "/Perak.png",
    color: "#A8A9AD",
    bgColor: "bg-slate-50",
    textColor: "text-slate-800",
    borderColor: "border-slate-300",
  },
  {
    key: "EMAS",
    label: "Emas",
    minExp: 2000,
    maxExp: 2999,
    subTiers: generateSubTiers(2000, 3000),
    icon: "/Emas.png",
    color: "#FFD700",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-900",
    borderColor: "border-yellow-300",
  },
  {
    key: "PLATINUM",
    label: "Platinum",
    minExp: 3000,
    maxExp: 3999,
    subTiers: generateSubTiers(3000, 4000),
    icon: "/Platinum.png",
    color: "#C8C9CD",
    bgColor: "bg-gray-50",
    textColor: "text-gray-800",
    borderColor: "border-gray-300",
  },
  {
    key: "BERLIAN",
    label: "Berlian",
    minExp: 4000,
    maxExp: 4999,
    subTiers: generateSubTiers(4000, 5000),
    icon: "/Berlian.png",
    color: "#00E5FF",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-900",
    borderColor: "border-cyan-300",
  },
  {
    key: "JAWARA",
    label: "Jawara",
    minExp: 5000,
    maxExp: 5999,
    subTiers: generateSubTiers(5000, 6000),
    icon: "/Jawara.png",
    color: "#FF6B35",
    bgColor: "bg-orange-50",
    textColor: "text-orange-900",
    borderColor: "border-orange-300",
  },
  {
    key: "JAWARA BINTANG",
    label: "Jawara Bintang",
    minExp: 6000,
    maxExp: null,
    subTiers: generateSubTiers(6000, 11000),
    icon: "/Jawara_Bintang.png",
    color: "#FF0040",
    bgColor: "bg-red-50",
    textColor: "text-red-900",
    borderColor: "border-red-300",
  },
];

// Cari tier dan sub-tier berdasarkan jumlah XP
export function getCurrentTier(points: number): { tier: TierInfo; subTier: SubTier } {
  const tier = TIERS.find((t) => {
    if (t.maxExp === null) return points >= t.minExp;
    return points >= t.minExp && points <= t.maxExp;
  }) ?? TIERS[0];

  // subTiers is in ascending order (V, IV, III, II, I by minExp)
  // Iterate from the end (highest minExp) to find the correct sub-tier
  const subTier = [...tier.subTiers].reverse().find((st) => points >= st.minExp) ?? tier.subTiers[0];

  return { tier, subTier };
}

// Hitung progress user dalam sub-tier saat ini (0-100%)
export function getTierProgress(points: number): UserRanking {
  const { tier, subTier } = getCurrentTier(points);
  const subRange = subTier.maxExp - subTier.minExp;
  const progress = subRange > 0 ? Math.min(100, Math.round(((points - subTier.minExp) / subRange) * 100)) : 100;

  return {
    tier,
    subTier,
    progress,
    rankPosition: null, // populated separately
  };
}

// Cari target tier/sub-tier berikutnya dan XP yang dibutuhkan
export function getNextTierOrSubTier(points: number): { label: string; pointsNeeded: number } | null {
  const { tier, subTier } = getCurrentTier(points);

  // subTiers is in ascending order: [V, IV, III, II, I]
  // "next" sub-tier means the one with higher minExp (next index)
  const currentSubIndex = tier.subTiers.findIndex((st) => st.suffix === subTier.suffix);
  if (currentSubIndex < tier.subTiers.length - 1) {
    const nextSub = tier.subTiers[currentSubIndex + 1];
    return {
      label: `${tier.label} ${nextSub.suffix}`,
      pointsNeeded: nextSub.minExp - points,
    };
  }

  // Check next tier
  const currentTierIndex = TIERS.findIndex((t) => t.key === tier.key);
  if (currentTierIndex < TIERS.length - 1) {
    const nextTier = TIERS[currentTierIndex + 1];
    return {
      label: `${nextTier.label} V`,
      pointsNeeded: nextTier.minExp - points,
    };
  }

  return null; // Already at max
}

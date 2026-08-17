import { auth } from "@clerk/nextjs"

// Daftar user ID yang memiliki akses admin
const adminIds = [
  "user_3EwHWCl2MmM8BMwPntQTYHqRkNg",
  "user_3FAsfh0OOTmCgqLbJCVvD8Uwkyg",
  "user_3FXi9tzIthuAEXbjxwL3hb8jDES",
];

// Cek apakah user saat ini adalah admin
export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};

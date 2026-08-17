import { authMiddleware } from "@clerk/nextjs";

// Proteksi semua route kecuali halaman utama "/"
export default authMiddleware({
  publicRoutes: ["/"],
});

// Pola route yang diproses middleware
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
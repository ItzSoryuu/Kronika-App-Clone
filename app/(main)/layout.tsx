import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { getUserProgress } from "@/db/queries";

type Props = {
  children: React.ReactNode;
};

// Layout utama aplikasi (sidebar + mobile header)
const MainLayout = async ({
  children,
}: Props) => {
  const userProgress = await getUserProgress();

  return (
    <>
      <MobileHeader hearts={userProgress?.hearts} />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">
          {children}
        </div>
      </main>
    </>
  );
};
 
export default MainLayout;

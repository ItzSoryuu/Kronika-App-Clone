import Image from "next/image";
import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";

type Props = {
  hearts?: number;
};

// Header navigasi untuk tampilan mobile
export const MobileHeader = ({ hearts }: Props) => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center justify-between border-b fixed top-0 w-full z-50 bg-inherit">
      <Link href="/learn" className="flex items-center gap-x-3">
        <Image src="/mascot.svg" height={32} width={32} alt="Mascot" className="rounded-[6px]"/>
        <h1 className="text-2xl font-kalice font-medium text-[#DE7356]">
          Kronika
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        {hearts !== undefined && (
          <div className="text-rose-500 flex items-center font-bold bg-white/20 px-3 py-1 rounded-full text-sm">
            <Image
              src="/heart.svg"
              height={20}
              width={20}
              alt="Heart"
              className="mr-1.5"
            />
            <span>{hearts}</span>
          </div>
        )}
        <MobileSidebar />
      </div>
    </nav>
  );
};

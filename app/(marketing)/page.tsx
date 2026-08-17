import Image from "next/image";
import { 
  ClerkLoaded, 
  ClerkLoading, 
  SignInButton, 
  SignUpButton, 
  SignedIn, 
  SignedOut
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// Halaman utama (landing page)
export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-20">
      <div className="relative w-[240px] h-[240px] lg:w-[320px] lg:h-[320px] mb-8 lg:mb-0">
        <Image src="/mascot.svg" fill alt="Mascot" className="rounded-[64px] shadow-[8px_8px_12px_0px_rgba(0,_0,_0,_0.3)] "/>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-medium text-neutral-600 max-w-[480px] text-center">
          Pelajari Sejarah dan Budaya<br></br>Indonesia Bersama <span className="text-[#DE7356]">Kronika</span>
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Skeleton className="h-[44px] w-full rounded-lg" />
            <Skeleton className="h-[44px] w-full rounded-lg" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button size="lg" variant="primary" className="w-full">
                  Mulai
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button size="lg" variant="primaryOutline" className="w-full">
                  Saya Sudah Punya Akun
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="primary" className="w-full" asChild>
                <Link href="/learn">
                  Lanjut Belajar
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}

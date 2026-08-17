import Link from "next/link";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
};

// Banner judul unit + tombol lanjut
export const UnitBanner = ({
  title,
  description,
}: Props) => {
  return (
    <div className="w-full rounded-xl bg-[#DE7356] p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-semibold">
          {title}
        </h3>
        <p className="text-lg font-ui">
          {description}
        </p>
      </div>
      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondaryOutline"
          className="hidden xl:flex border-2 border-b-4 active:border-b-2 px-6"
        >
          <NotebookText className="mr-2" />
          Lanjut
        </Button>
      </Link>
    </div>
  );
};

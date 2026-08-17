import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

// Sidebar versi mobile (sheet/drawer)
export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="hover:opacity-75 transition">
        <Menu className="text-stone-700" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="right">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

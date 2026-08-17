import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

const App = dynamic(() => import("./app"), { ssr: false });

// Halaman admin (hanya untuk admin, redirect jika bukan)
const AdminPage = () => {
  if (!isAdmin()) {
    redirect("/");
  }

  return ( 
    <App />
  );
};
 
export default AdminPage;

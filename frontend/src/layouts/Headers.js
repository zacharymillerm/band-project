"use client";

import { usePathname } from "next/navigation";
import AdminHeader from "./AdminHeader";
import Header from "./Header";

const Headers = () => {
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  const islogin = pathname.includes("login")

  return <>{isAdmin ? islogin?"": <AdminHeader /> : <Header />}</>;
};

export default Headers;

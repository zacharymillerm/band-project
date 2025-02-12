"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { AdminPageWrapper } from "@/pageComponent/admin/AdminSection";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const Publist = dynamic(() => import("@/pageComponent/admin/Publist"), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const AdminPage = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
    setIsLoading(false);

    if (!storedToken) {
      navigate.push("/admin/login");
    }
  }, [navigate]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!token) {
    return null;
  }

  return <AdminPageWrapper content={<Publist />} />;
};

export default AdminPage;
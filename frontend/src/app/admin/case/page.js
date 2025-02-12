"use client";

import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import dynamic from "next/dynamic";
const NewCase = dynamic(() => import('@/pageComponent/admin/case'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const Case = () => {
  return <NewCase />;
};

export default Case;
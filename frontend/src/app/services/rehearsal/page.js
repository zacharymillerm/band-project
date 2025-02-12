import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.services.rehearsal.title,
  description: siteMetadata.services.rehearsal.description,
  keywords: siteMetadata.services.rehearsal.keywords,
  alternates: siteMetadata.services.rehearsal.alternates,
}

const RehearsalPage = dynamic(() => import('@/pageComponent/services/rehearsal/index'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function Rehearsal() {
  return (
    <>
      <RehearsalPage />
    </>
  );
}

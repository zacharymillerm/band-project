import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.services.showdevelopment.title,
  description: siteMetadata.services.showdevelopment.description,
  keywords: siteMetadata.services.showdevelopment.keywords,
  alternates: siteMetadata.services.showdevelopment.alternates,
}

const ShowDevelopmentPage = dynamic(() => import('@/pageComponent/services/showdevelopment/index'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function ShowDevelopment() {
  return (
    <>
      <ShowDevelopmentPage />
    </>
  );
}

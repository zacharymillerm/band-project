import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.services.visualization.title,
  description: siteMetadata.services.visualization.description,
  keywords: siteMetadata.services.visualization.keywords,
  alternates: siteMetadata.services.visualization.alternates,
}

const VisualizationPage = dynamic(() => import('@/pageComponent/services/visualization/index'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function Visualization() {
  return (
    <>
      <VisualizationPage />
    </>
  );
}

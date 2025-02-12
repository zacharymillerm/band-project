import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.technical.stageclothes.title,
  description: siteMetadata.technical.stageclothes.description,
  keywords: siteMetadata.technical.stageclothes.keywords,
  alternates: siteMetadata.technical.stageclothes.alternates,
}

const StageClothesPage = dynamic(() => import("@/pageComponent/technical/stageclothes/index"), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function StageClothes(){
  return(
    <>
      <StageClothesPage />
    </>
  )
}
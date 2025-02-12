import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.technical.light.title,
  description: siteMetadata.technical.light.description,
  keywords: siteMetadata.technical.light.keywords,
  alternates: siteMetadata.technical.light.alternates,
}

const LightPage = dynamic(() => import("@/pageComponent/technical/light/index"), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function Light(){
  return(
    <>
      <LightPage />
    </>
  )
}
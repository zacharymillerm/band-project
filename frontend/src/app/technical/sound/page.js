import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.technical.sound.title,
  description: siteMetadata.technical.sound.description,
  keywords: siteMetadata.technical.sound.keywords,
  alternates: siteMetadata.technical.sound.alternates,
}

const SoundPage = dynamic(() => import("@/pageComponent/technical/sound/index"), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function Sound(){
  return(
    <>
      <SoundPage />
    </>
  )
}
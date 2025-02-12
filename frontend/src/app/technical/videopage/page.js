import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.technical.video.title,
  description: siteMetadata.technical.video.description,
  keywords: siteMetadata.technical.video.keywords,
  alternates: siteMetadata.technical.video.alternates,
}

const VideoPage = dynamic(() => import("@/pageComponent/technical/videopage/index"), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function Video(){
  return(
    <>
      <VideoPage />
    </>
  )
}
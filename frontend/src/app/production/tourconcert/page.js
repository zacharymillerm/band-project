import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.production.tourconcert.title,
  description: siteMetadata.production.tourconcert.description,
  keywords: siteMetadata.production.tourconcert.keywords,
  alternates: siteMetadata.production.tourconcert.alternates,
}

const TourConcertPage = dynamic(() => import('@/pageComponent/production/tourconcert/index'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function TourConcert() {
  return (
    <>
      <TourConcertPage />
    </>
  );
}

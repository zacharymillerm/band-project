import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.production.event.title,
  description: siteMetadata.production.event.description,
  keywords: siteMetadata.production.event.keywords,
  alternates: siteMetadata.production.event.alternates,
}

const EventPage = dynamic(() => import('@/pageComponent/production/event/index'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function Event() {
  return (
    <>
      <EventPage />
    </>
  );
}

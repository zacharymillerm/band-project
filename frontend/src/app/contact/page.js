import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.contact.title,
  description: siteMetadata.contact.description,
  keywords: siteMetadata.contact.keywords,
  alternates: siteMetadata.contact.alternates,
}

const ContactPage = dynamic(() => import('@/pageComponent/contact/index'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function Contact() {
  return (
    <>
      <ContactPage />
    </>
  );
}

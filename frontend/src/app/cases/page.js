import dynamic from "next/dynamic";
import { CatalogInfo } from "@/constant/group";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.cases.title,
  description: siteMetadata.cases.description,
  keywords: siteMetadata.cases.keywords,
  alternates: siteMetadata.cases.alternates,
}
const CaseCatalog = dynamic(() => import("@/pageComponent/cases/CaseCatalog"), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const CasesPage = () => (
  <CaseCatalog type="case" catalogInfo={CatalogInfo.caseCatalog} />
);

export default CasesPage;

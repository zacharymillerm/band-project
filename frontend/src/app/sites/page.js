import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { CatalogInfo } from "@/constant/group";
import { siteMetadata } from "@/config/metadata";
import { Metadata } from "next"

export const metadata = {
  title: siteMetadata.sites.title,
  description: siteMetadata.sites.description,
  keywords: siteMetadata.sites.keywords,
  alternates: siteMetadata.sites.alternates,
 }

export const linksite = {
  links: [
    {
      title: "Главная",
      link: "/",
    },
    {
      title: "Сайты",
      link: "/sites",
    },
  ],
};

const CatalogOfSites = dynamic(() => import("@/pageComponent/sites/CatalogOfSites"), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const SitesPage = () => (<>
  <CatalogOfSites
    type="platform"
    progress="Вместимость"
    catalogInfo={CatalogInfo.platformCatalog}
  />
</>
);

export default SitesPage;

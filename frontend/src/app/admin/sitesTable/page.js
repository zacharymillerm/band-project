import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const SitesTable = dynamic(() => import('@/pageComponent/admin/AdminTable/sites'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const SiteTable = () => <SitesTable id="newSite" />;

export default SiteTable;

import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const NewSite = dynamic(() => import('@/pageComponent/admin/site/NewSite'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const Site = () => <NewSite />;

export default Site;

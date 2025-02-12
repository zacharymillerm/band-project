import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const NewThree = dynamic(() => import('@/pageComponent/admin/D_Three/NewThree'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const Three = () => <NewThree />;

export default Three;

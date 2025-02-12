import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const FactoryShowTable = dynamic(() => import('@/pageComponent/admin/AdminTable/factoryShow'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const FactoryTable = () => <FactoryShowTable id="newBlog" />;

export default FactoryTable;

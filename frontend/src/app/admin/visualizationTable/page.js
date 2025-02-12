import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const VisualizationTable = dynamic(() => import('@/pageComponent/admin/AdminTable/visualization'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const Visualization = () => <VisualizationTable id="newVisualization" />;

export default Visualization;

import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const RehearsalTable = dynamic(() => import('@/pageComponent/admin/AdminTable/rehearsal'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const Rehearsal = () => <RehearsalTable id="newBase" />;

export default Rehearsal;

import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const NewParticipant = dynamic(() => import('@/pageComponent/admin/Rehearsal/NewParticipant'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const Participant = () => <NewParticipant />;

export default Participant;

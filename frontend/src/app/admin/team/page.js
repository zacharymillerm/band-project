import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const NewTeam = dynamic(() => import('@/pageComponent/admin/team/page'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const Team = () => <NewTeam />;

export default Team;

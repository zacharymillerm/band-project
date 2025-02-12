import dynamic from 'next/dynamic';
import LoadingChicha from '@/components/LoadingChicha/LoadingChicha';

const NewTeamTable = dynamic(() => import('@/pageComponent/admin/AdminTable/newTeam'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const NewTeam = () => <NewTeamTable id="newTeam" />;

export default NewTeam;

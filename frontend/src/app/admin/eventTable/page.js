import dynamic from 'next/dynamic';
import LoadingChicha from '@/components/LoadingChicha/LoadingChicha';

const MainEventTable = dynamic(() => import('@/pageComponent/admin/AdminTable/event'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const EventTable = () => <MainEventTable />;

export default EventTable;

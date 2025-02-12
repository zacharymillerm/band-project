import LoadingChicha from '@/components/LoadingChicha/LoadingChicha';
import dynamic from 'next/dynamic';

const NewEvent = dynamic(() => import('@/pageComponent/admin/event/NewEvent'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const Events = () => <NewEvent />;

export default Events;

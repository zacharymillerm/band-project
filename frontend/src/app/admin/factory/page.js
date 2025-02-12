import dynamic from 'next/dynamic';
import LoadingChicha from '@/components/LoadingChicha/LoadingChicha';

const NewFactory = dynamic(() => import('@/pageComponent/admin/factory/NewFactory'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const Factory = () => <NewFactory />;

export default Factory;

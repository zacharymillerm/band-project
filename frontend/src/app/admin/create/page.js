import LoadingChicha from '@/components/LoadingChicha/LoadingChicha';
import dynamic from 'next/dynamic';

const CreateUser = dynamic(() => import('@/pageComponent/admin/AdminUsers/CreateUser'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const UserCreate = () => <CreateUser />;

export default UserCreate;

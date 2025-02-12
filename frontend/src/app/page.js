import dynamic from "next/dynamic";

import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
const Home = dynamic(() => import('@/pageComponent/home'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}

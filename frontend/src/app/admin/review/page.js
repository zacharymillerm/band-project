import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const NewReview = dynamic(() => import('@/pageComponent/admin/review/NewReview'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})
const Review = () => <NewReview />;

export default Review;

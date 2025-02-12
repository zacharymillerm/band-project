import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";

const ReviewTable = dynamic(() => import('@/pageComponent/admin/AdminTable/reviews'), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const ReviewsTable = () => <ReviewTable id="newReview" />;

export default ReviewsTable;

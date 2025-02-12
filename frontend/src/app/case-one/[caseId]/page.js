
import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { getCaseById } from "@/api";
export async function generateMetadata({ params }) {
  try {
    // Get the case data using the ID from params
    const caseData = await getCaseById(params.caseId);
    
    // If no data is found, return default metadata
    if (!caseData) {
      return {
        title: 'Case Not Found',
        description: 'The requested case could not be found',
      };
    }

    // Return metadata based on the case data
    return {
      title: caseData.title || "Кейсы | ЗАВОД ШОУ", // Use your actual data field
      description: caseData.description || 'Каталог кейсов: подробный список реализованных проектов с фильтрами и поиском. Найдите решения и стейдж-дизайн для мероприятия или концерта.', // Use your actual data field
      keywords: caseData.keyword || 'Кейсы мероприятий, решения для площадок, продакшн шоу, Кейсы туров, Кейсы концертов, Каталог кейсов',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return default metadata if there's an error
    return {
      title: caseData.title || "Кейсы | ЗАВОД ШОУ", // Use your actual data field
      description: caseData.description || 'Каталог кейсов: подробный список реализованных проектов с фильтрами и поиском. Найдите решения и стейдж-дизайн для мероприятия или концерта.', // Use your actual data field
      keywords: caseData.keyword || 'Кейсы мероприятий, решения для площадок, продакшн шоу, Кейсы туров, Кейсы концертов, Каталог кейсов',
    };
  }
}
const CaseEvent = dynamic(() => import("@/pageComponent/cases/CaseEvent"), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const CaseOne = () => {

  return(
    <>
      <CaseEvent />
    </>
  )
};

export default CaseOne;

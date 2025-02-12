import dynamic from "next/dynamic";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import { getSiteById } from "@/api";
export async function generateMetadata({ params }) {
  try {
    // Get the Site data using the ID from params
    const siteData = await getSiteById(params.siteId);
    
    // If no data is found, return default metadata
    if (!siteData) {
      return {
        title: 'Site Not Found',
        description: 'The requested site could not be found',
      };
    }

    // Return metadata based on the Site data
    return {
      title: siteData.title || "Площадки | ЗАВОД ШОУ", // Use your actual data field
      description: siteData.description || 'Проверенный каталог площадок с готовыми решениями для любых мероприятий. Широкий выбор локаций с фильтрами и поиском.  Поможем с техническим продакшном, чтобы ваше событие прошло без лишних забот.', // Use your actual data field
      keywords: siteData.keyword || 'Каталог площадок, Площадки для мероприятий, Площадки для концертов, Локации для мероприятий, площадка для…, площадки для ивента',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return default metadata if there's an error
    return {
      title: siteData.title || "Площадки | ЗАВОД ШОУ",
      description: siteData.description || 'Проверенный каталог площадок с готовыми решениями для любых мероприятий. Широкий выбор локаций с фильтрами и поиском.  Поможем с техническим продакшном, чтобы ваше событие прошло без лишних забот.', // Use your actual data field
      keywords: siteData.keyword || 'Каталог площадок, Площадки для мероприятий, Площадки для концертов, Локации для мероприятий, площадка для…, площадки для ивента',
    };
  }
}

const SitePage = dynamic(() => import("@/pageComponent/sites/SitePage"), {
  loading: () => <div className="displayCenter"><LoadingChicha /></div>,
  ssr: true,
})

const SiteOne = () => <SitePage />;

export default SiteOne;

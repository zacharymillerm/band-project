import Headers from "@/layouts/Headers";
import Footer from "@/layouts/Footer";

import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
// import "swiper/swiper-bundle.min.css";
// import "swiper/css/navigation.css";

import "@/styles/GlobalStyles.css";
import "@/styles/fonts.css";

import "@/styles/adminpage/style.css";

import "@/styles/components/cards/card.css";
import "@/styles/components/cards/preview.css";
import "@/styles/components/cards/swiperCard.css";
import "@/styles/components/avatar.css";
import "@/styles/components/badges.css";
import "@/styles/components/box.css";
import "@/styles/components/boxRound.css";
import "@/styles/components/button.css";
import "@/styles/components/chicha.css";
import "@/styles/components/ComboBox.css";
import "@/styles/components/herosample.css";
import "@/styles/components/input.css";
import "@/styles/components/swiper.css";

import "@/styles/layouts/dropdown.css";
import "@/styles/layouts/layout.css";

import "@/styles/pages/cases/caseCards.css";
import "@/styles/pages/cases/caseCatalog.css";
import "@/styles/pages/cases/caseEvent.css";
import "@/styles/pages/services/rehearsal.css";
import "@/styles/pages/services/showDevelopment.css";
import "@/styles/pages/services/visualization.css";
import "@/styles/pages/home.css";
import "@/styles/pages/notFound.css";
import "@/styles/pages/policy.css";
import "@/styles/pages/serie.css";
import "@/styles/pages/sitepage.css";
import "@/styles/pages/stageclothes.css";
import "@/styles/pages/teamOffice.css";
import "@/styles/pages/teamPage.css";
import { siteMetadata } from "@/config/metadata";


export const metadata = {
  title: siteMetadata.home.title,
  description: siteMetadata.home.description,
  keywords: siteMetadata.home.keywords,
  alternates: siteMetadata.home.alternates,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body style={{ background: "var(--primaryBgColor)" }}>
        <Headers />
        {children}
        <Footer />
      </body>
    </html>
  );
}
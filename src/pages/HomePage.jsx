import { useRef } from "react";
import Hero from "../components/Hero";
import CompanyInfo from "../components/CompanyInfo";
import FeaturedCategories from "../components/FeaturedCategories";
import ExploreSection from "../components/ExploreSection";
import QualityProducts from "../components/QualityProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import GlobalSourcing from "../components/GlobalSourcing";
import ByTheNumbers from "../components/ByTheNumbers";
import ConnectWithUs from "../components/ConnectWithUs";

function HomePage() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} className="min-h-screen">
      <Hero />
      <CompanyInfo />
      <FeaturedCategories />
      <ExploreSection />
      <QualityProducts />
      <WhyChooseUs />
      <GlobalSourcing />
      <ByTheNumbers />
      <ConnectWithUs />
    </div>
  );
}

export default HomePage;
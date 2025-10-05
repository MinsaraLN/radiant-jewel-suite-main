import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedCollections from "@/components/FeaturedCollections";
import PromotionalBanner from "@/components/PromotionalBanner";
import ProductGrid from "@/components/ProductGrid";
import TrustBadges from "@/components/TrustBadges";
import StoreLocator from "@/components/StoreLocator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroCarousel />
      <FeaturedCollections />
      <PromotionalBanner />
      <ProductGrid />
      <TrustBadges />
      <StoreLocator />
      <Footer />
    </div>
  );
};

export default Index;

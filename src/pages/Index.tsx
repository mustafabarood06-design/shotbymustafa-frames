
import { useCallback, useState } from "react";
import Navigation from "@/components/home/Navigation";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import SkillsSection from "@/components/home/SkillsSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import PageNavigation from "@/components/home/PageNavigation";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // Simple section scroll handler for navigation/CTA
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <HeroSection scrollToSection={scrollToSection} />
            <AboutSection />
          </>
        );
      case 2:
        return <PortfolioSection />;
      case 3:
        return <SkillsSection />;
      case 4:
        return <ContactSection />;
      case 5:
        return <Footer />;
      default:
        return (
          <>
            <HeroSection scrollToSection={scrollToSection} />
            <AboutSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={scrollToSection} />
      <div className="min-h-screen pt-16">
        {renderPageContent()}
      </div>
      <PageNavigation 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Index;


import { useCallback, useState } from "react";
import Navigation from "@/components/home/Navigation";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import SkillsSection from "@/components/home/SkillsSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import PageNavigation from "@/components/home/PageNavigation";
import VisitorNotification from "@/components/home/VisitorNotification";
import AdminDashboard from "@/components/home/AdminDashboard";
import ChatAssistant from "@/components/ai/ChatAssistant";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // Enhanced section scroll handler that handles pagination
  const scrollToSection = useCallback((sectionId: string) => {
    // Map section IDs to their corresponding pages
    const sectionToPageMap: { [key: string]: number } = {
      'home': 1,
      'about': 1,
      'portfolio': 2,
      'skills': 3,
      'contact': 4
    };

    const targetPage = sectionToPageMap[sectionId];
    
    if (targetPage && targetPage !== currentPage) {
      // Switch to the correct page first
      setCurrentPage(targetPage);
      // Scroll to top and then to the section after page change
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        } else {
          // If section not found, just scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100); // Small delay to allow page to render
    } else {
      // Section is on current page, scroll directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }, [currentPage]);

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
    <div className="min-h-screen bg-gray-100">
      <VisitorNotification />
      <AdminDashboard />
      <Navigation scrollToSection={scrollToSection} />
      <div className="min-h-screen pt-16">
        {renderPageContent()}
      </div>
      <PageNavigation 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ChatAssistant />
    </div>
  );
};

export default Index;

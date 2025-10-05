import { Frame, Camera, Instagram, Download } from 'lucide-react';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ImageZoom from './ImageZoom';
import jsPDF from 'jspdf';

// Import portfolio images
import rainyDaysImg from '@/assets/portfolio-rainy-days.jpg';
import cityLinesImg from '@/assets/portfolio-city-lines.jpg';
import portraitMomentImg from '@/assets/portfolio-portrait-moment.jpg';
import capturedExpressionImg from '@/assets/portfolio-captured-expression.jpg';
import pedalPauseImg from '@/assets/portfolio-pedal-pause.jpg';
import ruralMomentsImg from '@/assets/portfolio-rural-moments.jpg';
import threadsTimeImg from '@/assets/portfolio-threads-time.jpg';
import restImg from '@/assets/portfolio-rest.jpg';
import silentTreeImg from '@/assets/portfolio-silent-tree.jpg';
import rainyDayImg from '@/assets/portfolio-rainy-day.jpg';

const portfolioCategories = {
  street: {
    title: "Street & Urban",
    description: "City vibes and urban energy",
    images: [
      {
        src: rainyDaysImg,
        title: 'RAINY DAYS',
        category: 'Street'
      },
      {
        src: cityLinesImg,
        title: 'CITY LINES',
        category: 'Black & White'
      }
    ]
  },
  portraits: {
    title: "Portraits & Human Connection",
    description: "People-focused moments",
    images: [
      {
        src: portraitMomentImg,
        title: 'PORTRAIT MOMENT',
        category: 'Portraits'
      },
      {
        src: capturedExpressionImg,
        title: 'CAPTURED EXPRESSION',
        category: 'Portraits'
      },
      {
        src: rainyDayImg,
        title: 'RAINY DAY',
        category: 'Portraits'
      }
    ]
  },
  everyday: {
    title: "Everyday Life",
    description: "Candid lifestyle moments",
    images: [
      {
        src: pedalPauseImg,
        title: 'PEDAL PAUSE',
        category: 'Everyday Moments'
      },
      {
        src: ruralMomentsImg,
        title: 'RURAL MOMENTS',
        category: 'Everyday Moments'
      },
      {
        src: threadsTimeImg,
        title: 'THREADS OF TIME',
        category: 'Everyday Moments'
      },
      {
        src: restImg,
        title: 'REST',
        category: 'Everyday Moments'
      }
    ]
  },
  nature: {
    title: "Nature & Landscapes",
    description: "Natural scenes and artistic compositions",
    images: [
      {
        src: silentTreeImg,
        title: 'SILENT TREE,LOUD SKY',
        category: 'Landscape'
      }
    ]
  }
};

const ITEMS_PER_PAGE = 6;

export default function PortfolioSection() {
  const [currentPages, setCurrentPages] = useState({
    street: 1,
    portraits: 1,
    everyday: 1,
    nature: 1
  });
  const { toast } = useToast();

  const generatePortfolioPDF = async () => {
    toast({
      title: "Generating PDF...",
      description: "Please wait while we create your portfolio PDF.",
    });

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Add title
      pdf.setFontSize(24);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Shot by Mustafa - Portfolio', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.text('Photography Portfolio', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;

      // Process each category
      for (const [categoryKey, category] of Object.entries(portfolioCategories)) {
        // Add category title
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text(category.title, 20, yPosition);
        yPosition += 8;
        
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(category.description, 20, yPosition);
        yPosition += 15;

        // Process images in this category
        for (const image of category.images) {
          try {
            // Load image
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = image.src;
            });

            // Calculate image dimensions
            const maxWidth = pageWidth - 40;
            const maxHeight = 60;
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
            const imgWidth = img.width * ratio;
            const imgHeight = img.height * ratio;

            // Check if we need a new page
            if (yPosition + imgHeight + 20 > pageHeight) {
              pdf.addPage();
              yPosition = 20;
            }

            // Add image to PDF
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/jpeg', 0.8);
            
            pdf.addImage(dataURL, 'JPEG', 20, yPosition, imgWidth, imgHeight);
            
            // Add image title
            pdf.setFontSize(8);
            pdf.setTextColor(0, 0, 0);
            pdf.text(image.title, 20, yPosition + imgHeight + 5);
            pdf.setTextColor(100, 100, 100);
            pdf.text(image.category, 20, yPosition + imgHeight + 10);
            
            yPosition += imgHeight + 20;
          } catch (error) {
            console.error('Error loading image:', error);
            // Skip this image and continue
          }
        }
        
        yPosition += 10; // Space between categories
      }

      // Save the PDF
      pdf.save('Shot_by_Mustafa_Portfolio.pdf');
      
      toast({
        title: "PDF Generated Successfully!",
        description: "Your portfolio PDF has been downloaded.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error generating PDF",
        description: "There was an issue creating your portfolio PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderPhotoGrid = (images: typeof portfolioCategories.street.images, category: keyof typeof currentPages) => {
    const currentPage = currentPages[category];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedImages = images.slice(startIndex, endIndex);
    const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
      setCurrentPages(prev => ({
        ...prev,
        [category]: page
      }));
    };

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 sm:gap-6 lg:gap-8 auto-rows-max">
          {paginatedImages.map((item, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-2xl bg-card shadow-sm border border-border/50" 
            >
              <div className="aspect-[4/5] sm:aspect-square overflow-hidden">
                <ImageZoom 
                  src={item.src} 
                  alt={item.title}
                  title={item.title}
                  category={item.category}
                />
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="portfolio" className="py-24 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Portfolio
          </div>
          <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-xl leading-relaxed">
            Movement That Whisper Stories
          </p>
          <div className="mt-8">
            <Button 
              onClick={generatePortfolioPDF}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Portfolio PDF
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="street" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12">
            <TabsTrigger value="street">Street & Urban</TabsTrigger>
            <TabsTrigger value="portraits">Portraits</TabsTrigger>
            <TabsTrigger value="everyday">Everyday Life</TabsTrigger>
            <TabsTrigger value="nature">Nature</TabsTrigger>
          </TabsList>
          
          <TabsContent value="street" className="">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.street.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.street.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.street.images, 'street')}
          </TabsContent>
          
          <TabsContent value="portraits" className="">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.portraits.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.portraits.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.portraits.images, 'portraits')}
          </TabsContent>
          
          <TabsContent value="everyday" className="">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.everyday.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.everyday.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.everyday.images, 'everyday')}
          </TabsContent>
          
          <TabsContent value="nature" className="">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.nature.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.nature.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.nature.images, 'nature')}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

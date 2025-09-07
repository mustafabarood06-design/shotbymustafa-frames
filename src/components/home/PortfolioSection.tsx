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

const portfolioCategories = {
  street: {
    title: "Street & Urban",
    description: "City vibes and urban energy",
    images: [
      {
        src: 'https://i.postimg.cc/FzK8YY0J/1000178024.jpg',
        title: 'RAINY DAYS',
        category: 'Street'
      },
      {
        src: 'https://i.postimg.cc/YqDZ36zz/IMG-20250529-175114.jpg',
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
        src: 'https://i.postimg.cc/h45skGf3/IMG-20250711-180645.jpg',
        title: 'PORTRAIT MOMENT',
        category: 'Portraits'
      },
      {
        src: 'https://i.postimg.cc/BvmH2hFw/IMG-20250603-145648.jpg',
        title: 'CAPTURED EXPRESSION',
        category: 'Portraits'
      }
    ]
  },
  everyday: {
    title: "Everyday Life",
    description: "Candid lifestyle moments",
    images: [
      {
        src: 'https://i.postimg.cc/4NxjVLV3/IMG-20250603-150330.jpg',
        title: 'PEDAL PAUSE',
        category: 'Everyday Moments'
      },
      {
        src: 'https://i.postimg.cc/6Q3QnC3P/IMG-20250611-102952.jpg',
        title: 'RURAL MOMENTS',
        category: 'Everyday Moments'
      },
      {
        src: 'https://i.postimg.cc/c4vpwqv7/IMG-20250615-162806-1.jpg',
        title: 'THREADS OF TIME',
        category: 'Everyday Moments'
      },
      {
        src: 'https://i.postimg.cc/K8sZP7Nw/IMG-20250615-163137.jpg',
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
        src: 'https://i.postimg.cc/rpC8t6Dy/IMG-20250529-190420.jpg',
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
              className="relative overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-2xl transition-all duration-500 animate-scale-in border border-border/50 hover:scale-[1.02]" 
              style={{ animationDelay: `${index * 0.1}s` }}
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
        <div className="text-center mb-20 animate-fade-in">
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
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
          
          <TabsContent value="street" className="animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.street.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.street.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.street.images, 'street')}
          </TabsContent>
          
          <TabsContent value="portraits" className="animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.portraits.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.portraits.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.portraits.images, 'portraits')}
          </TabsContent>
          
          <TabsContent value="everyday" className="animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.everyday.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.everyday.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.everyday.images, 'everyday')}
          </TabsContent>
          
          <TabsContent value="nature" className="animate-fade-in">
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

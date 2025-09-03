import { Frame, Camera, Instagram } from 'lucide-react';
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
import ImageZoom from './ImageZoom';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedImages.map((item, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-2xl transition-shadow duration-500 animate-scale-in border border-border/50" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
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

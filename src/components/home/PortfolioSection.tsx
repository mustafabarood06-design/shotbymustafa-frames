
import { Frame, Camera, Instagram } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const portfolioCategories = {
  street: {
    title: "Street & Urban",
    description: "City vibes and urban energy",
    images: [
      {
        src: 'https://i.postimg.cc/nr05NBbZ/IMG-20250527-191655.jpg',
        title: 'CITY IN MOTION',
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
        src: 'https://i.postimg.cc/ZnJ3Cs7P/IMG-20250529-WA0147-3.jpg',
        title: 'MOMENT BENEATH THE BUSH',
        category: 'Portraits'
      },
      {
        src: 'https://i.postimg.cc/qvVNW1wH/IMG-20250606-185628.jpg',
        title: 'URBAN LAYERS',
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

export default function PortfolioSection() {
  const renderPhotoGrid = (images: typeof portfolioCategories.street.images) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((item, index) => (
        <div 
          key={index} 
          className="group relative overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-2xl transition-all duration-500 animate-scale-in border border-border/50 hover:border-primary/20" 
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="aspect-square overflow-hidden">
            <img 
              src={item.src} 
              alt={item.title} 
              className="photo w-full h-full object-cover transition-all duration-300 hover:scale-[1.02] hover:brightness-110" 
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-bold text-xl mb-2 tracking-wide">{item.title}</h3>
              <p className="text-white/80 text-sm font-medium">{item.category}</p>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
            <Camera className="w-5 h-5 text-white" />
          </div>
        </div>
      ))}
    </div>
  );

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
            {renderPhotoGrid(portfolioCategories.street.images)}
          </TabsContent>
          
          <TabsContent value="portraits" className="animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.portraits.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.portraits.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.portraits.images)}
          </TabsContent>
          
          <TabsContent value="everyday" className="animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.everyday.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.everyday.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.everyday.images)}
          </TabsContent>
          
          <TabsContent value="nature" className="animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{portfolioCategories.nature.title}</h3>
              <p className="text-muted-foreground">{portfolioCategories.nature.description}</p>
            </div>
            {renderPhotoGrid(portfolioCategories.nature.images)}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

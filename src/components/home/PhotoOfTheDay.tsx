
import { useState, useEffect } from 'react';
import { Camera, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const photosOfTheDay = [
  {
    src: 'https://i.postimg.cc/nr05NBbZ/IMG-20250527-191655.jpg',
    title: 'CITY IN MOTION',
    category: 'Street Photography'
  },
  {
    src: 'https://i.postimg.cc/YqDZ36zz/IMG-20250529-175114.jpg',
    title: 'CITY LINES',
    category: 'Black & White'
  },
  {
    src: 'https://i.postimg.cc/ZnJ3Cs7P/IMG-20250529-WA0147-3.jpg',
    title: 'MOMENT BENEATH THE BUSH',
    category: 'Portraits'
  },
  {
    src: 'https://i.postimg.cc/qvVNW1wH/IMG-20250606-185628.jpg',
    title: 'URBAN LAYERS',
    category: 'Portraits'
  },
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
  },
  {
    src: 'https://i.postimg.cc/rpC8t6Dy/IMG-20250529-190420.jpg',
    title: 'SILENT TREE,LOUD SKY',
    category: 'Landscape'
  }
];

export default function PhotoOfTheDay() {
  const [currentPhoto, setCurrentPhoto] = useState(photosOfTheDay[0]);
  const [isLoading, setIsLoading] = useState(false);

  // Get photo of the day based on current date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const photoIndex = dayOfYear % photosOfTheDay.length;
    setCurrentPhoto(photosOfTheDay[photoIndex]);
  }, []);

  const getRandomPhoto = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * photosOfTheDay.length);
      setCurrentPhoto(photosOfTheDay[randomIndex]);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto mb-16 animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
          <Camera className="w-4 h-4" />
          Photo of the Day
        </div>
        <h3 className="font-display font-bold text-3xl md:text-4xl mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          📸 Daily Pick
        </h3>
        <p className="text-muted-foreground">
          A random selection from my portfolio
        </p>
      </div>
      
      <div className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50">
        <div className="aspect-square overflow-hidden">
          <img 
            src={currentPhoto.src} 
            alt={currentPhoto.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
            } group-hover:scale-105`}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="font-bold text-xl mb-2 tracking-wide">{currentPhoto.title}</h4>
            <p className="text-white/80 text-sm font-medium">{currentPhoto.category}</p>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            onClick={getRandomPhoto}
            size="sm"
            variant="secondary"
            className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
            disabled={isLoading}
          >
            <Shuffle className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <Button
          onClick={getRandomPhoto}
          variant="outline"
          className="text-sm"
          disabled={isLoading}
        >
          <Shuffle className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Loading...' : 'Pick Another'}
        </Button>
      </div>
    </div>
  );
}

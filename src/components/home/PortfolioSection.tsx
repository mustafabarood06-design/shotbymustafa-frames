
import { Frame, Camera, Instagram } from 'lucide-react';

const portfolioImages = [
  {
    src: 'https://i.postimg.cc/nr05NBbZ/IMG-20250527-191655.jpg',
    title: 'CITY IN MOTION',
    category: 'Street',
  }, {
    src: 'https://i.postimg.cc/4NxjVLV3/IMG-20250603-150330.jpg',
    title: 'PEDAL PAUSE',
    category: 'Everyday Moments',
  }, {
    src: 'https://i.postimg.cc/ZnJ3Cs7P/IMG-20250529-WA0147-3.jpg',
    title: 'MOMENT BENEATH THE BUSH',
    category: 'Portraits',
  }, {
    src: 'https://i.postimg.cc/YqDZ36zz/IMG-20250529-175114.jpg',
    title: 'CITY LINES',
    category: 'Black & White',
  }, {
    src: 'https://i.postimg.cc/6Q3QnC3P/IMG-20250611-102952.jpg',
    title: 'RURAL MOMENTS',
    category: 'Everyday Moments',
  }, {
    src: 'https://i.postimg.cc/qvVNW1wH/IMG-20250606-185628.jpg',
    title: 'URBAN LAYERS',
    category: 'Portraits',
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of moments that speak louder than words
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioImages.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="mb-1 text-justify font-bold text-lg">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

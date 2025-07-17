import React from 'react';
import { useScrollAnimation } from '../hooks/useParallax';

export const Gallery= () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const galleryImages = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg',
      alt: 'Mountain sunrise view from tent'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg',
      alt: 'Lakeside camping'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg',
      alt: 'Nighttime campfire'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
      alt: 'Forest hiking trail'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/700626/pexels-photo-700626.jpeg',
      alt: 'Canyon view'
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg',
      alt: 'Riverside camping'
    }
  ];

  return (
    <section id="gallery" className="py-20 md:py-32 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={ref}
          className={`fade-in ${isVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Capture the Wild</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700">
              Browse our gallery of stunning moments from the wilderness, showcasing the beauty and adventure that awaits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((item) => (
              <div 
                key={item.id}
                className="gallery-item rounded-lg overflow-hidden h-64 md:h-80 shadow-md"
              >
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="#contact" 
              className="inline-block px-6 py-3 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all duration-300"
            >
              View Full Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
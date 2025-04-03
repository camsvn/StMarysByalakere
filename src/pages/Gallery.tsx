
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";

const Gallery = () => {
  // Sample gallery images
  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1438032005730-c779502df39b", alt: "Church building", category: "Church" },
    { id: 2, src: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e", alt: "Christmas celebration", category: "Events" },
    { id: 3, src: "https://images.unsplash.com/photo-1473177104440-ffee2f376098", alt: "Church interior", category: "Church" },
    { id: 4, src: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb", alt: "Youth group event", category: "Events" },
    { id: 5, src: "https://images.unsplash.com/photo-1524230572899-a752b3835840", alt: "Sunday Mass", category: "Services" },
    { id: 6, src: "https://images.unsplash.com/photo-1551038247-3d9af20df552", alt: "Parish picnic", category: "Events" }
  ];

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading 
            title="Gallery"
            subtitle="Browse photos of our church, community events, and celebrations."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div 
                key={image.id} 
                className={`aspect-square overflow-hidden rounded-lg shadow-md card-hover animate-fade-in animate-delay-${index % 3 * 100}`}
              >
                <img 
                  src={`${image.src}?w=500&auto=format`} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Gallery;

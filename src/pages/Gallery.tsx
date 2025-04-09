
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Gallery = () => {
  // Sample gallery images with faith-oriented content
  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1438032005730-c779502df39b", alt: "Church building exterior", category: "Church" },
    { id: 2, src: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e", alt: "Christmas celebration", category: "Events" },
    { id: 3, src: "https://images.unsplash.com/photo-1473177104440-ffee2f376098", alt: "Church interior with beautiful architecture", category: "Church" },
    { id: 4, src: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb", alt: "Youth group event", category: "Events" },
    { id: 5, src: "https://images.unsplash.com/photo-1524230572899-a752b3835840", alt: "Sunday Mass celebration", category: "Services" },
    { id: 6, src: "https://images.unsplash.com/photo-1551038247-3d9af20df552", alt: "Parish picnic", category: "Events" }
  ];

  // Featured gallery images for the carousel
  const featuredImages = images.slice(0, 3);

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading 
            title="Our Parish Life"
            subtitle="Glimpses of our faith journey and community celebrations"
          />

          {/* Featured Images Carousel */}
          <div className="mb-12 max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {featuredImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <AspectRatio ratio={16/9} className="bg-muted">
                          <img 
                            src={`${image.src}?w=1200&h=675&fit=crop&auto=format`} 
                            alt={image.alt} 
                            className="w-full h-full object-cover" 
                          />
                        </AspectRatio>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 md:-left-8" />
              <CarouselNext className="right-2 md:-right-8" />
            </Carousel>
          </div>
          
          {/* Gallery Grid */}
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

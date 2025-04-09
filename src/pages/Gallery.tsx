
import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LayoutGrid, Filter } from "lucide-react";

const Gallery = () => {
  // Sample gallery images with categories
  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1438032005730-c779502df39b", alt: "Church building exterior", category: "Church" },
    { id: 2, src: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e", alt: "Christmas celebration", category: "Events" },
    { id: 3, src: "https://images.unsplash.com/photo-1473177104440-ffee2f376098", alt: "Church interior with beautiful architecture", category: "Church" },
    { id: 4, src: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb", alt: "Youth group event", category: "Events" },
    { id: 5, src: "https://images.unsplash.com/photo-1524230572899-a752b3835840", alt: "Sunday Mass celebration", category: "Services" },
    { id: 6, src: "https://images.unsplash.com/photo-1551038247-3d9af20df552", alt: "Parish picnic", category: "Events" },
    { id: 7, src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", alt: "Community outreach", category: "Outreach" },
    { id: 8, src: "https://images.unsplash.com/photo-1466442929976-97f336a657be", alt: "Church activities", category: "Services" },
    { id: 9, src: "https://images.unsplash.com/photo-1517022812141-23620dba5c23", alt: "Youth ministry", category: "Ministries" },
  ];

  // Extract unique categories
  const categories = ["All", ...new Set(images.map(image => image.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter images based on selected category
  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(image => image.category === selectedCategory);

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
                          <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 text-white">
                            <p className="font-medium">{image.alt}</p>
                            <Badge variant="secondary" className="mt-1">{image.category}</Badge>
                          </div>
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
          
          {/* Categories Filter */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-accent/10 rounded-full px-3 py-1 mr-2">
              <Filter className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Categories:</span>
            </div>
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer transition-colors hover:bg-secondary/20"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          {/* Gallery Grid with Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`aspect-square overflow-hidden rounded-lg shadow-md card-hover animate-fade-in animate-delay-${index % 3 * 100}`}
              >
                <div className="relative h-full group">
                  <img 
                    src={`${image.src}?w=500&auto=format`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-medium mb-1">{image.alt}</p>
                      <Badge>{image.category}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Gallery;

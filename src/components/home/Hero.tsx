
import { Button } from "@/components/ui/button";
import ShapesBackground from "@/components/ui/ShapesBackground";
import { Link } from "react-router-dom";
import { Church, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 px-4 overflow-hidden">
      <ShapesBackground />
      <div className="container mx-auto hero-content flex flex-col lg:flex-row items-center gap-8 md:gap-16">
        <div className="max-w-2xl lg:w-1/2 text-center lg:text-left">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4 animate-fade-in">
            <Church className="h-6 w-6 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Faith Community</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
            Welcome to{" "}
            <span className="text-primary">St. Mary Malabar Catholic Church</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 animate-fade-in animate-delay-100">
            Join our vibrant community for worship, fellowship, and spiritual growth. Together, we celebrate our faith and serve our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in animate-delay-200">
            <Button size="lg" className="font-medium flex items-center gap-2" asChild>
              <Link to="/mass-services">
                <Church className="h-5 w-5" />
                Mass Schedule
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="font-medium flex items-center gap-2" asChild>
              <Link to="/events">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Hero image - large cross or church visual */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 rounded-2xl overflow-hidden shadow-xl animate-fade-in animate-delay-300">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/5">
            <img 
              src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=800&h=600"
              alt="St. Mary's Church" 
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold">Our Church</h3>
                <p className="text-sm opacity-90">A place of worship, community, and spiritual growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

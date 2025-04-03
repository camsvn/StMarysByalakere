
import { Button } from "@/components/ui/button";
import ShapesBackground from "@/components/ui/ShapesBackground";

const Hero = () => {
  return (
    <section className="hero pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 px-4 overflow-hidden">
      <ShapesBackground />
      <div className="container mx-auto hero-content">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
            Welcome to{" "}
            <span className="text-primary">St. Mary Malabar Catholic Church</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 animate-fade-in animate-delay-100">
            Join our vibrant community for worship, fellowship, and spiritual growth. Together, we celebrate our faith and serve our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animate-delay-200">
            <Button size="lg" className="font-medium">
              Mass Schedule
            </Button>
            <Button variant="outline" size="lg" className="font-medium">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

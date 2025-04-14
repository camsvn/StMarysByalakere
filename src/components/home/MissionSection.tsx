
import { Heart, Users, Church } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { cn } from "@/lib/utils";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const ValueCard = ({ icon, title, description, delay }: ValueCardProps) => (
  <div className={cn(
    "bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in", 
    delay
  )}>
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const MissionSection = () => {
  return (
    <section className="section-container bg-muted">
      <SectionHeading 
        title="Our Mission & Vision" 
        subtitle="Guided by our faith, we strive to build a community that serves and uplifts all."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <ValueCard
          icon={<Heart className="h-6 w-6" />}
          title="Faith & Worship"
          description="Experience spiritual growth through meaningful liturgies and a deepened connection with God."
          delay="animate-delay-100"
        />
        <ValueCard
          icon={<Users className="h-6 w-6" />}
          title="Community"
          description="Build lasting relationships in a welcoming community that supports each other in faith and life."
          delay="animate-delay-200"
        />
        <ValueCard
          icon={<Church className="h-6 w-6" />}
          title="Service"
          description="Reach out to those in need through charitable works and dedicated service to our broader community."
          delay="animate-delay-300"
        />
      </div>
    </section>
  );
};

export default MissionSection;

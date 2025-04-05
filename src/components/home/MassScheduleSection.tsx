
import { Clock, MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCMS } from "@/contexts/CMSContext";

interface MassCardProps {
  day: string;
  times: string[];
  location?: string;
  className?: string;
}

const MassCard = ({ day, times, location, className }: MassCardProps) => (
  <Card className={cn("card-hover", className)}>
    <CardHeader className="pb-2">
      <CardTitle className="text-xl">{day}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <div className="space-y-1">
            {times.map((time, index) => (
              <div key={index} className="text-sm">{time}</div>
            ))}
          </div>
        </div>
        {location && (
          <div className="flex items-start mt-2">
            <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
            <div className="text-sm">{location}</div>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const MassScheduleSection = () => {
  const { massSchedule } = useCMS();
  
  // Only show the first 4 days in the home page (typically Sun-Wed)
  const displaySchedule = massSchedule.slice(0, 4);

  return (
    <section className="section-container bg-gradient-to-br from-primary/5 to-secondary/5">
      <SectionHeading 
        title="Mass Schedule" 
        subtitle="Join us in prayer and worship throughout the week."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displaySchedule.map((item, index) => (
          <MassCard
            key={item.day}
            day={item.day}
            times={item.times}
            location={item.location}
            className={`animate-fade-in animate-delay-${index * 50}`}
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" asChild>
          <Link to="/mass-services">View All Services</Link>
        </Button>
      </div>
    </section>
  );
};

export default MassScheduleSection;

import { Clock, MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCMS } from "@/contexts/CMSContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MassCardProps {
  day: string;
  times: string[];
  location?: string;
  className?: string;
  isHighlighted?: boolean;
}

const MassCard = ({ day, times, location, className, isHighlighted }: MassCardProps) => (
  <Card className={cn(
    "card-hover", 
    isHighlighted && "border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/10",
    className
  )}>
    <CardHeader className="pb-2">
      <CardTitle className={cn("text-xl", isHighlighted && "text-primary")}>{day}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-start">
          <Clock className={cn("h-5 w-5 min-w-5 mr-2 mt-0.5", isHighlighted ? "text-primary" : "text-muted-foreground")} />
          <div className="space-y-1">
            {times.map((time, index) => (
              <div key={index} className={cn("text-sm", isHighlighted && "font-medium")}>{time}</div>
            ))}
          </div>
        </div>
        {location && (
          <div className="flex items-start mt-2">
            <MapPin className={cn("h-5 w-5 mr-2 mt-0.5", isHighlighted ? "text-primary" : "text-muted-foreground")} />
            <div className="text-sm">{location}</div>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const MassScheduleSection = () => {
  const { massSchedule } = useCMS();
  
  // Get current day of the week for highlighting
  const today = new Date().toLocaleString('en-us', {weekday: 'long'});
  
  // Group mass schedule by weekday vs weekend
  const weekdayMasses = massSchedule.filter(item => 
    !["Saturday", "Sunday"].includes(item.day)
  ).slice(0, 3); // Show first 3 weekdays
  
  const weekendMasses = massSchedule.filter(item => 
    ["Saturday", "Sunday"].includes(item.day)
  );

  return (
    <section id="mass-schedule" className="section-container bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Mass Schedule" 
          subtitle="Join us in prayer and worship throughout the week."
        />

        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
          {/* <TabsList className="grid w-full max-w-md mx-auto grid-cols-1 mb-8">
            <TabsTrigger value="all" className="text-xs sm:text-sm px-2 sm:px-3">All Masses</TabsTrigger> */}
            {/* <TabsTrigger value="weekday" className="text-xs sm:text-sm px-2 sm:px-3">Weekday</TabsTrigger>
            <TabsTrigger value="weekend" className="text-xs sm:text-sm px-2 sm:px-3">Weekend</TabsTrigger> */}
          {/* </TabsList> */}

          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {massSchedule.map((item, index) => (
                <MassCard
                  key={item.day}
                  day={item.day}
                  times={item.times}
                  // location={item.location}
                  isHighlighted={item.day === today}
                  className={`animate-fade-in animate-delay-${index * 50}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekday" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {weekdayMasses.map((item, index) => (
                <MassCard
                  key={item.day}
                  day={item.day}
                  times={item.times}
                  // location={item.location}
                  isHighlighted={item.day === today}
                  className={`animate-fade-in animate-delay-${index * 50}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekend" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {weekendMasses.map((item, index) => (
                <MassCard
                  key={item.day}
                  day={item.day}
                  times={item.times}
                  // location={item.location}
                  isHighlighted={item.day === today}
                  className={`animate-fade-in animate-delay-${index * 50}`}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-10">
          <Button size="lg" variant="outline" asChild>
            <Link to="/mass-services">View Detailed Schedule</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MassScheduleSection;

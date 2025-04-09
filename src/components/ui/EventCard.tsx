
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
  className?: string;
}

const EventCard = ({
  title,
  date,
  time,
  description,
  location,
  className,
}: EventCardProps) => {
  // Check if this is a recent event to highlight it
  const isRecent = () => {
    // Simple check - this can be enhanced based on actual date logic
    const eventMonth = date.split(" ")[0];
    const currentMonth = new Date().toLocaleString('default', { month: 'short' });
    return eventMonth === currentMonth;
  };

  return (
    <Card className={cn("card-hover overflow-hidden", isRecent() && "border-primary/50", className)}>
      <div className={cn("h-2 w-full", isRecent() ? "bg-primary" : "bg-muted")} />
      <CardHeader className="pb-2">
        <div className="flex items-center mb-2 space-x-2">
          <div className={cn(
            "p-1.5 rounded-full flex items-center justify-center",
            isRecent() ? "bg-primary/10" : "bg-muted"
          )}>
            <CalendarIcon className={cn(
              "h-4 w-4", 
              isRecent() ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <CardDescription className="text-sm flex items-center">
            <span className="font-medium">{date}</span>
            <span className="mx-2">•</span>
            <Clock className="h-3.5 w-3.5 inline mr-1 text-muted-foreground" />
            <span>{time}</span>
          </CardDescription>
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>
      </CardContent>
      {location && (
        <CardContent className="pt-0 pb-2">
          <div className="flex items-start text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{location}</span>
          </div>
        </CardContent>
      )}
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;

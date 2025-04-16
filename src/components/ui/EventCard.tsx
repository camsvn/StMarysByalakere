
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import FilteredImage from "./FilteredImage";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
  image?: string;
  className?: string;
}

const EventCard = ({ title, date, time, description, location, image, className }: EventCardProps) => {
  return (
    <Card className={cn("overflow-hidden group", className)}>
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <FilteredImage
            src={image}
            alt={title}
            filterType="event"
            aspectRatio={16/9}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"></div>
        </div>
      )}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 h-2 w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-colors duration-500"></div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
        <div className="flex items-center mt-2">
          <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
          <span className="text-sm">{date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-3">
          <Clock className="h-5 w-5 text-muted-foreground mr-2" />
          <span className="text-sm">{time}</span>
        </div>
        
        {location && (
          <div className="flex items-center mb-3">
            <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-sm">{location}</span>
          </div>
        )}
        
        <p className="text-muted-foreground line-clamp-3 mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default EventCard;

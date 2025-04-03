
import { CalendarIcon } from "lucide-react";
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
  return (
    <Card className={cn("card-hover overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center mb-2">
          <CalendarIcon className="h-5 w-5 text-primary mr-2" />
          <CardDescription className="text-sm">
            {date} • {time}
          </CardDescription>
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
        {location && (
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Location:</strong> {location}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;


import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import EventCard from "../ui/EventCard";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/contexts/CMSContext";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon } from "lucide-react";

const EventsSection = () => {
  const { events } = useCMS();
  
  // Display the first 3 events
  const displayedEvents = events.slice(0, 3);

  // Get current date for highlighting today's events
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section className="section-container bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Upcoming Events" 
          subtitle="Join us for these special events and be part of our vibrant community."
        />

        <Tabs defaultValue="cards" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  description={event.description}
                  location={event.location}
                  className={`animate-fade-in animate-delay-${index * 100} shadow-lg`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary/10 p-4 flex items-center">
                <CalendarIcon className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-lg font-medium">Upcoming Events</h3>
              </div>
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Date & Time</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedEvents.map((event) => (
                      <TableRow key={event.id} className={event.date === formattedToday ? "bg-primary/5" : ""}>
                        <TableCell className="font-medium">
                          <div>{event.date}</div>
                          <div className="text-sm text-muted-foreground">{event.time}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{event.description}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{event.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

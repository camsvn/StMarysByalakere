
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";
import EventCard from "../components/ui/EventCard";
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
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const Events = () => {
  const { events } = useCMS();

  // Get current date for highlighting today's events
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto max-w-7xl relative z-10">
          <SectionHeading 
            title="Events & Announcements"
            subtitle="Stay updated with what's happening in our parish community."
          />
          
          <Tabs defaultValue="cards" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {events.map((event, index) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    description={event.description}
                    location={event.location}
                    className={`animate-fade-in animate-delay-${index % 3 * 100} shadow-lg`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary/10 p-4 flex items-center">
                  <CalendarIcon className="h-6 w-6 text-primary mr-2" />
                  <h3 className="text-lg font-medium">All Events</h3>
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
                      {events.map((event) => (
                        <TableRow key={event.id} className={event.date === formattedToday ? "bg-primary/5" : ""}>
                          <TableCell className="font-medium">
                            <div>{event.date}</div>
                            <div className="text-sm text-muted-foreground">{event.time}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-muted-foreground">{event.description}</div>
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

          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Events;

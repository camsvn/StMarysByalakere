"use client"
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ShapesBackground from "@/components/ui/ShapesBackground";
import EventCard from "@/components/ui/EventCard";
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
import { CalendarIcon, LayoutGrid, Image } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
  const [viewMode, setViewMode] = useState<string>("posters");

  // Get current date for highlighting today's events
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto max-w-7xl relative z-10">
          <SectionHeading 
            title="Events & Announcements"
            subtitle="Stay updated with what's happening in our parish community."
          />
          
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="posters" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Posters</span>
              </TabsTrigger>
              <TabsTrigger value="cards" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Cards</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posters">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {events.map((event, index) => (
                  <div 
                    key={event.id} 
                    className={`relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl transition-all duration-300 animate-fade-in animate-delay-${index % 3 * 100}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
                    <AspectRatio ratio={3/4}>
                      <img 
                        src={event.image || `https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=600&h=800&q=80`}
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </AspectRatio>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center mb-2">
                        <CalendarIcon className="h-5 w-5 mr-2 text-primary-foreground" />
                        <span className="text-sm font-medium bg-primary/80 px-3 py-1 rounded-full">{event.date} • {event.time}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{event.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2 mb-4">{event.description}</p>
                      {event.location && (
                        <p className="text-sm text-white/80 flex items-center">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/80 mr-2"></span>
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    description={event.description}
                    location={event.location}
                    image={event.image}
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
    </>
  );
};

export default Events;

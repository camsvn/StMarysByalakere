
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Event } from '@/payload-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ArrowRight } from "lucide-react";
import { DateTime } from 'luxon';
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types';
import { cn, formatToIST } from "@/lib/utils";

import EventCard from "../ui/EventCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { stringify } from "qs-esm";

function isMedia(image: number | Media): image is Media {
  return typeof image === 'object' && image !== null && 'url' in image;
}

function getImageURL(event: Event) {
  const media = event.image as Media;
  return media ? media.url : "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&h=400&q=80"
}

// interface Event {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
//   description: object;
//   location: string;
//   image: object;
// }

async function EventsSection() {
  // const { events } = useCMS();

  // // Display the first 3 events
  // const displayedEvents = events.slice(1, 4);

  // const [displayedEvents, setEvents] = useState<Event[]>([]);

  // const today = useMemo(() => new Date(), []);
  // const formattedToday = useMemo(
  //   () =>
  //     today.toLocaleDateString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //       year: "numeric",
  //       timeZone: "Asia/Kolkata",
  //     }),
  //   [today]
  // );
  const payload = await getPayload({
      config
    });

  const istToday = DateTime.now().setZone("Asia/Kolkata").set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  // const formattedToday = istToday.toLocaleDateString("en-US", {
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  //   timeZone: "Asia/Kolkata",
  // })

  const displayedEvents = await payload.find({
    collection: 'events',
    sort: "date",
    limit: 3,
    where: {
      date: {
        greater_than_equal: istToday.toUTC().toISO()
      }
    }
  });
  

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const istToday = DateTime.now().setZone("Asia/Kolkata").set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  //     const query = {
  //       limit: 3,
  //       where: {
  //         date: {
  //           greater_than_equal: istToday.toUTC().toISO(),
  //         },
  //       },
  //       sort: "date",
  //     };
  //     const stringifiedQuery = stringify({ ...query }, { addQueryPrefix: true });
  //     try {
  //       const response = await fetch(`/api/events${stringifiedQuery}`);
  //       const data = await response.json();
  //       setEvents(data.docs);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  // Get current date for highlighting today's events

  // Array of placeholder images for event posters
  // const posterImages = [
  //   "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&h=400&q=80",
  //   "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&h=400&q=80",
  //   "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
  // ];

  return (
    <section id="event-section" className="section-container bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Upcoming Events"
          subtitle="Join us for these special events and be part of our vibrant community."
        />

        <Tabs defaultValue="posters" className="w-full max-w-4xl mx-auto">
          {/* <TabsList className="grid w-full max-w-md mx-auto grid-cols-1 mb-8">
            <TabsTrigger value="posters">Posters</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList> */}

          <TabsContent value="posters">
            <div className={cn(
              "grid grid-cols-1 place-items-center gap-8 mb-8",
              `md:grid-cols-${displayedEvents.docs.length}`
              )}>
              {displayedEvents.docs.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative h-[480px] overflow-hidden rounded-lg shadow-lg group hover:shadow-xl transition-all duration-300 animate-fade-in animate-delay-${index * 100}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-70 transition-opacity z-10"></div>
                  <div className="h-full w-full">
                    <img
                      src={getImageURL(event)}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 flex flex-col justify-end">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-5 w-5 mr-2 text-primary-foreground" />
                      <span className="text-sm font-medium bg-primary/80 px-3 py-1 rounded-full">{formatToIST(event.date)} • {formatToIST(event.date, "t")}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-white/80 line-clamp-3 mb-4">
                      {event.description}
                    </p>
                    <Link
                      href="/events"
                      className="inline-flex items-center text-sm font-medium text-primary-foreground hover:text-accent transition-colors mt-auto"
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  description={event.description}
                  location={event.location}
                  className={`animate-fade-in animate-delay-${index * 100} shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                />
              ))}
            </div>
          </TabsContent> */}

          {/* <TabsContent value="calendar">
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
                      <TableHead className="hidden md:table-cell">
                        Location
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedEvents.map((event) => (
                      <TableRow
                        key={event.id}
                        className={
                          event.date === formattedToday ? "bg-primary/5" : ""
                        }
                      >
                        <TableCell className="font-medium">
                          <div>{event.date}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.time}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {event.description}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {event.location}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent> */}
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" asChild className="group">
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

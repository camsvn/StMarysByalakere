"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, LayoutGrid, Image, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { EventModal } from "@/components/ui/EventModal";
import { cn, formatToIST } from "@/lib/utils";
import { Event, Media } from "@/payload-types";
import { useIsMobile } from "@/hooks/use-mobile";
import type { PaginatedDocs } from "payload";
import { DateTime } from "luxon";
import { stringify } from "qs-esm";

function getImageURL(event: Event): string {
  const media = event?.image as Media | undefined;
  return media?.url || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&h=400&q=80";
}

const Events = () => {
  // const { events } = useCMS();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<string>("posters");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<PaginatedDocs<Event>>({
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    nextPage: null,
    page: 1,
    pagingCounter: 0,
    prevPage: null,
    totalDocs: 0,
    totalPages: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const fetchEvents = async (page: number = 1, limit: number = 6) => {
    const istToday = DateTime.now()
      .setZone("Asia/Kolkata")
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    const query = {
      limit: limit,
      page: page,
      where: {
        date: {
          greater_than_equal: istToday.toUTC().toISO(),
        },
      },
      sort: "date",
    };
    const stringifiedQuery = stringify({ ...query }, { addQueryPrefix: true });
    const response = await fetch(`/api/events${stringifiedQuery}`);
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle page changes
  const handlePageChange = async (page: number) => {
    setLoading(true);
    try {
      await fetchEvents(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  // Get current date for highlighting today's events
  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
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

          <EventModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} /> 

          <Tabs defaultValue="calendar" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="posters" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Posters</span>
              </TabsTrigger>
              {/* <TabsTrigger value="cards" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Cards</span>
              </TabsTrigger> */}
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posters">
              <div
                className={cn(
                  "grid grid-cols-1 place-items-center gap-8 mb-8",
                  `md:grid-cols-${events.docs.length < 3 ? events.docs.length : 3}`
                )}
              >
                {events.docs.map((event, index) => (
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
                        <span className="text-sm font-medium bg-primary/80 px-3 py-1 rounded-full">
                          {formatToIST(event.date)} •{" "}
                          {formatToIST(event.date, "t")}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-3 mb-4">
                        {event.description}
                      </p>
                      <Button
                      variant="link"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(event)
                      }}
                      className="mt-2 text-sm font-medium text-primary-foreground gap-0 group-hover/learnmore:text-accent w-fit p-0"
                    >
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.docs.map((event, index) => (
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
            </TabsContent> */}

            <TabsContent value="calendar">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary/10 p-4 flex items-center">
                  <CalendarIcon className="h-6 w-6 text-primary mr-2" />
                  <h3 className="text-lg font-medium">All Events</h3>
                </div>
                {isMobile ? (
                  <div className="p-4 divide-y">
                    {events.docs.map((event) => (
                      <div
                        key={event.id}
                        className={`py-4 ${event.date === formattedToday ? "bg-primary/5" : ""}`}
                      >
                        <div className="mb-2">
                          <div className="flex items-center bg-soft-blue rounded-full px-3 py-1 w-fit mb-2">
                            <CalendarIcon className="h-4 w-4 text-primary mr-2" />
                            <div className="text-sm font-semibold">
                              {event.date}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground ml-1">
                            {formatToIST(event.date, "t")}
                          </div>
                        </div>
                        <div className="ml-1">
                          <div className="font-medium text-base">
                            {event.title}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {event.description}
                          </div>
                          {event.location && (
                            <div className="text-xs text-primary-foreground bg-primary/20 px-2 py-0.5 rounded-full mt-2 w-fit">
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">
                            Date & Time
                          </TableHead>
                          <TableHead>Event</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Location
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.docs.map((event) => (
                          <TableRow
                            key={event.id}
                            className={
                              event.date === formattedToday
                                ? "bg-primary/5"
                                : ""
                            }
                          >
                            <TableCell className="font-medium">
                              <div>{formatToIST(event.date)}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatToIST(event.date, "t")}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-muted-foreground">
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
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      if (events.prevPage) handlePageChange(events.prevPage);
                    }}
                    className={cn(
                      !events.prevPage && "pointer-events-none opacity-50"
                    )}
                  />
                </PaginationItem>
                {/* {Array.from({ length: events.totalPages }, (_, i) => i + 1)
                  .filter(
                    (num) =>
                      num === 1 ||
                      num === events.totalPages ||
                      (num >= (events?.page || 1) - 1 &&
                        num <= (events?.page || 1) + 1)
                  )
                  .map((pageNum, i, arr) => (
                    <React.Fragment key={pageNum}>
                      {i > 0 && arr[i] - arr[i - 1] > 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )} */}
                {/* </React.Fragment>
                    ))} */}
                <PaginationItem>
                  <PaginationLink
                    isActive
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   handlePageChange(pageNum);
                    // }}
                  >
                    {events.page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      if (events.nextPage) handlePageChange(events.nextPage);
                    }}
                    className={cn(
                      !events.nextPage && "pointer-events-none opacity-50"
                    )}
                  />
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

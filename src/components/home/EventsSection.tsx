"use client"
import React, { useState } from 'react';
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { EventModal } from "@/components/ui/EventModal";
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

function getImageURL(event: Event): string {
  const media = event?.image as Media | undefined;
  return media?.url || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&h=400&q=80";
}

interface EventsSectionProps {
  events: Event[];
}

function EventsSection({ events }: EventsSectionProps) {
  events = events.slice(0,3)

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

  if (events.length === 0) return null;

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
              `md:grid-cols-${events.length}`
              )}>
              {events.map((event, index) => (
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
                    <div className='group/learnmore'>
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
                      <ArrowRight className="ml-1 h-4 w-4 group-hover/learnmore:translate-x-1 transition-transform" />
                    </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
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
                    {events.map((event) => (
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

        <EventModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />

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

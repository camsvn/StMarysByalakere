
import { useState } from "react";
import { EventType } from "@/types/cms";
import { useToast } from "@/hooks/use-toast";
import {
  fetchEvents,
  createEvent,
  updateEvent as updateEventAPI,
  deleteEvent
} from "@/services/strapiService";

export function useEventsService() {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
    } catch (err) {
      console.error('Error fetching events from Strapi:', err);
      setError('Failed to load events. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to load events from CMS',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addEvent = async (event: Omit<EventType, 'id'>) => {
    try {
      const newEvent = await createEvent(event);
      setEvents(prev => [...prev, newEvent]);
      toast({
        title: 'Success',
        description: 'Event created successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create event',
        variant: 'destructive'
      });
    }
  };
  
  const updateEvent = async (id: number, event: Partial<EventType>) => {
    try {
      const updatedEvent = await updateEventAPI(id, event);
      setEvents(prev => prev.map(item => item.id === id ? updatedEvent : item));
      toast({
        title: 'Success',
        description: 'Event updated successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update event',
        variant: 'destructive'
      });
    }
  };
  
  const removeEvent = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(item => item.id !== id));
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete event',
        variant: 'destructive'
      });
    }
  };

  return {
    events,
    isLoading,
    error,
    fetchData,
    addEvent,
    updateEvent,
    removeEvent
  };
}

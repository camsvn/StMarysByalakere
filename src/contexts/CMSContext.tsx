
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { useMember } from "./MemberContext";
import { useToast } from "@/hooks/use-toast";
import {
  fetchEvents,
  fetchMassSchedule,
  fetchMinistries,
  createEvent,
  updateEvent,
  deleteEvent,
  createMassSchedule,
  updateMassSchedule,
  deleteMassSchedule,
  createMinistry,
  updateMinistry,
  deleteMinistry
} from "@/services/strapiService";

// Define types for different content types
export type EventType = {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
};

export type MassScheduleType = {
  id: number;
  day: string;
  times: string[];
  location?: string;
};

export type MinistryType = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

type CMSContextType = {
  events: EventType[];
  massSchedule: MassScheduleType[];
  ministries: MinistryType[];
  isLoading: boolean;
  error: string | null;
  
  // Event methods
  addEvent: (event: Omit<EventType, 'id'>) => Promise<void>;
  updateEvent: (id: number, event: Partial<EventType>) => Promise<void>;
  removeEvent: (id: number) => Promise<void>;
  
  // Mass Schedule methods
  addMassSchedule: (schedule: Omit<MassScheduleType, 'id'>) => Promise<void>;
  updateMassSchedule: (id: number, schedule: Partial<MassScheduleType>) => Promise<void>;
  removeMassSchedule: (id: number) => Promise<void>;
  
  // Ministry methods
  addMinistry: (ministry: Omit<MinistryType, 'id'>) => Promise<void>;
  updateMinistry: (id: number, ministry: Partial<MinistryType>) => Promise<void>;
  removeMinistry: (id: number) => Promise<void>;
  
  refreshData: () => Promise<void>;
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { member } = useMember();
  const { language } = useLanguage();
  
  const [events, setEvents] = useState<EventType[]>([]);
  const [massSchedule, setMassSchedule] = useState<MassScheduleType[]>([]);
  const [ministries, setMinistries] = useState<MinistryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch all data from Strapi
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [eventsData, massScheduleData, ministriesData] = await Promise.all([
        fetchEvents(),
        fetchMassSchedule(),
        fetchMinistries()
      ]);
      
      setEvents(eventsData);
      setMassSchedule(massScheduleData);
      setMinistries(ministriesData);
    } catch (err) {
      console.error('Error fetching data from Strapi:', err);
      setError('Failed to load content. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to load content from CMS',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [language]);
  
  // Event CRUD operations
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
  
  const updateEventItem = async (id: number, event: Partial<EventType>) => {
    try {
      const updatedEvent = await updateEvent(id, event);
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
  
  // Mass Schedule CRUD operations
  const addMassSchedule = async (schedule: Omit<MassScheduleType, 'id'>) => {
    try {
      const newSchedule = await createMassSchedule(schedule);
      setMassSchedule(prev => [...prev, newSchedule]);
      toast({
        title: 'Success',
        description: 'Mass schedule created successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create mass schedule',
        variant: 'destructive'
      });
    }
  };
  
  const updateMassScheduleItem = async (id: number, schedule: Partial<MassScheduleType>) => {
    try {
      const updatedSchedule = await updateMassSchedule(id, schedule);
      setMassSchedule(prev => prev.map(item => item.id === id ? updatedSchedule : item));
      toast({
        title: 'Success',
        description: 'Mass schedule updated successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update mass schedule',
        variant: 'destructive'
      });
    }
  };
  
  const removeMassSchedule = async (id: number) => {
    try {
      await deleteMassSchedule(id);
      setMassSchedule(prev => prev.filter(item => item.id !== id));
      toast({
        title: 'Success',
        description: 'Mass schedule deleted successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete mass schedule',
        variant: 'destructive'
      });
    }
  };
  
  // Ministry CRUD operations
  const addMinistry = async (ministry: Omit<MinistryType, 'id'>) => {
    try {
      const newMinistry = await createMinistry(ministry);
      setMinistries(prev => [...prev, newMinistry]);
      toast({
        title: 'Success',
        description: 'Ministry created successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create ministry',
        variant: 'destructive'
      });
    }
  };
  
  const updateMinistryItem = async (id: number, ministry: Partial<MinistryType>) => {
    try {
      const updatedMinistry = await updateMinistry(id, ministry);
      setMinistries(prev => prev.map(item => item.id === id ? updatedMinistry : item));
      toast({
        title: 'Success',
        description: 'Ministry updated successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update ministry',
        variant: 'destructive'
      });
    }
  };
  
  const removeMinistry = async (id: number) => {
    try {
      await deleteMinistry(id);
      setMinistries(prev => prev.filter(item => item.id !== id));
      toast({
        title: 'Success',
        description: 'Ministry deleted successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete ministry',
        variant: 'destructive'
      });
    }
  };
  
  // Public API
  const contextValue: CMSContextType = {
    events,
    massSchedule,
    ministries,
    isLoading,
    error,
    
    // Event methods
    addEvent,
    updateEvent: updateEventItem,
    removeEvent,
    
    // Mass Schedule methods
    addMassSchedule,
    updateMassSchedule: updateMassScheduleItem,
    removeMassSchedule,
    
    // Ministry methods
    addMinistry,
    updateMinistry: updateMinistryItem,
    removeMinistry,
    
    // Refresh method
    refreshData: fetchData
  };
  
  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};

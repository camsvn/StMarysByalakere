
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { EventType, MassScheduleType, MinistryType } from "@/types/cms";
import { useEventsService } from "@/hooks/useEventsService";
import { useMassScheduleService } from "@/hooks/useMassScheduleService";
import { useMinistryService } from "@/hooks/useMinistryService";

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
  const { language } = useLanguage();
  
  // Use our service hooks
  const eventsService = useEventsService();
  const massScheduleService = useMassScheduleService();
  const ministryService = useMinistryService();
  
  // Combined loading and error states
  const isLoading = eventsService.isLoading || massScheduleService.isLoading || ministryService.isLoading;
  const error = eventsService.error || massScheduleService.error || ministryService.error;
  
  // Fetch all data from Strapi
  const fetchData = async () => {
    await Promise.all([
      eventsService.fetchData(),
      massScheduleService.fetchData(),
      ministryService.fetchData()
    ]);
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [language]);
  
  // Public API
  const contextValue: CMSContextType = {
    events: eventsService.events,
    massSchedule: massScheduleService.massSchedule,
    ministries: ministryService.ministries,
    isLoading,
    error,
    
    // Event methods
    addEvent: eventsService.addEvent,
    updateEvent: eventsService.updateEvent,
    removeEvent: eventsService.removeEvent,
    
    // Mass Schedule methods
    addMassSchedule: massScheduleService.addMassSchedule,
    updateMassSchedule: massScheduleService.updateMassSchedule,
    removeMassSchedule: massScheduleService.removeMassSchedule,
    
    // Ministry methods
    addMinistry: ministryService.addMinistry,
    updateMinistry: ministryService.updateMinistry,
    removeMinistry: ministryService.removeMinistry,
    
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

// Re-export types for backwards compatibility
export type { EventType, MassScheduleType, MinistryType };

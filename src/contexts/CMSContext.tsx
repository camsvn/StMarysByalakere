
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { useMember } from "./MemberContext";

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
  day: string;
  times: string[];
  location?: string;
};

export type MinistryType = {
  title: string;
  description: string;
  icon: string;
};

type CMSContextType = {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
  massSchedule: MassScheduleType[];
  setMassSchedule: React.Dispatch<React.SetStateAction<MassScheduleType[]>>;
  ministries: MinistryType[];
  setMinistries: React.Dispatch<React.SetStateAction<MinistryType[]>>;
  isEditing: boolean;
  toggleEditing: () => void;
  saveContent: () => void;
};

const defaultEvents: EventType[] = [
  {
    id: 1,
    title: "Easter Sunday Mass",
    date: "Apr 9, 2023",
    time: "9:00 AM",
    description: "Celebrate the resurrection of our Lord Jesus Christ with a special Easter service followed by community breakfast.",
    location: "Main Church"
  },
  {
    id: 2,
    title: "Youth Group Meeting",
    date: "Apr 12, 2023",
    time: "6:30 PM",
    description: "Join fellow youth for an evening of faith, fun, and fellowship. This week's topic: 'Faith in Action'.",
    location: "Parish Hall"
  },
  {
    id: 3,
    title: "Food Drive for Local Shelter",
    date: "Apr 15, 2023",
    time: "10:00 AM",
    description: "Help collect non-perishable food items for our local community shelter. All donations welcome!",
    location: "Church Parking Lot"
  }
];

const defaultMassSchedule: MassScheduleType[] = [
  { day: "Sunday", times: ["8:00 AM", "10:30 AM", "5:00 PM"], location: "Main Church" },
  { day: "Monday", times: ["6:30 AM"], location: "Chapel" },
  { day: "Tuesday", times: ["6:30 AM"], location: "Chapel" },
  { day: "Wednesday", times: ["6:30 AM", "7:00 PM"], location: "Chapel" },
  { day: "Thursday", times: ["6:30 AM"], location: "Chapel" },
  { day: "Friday", times: ["6:30 AM"], location: "Chapel" },
  { day: "Saturday", times: ["9:00 AM", "5:00 PM (Vigil)"], location: "Main Church" }
];

const defaultMinistries: MinistryType[] = [
  {
    title: "Youth Ministry",
    description: "A vibrant community where young people grow in faith, build friendships, and develop leadership skills.",
    icon: "Users"
  },
  {
    title: "Choir & Music",
    description: "Enhance our liturgies through music and song, bringing the congregation into deeper worship.",
    icon: "Music"
  },
  {
    title: "Sunday School",
    description: "Religious education for children and youth to learn about our faith and traditions.",
    icon: "BookOpen"
  },
  {
    title: "Charity & Outreach",
    description: "Serving our community through charitable works, outreach programs, and social justice initiatives.",
    icon: "Heart"
  }
];

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { member } = useMember();
  const { language } = useLanguage();
  
  // Load content from localStorage or use defaults
  const [events, setEvents] = useState<EventType[]>(() => {
    const saved = localStorage.getItem("cms_events");
    return saved ? JSON.parse(saved) : defaultEvents;
  });
  
  const [massSchedule, setMassSchedule] = useState<MassScheduleType[]>(() => {
    const saved = localStorage.getItem("cms_massSchedule");
    return saved ? JSON.parse(saved) : defaultMassSchedule;
  });
  
  const [ministries, setMinistries] = useState<MinistryType[]>(() => {
    const saved = localStorage.getItem("cms_ministries");
    return saved ? JSON.parse(saved) : defaultMinistries;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Save content to localStorage when changes occur
  useEffect(() => {
    if (member?.role === "admin") {
      localStorage.setItem("cms_events", JSON.stringify(events));
      localStorage.setItem("cms_massSchedule", JSON.stringify(massSchedule));
      localStorage.setItem("cms_ministries", JSON.stringify(ministries));
    }
  }, [events, massSchedule, ministries, member?.role]);
  
  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };
  
  const saveContent = () => {
    localStorage.setItem("cms_events", JSON.stringify(events));
    localStorage.setItem("cms_massSchedule", JSON.stringify(massSchedule));
    localStorage.setItem("cms_ministries", JSON.stringify(ministries));
    setIsEditing(false);
  };
  
  return (
    <CMSContext.Provider
      value={{
        events,
        setEvents,
        massSchedule,
        setMassSchedule,
        ministries,
        setMinistries,
        isEditing,
        toggleEditing,
        saveContent
      }}
    >
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

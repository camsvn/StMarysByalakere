"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { useMember } from "./MemberContext";
import { getFromLocalStorage, setToLocalStorage } from '@/lib/storage'

// Define types for different content types
export type EventType = {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
  image?: string;
};

export type MassScheduleType = {
  day: string;
  times: string[];
  // location?: string;
};

export type MinistryType = {
  title: string;
  description: string;
  icon: string;
  image?: string;
};

export type GalleryImageType = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

type CMSContextType = {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
  massSchedule: MassScheduleType[];
  setMassSchedule: React.Dispatch<React.SetStateAction<MassScheduleType[]>>;
  ministries: MinistryType[];
  setMinistries: React.Dispatch<React.SetStateAction<MinistryType[]>>;
  galleryImages: GalleryImageType[];
  setGalleryImages: React.Dispatch<React.SetStateAction<GalleryImageType[]>>;
  isEditing: boolean;
  toggleEditing: () => void;
  saveContent: () => void;
};

const defaultEvents: EventType[] = [
  {
    id: 1,
    title: "Good Friday Observance",
    date: "Apr 18, 2025",
    time: "8:30 AM",
    description: "Join us for a heartfelt reflection on the Passion of Christ through solemn liturgy, the Way of the Cross (Venue: New Church Land), and a moving message. Experience the traditions of the Veneration of the Cross, sharing of bitter juice, and a comforting meal of Nercha Kanji and Payar (Venue: New Church Land).",
    location: "Main Church",
    image: "https://ucarecdn.com/a3bd8113-ceed-4268-93c2-187a48094212/-/scale_crop/400x600/center/-/filter/sedis/-50/"
  },
  {
    id: 2,
    title: "Holy Saturday Mass & Baptism Renewal",
    date: "Apr 19, 2025",
    time: "7:00 AM",
    description: "Begin the day with a peaceful morning Holy Mass and renew your baptismal promises in a quiet moment of spiritual preparation for Easter.",
    location: "Main Church",
    image: "https://ucarecdn.com/0266c823-03a6-4f62-bb79-3b14a963032e/-/scale_crop/400x600/center/"
  },
  {
    id: 3,
    title: "Easter Vigil & Resurrection Celebration",
    date: "Apr 19, 2025",
    time: "8:00 PM",
    description: "Celebrate the joy of Christ's resurrection with a beautiful evening liturgy, filled with light, hope, and the tradition of Easter Egg sharing in a vibrant and uplifting ceremony.",
    location: "Main Church",
    image: "https://ucarecdn.com/179249a4-9f39-4bcd-8e11-5ba1b1362df0/-/scale_crop/400x600/60p,25p/"
  },
  {
    id: 4,
    title: "Easter Sunday Celebration",
    date: "Apr 20, 2025",
    time: "8:30 AM",
    description: "Rejoice in the spirit of Easter with a joyful Holy Mass followed by cheerful Easter Egg distribution—a celebration for all ages filled with renewal and light.",
    location: "Main Church",
    image: "https://ucarecdn.com/ff1ff285-3e9d-49cb-8df1-cbbbbed5c272/-/scale_crop/400x600/center/"
  }
];

const defaultMassSchedule: MassScheduleType[] = [
  { day: "Sunday", times: ["8:30 AM"], 
    // location: "Main Church" 
  },
  { day: "Monday", times: ["6:30 AM (Eucharistic adoration)", "7:00 AM"], 
    // location: "Chapel" 
  },
  { day: "Tuesday", times: ["6:30 PM"], 
    // location: "Chapel" 
  },
  { day: "Wednesday", times: ["6:30 AM (Eucharistic adoration)", "7:00 AM"], 
    // location: "Chapel" 
  },
  { day: "Thursday", times: ["6:30 AM (Eucharistic adoration)", "7:00 AM"], 
    // location: "Chapel" 
  },
  { day: "Friday", times: ["6:30 AM (Eucharistic adoration)", "7:00 AM"], 
    // location: "Chapel" 
  },
  { day: "Saturday", times: [
    "6:30 AM (Eucharistic adoration)", 
    "7:00 AM", 
    "7:45 AM (Novena)"
  ], 
    // location: "Main Church"
   }
];

const defaultMinistries: MinistryType[] = [
  {
    title: "Pithruvedi",
    description: "A vibrant community where young people grow in faith, build friendships, and develop leadership skills.",
    icon: "Users"
  },
  {
    title: "Mathruvedi",
    description: "A vibrant community where young people grow in faith, build friendships, and develop leadership skills.",
    icon: "Users"
  },
  {
    title: "SMYF",
    description: "A vibrant community where young people grow in faith, build friendships, and develop leadership skills.",
    icon: "Users"
  },
  {
    title: "Choir",
    description: "Enhance our liturgies through music and song, bringing the congregation into deeper worship.",
    icon: "Music"
  },
  {
    title: "Altar Servers",
    description: "Religious education for children and youth to learn about our faith and traditions.",
    icon: "BookOpen"
  },
  {
    title: "Catechism",
    description: "Serving our community through charitable works, outreach programs, and social justice initiatives.",
    icon: "Heart"
  }
];

const defaultGalleryImages: GalleryImageType[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1438032005730-c779502df39b", alt: "Church building exterior", category: "Church" },
  { id: 2, src: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e", alt: "Christmas celebration", category: "Events" },
  { id: 3, src: "https://images.unsplash.com/photo-1473177104440-ffee2f376098", alt: "Church interior with beautiful architecture", category: "Church" },
  { id: 4, src: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb", alt: "Youth group event", category: "Events" },
  { id: 5, src: "https://images.unsplash.com/photo-1524230572899-a752b3835840", alt: "Sunday Mass celebration", category: "Services" },
  { id: 6, src: "https://images.unsplash.com/photo-1551038247-3d9af20df552", alt: "Parish picnic", category: "Events" },
  { id: 7, src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", alt: "Community outreach", category: "Outreach" },
  { id: 8, src: "https://images.unsplash.com/photo-1466442929976-97f336a657be", alt: "Church activities", category: "Services" },
  { id: 9, src: "https://images.unsplash.com/photo-1517022812141-23620dba5c23", alt: "Youth ministry", category: "Ministries" },
];

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { member } = useMember();
  const { language } = useLanguage();
  
  // Load content from localStorage or use defaults
  const [events, setEvents] = useState<EventType[]>(() => {
    const saved = getFromLocalStorage("cms_events");
    return typeof saved === "string" ? JSON.parse(saved) : defaultEvents;
  });
  
  const [massSchedule, setMassSchedule] = useState<MassScheduleType[]>(() => {
    const saved = getFromLocalStorage("cms_massSchedule");
    return typeof saved === "string" ? JSON.parse(saved) : defaultMassSchedule;
  });
  
  const [ministries, setMinistries] = useState<MinistryType[]>(() => {
    const saved = getFromLocalStorage("cms_ministries");
    return typeof saved === "string" ? JSON.parse(saved) : defaultMinistries;
  });
  
  const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>(() => {
    const saved = getFromLocalStorage("cms_gallery");
    return typeof saved === "string" ? JSON.parse(saved) : defaultGalleryImages;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Save content to localStorage when changes occur
  useEffect(() => {
    if (member?.role === "admin") {
      localStorage.setItem("cms_events", JSON.stringify(events));
      localStorage.setItem("cms_massSchedule", JSON.stringify(massSchedule));
      localStorage.setItem("cms_ministries", JSON.stringify(ministries));
      localStorage.setItem("cms_gallery", JSON.stringify(galleryImages));
    }
  }, [events, massSchedule, ministries, galleryImages, member?.role]);
  
  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };
  
  const saveContent = () => {
    localStorage.setItem("cms_events", JSON.stringify(events));
    localStorage.setItem("cms_massSchedule", JSON.stringify(massSchedule));
    localStorage.setItem("cms_ministries", JSON.stringify(ministries));
    localStorage.setItem("cms_gallery", JSON.stringify(galleryImages));
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
        galleryImages,
        setGalleryImages,
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

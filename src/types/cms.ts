
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

// Common types
export interface CMSContentState<T> {
  items: T[];
  isLoading: boolean;
  error: string | null;
}


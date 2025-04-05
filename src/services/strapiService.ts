
import axios from 'axios';
import { EventType, MassScheduleType, MinistryType } from '@/contexts/CMSContext';

// Define the Strapi API base URL - this should be configured based on where Strapi is hosted
const STRAPI_API_URL = 'http://localhost:1337/api';

// Helper function to handle API errors
const handleError = (error: any) => {
  console.error('Strapi API Error:', error);
  throw error;
};

// Types for Strapi responses
export interface StrapiResponse<T> {
  data: StrapiData<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

// API functions for different content types
export const fetchEvents = async (): Promise<EventType[]> => {
  try {
    const response = await axios.get<StrapiResponse<EventType>>(`${STRAPI_API_URL}/events`);
    return response.data.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch (error) {
    return handleError(error);
  }
};

export const fetchMassSchedule = async (): Promise<MassScheduleType[]> => {
  try {
    const response = await axios.get<StrapiResponse<MassScheduleType>>(`${STRAPI_API_URL}/mass-schedules`);
    return response.data.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch (error) {
    return handleError(error);
  }
};

export const fetchMinistries = async (): Promise<MinistryType[]> => {
  try {
    const response = await axios.get<StrapiResponse<MinistryType>>(`${STRAPI_API_URL}/ministries`);
    return response.data.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch (error) {
    return handleError(error);
  }
};

// Functions for updating content (for admin usage)
export const createEvent = async (event: Omit<EventType, 'id'>): Promise<EventType> => {
  try {
    const response = await axios.post(`${STRAPI_API_URL}/events`, { data: event });
    return {
      id: response.data.data.id,
      ...response.data.data.attributes,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const updateEvent = async (id: number, event: Partial<EventType>): Promise<EventType> => {
  try {
    const response = await axios.put(`${STRAPI_API_URL}/events/${id}`, { data: event });
    return {
      id: response.data.data.id,
      ...response.data.data.attributes,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteEvent = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${STRAPI_API_URL}/events/${id}`);
  } catch (error) {
    handleError(error);
  }
};

// Similar functions for mass schedules
export const createMassSchedule = async (schedule: Omit<MassScheduleType, 'id'>): Promise<MassScheduleType> => {
  try {
    const response = await axios.post(`${STRAPI_API_URL}/mass-schedules`, { data: schedule });
    return {
      id: response.data.data.id,
      ...response.data.data.attributes,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const updateMassSchedule = async (id: number, schedule: Partial<MassScheduleType>): Promise<MassScheduleType> => {
  try {
    const response = await axios.put(`${STRAPI_API_URL}/mass-schedules/${id}`, { data: schedule });
    return {
      id: response.data.data.id,
      ...response.data.data.attributes,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteMassSchedule = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${STRAPI_API_URL}/mass-schedules/${id}`);
  } catch (error) {
    handleError(error);
  }
};

// Similar functions for ministries
export const createMinistry = async (ministry: Omit<MinistryType, 'id'>): Promise<MinistryType> => {
  try {
    const response = await axios.post(`${STRAPI_API_URL}/ministries`, { data: ministry });
    return {
      id: response.data.data.id,
      ...response.data.data.attributes,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const updateMinistry = async (id: number, ministry: Partial<MinistryType>): Promise<MinistryType> => {
  try {
    const response = await axios.put(`${STRAPI_API_URL}/ministries/${id}`, { data: ministry });
    return {
      id: response.data.data.id,
      ...response.data.data.attributes,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteMinistry = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${STRAPI_API_URL}/ministries/${id}`);
  } catch (error) {
    handleError(error);
  }
};

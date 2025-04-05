
import { useState } from "react";
import { MassScheduleType } from "@/types/cms";
import { useToast } from "@/hooks/use-toast";
import {
  fetchMassSchedule,
  createMassSchedule,
  updateMassSchedule as updateMassScheduleAPI,
  deleteMassSchedule
} from "@/services/strapiService";

export function useMassScheduleService() {
  const { toast } = useToast();
  const [massSchedule, setMassSchedule] = useState<MassScheduleType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const massScheduleData = await fetchMassSchedule();
      setMassSchedule(massScheduleData);
    } catch (err) {
      console.error('Error fetching mass schedule from Strapi:', err);
      setError('Failed to load mass schedule. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to load mass schedule from CMS',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

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
  
  const updateMassSchedule = async (id: number, schedule: Partial<MassScheduleType>) => {
    try {
      const updatedSchedule = await updateMassScheduleAPI(id, schedule);
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

  return {
    massSchedule,
    isLoading,
    error,
    fetchData,
    addMassSchedule,
    updateMassSchedule,
    removeMassSchedule
  };
}

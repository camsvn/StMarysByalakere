
import { useState } from "react";
import { MinistryType } from "@/types/cms";
import { useToast } from "@/hooks/use-toast";
import {
  fetchMinistries,
  createMinistry,
  updateMinistry as updateMinistryAPI,
  deleteMinistry
} from "@/services/strapiService";

export function useMinistryService() {
  const { toast } = useToast();
  const [ministries, setMinistries] = useState<MinistryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ministriesData = await fetchMinistries();
      setMinistries(ministriesData);
    } catch (err) {
      console.error('Error fetching ministries from Strapi:', err);
      setError('Failed to load ministries. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to load ministries from CMS',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

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
  
  const updateMinistry = async (id: number, ministry: Partial<MinistryType>) => {
    try {
      const updatedMinistry = await updateMinistryAPI(id, ministry);
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

  return {
    ministries,
    isLoading,
    error,
    fetchData,
    addMinistry,
    updateMinistry,
    removeMinistry
  };
}

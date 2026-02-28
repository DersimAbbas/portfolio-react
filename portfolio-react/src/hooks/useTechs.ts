import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TechsModel, PipelineStage } from '../types';
import { apiClient } from '../api/apiClient';
import { mockTechs, mockProjects } from '../data/mockTechs';
import { mockPipelineStages } from '../data/mockPipelineStages';

// Use mock data if VITE_USE_MOCK_DATA is 'true' or if API URL is not set
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || !import.meta.env.VITE_API_URL;

// Fetch all techs (skills + projects)
export const useTechs = () => {
  return useQuery({
    queryKey: ['techs'],
    queryFn: async (): Promise<TechsModel[]> => {
      if (USE_MOCK_DATA) {
        return mockTechs;
      }
      return apiClient.fetchTechs();
    },
  });
};

// Fetch projects only
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<TechsModel[]> => {
      if (USE_MOCK_DATA) {
        return mockProjects;
      }
      return apiClient.fetchProjects();
    },
  });
};

// Fetch pipeline stages
export const usePipelineStages = () => {
  return useQuery({
    queryKey: ['pipelineStages'],
    queryFn: async (): Promise<PipelineStage[]> => {
      if (USE_MOCK_DATA) {
        return mockPipelineStages;
      }
      return apiClient.fetchPipelineStages();
    },
  });
};

// Add new tech mutation
export const useAddTech = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTech: Partial<TechsModel>) => apiClient.addTech(newTech),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techs'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

// Update tech mutation
export const useUpdateTech = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tech: TechsModel) => apiClient.updateTech(tech.id, tech),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techs'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

// Delete tech mutation
export const useDeleteTech = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteTech(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techs'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

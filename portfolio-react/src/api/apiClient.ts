import { TechsModel, LoginDto, LoginResponse, PipelineStage } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper to build headers with auth
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiClient = {
  // Fetch all skills and projects
  async fetchTechs(): Promise<TechsModel[]> {
    const response = await fetch(`${API_BASE_URL}/api/techs`);
    if (!response.ok) {
      throw new Error('Failed to fetch techs');
    }
    return response.json();
  },

  // Fetch projects only
  async fetchProjects(): Promise<TechsModel[]> {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  },

  // Fetch pipeline stages
  async fetchPipelineStages(): Promise<PipelineStage[]> {
    const response = await fetch(`${API_BASE_URL}/pipelinestages`);
    if (!response.ok) {
      throw new Error('Failed to fetch pipeline stages');
    }
    return response.json();
  },

  // Add new tech/skill/project
  async addTech(newTech: Partial<TechsModel>): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/api/newtech`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(newTech),
    });
    return response.ok;
  },

  // Update existing tech
  async updateTech(id: string, updatedTech: TechsModel): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/api/updatetech/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedTech),
    });
    return response.ok;
  },

  // Delete tech
  async deleteTech(id: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/api/deletetech${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.ok;
  },

  // Login
  async login(credentials: LoginDto): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }

    return data;
  },
};

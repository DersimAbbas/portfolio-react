export interface TechsModel {
  id: string;
  project: string | null;
  description: string | null;
  githubUrl: string | null;
  technologies: string;
  techExperience: string;
  skillLevel: number;
  image: string | null;
  demoUrl: string | null;
  level: string;
}

// Utility functions for computed properties
export const getTechnologiesList = (tech: TechsModel): string[] =>
  tech.technologies
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

export const getImageList = (tech: TechsModel): string[] =>
  tech.image
    ?.split(',')
    .map((img) => img.trim())
    .filter(Boolean) ?? [];

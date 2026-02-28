export interface PipelineStage {
  id: string;
  project: string;
  description: string;
  details: string;
  order: number;
  stageType: string;
  // UI state (not from API)
  isActive?: boolean;
  showDetails?: boolean;
}

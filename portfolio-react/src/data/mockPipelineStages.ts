import { PipelineStage } from '../types';

export const mockPipelineStages: PipelineStage[] = [
  {
    id: '1',
    project: 'Source',
    description: 'Code repository checkout',
    details:
      'Pulls the latest code from the Git repository, including all submodules and dependencies required for the build process.',
    order: 1,
    stageType: 'source',
    isActive: false,
    showDetails: false,
  },
  {
    id: '2',
    project: 'Build',
    description: 'Compile and package application',
    details:
      'Compiles the source code, runs static code analysis, and packages the application into deployable artifacts.',
    order: 2,
    stageType: 'build',
    isActive: false,
    showDetails: false,
  },
  {
    id: '3',
    project: 'Test',
    description: 'Run automated tests',
    details:
      'Executes unit tests, integration tests, and generates code coverage reports. Fails the pipeline if coverage is below threshold.',
    order: 3,
    stageType: 'test',
    isActive: false,
    showDetails: false,
  },
  {
    id: '4',
    project: 'Security Scan',
    description: 'Vulnerability assessment',
    details:
      'Scans dependencies for known vulnerabilities, performs SAST analysis, and checks for secrets in the codebase.',
    order: 4,
    stageType: 'security',
    isActive: false,
    showDetails: false,
  },
  {
    id: '5',
    project: 'Docker Build',
    description: 'Container image creation',
    details:
      'Builds a Docker container image with optimized layers, tags it with the commit SHA, and prepares it for registry push.',
    order: 5,
    stageType: 'containerize',
    isActive: false,
    showDetails: false,
  },
  {
    id: '6',
    project: 'Push to Registry',
    description: 'Upload container image',
    details:
      'Pushes the container image to Azure Container Registry with proper tagging for version control and rollback capability.',
    order: 6,
    stageType: 'registry',
    isActive: false,
    showDetails: false,
  },
  {
    id: '7',
    project: 'Deploy to Staging',
    description: 'Deploy to staging environment',
    details:
      'Deploys the application to the Kubernetes staging cluster using Helm charts with environment-specific configurations.',
    order: 7,
    stageType: 'deploy',
    isActive: false,
    showDetails: false,
  },
  {
    id: '8',
    project: 'Production Release',
    description: 'Deploy to production',
    details:
      'After manual approval, deploys to production using blue-green deployment strategy with automatic rollback on failure.',
    order: 8,
    stageType: 'release',
    isActive: false,
    showDetails: false,
  },
];

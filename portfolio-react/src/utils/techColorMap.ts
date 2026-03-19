// Maps technology names to their corresponding CSS background classes
const techColorMap: Record<string, string> = {
  // Frontend
  blazor: 'bg-blazor',
  react: 'bg-react',
  javascript: 'bg-javascript',
  js: 'bg-javascript',
  typescript: 'bg-typescript',
  ts: 'bg-typescript',

  // Backend
  'c#': 'bg-csharp',
  csharp: 'bg-csharp',
  python: 'bg-python',
  'asp.net api': 'bg-restapi',
  'rest api': 'bg-restapi',
  restapi: 'bg-restapi',
  'node.js': 'bg-nodejs',
  nodejs: 'bg-nodejs',

  // Database
  sql: 'bg-sql',
  mongo: 'bg-mongodb',
  mongodb: 'bg-mongodb',
  firestoredb: 'bg-firebase',
  postgresql: 'bg-postgresql',

  // Cloud
  azure: 'bg-azure',
  aws: 'bg-aws',
  gcp: 'bg-gcp',
  'google cloud': 'bg-gcp',
  firebase: 'bg-firebase',

  // DevOps
  docker: 'bg-docker',
  kubernetes: 'bg-kubernetes',
  terraform: 'bg-terraform',
  'azure devops': 'bg-azure',
  'ci/cd': 'bg-cicd',
  cicd: 'bg-cicd',
  'github actions': 'bg-githubactions',
  gitlab: 'bg-gitlab',

  // Servers
  linux: 'bg-linux',
  macos: 'bg-macos',
  windows: 'bg-windows',

  // Security
  devsecops: 'bg-devsecops',
  trivy: 'bg-trivy',
  zap: 'bg-zap',
  sonarqube: 'bg-sonarqube',

  // Monitoring
  datadog: 'bg-datadog',
  grafana: 'bg-grafana',
  cloudwatch: 'bg-cloudwatch',
  'azure monitor': 'bg-azuremonitor',

  // Methodology
  scrum: 'bg-scrum',
};

export const getTechBackgroundClass = (technologies: string): string => {
  const techLower = technologies.toLowerCase().trim();

  // Check for exact match first
  if (techColorMap[techLower]) {
    return techColorMap[techLower];
  }

  // Check if any key is contained in the technology string
  for (const [key, className] of Object.entries(techColorMap)) {
    if (techLower.includes(key)) {
      return className;
    }
  }

  return 'bg-default';
};

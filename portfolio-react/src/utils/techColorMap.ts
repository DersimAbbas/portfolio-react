// Maps technology names to their corresponding CSS background classes
const techColorMap: Record<string, string> = {
  blazor: 'bg-blazor',
  react: 'bg-react',
  'c#': 'bg-csharp',
  csharp: 'bg-csharp',
  docker: 'bg-docker',
  terraform: 'bg-terraform',
  python: 'bg-python',
  sql: 'bg-sql',
  azure: 'bg-azure',
  kubernetes: 'bg-kubernetes',
  mongodb: 'bg-mongodb',
  firebase: 'bg-firebase',
  'rest api': 'bg-restapi',
  restapi: 'bg-restapi',
  'node.js': 'bg-nodejs',
  nodejs: 'bg-nodejs',
  aws: 'bg-aws',
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

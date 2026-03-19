// Maps technology names to their category for display on skill cards
const techCategoryMap: Record<string, string> = {
  blazor: 'Frontend',
  react: 'Frontend',
  javascript: 'Frontend',
  typescript: 'Frontend',

  'c#': 'Backend',
  python: 'Backend',
  'asp.net api': 'Backend',
  'node.js': 'Backend',

  sql: 'Database',
  mongo: 'Database',
  firestoredb: 'Database',
  postgresql: 'Database',

  azure: 'Cloud',
  aws: 'Cloud',
  gcp: 'Cloud',
  firebase: 'Cloud',

  docker: 'DevOps',
  kubernetes: 'DevOps',
  terraform: 'DevOps',
  'azure devops': 'DevOps',
  'ci/cd': 'DevOps',
  'github actions': 'DevOps',
  gitlab: 'DevOps',

  linux: 'Servers',
  macos: 'Servers',
  windows: 'Servers',

  devsecops: 'DevSecOps',
  trivy: 'DevSecOps',
  zap: 'DevSecOps',
  sonarqube: 'DevSecOps',

  datadog: 'Monitoring',
  grafana: 'Monitoring',
  cloudwatch: 'Monitoring',
  'azure monitor': 'Monitoring',

  scrum: 'Methodology',
};

export const getTechCategory = (technologies: string): string => {
  const techLower = technologies.toLowerCase().trim();

  if (techCategoryMap[techLower]) {
    return techCategoryMap[techLower];
  }

  for (const [key, category] of Object.entries(techCategoryMap)) {
    if (techLower.includes(key)) {
      return category;
    }
  }

  return 'Other';
};

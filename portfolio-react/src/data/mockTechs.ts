import { TechsModel } from '../types';

// Static skill data — category is derived via techCategoryMap utility
const skill = (id: string, technologies: string): TechsModel => ({
  id,
  project: null,
  description: null,
  githubUrl: null,
  technologies,
  techExperience: null,
  skillLevel: 3,
  image: null,
  demoUrl: null,
  level: null,
});

export const mockTechs: TechsModel[] = [
  // Frontend
  skill('sk-blazor', 'Blazor'),
  skill('sk-react', 'React'),
  skill('sk-javascript', 'Javascript'),
  skill('sk-typescript', 'Typescript'),

  // Backend
  skill('sk-csharp', 'C#'),
  skill('sk-python', 'Python'),
  skill('sk-aspnet', 'ASP.NET API'),
  skill('sk-nodejs', 'Node.js'),

  // Database
  skill('sk-sql', 'SQL'),
  skill('sk-mongo', 'Mongo'),
  skill('sk-firestoredb', 'FirestoreDB'),
  skill('sk-postgresql', 'PostgreSQL'),

  // Cloud
  skill('sk-azure', 'Azure'),
  skill('sk-aws', 'AWS'),
  skill('sk-gcp', 'GCP'),
  skill('sk-firebase', 'Firebase'),

  // DevOps
  skill('sk-docker', 'Docker'),
  skill('sk-kubernetes', 'Kubernetes'),
  skill('sk-terraform', 'Terraform'),
  skill('sk-azuredevops', 'Azure DevOps'),
  skill('sk-cicd', 'CI/CD'),
  skill('sk-githubactions', 'GitHub Actions'),
  skill('sk-gitlab', 'GitLab'),

  // Servers
  skill('sk-linux', 'Linux'),
  skill('sk-macos', 'macOS'),
  skill('sk-windows', 'Windows'),

  // DevSecOps
  skill('sk-trivy', 'Trivy'),
  skill('sk-zap', 'ZAP'),
  skill('sk-sonarqube', 'SonarQube'),

  // Monitoring
  skill('sk-datadog', 'Datadog'),
  skill('sk-grafana', 'Grafana'),
  skill('sk-cloudwatch', 'CloudWatch'),
  skill('sk-azuremonitor', 'Azure Monitor'),

  // Methodology
  skill('sk-scrum', 'Scrum'),
];

// Real API data cached as static mock data (projects have project !== null)
export const mockProjects: TechsModel[] = [
  {
    id: '67b8f9184c0d97fb2d57e9c2',
    project: 'Comfort Gaming',
    description:
      'Comfort gaming is my first introduction to web development. With simple Html/css/Javascript and bootrap This is the results. Not so bad huh? With javascript dynamically loading up projects and caching for shopping-cart local storage.',
    githubUrl: 'https://github.com/DersimAbbas/relax-gaming',
    technologies: 'Javascript, Html, Css, Bootstrap',
    techExperience: null,
    skillLevel: 0,
    image: 'comfortgaming1.png,comfortgaming2.png,comfortgaming3.png',
    demoUrl: 'https://dersimabbas.github.io/relax-gaming/index.html',
    level: null,
  },
  {
    id: '67b8f9184c0d97fb2d57e9c3',
    project: 'Weather App',
    description:
      "Simple Weather application that utilizes on Openweather's API. My first introduction to the Archtichture of REST-Apis with blazor. One cool feature is that the background color on the widget changes depending on the location and Weather. It also changes based on sunrise/sunset.",
    githubUrl: '',
    technologies: 'C#, Blazor, ASP.Core API, Mongo, Azure, Javascript',
    techExperience: null,
    skillLevel: 0,
    image: 'weatherapp1.png, weatherapp2.png, weatherapp3.png',
    demoUrl: null,
    level: null,
  },
  {
    id: '67b9c7392038bad2ed62721e',
    project: 'Chatroom Application',
    description:
      'AKA Project Victory. This Enthusiastic project was developed by me and my code-partner fueled by caffeine + the dedication to learn. Implementing web sockets and hosting it on Azure with Cross set up. Ci/CD with Scrum methodologies to maintain clean code and proper productivity. Our chatroom supported multiple people chatting and loading messages in realtime.',
    githubUrl: 'https://github.com/neurothrone/project-victory-react',
    technologies: 'node.js, Express.js,  Web sockets, CI/CD, React, Javascript, Azure, Mongo',
    techExperience: 'string',
    skillLevel: 0,
    image: 'chatroom2.webp, victorylogin.webp',
    demoUrl: '',
    level: null,
  },
  {
    id: '67b9ca882038bad2ed627224',
    project: 'Pong with Unity',
    description:
      "Pong was my first project in C# and it was also my introduction to Unity.  This simple and small project is a reminder of how much I've Developed from the day before I started my education until this Portfolio was built (8 months).  and how much more I will develop & learn.",
    githubUrl: '',
    technologies: 'C#, Unity',
    techExperience: null,
    skillLevel: 0,
    image: 'pong.webp',
    demoUrl: null,
    level: null,
  },
  {
    id: '67efa0c1351325b2c5fcad93',
    project: 'CloudNinja-Infra-Recon',
    description:
      'Cloud Ninja Infra Recon A ninja-themed Azure cloud security scanner built with Blazor and .NET. Features two scanning missions: Shadow Sentinel (web app vulnerability detection) and Fortress Breach (exposed endpoint discovery). Implements full DevOps pipeline with Azure Functions, Terraform IaC, and containerized deployment through Azure DevOps CI/CD.',
    githubUrl: 'https://github.com/DersimAbbas/Cloud-Ninja-Infra-Recon',
    technologies: 'Blazor, C#, Terraform, Docker, Azure Functions, ASP.NET API, Azure DevOps, CI/CD ',
    techExperience: null,
    skillLevel: 0,
    image: 'cloudninja.webp',
    demoUrl: null,
    level: null,
  },
  {
    id: '6873bb8b9576683d1592abb2',
    project: 'Frolunda Arcade',
    description:
      'Full-stack e-commerce store for video and board games. Blazor Server frontend with ASP.NET Core API, Firebase Auth + Firestore for real-time data, and sandbox Stripe checkout. Azure Functions & Logic Apps automate order-confirmation emails, all shipped via Docker, Terraform, and Azure DevOps pipelines. For trying out the Web App visit https://arcade-frolunda.azurewebsites.net/',
    githubUrl: 'https://github.com/DersimAbbas/Frolunda-ArcadeBlazor',
    technologies:
      'Docker, CI/CD, ASP.NET API, Firebase, FireStore, OAuth, Azure Functions, IaC, C#, Javascript, Logic Apps',
    techExperience: null,
    skillLevel: 0,
    image: 'arcadefrolunda.webp',
    demoUrl: 'https://arcade-frolunda.azurewebsites.net/',
    level: null,
  },
  {
    id: '6873bc809576683d1592abb3',
    project: 'PokeDéx',
    description:
      'Interactive Pokédex built with React and TypeScript. Users can browse, add, edit, or delete Pokémon using a themed UI with dynamic filtering. Backed by Azure Functions and CosmosDB, with initial data fetched from PokéAPI. Fully containerized with Docker.',
    githubUrl: 'https://github.com/DersimAbbas/Pokedex-ReactApp',
    technologies: 'Typescript, Azure Functions, Docker, C#, CosmosDB',
    techExperience: null,
    skillLevel: 0,
    image: 'pokedex.webp, pokedex2.webp',
    demoUrl: 'https://yellow-bush-07a2b6f03.6.azurestaticapps.net/',
    level: null,
  },
];

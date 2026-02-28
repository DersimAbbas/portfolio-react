import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout/MainLayout';
import ProjectLayout from './layouts/ProjectLayout/ProjectLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

// Public Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';
import Login from './pages/Login/Login';

// Admin Pages
import Admin from './pages/admin/Admin/Admin';
import AdminProjects from './pages/admin/AdminProjects/AdminProjects';
import AdminSkills from './pages/admin/AdminSkills/AdminSkills';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: '/',
    element: <ProjectLayout />,
    children: [
      { path: 'projects', element: <Projects /> },
      { path: 'skills', element: <Skills /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Admin /> },
      { path: 'projects', element: <AdminProjects /> },
      { path: 'skills', element: <AdminSkills /> },
    ],
  },
]);

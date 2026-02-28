import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { TerminalProvider } from './contexts/TerminalContext';
import { router } from './router';
import './styles/global.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TerminalProvider>
          <RouterProvider router={router} />
        </TerminalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

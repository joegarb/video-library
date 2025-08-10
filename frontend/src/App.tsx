import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Videos from './pages/Videos';
import { ThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Navigate to="/videos" replace /> },
      { path: 'videos', element: <Videos /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}

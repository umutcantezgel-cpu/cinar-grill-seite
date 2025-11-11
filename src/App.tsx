import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Speisekarte from '@/pages/Speisekarte';
import UeberUns from '@/pages/UeberUns';
import Galerie from '@/pages/Galerie';
import Reservierung from '@/pages/Reservierung';
import Kontakt from '@/pages/Kontakt';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout currentPageName="Home">
                <Home />
              </Layout>
            }
          />
          <Route
            path="/speisekarte"
            element={
              <Layout currentPageName="Speisekarte">
                <Speisekarte />
              </Layout>
            }
          />
          <Route
            path="/ueber-uns"
            element={
              <Layout currentPageName="UeberUns">
                <UeberUns />
              </Layout>
            }
          />
          <Route
            path="/galerie"
            element={
              <Layout currentPageName="Galerie">
                <Galerie />
              </Layout>
            }
          />
          <Route
            path="/reservierung"
            element={
              <Layout currentPageName="Reservierung">
                <Reservierung />
              </Layout>
            }
          />
          <Route
            path="/kontakt"
            element={
              <Layout currentPageName="Kontakt">
                <Kontakt />
              </Layout>
            }
          />
          {/* Fallback route */}
          <Route
            path="*"
            element={
              <Layout currentPageName="Home">
                <Home />
              </Layout>
            }
          />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
          className: 'shadow-lg',
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import { useSyncExternalStore, useCallback } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Hash-based routing for GitHub Pages compatibility
const currentHashLocation = () => window.location.hash.replace(/^#/, "") || "/";

const subscribeToHashChanges = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
};

const useHashLocation = (): [string, (to: string) => void] => {
  const location = useSyncExternalStore(subscribeToHashChanges, currentHashLocation);
  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);
  return [location, navigate];
};

function Routes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Use hash routing only in production on GitHub Pages
  const isGitHubPages = import.meta.env.PROD && window.location.hostname.includes('github.io');
  
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {isGitHubPages ? (
            <Router hook={useHashLocation}>
              <Routes />
            </Router>
          ) : (
            <Router>
              <Routes />
            </Router>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

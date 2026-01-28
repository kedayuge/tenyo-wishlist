import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import { useSyncExternalStore, useCallback } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Hash-based routing for GitHub Pages compatibility
// Always use hash routing in production to avoid 404 issues
const currentHashLocation = () => {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/";
};

const subscribeToHashChanges = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
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
  // Always use hash routing in production for GitHub Pages compatibility
  const useHashRouter = import.meta.env.PROD;
  
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {useHashRouter ? (
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

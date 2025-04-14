
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudyPlannerProvider } from "@/context/StudyPlannerContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Schedule from "./pages/Schedule";
import Subjects from "./pages/Subjects";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <StudyPlannerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </StudyPlannerProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

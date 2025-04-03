
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { MemberProvider } from "./contexts/MemberContext";
import Index from "./pages/Index";
import About from "./pages/About";
import MassServices from "./pages/MassServices";
import Events from "./pages/Events";
import Ministries from "./pages/Ministries";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MemberPortal from "./pages/MemberPortal";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <MemberProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/mass-services" element={<MassServices />} />
              <Route path="/events" element={<Events />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/member-portal" element={<MemberPortal />} />
              <Route path="/donate" element={<Donate />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MemberProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

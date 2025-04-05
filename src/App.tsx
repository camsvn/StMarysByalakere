
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { MemberProvider } from "./contexts/MemberContext";
import { CMSProvider } from "./contexts/CMSContext";
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
import CMS from "./pages/CMS";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <MemberProvider>
        <CMSProvider>
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
                <Route path="/cms" element={<CMS />} />
                <Route path="/cms/:contentType" element={<CMS />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CMSProvider>
      </MemberProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

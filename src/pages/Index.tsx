
import PageLayout from "../components/layout/PageLayout";
import Hero from "../components/home/Hero";
import PriestMessage from "../components/home/PriestMessage";
import EventsSection from "../components/home/EventsSection";
import MassScheduleSection from "../components/home/MassScheduleSection";
import MinistriesSection from "../components/home/MinistriesSection";
import FluidDivider from "../components/ui/FluidDivider"; 

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <PriestMessage />
      <MassScheduleSection />
      <div className="relative">
        <FluidDivider color="text-primary/10" />
      </div>
      <EventsSection />
      <div className="relative">
        <FluidDivider color="text-secondary/10" className="transform rotate-180" />
      </div>
      <MinistriesSection />
    </PageLayout>
  );
};

export default Index;


import PageLayout from "../components/layout/PageLayout";
import Hero from "../components/home/Hero";
import PriestMessage from "../components/home/PriestMessage";
import EventsSection from "../components/home/EventsSection";
import MassScheduleSection from "../components/home/MassScheduleSection";
import MinistriesSection from "../components/home/MinistriesSection";

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <PriestMessage />
      <MassScheduleSection />
      <EventsSection />
      <MinistriesSection />
    </PageLayout>
  );
};

export default Index;

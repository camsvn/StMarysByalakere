
import PageLayout from "../components/layout/PageLayout";
import Hero from "../components/home/Hero";
import MissionSection from "../components/home/MissionSection";
import EventsSection from "../components/home/EventsSection";
import MassScheduleSection from "../components/home/MassScheduleSection";
import MinistriesSection from "../components/home/MinistriesSection";

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <MissionSection />
      <MassScheduleSection />
      <EventsSection />
      <MinistriesSection />
    </PageLayout>
  );
};

export default Index;

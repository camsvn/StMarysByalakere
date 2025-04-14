import Hero from "@/components/home/Hero";
import EventsSection from "@/components/home/EventsSection";
import MassScheduleSection from "@/components/home/MassScheduleSection";
import MinistriesSection from "@/components/home/MinistriesSection";
import PriestMessage from "@/components/home/PriestMessage";
import EventsMarquee from "@/components/home/EventsMarquee";

const Index = () => {
  return (
    <>
      <Hero />
      <EventsMarquee />
      <PriestMessage />
      <EventsSection />
      <MassScheduleSection />
      <MinistriesSection />
      {/* <MissionSection /> */}
    </>
  );
};

export default Index;

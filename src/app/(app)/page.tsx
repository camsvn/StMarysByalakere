import Hero from "@/components/home/Hero";
import EventsSection from "@/components/home/EventsSection";
import MassScheduleSection from "@/components/home/MassScheduleSection";
import MinistriesSection from "@/components/home/MinistriesSection";
import PriestMessage from "@/components/home/PriestMessage";
import EventsMarquee from "@/components/home/EventsMarquee";
import { DateTime } from 'luxon';
import { getPayload } from 'payload';
import config from '@payload-config';

async function getEvents() {
  const payload = await getPayload({
        config
      });
  const istToday = DateTime.now().setZone("Asia/Kolkata").set({ 
    hour: 0, minute: 0, second: 0, millisecond: 0 
  });
  
  const displayedEvents = await payload.find({
    collection: 'events',
    sort: "date",
    limit: 10,
    where: {
      date: {
        greater_than_equal: istToday.toUTC().toISO()
      }
    }
  });
  
  return displayedEvents.docs;
}

const Index = async () => {
  const events = await getEvents();
  const hasEvents = events.length > 0;

  return (
    <>
      <Hero hasEvents={hasEvents}/>
      <EventsMarquee events={events}/>
      <PriestMessage />
      <EventsSection events={events}/>
      <MassScheduleSection />
      <MinistriesSection />
      {/* <MissionSection /> */}
    </>
  );
};

export default Index;
